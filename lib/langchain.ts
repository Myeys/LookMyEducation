import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const dbName = "test";
const collectionName = "penyakit_vector";

const PROMPT_TEMPLATE = `
ANDA ADALAH AHLI PENYAKIT MENULAR SEKSUAL. IKUTI STRUKTUR INI:

INFORMASI DARI DATABASE PMS:
{context}

PERTANYAAN USER: "{question}"

JAWABAN: Berikan jawaban spesifik hanya berdasarkan informasi di atas. Gunakan bahasa Indonesia yang jelas dan sederhana. Jangan menambahkan informasi di luar konteks database.

JAWABAN LANGSUNG:
`;

// Preprocess input question
function preprocessInput(input: string): string {
  const stopWords = ['apa', 'bagaimana', 'apakah', 'saya', 'ingin', 'tahu', 'tentang', 'bisa'];
  return input.toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .split(' ')
    .filter(word => !stopWords.includes(word) && word.length > 2)
    .join(' ')
    .trim();
}

// Extract main topic from question
function extractMainTopic(question: string): string {
  const topics = ['gejala', 'pengobatan', 'penularan', 'pencegahan', 'obat', 'tanda', 'ciri'];
  const q = question.toLowerCase();
  
  for (const topic of topics) {
    if (q.includes(topic)) {
      return topic;
    }
  }
  return '';
}

export async function getChain() {
  await client.connect();
  const collection = client.db(dbName).collection(collectionName);

  const vectorStore = new MongoDBAtlasVectorSearch(
    new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY!,
      modelName: "embedding-001",
    }),
    {
      collection,
      indexName: "vector_index",
      textKey: "pageContent",
      embeddingKey: "embedding",
    }
  );

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GEMINI_API_KEY!,
    temperature: 0.3,
    maxOutputTokens: 300,
    topK: 1,
    topP: 0.1
  });

  const chain = RunnableSequence.from([
    async (input: string) => {
      // Preprocess input
      const processedInput = preprocessInput(input);
      const mainTopic = extractMainTopic(input);
      
      let searchQuery = processedInput;
      if (mainTopic) {
        searchQuery = `${mainTopic} ${processedInput}`;
      }

      console.log("Search query:", searchQuery);
      
      const results = await vectorStore.similaritySearchWithScore(searchQuery, 4);
      
      // Strict threshold - only use high confidence results
      const highConfidenceResults = results.filter(([_, score]) => score > 0.8);
      
      if (highConfidenceResults.length === 0) {
        console.log("No high confidence results found");
        return { outOfContext: true, question: input };
      }
      
      console.log(`Found ${highConfidenceResults.length} high confidence results`);
      
      return {
        outOfContext: false,
        context: formatDocumentsAsString(highConfidenceResults.map(([doc]) => doc)),
        question: input
      };
    },
    async ({ context, question, outOfContext }) => {
      if (outOfContext) {
        return "Maaf, informasi tidak ditemukan dalam database kami. Silakan tanyakan hal lain seputar penyakit menular seksual.";
      }
      
      try {
        const response = await model.invoke(
          PROMPT_TEMPLATE
            .replace("{context}", context)
            .replace("{question}", question)
        );
        
        let answer = response.content.toString();
        
        // Validate that answer is based on context
        const contextSnippet = context.substring(0, 100).toLowerCase();
        const answerLower = answer.toLowerCase();
        
        if (!answerLower.includes(contextSnippet.substring(0, 30)) && 
            !answerLower.includes('maaf') && 
            !answerLower.includes('tidak tahu')) {
          answer = "Berdasarkan informasi yang ada: " + answer;
        }
        
        // Limit answer length
        if (answer.length > 400) {
          answer = answer.substring(0, 400) + "...";
        }
        
        return answer;
        
      } catch (error) {
        console.error("Error in model invocation:", error);
        return "Maaf, terjadi kesalahan dalam memproses pertanyaan Anda.";
      }
    }
  ]);

  return chain;
}
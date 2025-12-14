import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

// Pattern matching untuk jenis pertanyaan
const QUESTION_PATTERNS = {
  DEFINITION: /^(apa itu|pengertian|definisi|apa yang dimaksud dengan)\s+.+/i,
  SYMPTOMS: /^(gejala|tanda-tanda|ciri-ciri|keluhan)\s+.+/i,
  TREATMENT: /^(pengobatan|obat|cara mengobati|terapi)\s+.+/i,
  PREVENTION: /^(pencegahan|cara mencegah|pencegah)\s+.+/i,
  TRANSMISSION: /^(penularan|cara menular|penyebaran)\s+.+/i
};

// Deteksi jenis pertanyaan
function detectQuestionType(question: string): string {
  const q = question.toLowerCase();
  
  for (const [type, pattern] of Object.entries(QUESTION_PATTERNS)) {
    if (pattern.test(q)) {
      return type;
    }
  }
  
  // Default detection based on keywords
  if (q.includes('apa itu') || q.includes('pengertian') || q.includes('definisi')) {
    return 'DEFINITION';
  }
  if (q.includes('gejala') || q.includes('tanda') || q.includes('ciri')) {
    return 'SYMPTOMS';
  }
  if (q.includes('pengobatan') || q.includes('obat') || q.includes('sembuh')) {
    return 'TREATMENT';
  }
  
  return 'GENERAL';
}

// Filter results berdasarkan jenis pertanyaan
function filterResultsByQuestionType(results: any[], questionType: string, originalQuestion: string) {
  return results.filter(([doc, score]) => {
    const content = doc.pageContent.toLowerCase();
    const metadataQuestion = doc.metadata?.originalQuestion?.toLowerCase() || '';
    
    // Exact match untuk definition questions
    if (questionType === 'DEFINITION') {
      const isDefinition = 
        content.includes('apa itu') ||
        content.includes('pengertian') ||
        content.includes('definisi') ||
        metadataQuestion.includes('apa itu') ||
        metadataQuestion.includes('pengertian') ||
        metadataQuestion.includes('definisi');
      
      return isDefinition && score > 0.6;
    }
    
    // Filter untuk symptoms questions
    if (questionType === 'SYMPTOMS') {
      const isSymptoms = 
        content.includes('gejala') ||
        content.includes('tanda') ||
        content.includes('ciri') ||
        metadataQuestion.includes('gejala') ||
        metadataQuestion.includes('tanda') ||
        metadataQuestion.includes('ciri');
      
      return isSymptoms && score > 0.6;
    }
    
    return score > 0.65;
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { question } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Pertanyaan tidak valid" });
  }

  try {
    await client.connect();

    const vectorStore = new MongoDBAtlasVectorSearch(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY!,
        modelName: "embedding-001",
      }),
      {
        collection: client.db("test").collection("penyakit_vector"),
        indexName: "vector_index",
        textKey: "pageContent",
        embeddingKey: "embedding",
      }
    );

    console.log("🔍 Original Question:", question);
    
    // Deteksi jenis pertanyaan
    const questionType = detectQuestionType(question);
    console.log("🎯 Question Type:", questionType);

    // Search dengan pertanyaan
    let results = await vectorStore.similaritySearchWithScore(question, 10); // Ambil lebih banyak results
    
    // Filter results berdasarkan jenis pertanyaan
    const filteredResults = filterResultsByQuestionType(results, questionType, question);
    
    console.log("📊 All Results:", results.length);
    console.log("✅ Filtered Results:", filteredResults.length);

    // Debug: Log semua results
    results.forEach(([doc, score], index) => {
      console.log(`\n--- Result ${index + 1} (Score: ${score.toFixed(3)}) ---`);
      console.log("Content:", doc.pageContent.substring(0, 100) + "...");
      console.log("Metadata Question:", doc.metadata?.originalQuestion);
    });

    if (filteredResults.length === 0) {
      // Fallback:gunakan results terbaik tanpa filter
      const bestResults = results.filter(([_, score]) => score > 0.7);
      if (bestResults.length > 0) {
        filteredResults.push(bestResults[0]);
      }
    }

    if (filteredResults.length === 0) {
      return res.status(200).json({ 
        result: "Maaf, saya tidak menemukan informasi yang spesifik. Silakan tanyakan dengan lebih detail." 
      });
    }

    // Ambil hasil terbaik setelah filtering
    const bestMatch = filteredResults[0][0];
    const bestScore = filteredResults[0][1];
    
    let bestAnswer = bestMatch.metadata?.formattedAnswer || 
                   bestMatch.metadata?.answer ||
                   bestMatch.pageContent;

    // Extra cleaning untuk definition questions
    if (questionType === 'DEFINITION') {
      if (bestAnswer.includes("A: ")) {
        bestAnswer = bestAnswer.split("A: ")[1];
      }
      if (bestAnswer.includes("JAWABAN: ")) {
        bestAnswer = bestAnswer.split("JAWABAN: ")[1];
      }
      // Hapus informasi gejala dari jawaban definisi
      if (bestAnswer.includes("Gejala")) {
        bestAnswer = bestAnswer.split("Gejala")[0];
      }
    }

    console.log("✅ Chosen Answer Type:", questionType);
    console.log("💡 Best Answer:", bestAnswer.substring(0, 100) + "...");
    console.log("📋 Source Question:", bestMatch.metadata?.originalQuestion);

    return res.status(200).json({ 
      result: bestAnswer,
      confidence: bestScore,
      questionType: questionType
    });

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ 
      error: "Terjadi kesalahan sistem",
      details: err instanceof Error ? err.message : "Unknown error" 
    });
  } finally {
    await client.close();
  }
}
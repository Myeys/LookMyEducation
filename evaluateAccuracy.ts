import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import * as math from "mathjs";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

// Fungsi hitung Cosine Similarity
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = math.dot(vecA, vecB) as number;
  const normA = math.norm(vecA) as number;
  const normB = math.norm(vecB) as number;
  return dot / (normA * normB);
}

async function evaluate() {
  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: GEMINI_API_KEY,
    modelName: "embedding-001",
  });

  // Daftar pertanyaan + jawaban benar (ground truth)
  const testCases = [
    {
      question: "Apa itu PMS?",
      expected: "PMS adalah singkatan dari Penyakit Menular Seksual, yaitu infeksi yang menyebar melalui hubungan seksual."
    },
    {
      question: "Apa gejala HIV?",
      expected: "Gejala HIV dapat berupa demam, kelelahan, ruam kulit, dan penurunan berat badan."
    }
  ];

  for (const test of testCases) {
    // Embedding jawaban benar (ground truth)
    const expectedVec = await embeddings.embedQuery(test.expected);

    // Embedding jawaban chatbot → di sini idealnya kamu panggil chain/chatbot
    const chatbotAnswer = "PMS adalah infeksi yang menular melalui hubungan seksual."; 
    const chatbotVec = await embeddings.embedQuery(chatbotAnswer);

    // Hitung skor Cosine Similarity
    const score = cosineSimilarity(expectedVec, chatbotVec);

    console.log(`\nPertanyaan: ${test.question}`);
    console.log(`Jawaban Chatbot: ${chatbotAnswer}`);
    console.log(`Ground Truth: ${test.expected}`);
    console.log(`Cosine Similarity Score: ${score.toFixed(4)}`);
  }
}


evaluate();

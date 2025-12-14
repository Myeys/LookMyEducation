import { NextResponse } from "next/server";
import localDB from "./local-db.json";

// Fungsi fuzzy matching sederhana
function findBestMatch(question: string) {
  const q = question.toLowerCase();

  // Skor berdasarkan kata yang cocok
  return localDB
    .map(item => {
      const keywords = item.question.split(" ");
      let score = 0;

      keywords.forEach(k => {
        if (q.includes(k)) score += 1;
      });

      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)[0];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userQuestion = body.question || body.text || "";

    if (!userQuestion.trim()) {
      return NextResponse.json({ answer: "Pertanyaan tidak boleh kosong." });
    }

    // Cari jawaban terbaik dari local DB
    const match = findBestMatch(userQuestion);

    if (!match || match.score === 0) {
      return NextResponse.json({
        answer: "Maaf, saya tidak menemukan jawaban untuk pertanyaan Anda. Coba pertanyaan lain tentang PMS."
      });
    }

    return NextResponse.json({
      answer: match.answer,
    });

  } catch {
    return NextResponse.json({
      answer: "Terjadi kesalahan pada server lokal."
    });
  }
}

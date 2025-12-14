// app/api/curhat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, umur, daerah, penyakit, keluhKesah } = body;

    // Validasi minimal
    if (!umur || !daerah || !penyakit || !keluhKesah) {
      return NextResponse.json({ error: 'Data tidak lengkap.' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db("test");
    const collection = db.collection("curhat_user");

    const newCurhat = {
      nama: nama || "Anonim",
      umur,
      daerah,
      penyakit,
      keluhKesah,
      tanggal: new Date()
    };

    await collection.insertOne(newCurhat);
    return NextResponse.json({ success: true, message: "Data berhasil disimpan." });

  } catch (error) {
    console.error("Gagal menyimpan curhat:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
  }
}

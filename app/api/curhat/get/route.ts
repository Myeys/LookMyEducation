import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("curhat_user");

    const curhatList = await collection.find({}).sort({ tanggal: -1 }).toArray();

    return NextResponse.json(curhatList);
  } catch (err) {
    console.error("Gagal ambil curhatan:", err);
    return NextResponse.json({ error: "Gagal ambil data curhatan" }, { status: 500 });
  }
}

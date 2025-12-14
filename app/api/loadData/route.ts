import { MongoClient } from "mongodb";

export async function GET() {
  const uri = process.env.MONGODB_URI!;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("test");
    const collection = db.collection("penyakit");

    const docs = await collection.find().toArray();

    const formatted = docs.map(doc => ({
      id: doc._id.toString(),
      text: `${doc.question} ${doc.answer}`
    }));

    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch {
    return new Response("Error loading data", { status: 500 });
  } finally {
    await client.close();
  }
}

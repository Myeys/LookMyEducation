import connectDB from '@/lib/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  await connectDB();

  const { username, email, password } = await req.json();

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email atau username sudah digunakan' },
        { status: 400 }
      );
    }

    const user = await User.create({ username, email, password });
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json(
      { error: 'Gagal membuat akun' },
      { status: 500 }
    );
  }
}



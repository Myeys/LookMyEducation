// lib/utils/auth.ts
import { cookies } from "next/headers";

// Type untuk session
type Session = {
  userId: string | null;
};

// Fungsi untuk membuat session
export async function createSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "session",
    value: userId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 minggu
    path: "/",
  });
}

// Fungsi untuk menghapus session
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Fungsi untuk verifikasi session
export async function verifySession(): Promise<Session> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  return { userId: session || null };
}
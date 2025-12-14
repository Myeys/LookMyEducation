"use server";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/utils/auth";

// Contoh fungsi login
export async function loginUser(credentials: { email: string; password: string }) {
  // Validasi input
  if (!credentials.email || !credentials.password) {
    throw new Error("Email dan password wajib diisi.");
  }

  // Panggil API atau cek database (contoh menggunakan dummy)
  const mockUser = { id: "1", email: "user@example.com" };

  if (
    credentials.email === mockUser.email &&
    credentials.password === "password123"
  ) {
    await createSession(mockUser.id); // Simpan session
    redirect("/dashboard"); // Redirect setelah login
  } else {
    throw new Error("Email atau password salah.");
  }
}

// // Fungsi register (serupa dengan login)
// export async function registerUser(data: FormData) {
//   // Implementasi pendaftaran
// }
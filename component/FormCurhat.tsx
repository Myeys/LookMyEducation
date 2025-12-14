"use client";

import React, { useState } from "react";

const penyakitList = [
  "Gonore",
  "Klamidia",
  "HIV/AIDS",
  "Sifilis",
  "Vaginosis Bakterial",
  "Herpes Genital",
  "Infeksi Jamur",
  "HPV",
  "Trikomoniasis",
];

export default function FormCurhat() {
  const [form, setForm] = useState({
    nama: "",
    umur: "",
    daerah: "",
    penyakit: "",
    keluhKesah: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/curhat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMsg("Curhatan kamu berhasil dikirim!");
        setForm({
          nama: "",
          umur: "",
          daerah: "",
          penyakit: "",
          keluhKesah: "",
        });
      } else {
        alert(result.error || "Terjadi kesalahan");
      }
    } catch (error) {
      alert("Gagal mengirim curhat.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-3">Tempat Curhatmu</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="nama"
          placeholder="Nama (Opsional)"
          value={form.nama}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="umur"
          placeholder="Umur *"
          required
          value={form.umur}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="daerah"
          placeholder="Daerah *"
          required
          value={form.daerah}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="penyakit"
          required
          value={form.penyakit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Pilih jenis penyakit *</option>
          {penyakitList.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <textarea
          name="keluhKesah"
          placeholder="Tulis keluh kesahmu *"
          required
          value={form.keluhKesah}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>
      {successMsg && <p className="text-green-600 mt-3">{successMsg}</p>}
    </div>
  );
}

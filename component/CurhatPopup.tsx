"use client";
import React from "react";
import "../styles/globals.css";
import { useAuth } from "../app/context/auth-context";

export const runtime = "nodejs";
export const preferredRegion = "auto";

const CurhatPopup: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [showForm, setShowForm] = React.useState(false);

  const [formData, setFormData] = React.useState({
    nama: "",
    umur: "",
    daerah: "",
    penyakit: "",
    keluhan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/curhat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          keluhKesah: formData.keluhan, // disesuaikan dengan backend
        }),
      });

      if (!res.ok) throw new Error("Gagal mengirim curhat");

      const json = await res.json();
      alert("Curhat berhasil dikirim!");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="curhat-container">
      {!showForm ? (
        <div className="curhat-bubble" onClick={() => setShowForm(true)}>
          Tempat Curhat 🫂
        </div>
      ) : (
        <div className="curhat-form-popup">
          <div className="judul-curhat">
            <h3 className="judul-form">Kasih tau isi hati kamu disini YUK..</h3>
            <hr />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama"
              placeholder="Nama (Opsional)"
              value={formData.nama}
              onChange={handleChange}
            />
            <input
              type="number"
              name="umur"
              placeholder="*Umur"
              value={formData.umur}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="daerah"
              placeholder="*Daerah*"
              value={formData.daerah}
              onChange={handleChange}
              required
            />
            <select
              name="penyakit"
              value={formData.penyakit}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Penyakit</option>
              <option value="HIV/AIDS">HIV/AIDS</option>
              <option value="Gonore">Gonore</option>
              <option value="Sifilis">Sifilis</option>
              <option value="Klamidia">Klamidia</option>
              <option value="Herpes">Herpes</option>
              <option value="HPV">HPV</option>
              <option value="Trikomoniasis">Trikomoniasis</option>
              <option value="Infeksi Jamur">Infeksi Jamur</option>
              <option value="Vaginosis Bakterial">Vaginosis Bakterial</option>
            </select>
            <textarea
              name="keluhan"
              placeholder="*Tulis keluh kesahmu di sini..."
              value={formData.keluhan}
              onChange={handleChange}
              rows={4}
              required
            />

            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md mt-2 w-full"
            >
              Kirim Curhat
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="mt-2 text-sm text-gray-500 underline"
            >
              Tutup
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CurhatPopup;

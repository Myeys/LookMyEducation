"use client";

import React, { useEffect, useState } from "react";
import "../../assets/tampilan-curhat.css";

type Curhat = {
  _id: string;
  nama: string;
  umur: string;
  daerah: string;
  penyakit: string;
  keluhKesah: string;
  tanggal: string;
  userId: string;
};

const TampilanCurhat = () => {
  const [data, setData] = useState<Curhat[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/curhat/get");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData =
    selectedCategory === "Semua"
      ? data
      : data.filter((item) => item.penyakit === selectedCategory);

  return (
    <section className="curhat-section">
      <div className="curhat-title">
        <h1>Selamat Datang di Forum Curhat</h1>
        <p>Lepaskan semua isi hati mu disni</p>
      </div>
      {/* ... (bagian JSX lainnya tetap sama) ... */}
      <div className="curhat-filter">
  <label htmlFor="filter">Kategori berdasarkan penyakit:</label>
  <select id="filter" value={selectedCategory} onChange={handleFilterChange}>
    <option value="Semua">Semua</option>
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
</div>

      
      <div className="curhat-list-wrapper">
        <div className="curhat-list">
          {filteredData.length === 0 ? (
            <p><i>Belum ada curhatan.</i></p>
          ) : (
            filteredData.map((item) => (
              <div key={item._id} className="curhat-card">
                <div className="curhat-card-header">
                  <span>Anonim</span>
                  <span className="curhat-penyakit">Penyakit: {item.penyakit}</span>
                </div>
                <div className="curhat-card-body">
                    <p>{item.keluhKesah}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="note">
        <p>
          Jika kalian ingin curhat terkait Penyakit Menular Seksual yang anda alami tetapi tidak ada tempat untuk curhat,
          maka anda bisa manfaatkan fitur curhat dari LME. Data-data anda akan aman, tidak dipublikasikan dan tidak disebarluaskan.
          <br /><i><u>UNTUK MENDAPATKAN FITUR CURHAT, ANDA BISA LOGIN TERLEBIH DAHULU.</u></i>
        </p>
      </div>
    </section>
  );
};

export default TampilanCurhat;



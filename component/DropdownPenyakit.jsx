"use client";
import React, { useState, useRef, useEffect } from "react";
import "../assets/DropdownPenyakit.css";

const DropdownPenyakit = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        PENYAKIT <span className="material-symbols-outlined arrow-down"> keyboard_arrow_down</span>
      </button>
      {open && (
        <div className="dropdown-content">
          <div className="column">
            <a href="/penyakit/Gonore">Gonore</a>
            <a href="/penyakit/Hiv">HIV/AIDS</a>
            <a href="/penyakit/Klamidia">Klamidia</a>
            <a href="/penyakit/Sifilis">Sifilis</a>
            <a href="/penyakit/Vaginosis">Vaginosis Bakterial</a>
          </div>
          <div className="column">
            <a href="/penyakit/herpes">Herpes Genital</a>
            <a href="/penyakit/jamur">Infeksi Jamur</a>
            <a href="/penyakit/hpv">HPV</a>
            <a href="/penyakit/trikomoniasis">Trikomoniasis</a>
          </div>
        </div>
      )}
    </li>
  );
};

export default DropdownPenyakit;

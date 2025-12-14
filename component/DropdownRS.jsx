"use client";
import React, { useState, useRef, useEffect } from "react";
import "../assets/DropdownPenyakit.css";

const DropdownRS = () => {
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
        LOKASI RS <span className="material-symbols-outlined arrow-down"> keyboard_arrow_down</span>
      </button>
      {open && (
        <div className="dropdown-contentRS">
          <div className="column">
            <a href="/RS/Jakarta">Jakarta</a>
            <a href="/RS/Bogor">Bogor</a>
            <a href="/RS/Depok">Depok</a>
            <a href="/RS/Tangerang">Tangerang</a>
            <a href="/RS/Bekasi">Bekasi</a>
          </div>
        </div>
      )}
    </li>
  );
};

export default DropdownRS;

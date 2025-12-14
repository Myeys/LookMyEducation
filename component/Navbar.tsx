"use client";
import Link from "next/link";
import DropdownPenyakit from "./DropdownPenyakit";
import DropdownRS from "./DropdownRS";
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";

export default function Navbar() {
  const [isHover, setIsHover] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, username, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-content">
        <img src="/img/dbLME.png" alt="LME" className="logo" />
        <div className="isi-navbar">
          <div className="navbar-menu_list2 text-white">
            {!isLoggedIn ? (
              <>
                <Link href="/auth/login">
                  <img
                    src={isHover ? "/img/login2.png" : "/img/login.png"}
                    alt="Login"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="app-login"
                  />
                </Link>
                <Link href="/auth/register">
                  <img
                    src={isHover ? "/img/register2.png" : "/img/register.png"}
                    alt="Register"
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="app-register"
                  />
                </Link>
              </>
            ) : (
              <div
                ref={dropdownRef}
                className="navbar-user"
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="dropdown-user"
                >
                  <div className="text-left leading-tight font-bold font-[Grandstander] user">
                    {username?.split(" ")[0]}<br />
                    {username?.split(" ")[1] || ""}
                  </div>
                </button>

                {dropdownOpen && (
                <div className="dropdown-logout-menu">
                  <button
                    onClick={logout}
                    className="dropdown-logout-item"
                  >
                    Logout
                  </button>
                </div>
              )}
              </div>
            )}
          </div>
        

          <div className="navbar-menu_list">
            <ul>
              <Link href="/menu">
                <li id="pilih">
                  <div className="container-home">
                    <span className="material-symbols-outlined home">home</span>
                    <div className="home-text"><p>BERANDA</p></div>
                  </div>
                </li>
              </Link>
              <DropdownPenyakit />
              <DropdownRS />
              <li id="pilih">
                <Link href="/about"><p>ABOUT</p></Link>
              </li>
              <li id="pilih-curhat">
                <Link href="/tampilan-curhat"><p>Curhat</p></Link>
              </li>
            </ul>
          </div>
        </div>

       
      </div>
    </div>
  );
}

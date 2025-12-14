"use client";
import React, { useState, useRef, useEffect } from "react";


export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="pertama">
          <img
            src="/img/LME.png"
            alt="LookMyEys"
            title="LookMyEys"
          />
          <p>
            COPYRIGHT &copy; CREATED <br />
            BY LookMyEyes
          </p>
        </div>
        <div className="isi">
          <div className="coment">
            <p>Ikuti Kami:</p>
          </div>
          <div className="sosmed">
            <div className="instagram">
              <a href="">
                <img src="/img/sosmed/instagram.png" alt="" />
              </a>
            </div>
            <div className="facebok">
              <a href="">
                <img src="/img/sosmed/facebook.png" alt="" />
              </a>
            </div>
            <div className="link">
              <a href="">
                <img src="/img/sosmed/linkedin.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import '@/assets/penyakit/penyakit.css';


const sifilis = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#e4e9ff' }}>
          <img src="/img/medis/sifilis-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU SIFILIS?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/sifilis-02.jpeg" alt="" className="medis-01" />
            <p>
              Sifilis, juga dikenal sebagai penyakit raja singa, adalah infeksi menular seksual (IMS) yang disebabkan oleh bakteri Treponema pallidum. Penyakit ini dapat menular melalui kontak langsung dengan luka sifilis saat berhubungan seksual, atau dari ibu ke janin selama kehamilan atau persalinan. Jika tidak diobati, sifilis dapat menyebabkan berbagai komplikasi serius, termasuk kerusakan pada organ tubuh, bahkan kematian. 
          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB SIFILIS</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/sifilis-03.jpeg" alt="" className="medis-01" />
            <p>
              Sifilis disebabkan oleh bakteri Treponema pallidum, yang dapat masuk ke dalam tubuh melalui luka atau lecet pada kulit atau selaput lendir (mulut, alat kelamin, atau anus). 
            </p>
            
          </div>
        </div>

        {/* Video edukasi */}
  <div className="judul-edukasi">
    <h1>VIDEO EDUKASI</h1>
  </div>
  <div className="video-slider-container">
    <div className="video-slider">
      <iframe
        src="https://www.youtube.com/embed/lzNRZ_musBA"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/Uf8SDlWuQPs"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/Xjil8Sa6nu4"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/O7SnjYSqvGY"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
</div>

      </div>
    </>
  );
};


export default sifilis;


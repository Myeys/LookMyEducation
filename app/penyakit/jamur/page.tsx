import React from 'react';
import '@/assets/penyakit/penyakit.css';


const jamur = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#a68a5e' }}>
          <img src="/img/medis/jamur-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU INFEKSI JAMUR?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/jamur-02.jpeg" alt="" className="medis-01" />
            <p>
             Infeksi jamur yang menular melalui hubungan seksual, seperti yang disebabkan oleh jamur Trichophyton mentagrophytes tipe VII (TMVII),  Infeksi ini bisa menyebabkan ruam gatal dan nyeri di sekitar alat kelamin, bokong, wajah, atau kaki. <br /> Meskipun begitu, infeksi jamur lain seperti kurap selangkangan atau kandidiasis yang sering terjadi pada area genital, umumnya tidak dianggap sebagai penyakit menular seksual, meskipun bisa menular melalui kontak seksual. 
          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB INFEKSI JAMUR</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/jamur-03.jpeg" alt="" className="medis-01" />
            <p>
             Penyakit menular seksual (PMS) akibat infeksi jamur, seperti kandidiasis, disebabkan oleh pertumbuhan berlebihan jamur Candida, terutama Candida albicans, di area kelamin, baik pada wanita maupun pria. <br />   Infeksi ini bisa terjadi karena beberapa faktor, termasuk ketidakseimbangan flora alami vagina, penggunaan antibiotik, perubahan hormon (kehamilan, pil KB), diabetes yang tidak terkontrol, sistem kekebalan tubuh yang lemah, dan kebersihan yang kurang baik. 
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
        src="https://www.youtube.com/embed/G8pJWwL4Hl4"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/a31x_NENig4"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/LFJ55BkExWQ"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/ZVqNsA_Ssgk"
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


export default jamur;


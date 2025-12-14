import React from 'react';
import '@/assets/penyakit/penyakit.css';


const herpes = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#efd5c8' }}>
          <img src="/img/medis/herpes-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU HERPES?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/herpes-02.jpeg" alt="" className="medis-01" />
            <p>
             Herpes genital adalah infeksi menular seksual yang disebabkan oleh virus herpes simpleks (HSV). Penyakit ini dapat menyebabkan luka lepuh yang menyakitkan di area genital, anus, atau mulut. Penyakit ini dapat ditularkan melalui kontak seksual, termasuk hubungan seks vaginal, anal, dan oral, dengan seseorang yang terinfeksi, bahkan jika mereka tidak memiliki luka yang terlihat, menurut Centers for Disease Control and Prevention (CDC). 
          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB HERPES</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/herpes-03.jpeg" alt="" className="medis-01" />
            <p>
             Herpes genital disebabkan oleh virus herpes simpleks, terutama tipe 2 (HSV-2), tetapi juga bisa disebabkan oleh tipe 1 (HSV-1). Virus ini menular melalui kontak langsung dengan luka atau cairan tubuh penderita, seperti saat berhubungan seks, baik vaginal, oral, maupun anal. 
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
        src="https://www.youtube.com/embed/3DpmR0GMboE"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/4-oY4oi5lDw"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/ztUISCpzTX8"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/L2X3jgZ237s"
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


export default herpes;


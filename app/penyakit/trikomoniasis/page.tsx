import React from 'react';
import '@/assets/penyakit/penyakit.css';


const trikomoniasis = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#c3957b' }}>
          <img src="/img/medis/trikomoniasis-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU TRIKOMONIASIS</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/trikomoniasis-02.jpeg" alt="" className="medis-01" />
            <p>
             Trikomoniasis adalah penyakit menular seksual yang disebabkan oleh parasit Trichomonas vaginalis. Trikomoniasis dapat dicegah dengan perilaku seksual yang aman, yaitu tidak bergonta-ganti pasangan seksual dan menggunakan kondom. 
          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB TRIKOMONIASIS</h1>x
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/trikomoniasis-03.jpeg" alt="" className="medis-01" />
            <p>
              Trikomoniasis disebabkan oleh parasit Trichomonas vaginalis yang menyebar melalui hubungan seksual. Parasit ini juga bisa menular akibat berbagi pakai alat bantu seks yang tidak dibersihkan terlebih dahulu.  
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
        src="https://www.youtube.com/embed/KX-33xbMh48"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/gdZYkoQ7Scs"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/EbM_1X3MP5g"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/dnE9azbLf5w"
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


export default trikomoniasis;


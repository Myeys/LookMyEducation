import React from 'react';
import '@/assets/penyakit/penyakit.css';


const vaginosis = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#ebafa8' }}>
          <img src="/img/medis/vaginosis-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU VAGINOSIS BAKTERIAL?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/vaginosis-02.jpeg" alt="" className="medis-01" />
            <p>
             Vaginosis bakterialis (VB) adalah infeksi vagina yang disebabkan oleh ketidakseimbangan bakteri alami di dalam vagina. Kondisi ini terjadi ketika bakteri baik (laktobasilus) berkurang dan bakteri jahat (anaerob) meningkat, menyebabkan gejala seperti keputihan berwarna abu-abu atau putih dengan bau amis. VB bukanlah infeksi menular seksual (IMS), tetapi dapat meningkatkan risiko IMS jika tidak diobati. 
          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB VAGINOSIS BAKTERIAL</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/vaginosis-03.jpeg" alt="" className="medis-01" />
            <p>
             Vaginosis bakterialis disebabkan oleh ketidakseimbangan flora normal vagina. Biasanya, bakteri baik (laktobasilus) mendominasi, namun pada VB, bakteri anaerob seperti Gardnerella vaginalis meningkat, menyebabkan gangguan pada keseimbangan bakteri.
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
        src="https://www.youtube.com/embed/UOvOBqL-PH0"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/yn9FIRRXTq8"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/21YtYLJtnH4"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/Wdv06j-5jgk"
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


export default vaginosis;


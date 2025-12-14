import React from 'react';
import '@/assets/penyakit/penyakit.css';


const klamidia = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#3e3e3f' }}>
          <img src="/img/medis/klamidia-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU KLAMIDIA?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/klamidia-02.jpeg" alt="" className="medis-01" />
            <p>
Klamidia adalah penyakit menular seksual yang disebabkan oleh bakteri Chlamydia trachomatis. Penyakit ini bisa menyerang pria maupun wanita melalui hubungan seksual dan menginfeksi organ seperti mata, tenggorokan, serviks, dan saluran kemih. <br />

Klamidia mudah diobati jika terdeteksi dini, namun bisa menyebabkan komplikasi serius seperti infertilitas bila tidak segera ditangani. Penyakit ini paling sering dialami oleh usia 14–24 tahun dan lebih umum dibandingkan gonore atau sifilis.

          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB KLAMIDIA</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/klamidia-03.jpeg" alt="" className="medis-01" />
            <p>
              Klamidia adalah penyakit menular seksual yang mudah menyebar melalui hubungan tanpa pengaman, bahkan lewat cairan pra-ejakulasi. <br />

Penyakit ini sering tidak bergejala, sehingga bisa menular tanpa disadari. Risiko terinfeksi ulang cukup tinggi jika pernah terkena sebelumnya. <br />

Klamidia juga bisa menular dari ibu ke bayi saat melahirkan, dan dapat menyebabkan infeksi mata atau pneumonia. Ibu hamil disarankan tes ulang 3–4 minggu setelah pengobatan untuk memastikan kesembuhan.  </p>
            
          </div>
        </div>

        {/* Video edukasi */}
  <div className="judul-edukasi">
    <h1>VIDEO EDUKASI</h1>
  </div>
  <div className="video-slider-container">
    <div className="video-slider">
      <iframe
        src="https://www.youtube.com/embed/e_YtnzeuhTU"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/IjmHl_ELo5g"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/AolP7-Ou-Lw"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/jpX6tP0NuHk"
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


export default klamidia;


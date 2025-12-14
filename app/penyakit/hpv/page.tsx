import React from 'react';
import '@/assets/penyakit/penyakit.css';


const hpv = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#ebafa8' }}>
          <img src="/img/medis/hpv-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU HUMAN PAPILLOMAVIRUS</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/hpv-02.jpeg" alt="" className="medis-01" />
            <p>
             HPV (Human Papillomavirus) adalah infeksi menular seksual yang umum dan disebabkan oleh virus HPV. Virus ini dapat menyebabkan kutil kelamin dan, dalam beberapa kasus, kanker serviks, penis, vulva, vagina, anus, dan orofaring pada pria dan wanita. Infeksi HPV sangat umum, tetapi sebagian besar infeksi tidak menyebabkan gejala yang terlihat.
          </p>
          </div>
        </div>


        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB HUMAN PAPILLOMAVIRUS</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/hpv-03.jpeg" alt="" className="medis-01" />
            <p>
            Virus HPV ditularkan melalui kontak kulit ke kulit, terutama melalui hubungan seksual (vaginal, anal, atau oral). <br />
Penularan juga bisa terjadi melalui kontak langsung dengan kutil yang terinfeksi. 
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
        src="https://www.youtube.com/embed/yo8sSQ9Spg4"
        title="Video 1"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/sLU9iI-4iJE"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/TCB5BM0R3eE"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/6HNGhb59_h8"
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


export default hpv;


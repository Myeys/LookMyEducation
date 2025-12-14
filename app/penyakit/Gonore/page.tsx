import React from 'react';
import '@/assets/penyakit/penyakit.css';


const gonore = () => {
  return (
    <>
      <div className="gonore-container">
         <div className="content-01" style={{backgroundColor: '#cc9693'}}>
              <img src="/img/medis/gonore-01.png" alt="" className="medis-02"/>
          </div>
          <div className="content-02">
            <div className="text-content">
              <h1> APA ITU GONORE?</h1>
            </div>
            <div className="isi-content-02">
              <img src="/img/medis/gonore-02.jpg" alt="" className='medis-01'/>
              <p>
                  Gonore (kencing nanah) adalah penyakit menular seksual (PMS) yang disebabkan oleh bakteri *Neisseria gonorrhoeae*. Infeksi ini menyerang saluran reproduksi, tetapi juga bisa memengaruhi rektum, tenggorokan, dan mata.
              </p>
            </div>
          </div>
          <div className="content-02">
            <div className="text-content">
              <h1> PENYEBAB GONORE</h1>
            </div>
            <div className="isi-content-02">
              <img src="/img/medis/gonore-03.jpeg" alt="" className='medis-01'/>
              <p>
                  Infeksi Neisseria gonorrhoeae merupakan penyebab gonore. Kontak seksual dengan orang yang terinfeksi, baik melalui hubungan seks vaginal, anal, atau oral, merupakan cara penularan HIV. Penting untuk diingat bahwa kontak nonseksual, termasuk berbagi kamar mandi atau berpelukan, tidak menularkan gonore.
              </p>
            </div>
          </div>
            <div className="judul-edukasi">
      <h1>VIDEO EDUKASI</h1>
    </div>
    <div className="video-slider-container">
      <div className="video-slider">
        <iframe
          src="https://www.youtube.com/embed/fyz8PW8GRhM"
          title="Video 1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <iframe
          src="https://www.youtube.com/embed/3l4SU8tp0fQ"
          title="Video 2"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <iframe
          src="https://www.youtube.com/embed/vyiUQuL9gwU"
          title="Video 3"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

         <iframe
          src="https://www.youtube.com/embed/Kg5b9SGc0K8"
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

export default gonore;

import React from 'react';
import '@/assets/RS/RS.css';


const depok = () => {
  return (
    <>
    <div className="judul">
          <h1>RUMAH SAKIT <br /> DAERAH DEPOK</h1>
    </div>
      <div className="RS-container">
        <div className="RS-01">
          <img src="/img/RS/depok-01.jpg" alt="" className="RS-img"/>
          <div className="isi-content">
            <div className="text">
              <div className="namaRS">
                  RUMAH SAKIT SENTRA MEDIKA 🏥
              </div>
              <p>
             Rumah Sakit Sentra Medika di Depok, khususnya yang berlokasi di Cisalak, menyediakan layanan kesehatan untuk berbagai penyakit, termasuk penyakit menular seksual. Anda dapat menghubungi rumah sakit tersebut untuk mendapatkan informasi lebih lanjut mengenai spesifik layanan yang tersedia untuk penyakit menular seksual. 
              </p>
            </div>
            <div className="lokasi">
              <p>lokasi Rumah Sakit : <a href="https://maps.app.goo.gl/TDzDsjeVSgy4fi777" target="_blank">https://maps.app.goo.gl/TDzDsjeVSgy4fi777</a></p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );

};

export default depok;


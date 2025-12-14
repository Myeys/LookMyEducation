import React from 'react';
import '@/assets/RS/RS.css';


const jakarta = () => {
  return (
    <>
    <div className="judul">
          <h1>RUMAH SAKIT <br /> DAERAH JAKARTA</h1>
    </div>
      <div className="RS-container">
        <div className="RS-01">
          <img src="/img/RS/jakarta-01.jpg" alt="" className="RS-img"/>
          <div className="isi-content">
            <div className="text">
              <div className="namaRS">
                  RUMAH SAKIT PONDOK INDAH 🏥 
              </div>
              <p>
              Rumah Sakit Pondok Indah menangani penyakit menular seksual. <br />Klinik Kulit dan Kelamin RS Pondok Indah Group menyediakan layanan untuk berbagai masalah kulit dan kelamin, termasuk penyakit menular seksual seperti kutil kelamin dan infeksi herpes kelamin.
              Klinik ini juga dilengkapi dengan berbagai fasilitas untuk terapi, seperti: <br />
              ✔️ Microneedling rejuvenation <br />
              ✔️ Platelet-rich plasma (PRP) <br />
              ✔️ Fototerapi <br />
              ✔️ Peeling <br />
              ✔️ Injeksi Botox <br />
              ✔️ Bedah listrik (elektrokauter) & laser cutting <br />
              ✔️ Injeksi kortikosteroid  <br />
              ✔️ Eksisi dan biopsi kulit. <br />
              </p>
            </div>
            <div className="lokasi">
              <p>lokasi Rumah Sakit : <a href="https://maps.app.goo.gl/4PAwvA4aG8YDH8hJ8" target="_blank">https://maps.app.goo.gl/4PAwvA4aG8YDH8hJ8</a></p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );

};

export default jakarta;


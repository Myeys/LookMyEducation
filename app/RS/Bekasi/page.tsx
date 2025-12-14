import React from 'react';
import '@/assets/RS/RS.css';


const bekasi = () => {
  return (
    <>
    <div className="judul">
          <h1>RUMAH SAKIT <br /> DAERAH BEKASI</h1>
    </div>
      <div className="RS-container">
        <div className="RS-01">
          <img src="/img/RS/bekasi-01.jpg" alt="" className="RS-img"/>
          <div className="isi-content">
            <div className="text">
              <div className="namaRS">
                  <a href="https://rsmekarsari.com/" target='blank'> Rumah Sakit Mekar Sari 🏥</a>
              </div>
              <p>
                Di kutip dalam website resmi <a href="https://rsmekarsari.com/" target='blank'> Rumah Sakit Mekar Sari</a><br />
              Rumah Sakit Mekar Sari merupakan rumah sakit swasta pertama di Bekasi. Berdasarkan akte notaris Eliza Pondaag pada tahun 1959 dibentuk Yayasan Mekar Sari dengan Ketua Ibu Hj. Nelly Adam Malik. Tahun 1975 dimulai pembangunan RS Mekar Sari Bekasi, kemudian tahun 1977 diresmikan oleh Ibu Tien Soeharto sebagai istri presiden RI dengan direktur pertama dr. Kartono Kartasasmita. <br />
              <b>Jadwal Dokter Poli Kulit dan Kelamin : </b> <br />
              👩‍🔬 dr. Wening Setyani Sp.DV : <br />
              - Selasa : 	13.00-15.00 <br />
              - Kamis : 09.00 - 12.00

              </p>
            </div>
            <div className="lokasi">
              <p>lokasi Rumah Sakit : <a href="https://maps.app.goo.gl/Hvxxrho1Bwg3V28f7" target="_blank">https://maps.app.goo.gl/Hvxxrho1Bwg3V28f7</a></p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );

};

export default bekasi;


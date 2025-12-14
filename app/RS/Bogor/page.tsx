import React from 'react';
import '@/assets/RS/RS.css';


const bogor = () => {
  return (
    <>
    <div className="judul">
          <h1>RUMAH SAKIT <br /> DAERAG BOGOR</h1>
    </div>
      <div className="RS-container">
        <div className="RS-01">
          <img src="/img/RS/bogor-01.jpg" alt="" className="RS-img"/>
          <div className="isi-content">
            <div className="text">
              <div className="namaRS">
                  <a href="https://sentramedikahospitals.com/" target='blank'> RS Sentra Medika Cibinong 🏥</a>  
              </div>
              <p>
              Layanan HIV di Sentra Medika Hospital Cibinong <br />
              Sentra Medika Hospital Cibinong menyediakan layanan skrining HIV, edukasi, serta penanganan medis komprehensif untuk pasien HIV. Tim medis kami siap membantu Anda dengan pendekatan yang profesional, aman, dan tanpa stigma.
              </p>
            </div>
            <div className="lokasi">
              <p>lokasi Rumah Sakit : <a href="https://maps.app.goo.gl/R4woiRGpLrNFxp3q8" target="_blank">https://maps.app.goo.gl/R4woiRGpLrNFxp3q8</a></p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );

};

export default bogor;


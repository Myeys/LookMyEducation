import React from 'react';
import '@/assets/RS/RS.css';


const tangerang = () => {
  return (
    <>
    <div className="judul">
          <h1>RUMAH SAKIT <br /> DAERAH TANGERANG</h1>
    </div>
      <div className="RS-container">
        <div className="RS-01">
          <img src="/img/RS/tangerang-01.jpeg" alt="" className="RS-img"/>
          <div className="isi-content">
            <div className="text">
              <div className="namaRS">
                 RSUD Kota Tangerang 🏥
              </div>
              <p>
             -
              </p>
            </div>
            <div className="lokasi">
              <p>lokasi Rumah Sakit : <a href="https://maps.app.goo.gl/JqCUXJhsBem7w5KW7" target="_blank">https://maps.app.goo.gl/JqCUXJhsBem7w5KW7</a></p>
            </div>
          </div>
        </div>  
      </div>
    </>
  );

};

export default tangerang;


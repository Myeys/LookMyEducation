import React from 'react'
import '../../assets/Menu.css'


const Menu = () => {
  return (
    <>
      <div className="menu-container">
          <div className="content-01">
              <img src="/img/medis/medis-02.jpg" alt="" className="medis-02"/>
          </div>
          <div className="content-02">
            <div className="text-content">
              <h1> PENYEBAB PENYAKIT MENULAR SEKSUAL</h1>
            </div>
            <div className="isi-content-02">
              <img src="/img/medis/medis-01.jpg" alt="" className='medis-01'/>
              <p>
                   Penyakit menular seksual (PMS), disebabkan infeksi menular. Metode penularan utamanya adalah hubungan seksual. PMS dapat disebabkan oleh bakteri, virus, atau parasit. PMS dapat menyebar dari orang ke orang melalui cairan tubuh seperti darah, air mani, dan cairan vagina.<br/>
                  Infeksi menular seksual terkadang dapat menyebar melalui cara nonseksual. Misalnya, selama kehamilan atau persalinan, IMS dapat ditularkan ke janin. Selain itu, berbagi jarum suntik atau menerima transfusi darah dapat menyebarkan IMS.
              </p>
            </div>
          </div>
          <div className="content-02">
            <div className="text-content">
              <h1> MACAM-MACAM PENYAKIT MENULAR SEKSUAL</h1>
            </div>
            <div className="isi-content-02">
              <img src="/img/medis/medis-03.jpg" alt="" className='medis-01'/>
              <p>
                ✔️ Gonore <br/>
                ✔️ Sifilis  <br/>
                ✔️ Klamidia  <br/>
                ✔️ Herpes Genital  <br/>
                ✔️ HPV (Human Papillomavirus)  <br/>
                ✔️ HIV/AIDS  <br/>
                ✔️ Trikomoniasis  <br/>
                ✔️ Vaginosis Bakterial <br/>  <br />
                *Penjelasan lebih lanjut bisa dilihat pada menu penyakit
              </p>
            </div>
          </div>
      </div>
    </>
  );

};

export default Menu;

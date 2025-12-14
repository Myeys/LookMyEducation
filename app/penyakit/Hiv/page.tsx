import React from 'react';
import '@/assets/penyakit/penyakit.css';


const hiv = () => {
  return (
    <>
      <div className="gonore-container">
        <div className="content-01" style={{ backgroundColor: '#000002' }}>
          <img src="/img/medis/hiv-01.png" alt="" className="medis-02" />
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU HIV?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/hiv-02.jpeg" alt="" className="medis-01" />
            <p>
HIV (Human Immunodeficiency Virus) adalah virus yang menyerang sistem kekebalan tubuh, terutama sel CD4, yaitu sel darah putih yang berperan penting dalam melawan infeksi. Jika tidak ditangani, HIV secara perlahan akan melemahkan kekebalan tubuh, sehingga penderitanya menjadi rentan terhadap berbagai infeksi dan penyakit serius. Namun, dengan terapi antiretroviral (ARV) yang dijalani secara disiplin, penderita HIV dapat tetap hidup sehat selama bertahun-tahun tanpa gejala yang berarti.            </p>
          </div>
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>APA ITU AIDS?</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/hiv-04.jpeg" alt="" className="medis-01" />
            <p>
AIDS (Acquired Immunodeficiency Syndrome) merupakan tahap akhir dari infeksi HIV, ketika sistem kekebalan tubuh telah sangat melemah dan tidak mampu lagi melawan infeksi atau penyakit tertentu. Kondisi ini ditandai dengan jumlah sel CD4 yang menurun hingga di bawah 200 sel/mm³, atau munculnya infeksi oportunistik berat seperti tuberkulosis, kandidiasis, maupun sarkoma Kaposi. </p>
          </div>
        </div>

        <div className="content-02">
          <div className="text-content">
            <h1>PENYEBAB HIV/AIDS</h1>
          </div>
          <div className="isi-content-02">
            <img src="/img/medis/hiv-03.jpeg" alt="" className="medis-01" />
            <p>
              Penyakit HIV/AIDS disebabkan oleh infeksi virus HIV (Human Immunodeficiency Virus). Virus ini menyerang sistem kekebalan tubuh, khususnya sel CD4, yang berperan penting dalam melawan infeksi. Ketika jumlah sel CD4 menurun drastis, tubuh menjadi sangat rentan terhadap berbagai penyakit, yang kemudian berkembang menjadi AIDS (Acquired Immunodeficiency Syndrome), yaitu tahap akhir dari infeksi HIV.
              Penularan HIV dapat terjadi melalui: 
              <br />👉 Hubungan seksual tanpa kondom dengan pengidap HIV. <br />
              👉 Penggunaan jarum suntik bersama, terutama pada pengguna narkoba. <br />
              👉 Penularan dari ibu ke anak, baik saat kehamilan, persalinan, maupun menyusui.
            </p> 
          </div>
        </div>

        {/* Video edukasi */}
  <div className="judul-edukasi">
    <h1>VIDEO EDUKASI</h1>
  </div>
 

  <div className="video-slider-container">
    {/* lokal video */}
      <div className="video-slider">
        <div className="videolocal">
        <video width="100%" height="auto" controls>
        <source src="/video/hiv.mp4" type="video/mp4" />
          Browser Anda tidak mendukung pemutar video.
        </video>
        </div>

    {/* diembed dari youtube */}
      <iframe
        src="https://www.youtube.com/embed/fs3kRcu4gQA"
        title="Video 2"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <iframe
        src="https://www.youtube.com/embed/wk1eOxjq-MI"
        title="Video 3"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

       <iframe
        src="https://www.youtube.com/embed/CsYJ-JMVsYQ"
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


export default hiv;


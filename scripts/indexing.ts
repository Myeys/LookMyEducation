import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI!;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const DB_NAME = "test";
const COLLECTION_NAME = "penyakit_vector";

interface QAItem {
  question: string;
  variants?: string[];
  answer: string;
  formattedAnswer: string;
  category?: string;
}

const QA_DATA: QAItem[] = [
  {
    question: "Apa itu Penyakit Menular Seksual?",
       variants: [
      "apa itu Penyakit Menular Seksual", 
      "apa itu Penyakit Menular Seksual", 
      "pengertian Penyakit Menular Seksual",
      "definisi Penyakit Menular Seksual",
      "apa itu penyakit menular seksual",
      "pengertian penyakit menular seksual", 
      "definisi penyakit menular seksual",
      "apa itu ims",
      "pengertian ims",
      "apa itu infeksi menular seksual"
    ],
    answer: "**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual, termasuk hubungan vagina, anal, atau oral. Penyakit ini disebabkan oleh bakteri, virus, atau parasit.",
    formattedAnswer: "**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual, termasuk hubungan vagina, anal, atau oral. Penyakit ini disebabkan oleh bakteri, virus, atau parasit.",
  },
{
  question: "apakah anda tau rumah sakit yang menangani penyakit menular seksual?",
  variants: [
    "rumah sakit untuk penyakit menular seksual",
    "rs yang menangani Penyakit Menular Seksual",
    "dimana rumah sakit khusus Penyakit Menular Seksual",
    "klinik Penyakit Menular Seksual di jabodetabek",
    "tempat berobat penyakit menular seksual",
    "dimana saya bisa periksa Penyakit Menular Seksual",
    "dimana rumah sakit Penyakit Menular Seksual terdekat"
  ],
  answer: `**LME hanya bisa memberikan informasi untuk wilayah JABODETABEK saja!**

- 📍 Jakarta  
- 📍 Bogor  
- 📍 Depok  
- 📍 Tangerang  
- 📍 Bekasi
          
Silakan beritahu saya lokasi Anda agar bisa memberikan info yang lebih relevan.`,
  formattedAnswer: `**ℹ️ LME hanya dapat memberikan informasi rumah sakit untuk wilayah JABODETABEK:**  

- 📍 Jakarta  
- 📍 Bogor  
- 📍 Depok  
- 📍 Tangerang  
- 📍 Bekasi  

👉 Silakan sebutkan lokasi Anda agar bisa diberikan rekomendasi yang lebih relevan.`
},
{
  question: "Apa itu penyakit menular seksual?",
  variants: [
    "penyakit menular seksual itu apa?",
    "definisi penyakit menular seksual",
    "apa yang dimaksud dengan penyakit menular seksual",
    "tolong jelaskan penyakit menular seksual",
    "arti penyakit menular seksual"
  ],
  answer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual, termasuk hubungan vagina, anal, atau oral. Penyakit ini disebabkan oleh bakteri, virus, atau parasit.`,
  formattedAnswer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang menyebar melalui aktivitas seksual (vagina, anal, atau oral) dan dapat disebabkan oleh **bakteri, virus, atau parasit**.`
},{
  question: "penyakit menular seksual itu apa?",
  variants: [
    "apa itu penyakit menular seksual ?",
    "definisi penyakit menular seksual",
    "apa yang dimaksud dengan penyakit menular seksual",
    "tolong jelaskan penyakit menular seksual",
    "arti penyakit menular seksual"
  ],
  answer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual, termasuk hubungan vagina, anal, atau oral. Penyakit ini disebabkan oleh bakteri, virus, atau parasit.`,
  formattedAnswer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang menyebar melalui aktivitas seksual (vagina, anal, atau oral) dan dapat disebabkan oleh **bakteri, virus, atau parasit**.`
},
{
  question: "Apa itu Penyakit Menular Seksual?",
  variants: [
    "apa itu Penyakit Menular Seksual",
    "Penyakit Menular Seksual itu apa",
    "Penyakit Menular Seksual maksudnya apa",
    "Penyakit Menular Seksual adalah",
    "tolong jelaskan apa itu Penyakit Menular Seksual"
  ],
  answer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual, termasuk hubungan vagina, anal, atau oral. Penyakit ini disebabkan oleh bakteri, virus, atau parasit.`,
  formattedAnswer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual (vagina, anal, atau oral) dan disebabkan oleh **bakteri, virus, atau parasit**.`
},
{
  question: "penyakit seksual menular seksual?",
  variants: [
    "penyakit seksual menular",
    "apa itu penyakit seksual",
    "penyakit seksual yang menular",
    "tolong jelaskan penyakit seksual menular",
    "penyakit menular seksual maksudnya"
  ],
  answer: `**Penyakit Menular Seksual (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual, termasuk hubungan vagina, anal, atau oral. Penyakit ini disebabkan oleh bakteri, virus, atau parasit.`,
  formattedAnswer: `**Penyakit Seksual Menular (Penyakit Menular Seksual)** adalah infeksi yang ditularkan melalui aktivitas seksual (vagina, anal, atau oral), umumnya disebabkan oleh **bakteri, virus, atau parasit**.`
},
{
  question: "Apa saja contoh penyakit menular seksual?",
  variants: [
    "contoh penyakit menular seksual",
    "jenis penyakit menular seksual",
    "penyakit apa saja yang termasuk Penyakit Menular Seksual",
    "tolong sebutkan contoh Penyakit Menular Seksual",
    "daftar penyakit menular seksual"
  ],
  answer: `**Contoh Penyakit Menular Seksual meliputi:**  
- ✔️ Gonore  
- ✔️ Sifilis  
- ✔️ Klamidia  
- ✔️ Herpes Genital  
- ✔️ HPV (Human Papillomavirus)  
- ✔️ HIV/AIDS  
- ✔️ Trikomoniasis  
- ✔️ Hepatitis B`,
  formattedAnswer: `**Contoh penyakit menular seksual (Penyakit Menular Seksual):**  
✔️ Gonore  
✔️ Sifilis  
✔️ Klamidia  
✔️ Herpes Genital  
✔️ HPV (Human Papillomavirus)  
✔️ HIV/AIDS  
✔️ Trikomoniasis  
✔️ Hepatitis B`
},
{
  question: "Bagaimana cara penularan Penyakit Menular Seksual?",
  variants: [
    "cara penularan Penyakit Menular Seksual",
    "Penyakit Menular Seksual menular lewat apa",
    "bagaimana Penyakit Menular Seksual menular",
    "Penyakit Menular Seksual bisa menular dari mana saja",
    "penularan penyakit menular seksual"
  ],
  answer: `**Penyakit Menular Seksual dapat ditularkan melalui:**  
- 😶 Hubungan seksual tanpa kondom  
- 🤨 Kontak langsung dengan luka terbuka atau cairan tubuh  
- 😐 Penggunaan jarum suntik bersama  
- 🤐 Dari ibu ke bayi selama kehamilan, persalinan, atau menyusui`,
  formattedAnswer: `**Penyakit Menular Seksual dapat menular melalui:**  
- Hubungan seksual tanpa kondom  
- Kontak langsung dengan luka/cairan tubuh  
- Penggunaan jarum suntik bersama  
- Dari ibu ke bayi saat hamil, melahirkan, atau menyusui`
},
{
  question: "Apakah semua Penyakit Menular Seksual bisa disembuhkan?",
  variants: [
    "apakah Penyakit Menular Seksual bisa sembuh",
    "semua Penyakit Menular Seksual bisa disembuhkan",
    "apakah penyakit menular seksual dapat sembuh",
    "Penyakit Menular Seksual bisa diobati atau tidak",
    "penyakit menular seksual sembuh total atau tidak"
  ],
  answer: `**Tidak semua Penyakit Menular Seksual bisa disembuhkan.**  
- 👉 Penyakit Menular Seksual yang disebabkan oleh bakteri (seperti gonore, sifilis, klamidia) bisa disembuhkan dengan antibiotik.  
- 👉 Penyakit Menular Seksual yang disebabkan oleh virus (seperti HIV, herpes, HPV) **tidak bisa disembuhkan** tetapi bisa dikontrol dengan pengobatan.`,
  formattedAnswer: `**ℹ️ Tidak semua Penyakit Menular Seksual dapat disembuhkan:**  
- Penyakit Menular Seksual akibat **bakteri** (gonore, sifilis, klamidia) ✅ bisa sembuh dengan antibiotik.  
- Penyakit Menular Seksual akibat **virus** (HIV, herpes, HPV) ❌ tidak bisa sembuh total, hanya bisa dikontrol dengan pengobatan.`
},
{
  question: "Apa perbedaan antara Penyakit Menular Seksual dan HIV?",
  variants: [
    "perbedaan Penyakit Menular Seksual dan hiv",
    "apa beda Penyakit Menular Seksual dan hiv",
    "hiv termasuk Penyakit Menular Seksual atau tidak",
    "bedanya hiv dengan penyakit menular seksual",
    "Penyakit Menular Seksual vs hiv"
  ],
  answer: `**Penyakit Menular Seksual** adalah istilah umum untuk semua penyakit yang ditularkan melalui hubungan seksual.  
**HIV** adalah salah satu jenis Penyakit Menular Seksual yang menyerang sistem kekebalan tubuh dan dapat berkembang menjadi AIDS jika tidak ditangani.`,
  formattedAnswer: `**Perbedaan Penyakit Menular Seksual dan HIV:**  
- **Penyakit Menular Seksual** 👉 istilah umum untuk penyakit akibat hubungan seksual.  
- **HIV** 👉 salah satu Penyakit Menular Seksual yang menyerang sistem kekebalan tubuh dan dapat berkembang menjadi AIDS.`
},
{
  question: "Apakah Penyakit Menular Seksual hanya ditularkan melalui hubungan seksual?",
  variants: [
    "Penyakit Menular Seksual hanya dari hubungan seksual",
    "penularan Penyakit Menular Seksual selain hubungan seksual",
    "apakah Penyakit Menular Seksual bisa menular tanpa hubungan seksual",
    "apakah Penyakit Menular Seksual hanya menular lewat sex",
    "Penyakit Menular Seksual menular lewat selain hubungan seksual"
  ],
  answer: `**Tidak.** Meskipun penularan utama melalui hubungan seksual, beberapa Penyakit Menular Seksual juga dapat menular melalui:  
- ❌ Jarum suntik bersama  
- ❌ Transfusi darah (jarang karena telah disaring)  
- ❌ Dari ibu ke bayi saat melahirkan atau menyusui`,
  formattedAnswer: `**Penyakit Menular Seksual tidak hanya menular lewat hubungan seksual.**  
Bisa juga menular melalui:  
- Jarum suntik bersama  
- Transfusi darah (jarang, karena darah disaring)  
- Dari ibu ke bayi saat melahirkan/menyusui`
},
{
  question: "Apakah ciuman bisa menularkan Penyakit Menular Seksual?",
  variants: [
    "apakah ciuman menularkan Penyakit Menular Seksual",
    "ciuman bisa menularkan penyakit menular seksual",
    "apakah Penyakit Menular Seksual menular lewat ciuman",
    "ciuman apakah beresiko Penyakit Menular Seksual",
    "Penyakit Menular Seksual bisa tertular lewat ciuman"
  ],
  answer: `**Umumnya tidak,** tetapi Penyakit Menular Seksual seperti herpes oral **bisa menular melalui ciuman** jika ada luka aktif di mulut.  
Penyakit Menular Seksual lain seperti HIV, gonore, atau klamidia tidak menular lewat ciuman.`,
  formattedAnswer: `**Ciuman umumnya tidak menularkan Penyakit Menular Seksual.**  
👉 Namun, **herpes oral** dapat menular jika ada luka aktif di mulut.  
👉 Penyakit Menular Seksual lain seperti HIV, gonore, klamidia ❌ tidak menular melalui ciuman.`
},
{
  question: "Apakah Penyakit Menular Seksual bisa menular lewat toilet?",
  variants: [
    "apakah Penyakit Menular Seksual bisa menular dari toilet",
    "Penyakit Menular Seksual menular lewat toilet?",
    "apakah Penyakit Menular Seksual bisa tertular dari dudukan toilet",
    "Penyakit Menular Seksual menular dari bak mandi?",
    "Penyakit Menular Seksual menular dari alat makan bersama?"
  ],
  answer: `**Tidak.** Penyakit Menular Seksual tidak menyebar melalui dudukan toilet, bak mandi, atau alat makan bersama.  
Penyebab Penyakit Menular Seksual tidak bisa hidup lama di luar tubuh manusia.`,
  formattedAnswer: "**Tidak.** Penyakit Menular Seksual tidak menyebar melalui dudukan toilet, bak mandi, atau alat makan bersama. Penyebab Penyakit Menular Seksual tidak bisa hidup lama di luar tubuh manusia."
},
{
  question: "Siapa yang paling berisiko terkena Penyakit Menular Seksual?",
  variants: [
    "siapa saja yang berisiko terkena Penyakit Menular Seksual",
    "orang yang rentan terkena Penyakit Menular Seksual",
    "siapa yang mudah tertular Penyakit Menular Seksual",
    "apakah semua orang bisa kena Penyakit Menular Seksual",
    "faktor risiko Penyakit Menular Seksual"
  ],
  answer: `**Siapa pun yang aktif secara seksual** berisiko terkena Penyakit Menular Seksual, terutama jika:  
- ❌ Sering berganti pasangan  
- ❌ Tidak menggunakan kondom  
- ❌ Tidak melakukan tes kesehatan secara rutin  
- ❌ Melakukan seks bebas`,
  formattedAnswer: "**Siapa pun yang aktif secara seksual** berisiko terkena Penyakit Menular Seksual, terutama jika:\n- Sering berganti pasangan\n- Tidak menggunakan kondom\n- Tidak melakukan tes kesehatan secara rutin\n- Melakukan seks bebas"
},
{
  question: "Apakah penggunaan kondom 100% aman dari Penyakit Menular Seksual?",
  variants: [
    "apakah kondom bisa melindungi 100% dari Penyakit Menular Seksual",
    "apakah kondom selalu aman dari Penyakit Menular Seksual",
    "kondom bisa cegah Penyakit Menular Seksual?",
    "apakah memakai kondom menjamin tidak kena Penyakit Menular Seksual",
    "efektivitas kondom terhadap Penyakit Menular Seksual"
  ],
  answer: `**Kondom sangat efektif** dalam mencegah Penyakit Menular Seksual, tetapi tidak memberikan perlindungan 100%.  
Beberapa Penyakit Menular Seksual seperti herpes atau HPV dapat menular melalui kontak kulit di area yang tidak tertutup kondom.`,
  formattedAnswer: "**Kondom sangat efektif** dalam mencegah Penyakit Menular Seksual, tetapi tidak memberikan perlindungan 100%. Beberapa Penyakit Menular Seksual seperti herpes atau HPV dapat menular melalui kontak kulit di area yang tidak tertutup kondom."
},
{
  question: "Apa saja gejala umum Penyakit Menular Seksual pada pria?",
  variants: [
    "gejala Penyakit Menular Seksual pada pria",
    "tanda terkena Penyakit Menular Seksual pada laki-laki",
    "ciri ciri Penyakit Menular Seksual pada pria",
    "bagaimana mengetahui Penyakit Menular Seksual pada pria",
    "simptom Penyakit Menular Seksual pada pria"
  ],
  answer: `Gejala umum Penyakit Menular Seksual pada pria dapat bervariasi tergantung jenis penyakitnya, namun secara umum meliputi:\n\n✅ Keluarnya cairan tidak normal dari penis\n✅ Rasa nyeri atau terbakar saat buang air kecil\n✅ Luka, lecet, atau bintik-bintik di area kelamin, anus, atau mulut\n✅ Gatal atau iritasi di area genital\n✅ Pembengkakan di testis atau area selangkangan\n✅ Nyeri saat berhubungan seksual`,
  formattedAnswer: "Gejala umum Penyakit Menular Seksual pada pria dapat bervariasi, meliputi:\n- Keluarnya cairan tidak normal dari penis\n- Rasa nyeri/bakar saat buang air kecil\n- Luka atau bintik di area kelamin, anus, mulut\n- Gatal atau iritasi genital\n- Pembengkakan di testis/selangkangan\n- Nyeri saat berhubungan seksual"
},
{
  question: "Apa saja gejala umum Penyakit Menular Seksual pada wanita?",
  variants: [
    "gejala Penyakit Menular Seksual pada wanita",
    "ciri ciri Penyakit Menular Seksual pada perempuan",
    "tanda terkena Penyakit Menular Seksual pada wanita",
    "bagaimana mengetahui Penyakit Menular Seksual pada wanita",
    "simptom Penyakit Menular Seksual pada wanita"
  ],
  answer: `Pada wanita, gejala Penyakit Menular Seksual bisa lebih sulit dikenali. Beberapa tanda yang umum meliputi:\n\n✅ Keputihan tidak normal (berbau atau berubah warna)\n✅ Rasa nyeri atau terbakar saat buang air kecil\n✅ Luka, lecet, atau kutil di area kelamin, anus, atau mulut\n✅ Gatal atau iritasi di area vagina\n✅ Nyeri saat berhubungan seksual\n✅ Pendarahan di luar jadwal menstruasi`,
  formattedAnswer: "Pada wanita, gejala Penyakit Menular Seksual meliputi:\n- Keputihan tidak normal\n- Nyeri/bakar saat buang air kecil\n- Luka atau kutil di area kelamin, anus, mulut\n- Gatal/iritasi vagina\n- Nyeri saat berhubungan seksual\n- Pendarahan di luar jadwal menstruasi"
},
{
  question: "Apakah semua Penyakit Menular Seksual menimbulkan gejala?",
  variants: [
    "apakah semua Penyakit Menular Seksual ada gejala",
    "Penyakit Menular Seksual bisa tanpa gejala?",
    "apakah Penyakit Menular Seksual selalu ada tanda-tanda",
    "Penyakit Menular Seksual tanpa gejala mungkin?",
    "ciri ciri semua Penyakit Menular Seksual"
  ],
  answer: `❌ Tidak. Banyak Penyakit Menular Seksual, seperti klamidia atau HPV, bisa tidak menunjukkan gejala sama sekali, terutama pada tahap awal. Inilah mengapa pemeriksaan rutin sangat penting, meskipun tidak merasa sakit.`,
  formattedAnswer: "❌ Tidak. Banyak Penyakit Menular Seksual, seperti klamidia atau HPV, bisa tanpa gejala terutama di awal. Karena itu pemeriksaan rutin tetap penting meskipun tidak merasa sakit."
},
{
  question: "Gejala Penyakit Menular Seksual muncul berapa lama setelah terinfeksi?",
  variants: [
    "kapan gejala Penyakit Menular Seksual muncul",
    "berapa lama gejala Penyakit Menular Seksual terlihat",
    "masa inkubasi Penyakit Menular Seksual",
    "gejala Penyakit Menular Seksual setelah berhubungan",
    "waktu muncul gejala Penyakit Menular Seksual"
  ],
  answer: `⏱️ Waktu munculnya gejala tergantung jenis penyakitnya:\n\n- Gonore & Klamidia: 1–3 minggu\n- Sifilis: 10–90 hari (rata-rata 21 hari)\n- Herpes Genital: 2–12 hari\n- HIV: 2–4 minggu (gejala seperti flu)\n\nNamun beberapa orang bisa tidak menunjukkan gejala sama sekali selama bertahun-tahun.`,
  formattedAnswer: "⏱️ Waktu muncul gejala Penyakit Menular Seksual:\n- Gonore/Klamidia: 1–3 minggu\n- Sifilis: 10–90 hari\n- Herpes Genital: 2–12 hari\n- HIV: 2–4 minggu (mirip flu)\nBeberapa orang bisa tanpa gejala bertahun-tahun."
},
{
  question: "Bagaimana cara mengetahui saya terkena Penyakit Menular Seksual?",
  variants: [
    "bagaimana cek Penyakit Menular Seksual",
    "cara tahu kena Penyakit Menular Seksual",
    "bagaimana mengetahui terkena Penyakit Menular Seksual",
    "cara memastikan terkena Penyakit Menular Seksual",
    "bagaimana diagnosa Penyakit Menular Seksual"
  ],
  answer: `🔍 Satu-satunya cara pasti adalah dengan melakukan tes Penyakit Menular Seksual. Jika kamu pernah melakukan aktivitas seksual berisiko, ada baiknya melakukan pemeriksaan rutin, terutama jika:\n\n✅ Memiliki pasangan seksual baru\n✅ Tidak menggunakan kondom\n✅ Mengalami gejala mencurigakan\n✅ Pernah didiagnosis Penyakit Menular Seksual sebelumnya`,
  formattedAnswer: "🔍 Cara pasti mengetahui Penyakit Menular Seksual adalah dengan tes. Disarankan jika:\n- Punya pasangan baru\n- Tidak pakai kondom\n- Ada gejala mencurigakan\n- Pernah didiagnosis Penyakit Menular Seksual sebelumnya"
},
{
  question: "Apakah saya perlu tes jika tidak ada gejala?",
  variants: [
    "perlu tes Penyakit Menular Seksual tanpa gejala?",
    "apakah tes perlu dilakukan jika tidak ada tanda",
    "harus tes Penyakit Menular Seksual meski sehat?",
    "Penyakit Menular Seksual tes walau tidak ada gejala",
    "apakah perlu cek Penyakit Menular Seksual meskipun tidak sakit"
  ],
  answer: `✅ Ya. Banyak Penyakit Menular Seksual tidak menunjukkan gejala di awal infeksi. Tes rutin tetap penting dilakukan, apalagi jika memiliki faktor risiko seperti:\n\n- Berganti pasangan seksual\n- Pernah berhubungan tanpa kondom\n- Pasangan pernah terdiagnosis Penyakit Menular Seksual`,
  formattedAnswer: "✅ Ya, tes Penyakit Menular Seksual tetap perlu meskipun tanpa gejala. Terutama jika:\n- Berganti pasangan\n- Seks tanpa kondom\n- Pasangan terdiagnosis Penyakit Menular Seksual"
},
{
  question: "Jenis tes apa yang digunakan untuk mendeteksi Penyakit Menular Seksual?",
  variants: [
    "tes untuk Penyakit Menular Seksual apa saja",
    "pemeriksaan untuk Penyakit Menular Seksual",
    "bagaimana cara tes Penyakit Menular Seksual",
    "jenis tes deteksi Penyakit Menular Seksual",
    "cara mengetahui Penyakit Menular Seksual lewat tes"
  ],
  answer: `💉 Jenis tes tergantung penyakit yang dicurigai, antara lain:\n\n✅ Tes urine (untuk gonore, klamidia)\n✅ Tes darah (untuk HIV, sifilis, hepatitis B/C)\n✅ Tes swab (usap dari vagina, penis, anus, atau tenggorokan)\n✅ Pemeriksaan fisik langsung oleh dokter\n\nKonsultasikan dengan tenaga medis untuk menentukan jenis tes yang sesuai.`,
  formattedAnswer: "💉 Jenis tes Penyakit Menular Seksual meliputi:\n- Tes urine (gonore, klamidia)\n- Tes darah (HIV, sifilis, hepatitis B/C)\n- Tes swab (vagina, penis, anus, tenggorokan)\n- Pemeriksaan fisik dokter"
},
  {
    question: "Apa itu penyakit gonore?",
    variants: [
      "apa yang dimaksud dengan gonore",
      "penyakit kencing nanah",
      "definisi gonore",
      "penjelasan tentang gonore",
      "gonorrhea adalah"
    ],
    answer: "Gonore (kencing nanah) adalah penyakit menular seksual (Penyakit Menular Seksual) yang disebabkan oleh bakteri *Neisseria gonorrhoeae*. Infeksi ini menyerang saluran reproduksi, tetapi juga bisa memengaruhi rektum, tenggorokan, dan mata.",
    formattedAnswer: "Gonore (kencing nanah) adalah Penyakit Menular Seksual akibat bakteri Neisseria gonorrhoeae. Menyerang saluran reproduksi, rektum, tenggorokan, dan mata.",
    category: "Gonore"
  },
  {
    question: "Bagaimana cara penularan gonore?",
    variants: [
      "gonore menular lewat apa",
      "jalan penularan kencing nanah",
      "apakah gonore mudah menular",
      "cara penyebaran gonore",
      "penularan penyakit gonore"
    ],
    answer: "Gonore menular melalui:\n\n✅ Hubungan seksual vaginal, anal, atau oral tanpa kondom\n✅ Kontak dengan cairan tubuh yang terinfeksi (seperti sperma atau cairan vagina)\n✅ Dari ibu hamil ke bayinya saat proses persalinan",
    formattedAnswer: "Penularan Gonore: Hubungan seks tanpa kondom (vaginal, anal, oral), kontak cairan tubuh terinfeksi, dan dari ibu ke bayi saat persalinan.",
    category: "Gonore"
  },
  {
    question: "Apa gejala gonore pada pria?",
    variants: [
      "tanda gonore pada laki-laki",
      "ciri-ciri gonore pria",
      "gejala kencing nanah pada cowok",
      "keluhan gonore pada lelaki",
      "apa yang dirasakan pria kena gonore"
    ],
    answer: "Gejala gonore pada pria biasanya muncul dalam 2–7 hari setelah terinfeksi:\n\n✅ Keluarnya cairan putih, kuning, atau hijau dari penis\n✅ Rasa nyeri atau terbakar saat buang air kecil\n✅ Pembengkakan atau nyeri pada testis\n✅ Rasa nyeri di tenggorokan jika terinfeksi melalui seks oral",
    formattedAnswer: "Gejala Gonore Pria: Cairan putih/kuning/hijau dari penis, nyeri saat kencing, pembengkakan testis, sakit tenggorokan (jika dari seks oral).",
    category: "Gonore"
  },
  {
    question: "Apa gejala gonore pada wanita?",
    variants: [
      "tanda gonore pada perempuan",
      "ciri-ciri gonore wanita",
      "gejala kencing nanah pada cewek",
      "keluhan gonore pada wanita",
      "apa yang dirasakan wanita kena gonore"
    ],
    answer: "Gejala gonore pada wanita sering kali ringan atau bahkan tidak terasa, tetapi bisa meliputi:\n\n✅ Keputihan tidak normal\n✅ Nyeri atau terbakar saat buang air kecil\n✅ Pendarahan di luar masa haid\n✅ Nyeri saat berhubungan seksual\n✅ Nyeri di perut bagian bawah",
    formattedAnswer: "Gejala Gonore Wanita: Sering tanpa gejala. Bisa keputihan abnormal, nyeri saat kencing & berhubungan, perdarahan luar haid, nyeri perut bawah.",
    category: "Gonore"
  },
  {
    question: "Apakah gonore bisa menyebabkan kemandulan?",
    variants: [
      "gonore bikin mandul",
      "apakah kencing nanah menyebabkan infertilitas",
      "bahaya gonore pada kesuburan",
      "komplikasi gonore kemandulan",
      "hubungan gonore dan mandul"
    ],
    answer: "✅ Ya. Jika tidak segera diobati, gonore dapat menyebabkan komplikasi serius seperti:\n\n- Penyakit radang panggul (PID) pada wanita, yang bisa merusak saluran reproduksi dan menyebabkan infertilitas\n- Epididimitis pada pria, yaitu peradangan saluran sperma yang bisa menyebabkan kemandulan",
    formattedAnswer: "Ya. Gonore tidak diobati bisa sebabkan kemandulan: Penyakit Radang Panggul (PID) pada wanita & Epididimitis pada pria.",
    category: "Gonore"
  },
  {
    question: "Bagaimana cara mengobati gonore?",
    variants: [
      "pengobatan untuk gonore",
      "obat kencing nanah",
      "terapi gonore",
      "penyembuhan gonore",
      "cara menghilangkan gonore"
    ],
    answer: "💉 Gonore diobati dengan antibiotik, biasanya berupa:\n\n✅ Injeksi ceftriaxone\n✅ Kombinasi dengan antibiotik oral seperti azithromycin\n\n⚠️ Penting untuk menghindari hubungan seksual hingga dinyatakan sembuh dan pasangan juga ikut diobati.",
    formattedAnswer: "Pengobatan Gonore: Antibiotik (biasanya suntik ceftriaxone & oral azithromycin). Pasangan juga harus diobati.",
    category: "Gonore"
  },
  {
    question: "Apakah gonore bisa kambuh setelah sembuh?",
    variants: [
      "gonore kambuh lagi",
      "apakah bisa kena gonore lagi",
      "reinfeksi gonore",
      "gonore datang kembali",
      "kekebalan tubuh terhadap gonore"
    ],
    answer: "✅ Ya. Seseorang bisa terinfeksi kembali jika berhubungan dengan pasangan yang terinfeksi. Pengobatan hanya menyembuhkan infeksi saat itu, bukan memberikan kekebalan permanen.",
    formattedAnswer: "Ya. Bisa terinfeksi ulang jika berhubungan dengan pasangan yang terinfeksi. Tidak ada kekebalan permanen.",
    category: "Gonore"
  },
  {
    question: "Apakah gonore bisa menular ke bayi saat melahirkan?",
    variants: [
      "gonore pada bayi baru lahir",
      "penularan gonore dari ibu ke anak",
      "bayi tertular gonore",
      "gonore kongenital",
      "efek gonore pada kehamilan dan bayi"
    ],
    answer: "👶 Ya. Ibu hamil yang menderita gonore bisa menularkan infeksi ke bayinya saat proses persalinan, terutama di area mata. Ini bisa menyebabkan infeksi mata serius bahkan kebutaan pada bayi.\n\n🔍 Oleh karena itu, penting bagi ibu hamil untuk menjalani tes Penyakit Menular Seksual saat kehamilan.",
    formattedAnswer: "Ya. Dapat menular ke bayi saat persalinan, sebabkan infeksi mata serius (ophthalmia neonatorum). Tes Penyakit Menular Seksual untuk ibu hamil sangat penting.",
    category: "Gonore"
  },
  {
    question: "Apa itu klamidia?",
    variants: [
      "penyakit klamidia",
      "definisi klamidia",
      "penjelasan tentang klamidia",
      "klamidia trachomatis",
      "apa yang dimaksud klamidia"
    ],
    answer: "Klamidia adalah penyakit menular seksual (Penyakit Menular Seksual) yang disebabkan oleh bakteri *Chlamydia trachomatis*. Ini adalah salah satu Penyakit Menular Seksual yang paling umum, terutama pada remaja dan dewasa muda. Klamidia bisa menyerang organ reproduksi, rektum, dan bahkan tenggorokan.",
    formattedAnswer: "Klamidia adalah Penyakit Menular Seksual bakteri (Chlamydia trachomatis) yang sangat umum. Menyerang organ reproduksi, rektum, dan tenggorokan.",
    category: "Klamidia"
  },
  {
    question: "Apa perbedaan klamidia dan gonore?",
    variants: [
      "bedanya klamidia dan gonore",
      "perbandingan klamidia dengan gonore",
      "klamidia vs gonore",
      "apa yang membedakan klamidia dan kencing nanah",
      "mana yang lebih berbahaya klamidia atau gonore"
    ],
    answer: "Keduanya adalah Penyakit Menular Seksual yang disebabkan oleh bakteri dan memiliki gejala yang mirip. Perbedaannya:\n\n🔬 **Penyebab**:\n- Klamidia: *Chlamydia trachomatis*\n- Gonore: *Neisseria gonorrhoeae*\n\n🧪 **Respons terhadap antibiotik**: Gonore lebih berisiko terhadap resistansi obat.\n\n📈 **Tingkat gejala**: Gonore lebih sering menimbulkan gejala dibanding klamidia.\n\n🧍‍♂️🧍‍♀️ Keduanya bisa menyerang pria dan wanita, dan keduanya bisa muncul tanpa gejala.",
    formattedAnswer: "Perbedaan: Bakteri penyebab berbeda. Gonore lebih bergejala & berisiko resistan antibiotik. Klamidia lebih sering tanpa gejala.",
    category: "Klamidia"
  },
  {
    question: "Bagaimana gejala klamidia pada pria dan wanita?",
    variants: [
      "tanda klamidia pada pria dan wanita",
      "ciri-ciri klamidia",
      "gejala infeksi klamidia",
      "keluhan klamidia",
      "apa yang dirasakan penderita klamidia"
    ],
    answer: "Gejala klamidia bisa berbeda antara pria dan wanita, namun banyak yang tidak mengalami gejala sama sekali.\n\n🧍‍♂️ **Pria**:\n✅ Keluarnya cairan dari penis\n✅ Rasa sakit atau terbakar saat buang air kecil\n✅ Nyeri atau bengkak di testis (jarang)\n\n🧍‍♀️ **Wanita**:\n✅ Keputihan tidak normal\n✅ Rasa terbakar saat buang air kecil\n✅ Nyeri saat berhubungan seksual\n✅ Pendarahan di luar menstruasi\n✅ Nyeri di perut bagian bawah",
    formattedAnswer: "Gejala: Sering tanpa gejala. Pria: cairan penis, sakit kencing. Wanita: keputihan abnormal, sakit kencing & berhubungan, perdarahan, nyeri perut.",
    category: "Klamidia"
  },
  {
    question: "Apakah klamidia selalu menimbulkan gejala?",
    variants: [
      "apakah klamidia punya gejala",
      "klamidia tanpa gejala",
      "asimtomatik klamidia",
      "apakah klamidia silent disease",
      "kenapa klamidia tidak terdeteksi"
    ],
    answer: "❌ Tidak. Sekitar 70–80% wanita dan 50% pria yang terinfeksi klamidia **tidak mengalami gejala apapun**. Itulah mengapa banyak orang tidak menyadari bahwa mereka sudah terinfeksi, dan bisa menularkan penyakit ini tanpa sadar.",
    formattedAnswer: "Tidak. Mayoritas wanita (70-80%) dan setengah pria penderitanya TANPA GEJALA (silent infection).",
    category: "Klamidia"
  },
  {
    question: "Bagaimana cara mengetahui saya terkena klamidia?",
    variants: [
      "tes untuk klamidia",
      "diagnosis klamidia",
      "cara deteksi klamidia",
      "pemeriksaan klamidia",
      "bagaimana tahu kena klamidia"
    ],
    answer: "🔍 Satu-satunya cara pasti untuk mengetahui adalah dengan melakukan tes laboratorium. Tes klamidia biasanya meliputi:\n\n✅ Tes urine\n✅ Swab dari serviks (wanita), uretra (pria), atau tenggorokan/rektum jika diperlukan\n\nTes ini aman, cepat, dan hasilnya biasanya keluar dalam beberapa hari.",
    formattedAnswer: "Hanya dengan tes laboratorium: tes urine atau swab (serviks/uretra/tenggorokan/rektum).",
    category: "Klamidia"
  },
  {
    question: "Bagaimana pengobatan klamidia?",
    variants: [
      "obat untuk klamidia",
      "cara menyembuhkan klamidia",
      "terapi klamidia",
      "antibiotik klamidia",
      "penanganan klamidia"
    ],
    answer: "💊 Klamidia **dapat disembuhkan** dengan antibiotik. Biasanya dokter akan meresepkan:\n\n✅ Dosis tunggal azitromisin ATAU\n✅ Doksisiklin selama 7 hari\n\n📌 Penting untuk tidak berhubungan seksual selama masa pengobatan dan memastikan pasangan juga ikut diperiksa dan diobati.",
    formattedAnswer: "Dapat disembuhkan dengan antibiotik (azitromisin dosis tunggal atau doksisiklin 7 hari). Pasangan harus diobati bersama.",
    category: "Klamidia"
  },
  {
    question: "Apa bahaya klamidia jika tidak diobati?",
    variants: [
      "komplikasi klamidia",
      "resiko klamidia tidak diobati",
      "dampak buruk klamidia",
      "klamidia menyebabkan kemandulan",
      "akibat klamidia"
    ],
    answer: "⚠️ Klamidia yang tidak diobati dapat menyebabkan komplikasi serius, seperti:\n\n🧍‍♀️ **Pada wanita**:\n✅ Penyakit radang panggul (PID)\n✅ Kehamilan ektopik (di luar rahim)\n✅ Kemandulan\n\n🧍‍♂️ **Pada pria**:\n✅ Epididimitis (radang saluran sperma)\n✅ Masalah kesuburan\n\n👶 Pada ibu hamil: Bisa menularkan ke bayi saat persalinan, menyebabkan infeksi mata atau paru-paru pada bayi.",
    formattedAnswer: "Bahaya: Pada wanita: PID, kehamilan ektopik, kemandulan. Pada pria: epididimitis, masalah kesuburan. Pada bayi: infeksi mata/paru.",
    category: "Klamidia"
  },
  {
    question: "Apa perbedaan HIV dan AIDS?",
    variants: [
      "bedanya HIV dan AIDS",
      "HIV vs AIDS",
      "apakah HIV sama dengan AIDS",
      "pengertian HIV dan AIDS",
      "stadium HIV menjadi AIDS"
    ],
    answer: "HIV (Human Immunodeficiency Virus) adalah virus yang menyerang sistem kekebalan tubuh. AIDS (Acquired Immune Deficiency Syndrome) adalah tahap lanjut dari infeksi HIV, ketika sistem imun sangat lemah dan rentan terhadap infeksi atau penyakit lain. Tidak semua orang dengan HIV langsung mengalami AIDS.",
    formattedAnswer: "HIV adalah virusnya. AIDS adalah sindrom/sakit berat akibat sistem imun rusak parah oleh HIV. Infeksi HIV belum tentu AIDS.",
    category: "HIV/AIDS"
  },
  {
    question: "Bagaimana cara penularan HIV?",
    variants: [
      "HIV menular lewat apa",
      "jalan penularan HIV",
      "cara penyebaran HIV",
      "media penularan HIV",
      "apakah HIV mudah menular"
    ],
    answer: "HIV ditularkan melalui:\n\n✅ Hubungan seksual tanpa kondom (vaginal, anal, oral)\n✅ Transfusi darah yang terkontaminasi\n✅ Penggunaan jarum suntik bersama\n✅ Dari ibu ke bayi saat kehamilan, persalinan, atau menyusui\n\n❌ HIV tidak menular melalui pelukan, berjabat tangan, atau berbagi makanan.",
    formattedAnswer: "Penularan HIV: Seks tanpa kondom, jarum suntik bersama, transfusi darah terkontaminasi, ibu ke bayi (hamil, lahir, menyusui).",
    category: "HIV/AIDS"
  },
  {
    question: "Apakah HIV bisa menular lewat air liur?",
    variants: [
      "HIV lewat ciuman",
      "air liur mengandung HIV",
      "berciuman dengan ODHA",
      "penularan HIV melalui ludah",
      "apakah berbagi alat makan menularkan HIV"
    ],
    answer: "❌ Tidak. HIV tidak menular melalui air liur, air mata, keringat, atau gigitan serangga. Virus ini hanya dapat menular melalui cairan tubuh seperti darah, air mani, cairan vagina, dan ASI.",
    formattedAnswer: "TIDAK. HIV tidak menular melalui air liur, keringat, air mata, sentuhan, atau berbagi alat makan.",
    category: "HIV/AIDS"
  },
  {
    question: "Apa saja gejala awal HIV?",
    variants: [
      "tanda-tanda awal HIV",
      "gejala primer HIV",
      "seroconversion illness",
      "apa yang dirasakan saat baru kena HIV",
      "gejala mirip flu setelah terpapar HIV"
    ],
    answer: "Gejala awal HIV bisa menyerupai flu biasa, biasanya muncul 2–4 minggu setelah terinfeksi:\n\n✅ Demam\n✅ Sakit kepala\n✅ Ruam\n✅ Nyeri otot dan sendi\n✅ Sakit tenggorokan\n✅ Pembengkakan kelenjar getah bening\n\nSetelah itu, HIV bisa tidak menimbulkan gejala selama bertahun-tahun.",
    formattedAnswer: "Gejala Awal HIV (2-4 minggu): Mirip flu (demam, sakit kepala, ruam, nyeri sendi, sakit tenggorokan, pembengkakan kelenjar). Lalu bisa tanpa gejala lama.",
    category: "HIV/AIDS"
  },
  {
    question: "Bagaimana proses tes HIV dilakukan?",
    variants: [
      "jenis tes HIV",
      "cara tes HIV",
      "pemeriksaan HIV",
      "rapid test HIV",
      "dimana bisa tes HIV"
    ],
    answer: "💉 Tes HIV dilakukan dengan mengambil sampel darah atau cairan mulut. Ada beberapa jenis tes:\n\n✅ Tes antibodi: mendeteksi antibodi terhadap HIV\n✅ Tes antigen/antibodi: mendeteksi virus dan antibodi\n✅ Tes NAT (Nucleic Acid Test): mendeteksi virus secara langsung\n\nHasil bisa keluar dalam beberapa menit hingga beberapa hari, tergantung jenis tes.",
    formattedAnswer: "Tes HIV: Dengan sampel darah atau cairan mulut. Jenis: Tes Antibodi, Tes Antigen/Antibodi (paling umum), atau Tes NAT.",
    category: "HIV/AIDS"
  },
  {
    question: "Apakah HIV bisa disembuhkan?",
    variants: [
      "obat penyembuh HIV",
      "apakah AIDS bisa sembuh",
      "kesehatan HIV",
      "terapi penyembuhan HIV",
      "apakah HIV masih mematikan"
    ],
    answer: "❌ Saat ini belum ada obat yang benar-benar menyembuhkan HIV. Namun, dengan pengobatan antiretroviral (ARV), penderita HIV bisa hidup sehat dan mencegah berkembangnya virus menjadi AIDS.",
    formattedAnswer: "Belum ada obat yang menyembuhkan HIV secara total. Namun, pengobatan ARV membuat HIV bisa dikendalikan seperti penyakit kronis.",
    category: "HIV/AIDS"
  },
  {
    question: "Apakah orang dengan HIV bisa hidup normal?",
    variants: [
      "harapan hidup ODHA",
      "kualitas hidup dengan HIV",
      "hidup produktif dengan HIV",
      "U=U undetectable untransmittable",
      "apakah ODHA bisa bekerja"
    ],
    answer: "✅ Ya. Dengan pengobatan ARV yang tepat dan gaya hidup sehat, orang dengan HIV bisa hidup normal, bekerja, menikah, dan memiliki anak. Mereka juga bisa menjaga viral load tetap rendah (bahkan tidak terdeteksi), sehingga tidak menularkan ke orang lain.",
    formattedAnswer: "Ya, sangat bisa. Dengan pengobatan ARV rutin, Odha dapat hidup normal, bekerja, berkeluarga, dan tidak menularkan HIV (U=U).",
    category: "HIV/AIDS"
  },
  {
    question: "Apakah HIV bisa dicegah dengan kondom?",
    variants: [
      "efektivitas kondom terhadap HIV",
      "pencegahan HIV dengan kondom",
      "apakah kondom aman untuk HIV",
      "proteksi kondom dari HIV",
      "berapa persen kondom cegah HIV"
    ],
    answer: "✅ Ya. Menggunakan kondom secara konsisten dan benar sangat efektif untuk mencegah penularan HIV dan penyakit menular seksual lainnya.",
    formattedAnswer: "Ya, sangat efektif. Kondom lateks/poliuretan yang digunakan dengan benar & konsisten adalah perlindungan utama terhadap HIV.",
    category: "HIV/AIDS"
  },
  {
    question: "Apa itu PEP dan PrEP untuk HIV?",
    variants: [
      "pengertian PEP dan PrEP",
      "obat pencegahan HIV",
      "perbedaan PEP dan PrEP",
      "pencegahan darurat HIV",
      "kapan minum PEP dan PrEP"
    ],
    answer: "💊 PEP (Post-Exposure Prophylaxis) adalah obat darurat untuk mencegah HIV setelah terpapar, harus diminum dalam waktu 72 jam.\n\n💊 PrEP (Pre-Exposure Prophylaxis) adalah obat yang diminum sebelum terpapar HIV untuk orang dengan risiko tinggi, misalnya memiliki pasangan dengan HIV.",
    formattedAnswer: "PrEP: Obat diminum SEBELUM terpapar HIV untuk pencegahan (untuk kelompok risiko tinggi). PEP: Obat darurat diminum SETELAH terpapar (max 72 jam).",
    category: "HIV/AIDS"
  },
  {
    question: "Apakah HIV bisa ditularkan dari ibu ke bayi?",
    variants: [
      "HIV pada ibu hamil",
      "penularan HIV vertikal",
      "bayi lahir dari ibu HIV",
      "pencegahan penularan HIV dari ibu ke anak",
      "PPIA"
    ],
    answer: "✅ Ya, HIV bisa ditularkan dari ibu ke bayi selama kehamilan, persalinan, atau menyusui. Namun, dengan pengobatan dan penanganan medis yang tepat, risiko penularannya bisa ditekan hingga hampir nol.",
    formattedAnswer: "Ya, bisa. Tapi dengan pengobatan ARV pada ibu, persalinan yang aman, & tidak menyusui, risiko turun drastis (<1%).",
    category: "HIV/AIDS"
  },
  {
    question: "Apa itu sifilis?",
    variants: [
      "penyakit sifilis",
      "definisi sifilis",
      "raja singa",
      "penjelasan tentang sifilis",
      "apa yang dimaksud sifilis"
    ],
    answer: "Sifilis adalah penyakit menular seksual (Penyakit Menular Seksual) yang disebabkan oleh bakteri *Treponema pallidum*. Penyakit ini dapat berkembang dalam beberapa tahap dan jika tidak diobati, bisa menyebabkan komplikasi serius pada organ tubuh, termasuk otak dan jantung.",
    formattedAnswer: "Sifilis (Raja Singa) adalah Penyakit Menular Seksual bakteri (Treponema pallidum) yang berbahaya dan berkembang bertahap, bisa serang otak & jantung.",
    category: "Sifilis"
  },
  {
    question: "Apa penyebab utama sifilis?",
    variants: [
      "penyebab sifilis",
      "bakteri penyebab sifilis",
      "mikroorganisme sifilis",
      "apa yang menyebabkan sifilis",
      "asal usul sifilis"
    ],
    answer: "Sifilis disebabkan oleh infeksi bakteri *Treponema pallidum*. Penularannya biasanya terjadi melalui kontak langsung dengan luka sifilis selama hubungan seksual vaginal, anal, atau oral.",
    formattedAnswer: "Penyebab: Bakteri Treponema pallidum. Menular melalui kontak langsung dengan luka sifilis saat berhubungan seks.",
    category: "Sifilis"
  },
  {
    question: "Bagaimana cara penularan sifilis?",
    variants: [
      "sifilis menular lewat apa",
      "jalan penularan raja singa",
      "cara penyebaran sifilis",
      "apakah sifilis mudah menular",
      "kontak yang menularkan sifilis"
    ],
    answer: "🔁 Sifilis dapat menular melalui:\n\n✅ Hubungan seksual (vaginal, anal, oral) dengan orang yang terinfeksi\n✅ Kontak langsung dengan luka atau ruam sifilis\n✅ Dari ibu ke bayi selama kehamilan atau saat melahirkan (sifilis kongenital)\n\n❌ Tidak menular melalui toilet, peralatan makan, atau pakaian.",
    formattedAnswer: "Penularan Sifilis: Seks vaginal/anal/oral tanpa kondom, kontak dengan luka/ruam sifilis, dan dari ibu ke bayi (kongenital).",
    category: "Sifilis"
  },
  {
    question: "Apa saja tahapan sifilis?",
    variants: [
      "stadium sifilis",
      "tahap-tahap sifilis",
      "perkembangan penyakit sifilis",
      "sifilis primer sekunder tersier",
      "fase-fase sifilis"
    ],
    answer: "🧩 Sifilis berkembang melalui 4 tahap:\n\n1️⃣ **Tahap Primer**: Luka kecil tanpa rasa sakit (chancre) di area kelamin, anus, atau mulut\n2️⃣ **Tahap Sekunder**: Ruam kulit, demam, pembengkakan kelenjar getah bening\n3️⃣ **Tahap Laten**: Tidak ada gejala, tetapi bakteri tetap ada dalam tubuh\n4️⃣ **Tahap Tersier**: Komplikasi serius pada otak, jantung, dan organ lain (jika tidak diobati)",
    formattedAnswer: "4 Tahap Sifilis: 1. Primer (luka/chancre), 2. Sekunder (ruam, demam), 3. Laten (tanpa gejala), 4. Tersier (rusak otak/jantung).",
    category: "Sifilis"
  },
  {
    question: "Seperti apa gejala sifilis pada awalnya?",
    variants: [
      "gejala awal sifilis",
      "tanda pertama sifilis",
      "chancre sifilis",
      "luka sifilis",
      "ciri-ciri sifilis stadium awal"
    ],
    answer: "🛑 Gejala awal sifilis biasanya berupa luka kecil (chancre) yang:\n\n✅ Tidak terasa sakit\n✅ Berbentuk bulat dan keras di tepinya\n✅ Muncul di penis, vagina, anus, atau mulut\n\nLuka ini bisa sembuh sendiri dalam beberapa minggu, tapi infeksi tetap menyebar bila tidak diobati.",
    formattedAnswer: "Gejala Awal: Luka (chancre) tidak sakit, bulat, keras, di kelamin/anus/mulut. Bisa sembuh sendiri, tapi infeksi terus berlanjut.",
    category: "Sifilis"
  },
  {
    question: "Apa bahaya sifilis jika tidak ditangani?",
    variants: [
      "komplikasi sifilis",
      "dampak buruk sifilis",
      "sifilis merusak organ",
      "neurosifilis",
      "akibat sifilis tidak diobati"
    ],
    answer: "⚠️ Jika sifilis tidak diobati, dapat menyebabkan:\n\n❌ Kerusakan otak dan sistem saraf (neurosifilis)\n❌ Gangguan penglihatan atau kebutaan\n❌ Masalah jantung dan pembuluh darah\n❌ Kematian bayi dalam kandungan\n❌ Komplikasi fatal pada organ tubuh lain",
    formattedAnswer: "Bahaya: Kerusakan permanen otak (neurosifilis), saraf, jantung, pembuluh darah, kebutaan, kematian janin, dan kematian.",
    category: "Sifilis"
  },
  {
    question: "Apakah sifilis bisa disembuhkan?",
    variants: [
      "obat sifilis",
      "pengobatan sifilis",
      "penyembuhan raja singa",
      "apakah sifilis bisa diobati",
      "antibiotik untuk sifilis"
    ],
    answer: "✅ Ya, sifilis bisa disembuhkan dengan antibiotik, terutama penisilin. Namun, pengobatan hanya bisa menghentikan perkembangan penyakit, bukan memperbaiki kerusakan organ yang sudah terjadi. Karena itu, penting untuk segera menjalani pemeriksaan dan pengobatan sejak dini.",
    formattedAnswer: "Ya, bisa disembuhkan dengan antibiotik (biasanya suntik penisilin). Tapi kerusakan organ permanen tidak bisa diperbaiki.",
    category: "Sifilis"
  },
  {
    question: "Apakah sifilis bisa menular ke bayi dalam kandungan?",
    variants: [
      "sifilis kongenital",
      "sifilis pada bayi",
      "penularan sifilis ke janin",
      "dampak sifilis pada kehamilan",
      "bayi lahir dengan sifilis"
    ],
    answer: "👶 Ya. Ibu hamil yang terinfeksi sifilis bisa menularkan infeksi ke bayinya melalui plasenta. Ini disebut sifilis kongenital dan dapat menyebabkan:\n\n❌ Keguguran atau kelahiran mati\n❌ Bayi lahir dengan kerusakan organ serius\n❌ Pertumbuhan terganggu atau kematian bayi setelah lahir\n\nTes sifilis pada ibu hamil sangat dianjurkan untuk pencegahan.",
    formattedAnswer: "Ya, disebut Sifilis Kongenital. Bisa sebabkan keguguran, bayi lahir mati, atau cacat berat. Skrining ibu hamil wajib.",
    category: "Sifilis"
  },
  {
    question: "Apa itu vaginosis bakterial?",
    variants: [
      "definisi vaginosis bakterial",
      "penyakit VB",
      "bacterial vaginosis",
      "ketidakseimbangan flora vagina",
      "apa itu BV"
    ],
    answer: "Vaginosis bakterial (VB) adalah kondisi ketika terjadi ketidakseimbangan bakteri baik dan jahat di dalam vagina. Biasanya, bakteri baik seperti *lactobacillus* menurun dan bakteri jahat seperti *gardnerella* meningkat, causing gejala seperti keputihan dan bau tidak sedap.",
    formattedAnswer: "Vaginosis Bakterial (VB): Bukan Penyakit Menular Seksual. Kondisi ketidakseimbangan bakteri vagina (bakteri jahat > bakteri baik).",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Apakah vaginosis bakterial termasuk Penyakit Menular Seksual?",
    variants: [
      "apakah VB Penyakit Menular Seksual",
      "vaginosis bakterial penyakit menular seksual",
      "apakah VB menular seksual",
      "status VB sebagai Penyakit Menular Seksual",
      "perbedaan VB dan Penyakit Menular Seksual"
    ],
    answer: "❌ Tidak. Vaginosis bakterial **bukan** penyakit menular seksual (Penyakit Menular Seksual), tetapi bisa dipengaruhi oleh aktivitas seksual. VB lebih berkaitan dengan ketidakseimbangan flora bakteri alami di vagina.",
    formattedAnswer: "TIDAK. Vaginosis Bakterial bukan Penyakit Menular Seksual, tapi aktivitas seksual bisa jadi pemicu ketidakseimbangan bakterinya.",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Apa penyebab utama vaginosis bakterial?",
    variants: [
      "penyebab VB",
      "pemicu vaginosis bakterial",
      "faktor risiko VB",
      "mengapa terjadi vaginosis bakterial",
      "penyebab ketidakseimbangan flora vagina"
    ],
    answer: "Penyebab utama vaginosis bakterial adalah ketidakseimbangan antara bakteri baik dan jahat di vagina. Faktor yang memicu:\n\n✅ Sering berganti pasangan seksual\n✅ Penggunaan sabun atau pembersih kewanitaan yang mengganggu pH\n✅ Penggunaan douche (semprot vagina)\n✅ Merokok\n✅ Kurangnya bakteri *lactobacillus* di vagina",
    formattedAnswer: "Penyebab: Ketidakseimbangan bakteri vagina. Pemicu: Berganti pasangan, douching, sabun pembersih vagina, merokok.",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Apa gejala vaginosis bakterial?",
    variants: [
      "tanda-tanda VB",
      "ciri-ciri vaginosis bakterial",
      "keluhan VB",
      "keputihan akibat VB",
      "bau amis pada vagina"
    ],
    answer: "Gejala yang umum dialami:\n\n✅ Keputihan berwarna abu-abu atau putih tipis\n✅ Bau amis yang menyengat, terutama setelah berhubungan\n✅ Rasa gatal ringan atau iritasi\n✅ Kadang disertai rasa terbakar saat buang air kecil\n\nNamun sebagian wanita bisa tidak mengalami gejala sama sekali.",
    formattedAnswer: "Gejala: Keputihan encer abu-abu/putih & bau amis menyengat (khas). Kadang gatal/iritasi. Sering tanpa gejala.",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Apa perbedaan vaginosis bakterial dan infeksi jamur?",
    variants: [
      "VB vs infeksi jamur",
      "bedanya keputihan bakteri dan jamur",
      "perbedaan bacterial vaginosis dan candidiasis",
      "cara membedakan VB dan keputihan jamur",
      "vaginosis vs candidiasis"
    ],
    answer: "🔍 Perbedaan utama:\n\n**Vaginosis Bakterial:**\n✅ Keputihan encer, abu-abu/putih\n✅ Bau amis menyengat\n✅ Sedikit atau tidak ada gatal\n\n**Infeksi Jamur (Kandidiasis):**\n✅ Keputihan kental seperti keju\n✅ Gatal intens di vagina\n✅ Tidak ada bau amis\n\nTes laboratorium bisa memastikan diagnosis.",
    formattedAnswer: "Beda: VB: cairan encer, bau amis, gatal sedikit. Jamur: kental seperti susu, gatal hebat, tidak bau amis.",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Apakah vaginosis bakterial menular ke pasangan?",
    variants: [
      "apakah VB menular",
      "penularan vaginosis bakterial",
      "apakah pasangan perlu diobati jika saya VB",
      "VB pada pasangan seksual",
      "risiko menularkan VB"
    ],
    answer: "⚠️ Vaginosis bakterial tidak dikategorikan sebagai penyakit menular seksual, tetapi aktivitas seksual dapat meningkatkan risikonya. Pada beberapa kasus, pasangan pria tidak memerlukan pengobatan, namun pada pasangan sesama jenis wanita, risiko penularan lebih tinggi.",
    formattedAnswer: "Tidak menular seperti Penyakit Menular Seksual. Tapi aktivitas seksual bisa memicunya. Pengobatan pasangan biasanya tidak diperlukan, kecuali pada wanita yang berhubungan dengan wanita.",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Bagaimana cara mengobati vaginosis bakterial?",
    variants: [
      "pengobatan VB",
      "obat vaginosis bakterial",
      "terapi untuk VB",
      "antibiotik untuk VB",
      "cara menghilangkan vaginosis bakterial"
    ],
    answer: "💊 Pengobatan umumnya melibatkan:\n\n✅ Antibiotik oral (seperti metronidazole atau clindamycin)\n✅ Gel atau krim antibiotik yang dimasukkan ke dalam vagina\n\nTips tambahan:\n\n🛑 Hindari penggunaan sabun/pembersih kewanitaan yang keras\n✅ Jaga kebersihan area intim dengan air bersih\n✅ Hindari douche (semprot vagina)\n\nKonsultasikan dengan dokter untuk pengobatan yang tepat.",
    formattedAnswer: "Pengobatan: Antibiotik (metronidazole atau clindamycin), bisa oral atau gel. Hindari douche & sabun kewanitaan.",
    category: "Vaginosis Bakterial"
  },
  {
    question: "Apa itu herpes genital?",
    variants: [
      "definisi herpes genital",
      "penyakit herpes kelamin",
      "herpes pada alat kelamin",
      "penjelasan herpes genital",
      "apa yang dimaksud herpes genital"
    ],
    answer: "Herpes genital adalah penyakit menular seksual (Penyakit Menular Seksual) yang disebabkan oleh virus herpes simpleks (HSV), biasanya tipe 2 (HSV-2), meskipun HSV-1 (penyebab herpes mulut) juga bisa menyebabkan infeksi genital melalui seks oral. Penyakit ini ditandai dengan munculnya luka melepuh di area kelamin, anus, atau mulut.",
    formattedAnswer: "Herpes Genital: Penyakit Menular Seksual virus (HSV-2 atau HSV-1) yang menyebabkan luka lepuh berulang di area kelamin, anus, atau mulut.",
    category: "Herpes Genital"
  },
  {
    question: "Apa penyebab herpes genital?",
    variants: [
      "virus penyebab herpes genital",
      "HSV-2",
      "mengapa terjadi herpes genital",
      "asal usul herpes kelamin",
      "patogen herpes genital"
    ],
    answer: "Herpes genital disebabkan oleh infeksi virus **herpes simpleks (HSV)**. Ada dua tipe utama:\n\n- ✅ **HSV-1**: Biasanya menyebabkan herpes mulut, tapi juga bisa menular ke area genital melalui seks oral.\n- ✅ **HSV-2**: Lebih sering menyebabkan infeksi di area genital melalui kontak seksual langsung.",
    formattedAnswer: "Penyebab: Virus Herpes Simpleks (HSV). Tipe 1 (HSV-1) dari mulut, Tipe 2 (HSV-2) dari kelamin.",
    category: "Herpes Genital"
  },
  {
    question: "Apa gejala awal herpes genital?",
    variants: [
      "tanda-tanda herpes genital",
      "ciri-ciri herpes kelamin",
      "gejala pertama herpes",
      "outbreak herpes",
      "apa yang dirasakan saat kena herpes"
    ],
    answer: "Gejala awal herpes genital biasanya muncul dalam 2–12 hari setelah terpapar virus, dan bisa berupa:\n\n✅ Luka melepuh atau lecet di area kelamin, anus, atau sekitar paha\n✅ Rasa nyeri atau terbakar saat buang air kecil\n✅ Demam, pegal-pegal, dan kelelahan\n✅ Pembengkakan kelenjar getah bening di selangkangan\n\nBeberapa orang tidak menyadari mereka terinfeksi karena gejalanya ringan atau tidak ada sama sekali.",
    formattedAnswer: "Gejala Awal: Lepuh/lecet nyeri di kelamin/anus, nyeri saat kencing, demam, pembengkakan kelenjar. Sering tanpa gejala.",
    category: "Herpes Genital"
  },
  {
    question: "Apakah herpes bisa sembuh total?",
    variants: [
      "penyembuhan herpes genital",
      "apakah herpes bisa dihilangkan",
      "herpes kambuhan",
      "virus herpes dormant",
      "apakah herpes permanen"
    ],
    answer: "❌ Belum. Herpes tidak bisa sembuh total karena virus tetap \"bersembunyi\" di dalam tubuh (dormant) dan bisa kambuh sewaktu-waktu. Namun, dengan pengobatan antivirus:\n\n✅ Gejala bisa dikendalikan\n✅ Frekuensi kambuh bisa dikurangi\n✅ Risiko menularkan ke orang lain bisa ditekan",
    formattedAnswer: "Tidak. Virusnya menetap seumur hidup dan bisa kambuh. Pengobatan hanya mengendalikan gejala dan kekambuhan.",
    category: "Herpes Genital"
  },
  {
    question: "Apakah herpes bisa menular meskipun tidak ada luka?",
    variants: [
      "penularan herpes tanpa gejala",
      "asymptomatic shedding herpes",
      "apakah herpes menular saat tidak kambuh",
      "risiko menularkan herpes tanpa luka",
      "herpes silent transmission"
    ],
    answer: "✅ Ya. Herpes tetap bisa menular meskipun tidak ada luka atau gejala. Ini disebut **penularan tanpa gejala (asymptomatic shedding)**. Virus bisa aktif di kulit tanpa terlihat oleh mata, sehingga penting menggunakan pengaman (seperti kondom) dan berkonsultasi dengan dokter untuk pengelolaan yang aman.",
    formattedAnswer: "Ya, bisa (Asymptomatic Shedding). Virus bisa ada di kulit dan menular meski tidak ada luka/gejala yang terlihat.",
    category: "Herpes Genital"
  },
  {
    question: "Apakah herpes berbahaya untuk ibu hamil?",
    variants: [
      "herpes pada kehamilan",
      "risiko herpes untuk bayi",
      "herpes neonatal",
      "persalinan caesar karena herpes",
      "penanganan herpes saat hamil"
    ],
    answer: "⚠️ Ya, herpes bisa berbahaya untuk ibu hamil, terutama jika infeksi pertama kali terjadi saat kehamilan. Risiko utamanya adalah penularan ke bayi saat proses persalinan, yang bisa menyebabkan **herpes neonatal**, kondisi serius yang mengancam nyawa bayi. Dokter biasanya menyarankan:\n\n✅ Pemeriksaan rutin\n✅ Pengobatan antivirus selama kehamilan\n✅ Persalinan caesar jika ada luka aktif menjelang kelahiran",
    formattedAnswer: "Berbahaya, terutama jika infeksi pertama saat hamil. Bisa sebabkan herpes neonatal pada bayi. Butuh pengobatan antivirus & mungkin operasi caesar.",
    category: "Herpes Genital"
  },
  {
    question: "Bagaimana cara mencegah herpes genital?",
    variants: [
      "pencegahan herpes",
      "cara menghindari herpes",
      "proteksi dari herpes genital",
      "tips agar tidak tertular herpes",
      "mengurangi risiko herpes"
    ],
    answer: "Pencegahan herpes genital dapat dilakukan dengan:\n\n✅ Menggunakan kondom saat berhubungan seksual\n✅ Menghindari kontak seksual saat pasangan mengalami gejala herpes\n✅ Tidak berbagi alat pribadi (handuk, celana dalam)\n✅ Setia pada satu pasangan yang telah dites\n✅ Mengonsumsi obat antivirus jika kamu atau pasangan memiliki riwayat herpes\n\nIngat: Kondom membantu, tapi tidak 100% karena herpes bisa menular dari kulit yang tidak tertutup kondom.",
    formattedAnswer: "Pencegahan: Pakai kondom, hindari seks saat ada luka, setia pada satu pasangan. Kondom tidak 100% karena menular dari kulit.",
    category: "Herpes Genital"
  },
  {
    question: "Apa itu HPV?",
    variants: [
      "human papillomavirus",
      "definisi HPV",
      "virus HPV",
      "penjelasan tentang HPV",
      "apa yang dimaksud HPV"
    ],
    answer: "HPV (Human Papillomavirus) adalah kelompok virus yang terdiri dari lebih dari 100 jenis. Beberapa jenis HPV bisa menyebabkan kutil kelamin, sementara jenis lainnya berisiko tinggi menyebabkan kanker, terutama kanker serviks, anus, tenggorokan, dan penis.",
    formattedAnswer: "HPV: Sekelompok virus. Ada yang sebabkan kutil kelamin, ada yang berisiko tinggi sebabkan kanker (serviks, anus, tenggorokan, penis).",
    category: "HPV"
  },
  {
    question: "Apakah HPV bisa menyebabkan kanker?",
    variants: [
      "HPV dan kanker",
      "kanker serviks akibat HPV",
      "HPV risiko tinggi",
      "hubungan HPV dengan kanker",
      "jenis HPV penyebab kanker"
    ],
    answer: "✅ Ya. Beberapa jenis HPV tergolong risiko tinggi dan bisa menyebabkan kanker, terutama:\n\n- Kanker serviks (paling umum)\n- Kanker anus\n- Kanker penis\n- Kanker tenggorokan dan mulut\n\nHPV jenis 16 dan 18 adalah penyebab utama kanker serviks.",
    formattedAnswer: "Ya. HPV tipe risiko tinggi (seperti 16 & 18) adalah penyebab utama kanker serviks, juga kanker anus, penis, & tenggorokan.",
    category: "HPV"
  },
  {
    question: "Apa itu kutil kelamin?",
    variants: [
      "genital warts",
      "definisi kutil kelamin",
      "ciri-ciri kutil kelamin",
      "penyebab kutil di kemaluan",
      "seperti apa kutil kelamin"
    ],
    answer: "Kutil kelamin adalah benjolan kecil atau kelompok benjolan di area kelamin, anus, atau sekitar mulut, yang disebabkan oleh infeksi HPV. Mereka bisa tampak seperti:\n\n✅ Daging tumbuh kecil berwarna kulit atau kemerahan\n✅ Halus atau kasar seperti kembang kol\n✅ Bisa gatal, tapi biasanya tidak nyeri",
    formattedAnswer: "Kutil Kelamin: Benjolan di kelamin/anus akibat HPV. Bentuknya seperti daging tumbuh kecil atau kembang kol. Tidak nyeri, bisa gatal.",
    category: "HPV"
  },
  {
    question: "Bagaimana penularan HPV terjadi?",
    variants: [
      "cara penularan HPV",
      "HPV menular lewat apa",
      "penyebaran virus HPV",
      "apakah HPV mudah menular",
      "kontak yang menularkan HPV"
    ],
    answer: "🔄 HPV menular melalui:\n\n✅ Hubungan seksual vaginal, anal, maupun oral\n✅ Kontak kulit ke kulit di area genital, bahkan tanpa penetrasi\n✅ Dari ibu ke bayi saat melahirkan (jarang)\n\nPenggunaan kondom dapat mengurangi risiko, tapi tidak sepenuhnya mencegah karena virus bisa menular lewat kulit di sekitar alat kelamin.",
    formattedAnswer: "Penularan: Seks vaginal/anal/oral & kontak kulit-ke-kulit di area genital. Kondom tidak sepenuhnya melindungi.",
    category: "HPV"
  },
  {
    question: "Apakah semua orang dengan HPV mengalami gejala?",
    variants: [
      "HPV tanpa gejala",
      "asimtomatik HPV",
      "apakah HPV silent infection",
      "seberapa umum HPV tanpa gejala",
      "kenapa HPV tidak terdeteksi"
    ],
    answer: "❌ Tidak. Sebagian besar infeksi HPV tidak menimbulkan gejala dan bisa hilang sendiri dalam 1–2 tahun. Namun, beberapa jenis HPV bisa menetap dan menyebabkan:\n\n- Kutil kelamin\n- Perubahan sel serviks (yang bisa berkembang menjadi kanker)",
    formattedAnswer: "Tidak. Kebanyakan infeksi HPV TANPA GEJALA dan sembuh sendiri. Yang persisten bisa cause kutil atau perubahan sel prain kanker.",
    category: "HPV"
  },
  {
    question: "Apakah ada tes untuk mendeteksi HPV?",
    variants: [
      "tes HPV",
      "pemeriksaan HPV",
      "deteksi virus HPV",
      "pap smear dan HPV test",
      "skrining HPV"
    ],
    answer: "✅ Ya, ada tes khusus HPV, biasanya dilakukan bersama dengan tes Pap smear:\n\n🔬 Tes HPV: mendeteksi DNA virus HPV pada leher rahim (hanya untuk wanita)\n🧪 Tes Pap smear: mendeteksi perubahan sel serviks akibat HPV\n\nSaat ini belum tersedia tes HPV yang umum digunakan untuk pria.",
    formattedAnswer: "Ya. Untuk wanita: Tes HPV dan Pap smear untuk deteksi dini kanker serviks. Untuk pria, tidak ada tes rutin.",
    category: "HPV"
  },
  {
    question: "Apakah vaksin HPV perlu diberikan untuk laki-laki?",
    variants: [
      "vaksin HPV untuk pria",
      "manfaat vaksin HPV pada laki-laki",
      "apakah cowok perlu vaksin HPV",
      "vaksinasi HPV universal",
      "perlindungan vaksin HPV untuk pria"
    ],
    answer: "✅ Ya. Vaksin HPV disarankan juga untuk laki-laki karena dapat:\n\n- Mencegah kutil kelamin\n- Menurunkan risiko kanker penis, anus, dan tenggorokan\n- Membantu mencegah penyebaran virus ke pasangan seksual\n\nWHO dan CDC menyarankan vaksinasi baik untuk pria maupun wanita.",
    formattedAnswer: "Sangat perlu. Vaksin HPV melindungi pria dari kutil kelamin, kanker anus, penis, & tenggorokan, serta mencegah penularan.",
    category: "HPV"
  },
  {
    question: "Umur berapa sebaiknya seseorang mendapat vaksin HPV?",
    variants: [
      "usia ideal vaksin HPV",
      "jadwal vaksinasi HPV",
      "vaksin HPV untuk remaja",
      "apakah dewasa masih bisa vaksin HPV",
      "waktu terbaik vaksin HPV"
    ],
    answer: "💉 Vaksin HPV paling efektif diberikan pada usia:\n\n✅ 9–14 tahun (ideal sebelum aktif secara seksual)\n✅ Bisa diberikan hingga usia 26 tahun\n✅ Pada beberapa kasus, bisa dipertimbangkan hingga usia 45 tahun (konsultasi dengan dokter)\n\nSemakin dini vaksin diberikan, semakin baik efektivitasnya.",
    formattedAnswer: "Ideal: Usia 9-14 tahun (sebelum aktif seksual). Bisa hingga 26 tahun. Di atas 26, konsultasi dokter untuk kebutuhan individu.",
    category: "HPV"
  },
  {
    question: "Apa itu infeksi jamur (candidiasis)?",
    variants: [
      "definisi infeksi jamur",
      "candidiasis",
      "keputihan jamur",
      "penyebab infeksi jamur",
      "apa yang dimaksud candidiasis"
    ],
    answer: "Infeksi yang disebabkan pertumbuhan berlebih jamur Candida, terutama Candida albicans.",
    formattedAnswer: "Infeksi Jamur (Candidiasis): Pertumbuhan berlebih jamur Candida (biasanya C. albicans) di vagina.",
    category: "Infeksi Jamur"
  },
  {
    question: "Apa gejala infeksi jamur pada area genital?",
    variants: [
      "tanda-tanda keputihan jamur",
      "ciri-ciri infeksi jamur vagina",
      "gejala candidiasis",
      "keluhan infeksi jamur",
      "gatal dan keputihan karena jamur"
    ],
    answer: "\n🔹 Gatal atau iritasi \n🔹 Keputihan kental & putih (seperti keju cottage) \n🔹 Kemerahan/bengkak \n🔹 Nyeri saat berhubungan atau buang air kecil",
    formattedAnswer: "Gejala: Gatal & iritasi hebat, keputihan kental putih (seperti keju cottage), kemerahan, nyeri saat berhubungan/kencing.",
    category: "Infeksi Jamur"
  },
  {
    question: "Apakah infeksi jamur termasuk Penyakit Menular Seksual?",
    variants: [
      "apakah candidiasis Penyakit Menular Seksual",
      "infeksi jamur menular seksual",
      "status infeksi jamur sebagai Penyakit Menular Seksual",
      "apakah keputihan jamur menular",
      "perbedaan infeksi jamur dan Penyakit Menular Seksual"
    ],
    answer: "Tidak, infeksi jamur bukan Penyakit Menular Seksual (Penyakit Menular Seksual), tapi bisa dipicu oleh hubungan seksual.",
    formattedAnswer: "TIDAK. Infeksi jamur bukan Penyakit Menular Seksual, tapi hubungan seksual bisa menjadi salah satu pemicunya.",
    category: "Infeksi Jamur"
  },
  {
    question: "Apa penyebab infeksi jamur?",
    variants: [
      "pemicu infeksi jamur",
      "faktor risiko candidiasis",
      "mengapa terjadi infeksi jamur",
      "penyebab keputihan jamur",
      "pencetus pertumbuhan candida"
    ],
    answer: "\n🔹 Ketidakseimbangan flora vagina (pH) \n🔹 Antibiotik \n🔹 Hormon (kehamilan, pil KB) \n🔹 Sistem imun lemah \n🔹 Diabetes tidak terkontrol",
    formattedAnswer: "Penyebab: Ketidakseimbangan pH vagina, antibiotik, hormon (hamil/Pil KB), diabetes, sistem imun lemah, pakaian ketat.",
    category: "Infeksi Jamur"
  },
  {
    question: "Bagaimana membedakan infeksi jamur dan bakteri?",
    variants: [
      "bedanya keputihan jamur dan bakteri",
      "candidiasis vs bacterial vaginosis",
      "perbedaan infeksi jamur dan VB",
      "cara membedakan keputihan normal dan tidak",
      "diagnosis banding keputihan"
    ],
    answer: "\n🔸 Infeksi jamur: Keputihan putih & kental, gatal. \n🔸 Infeksi bakteri: Keputihan encer, abu-abu/kuning, bau amis.",
    formattedAnswer: "Beda: Jamur: gatal hebat, keputihan kental putih, tidak bau. Bakteri (VB): bau amis, keputihan encer abu-abu, gatal ringan.",
    category: "Infeksi Jamur"
  },
  {
    question: "Bagaimana pengobatan infeksi jamur?",
    variants: [
      "obat infeksi jamur",
      "pengobatan candidiasis",
      "antijamur untuk keputihan",
      "krim atau supositoria antijamur",
      "flukonazol untuk infeksi jamur"
    ],
    answer: "\n🔹 Krim/kapsul antijamur (contoh: klotrimazol, mikonazol) \n🔹 Obat oral (contoh: flukonazol) \n🔹 Jaga kebersihan & hindari pakaian ketat.",
    formattedAnswer: "Pengobatan: Krim/salep/suppositoria antijamur (contoh: Klotrimazol) atau obat oral (Flukonazol).",
    category: "Infeksi Jamur"
  },
  {
    question: "Apakah infeksi jamur bisa menular melalui hubungan seksual?",
    variants: [
      "penularan infeksi jamur",
      "apakah candidiasis menular ke pasangan",
      "risiko menularkan jamur ke pasangan",
      "infeksi jamur pada pria",
      "balanitis karena candida"
    ],
    answer: "Bisa, tapi tidak selalu. Pria bisa terkena ruam/gatal, namun umumnya bukan infeksi serius.",
    formattedAnswer: "Bisa, tapi tidak umum. Dapat menyebabkan iritasi/ruam pada penis pasangan, tetapi bukan infeksi serius.",
    category: "Infeksi Jamur"
  },
  {
    question: "Apa itu trikomoniasis?",
    variants: [
      "definisi trikomoniasis",
      "penyakit trikomonas",
      "trichomonas vaginalis",
      "penjelasan trikomoniasis",
      "apa yang dimaksud trikomoniasis"
    ],
    answer: "Trikomoniasis adalah infeksi menular seksual yang disebabkan oleh parasit protozoa bernama *Trichomonas vaginalis*. Infeksi ini umum terjadi dan sering kali tidak menimbulkan gejala, terutama pada pria.",
    formattedAnswer: "Trikomoniasis: Penyakit Menular Seksual yang disebabkan parasit Trichomonas vaginalis. Sering tanpa gejala, terutama pada pria.",
    category: "Trikomoniasis"
  },
  {
    question: "Apa penyebab utama trikomoniasis?",
    variants: [
      "penyebab trikomoniasis",
      "parasit penyebab trikomoniasis",
      "asal usul trikomoniasis",
      "mikroorganisme trikomonas",
      "mengapa terjadi trikomoniasis"
    ],
    answer: "Trikomoniasis disebabkan oleh penularan parasit *Trichomonas vaginalis*, biasanya melalui hubungan seksual tanpa kondom dengan orang yang terinfeksi. Parasit ini hidup di saluran kemih atau genital.",
    formattedAnswer: "Penyebab: Parasit Trichomonas vaginalis. Menular melalui hubungan seks tanpa kondom.",
    category: "Trikomoniasis"
  },
  {
    question: "Apa gejala trikomoniasis pada pria dan wanita?",
    variants: [
      "tanda-tanda trikomoniasis",
      "ciri-ciri trikomonas",
      "gejala trichomonas vaginalis",
      "keluhan trikomoniasis",
      "perbedaan gejala triko pada pria dan wanita"
    ],
    answer: "Gejala trikomoniasis bisa berbeda pada pria dan wanita:\n\n👩 **Wanita**:\n✅ Keputihan berbusa berwarna kuning kehijauan\n✅ Bau tidak sedap\n✅ Gatal atau iritasi pada vagina\n✅ Rasa nyeri saat buang air kecil atau berhubungan seksual\n\n👨 **Pria**:\n✅ Keluarnya cairan dari penis\n✅ Rasa terbakar setelah buang air kecil atau ejakulasi\n✅ Iritasi ringan atau tidak ada gejala sama sekali",
    formattedAnswer: "Gejala: Wanita: Keputihan hijau/kuning berbusa & berbau, gatal, nyeri. Pria: Sering tanpa gejala, kadang cairan penis atau rasa terbakar.",
    category: "Trikomoniasis"
  },
  {
    question: "Apakah trikomoniasis bisa menyebabkan komplikasi?",
    variants: [
      "komplikasi trikomoniasis",
      "bahaya trikomonas",
      "dampak trikomoniasis tidak diobati",
      "risiko trikomoniasis",
      "apakah triko berbahaya"
    ],
    answer: "⚠️ Ya. Jika tidak diobati, trikomoniasis dapat meningkatkan risiko:\n\n- Terinfeksi atau menularkan HIV\n- Kelahiran prematur atau berat badan bayi rendah pada ibu hamil\n- Radang saluran kemih atau kelamin\n\nOleh karena itu, penting untuk mendeteksi dan mengobatinya sesegera mungkin.",
    formattedAnswer: "Ya. Dapat meningkatkan risiko tertular/menularkan HIV, persalinan prematur, dan radang panggul.",
    category: "Trikomoniasis"
  },
  {
    question: "Bagaimana cara mendeteksi trikomoniasis?",
    variants: [
      "tes trikomoniasis",
      "diagnosis trikomonas",
      "pemeriksaan trichomonas",
      "cara mengetahui triko",
      "deteksi parasit trikomonas"
    ],
    answer: "🔍 Trikomoniasis dapat dideteksi melalui:\n\n✅ Pemeriksaan mikroskopis cairan vagina atau uretra\n✅ Kultur parasit\n✅ Tes antigen atau PCR (lebih akurat)\n\nPemeriksaan bisa dilakukan di klinik kesehatan atau laboratorium.",
    formattedAnswer: "Deteksi: Pemeriksaan mikroskopis sampel vagina/uretra, kultur, atau tes PCR (lebih akurat).",
    category: "Trikomoniasis"
  },
  {
    question: "Apakah trikomoniasis bisa disembuhkan?",
    variants: [
      "pengobatan trikomoniasis",
      "obat untuk trikomonas",
      "penyembuhan trichomonas",
      "antibiotik trikomoniasis",
      "apakah triko bisa diobati"
    ],
    answer: "✅ Ya, trikomoniasis bisa disembuhkan dengan antibiotik, biasanya metronidazole atau tinidazole. Pasangan seksual juga harus diobati meskipun tidak memiliki gejala, untuk mencegah infeksi ulang.",
    formattedAnswer: "Ya, bisa disembuhkan dengan antibiotik (Metronidazole atau Tinidazole). Pasangan harus diobati bersamaan.",
    category: "Trikomoniasis"
  },
  {
    question: "Apakah trikomoniasis bisa kambuh?",
    variants: [
      "kekambuhan trikomoniasis",
      "reinfeksi trikomonas",
      "apakah triko bisa datang lagi",
      "pencegahan trikomoniasis kambuh",
      "treatment failure trikomoniasis"
    ],
    answer: "🔁 Ya, trikomoniasis bisa kambuh jika:\n\n- Pasangan tidak ikut diobati\n- Tidak menyelesaikan pengobatan sesuai resep\n- Terinfeksi kembali dari pasangan lain yang terinfeksi\n\nPenting untuk tes ulang sekitar 3 bulan setelah pengobatan selesai.",
    formattedAnswer: "Ya, bisa kambuh jika pasangan tidak diobati, pengobatan tidak tuntas, atau terinfeksi lagi. Tes ulang dianjurkan dalam 3 bulan.",
    category: "Trikomoniasis"
  },
  {
    question: "Bagaimana cara mengobati Penyakit Menular Seksual?",
    variants: [
      "pengobatan penyakit menular seksual",
      "terapi untuk Penyakit Menular Seksual",
      "cara menyembuhkan Penyakit Menular Seksual",
      "penanganan infeksi menular seksual",
      "langkah mengobati IMS"
    ],
    answer: "Pengobatan penyakit menular seksual (Penyakit Menular Seksual) tergantung pada jenis infeksi yang diderita. Beberapa Penyakit Menular Seksual dapat disembuhkan dengan antibiotik, sementara lainnya memerlukan perawatan jangka panjang. Umumnya, langkah-langkah pengobatan meliputi:\n\n🔹 Konsultasi ke dokter atau klinik kesehatan seksual  \n🔹 Melakukan tes untuk memastikan jenis Penyakit Menular Seksual  \n🔹 Mengikuti resep obat dari dokter (seperti antibiotik atau antivirus)  \n🔹 Menyelesaikan seluruh dosis obat meskipun gejala sudah hilang  \n🔹 Tidak berhubungan seksual hingga pengobatan selesai dan dinyatakan sembuh",
    formattedAnswer: "Pengobatan Penyakit Menular Seksual: 1. Konsultasi dokter, 2. Tes untuk diagnosis, 3. Minum obat sesuai resep (antibiotik/antivirus) sampai tuntas, 4. Tidak berhubungan seks selama pengobatan.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa sembuh sendiri?",
    variants: [
      "apakah Penyakit Menular Seksual bisa hilang sendiri",
      "self-limiting Penyakit Menular Seksual",
      "risiko tidak mengobati Penyakit Menular Seksual",
      "apakah boleh tidak mengobati Penyakit Menular Seksual",
      "komplikasi tidak mengobati Penyakit Menular Seksual"
    ],
    answer: "Tidak semua Penyakit Menular Seksual bisa sembuh sendiri. Beberapa infeksi seperti klamidia atau gonore bisa memburuk jika tidak diobati. Bahkan Penyakit Menular Seksual yang tampak sembuh bisa tetap aktif di dalam tubuh dan menimbulkan komplikasi serius seperti:\n\n⚠️ Infertilitas  \n⚠️ Infeksi panggul  \n⚠️ Risiko penularan ke orang lain  \n⚠️ Penyakit kronis seperti HIV\n\nOleh karena itu, penting untuk segera memeriksakan diri dan mendapatkan pengobatan yang tepat.",
    formattedAnswer: "TIDAK. Kebanyakan Penyakit Menular Seksual tidak sembuh sendiri dan bisa jadi lebih parah, menyebabkan kemandulan, nyeri kronis, atau meningkatkan risiko HIV. Selalu obati.",
    category: null
  },
  {
    question: "risiko obat Penyakit Menular Seksual tanpa diagnosa?",
    variants: [
      "obat Penyakit Menular Seksual bebas",
      "pengobatan Penyakit Menular Seksual tanpa resep dokter",
      "apakah aman self-treatment Penyakit Menular Seksual",
      "risiko obat Penyakit Menular Seksual tanpa diagnosa",
      "haruskah ke dokter untuk Penyakit Menular Seksual"
    ],
    answer: "Beberapa obat untuk mengatasi gejala Penyakit Menular Seksual tersedia bebas, namun **pengobatan utama untuk Penyakit Menular Seksual memerlukan diagnosis dan resep dari dokter**. Mengobati sendiri tanpa mengetahui jenis infeksinya bisa menyebabkan:\n\n❌ Penyakit tidak sembuh  \n❌ Efek samping obat yang salah  \n❌ Penyebaran infeksi ke orang lain\n\nSelalu konsultasikan ke tenaga medis profesional sebelum membeli atau mengonsumsi obat Penyakit Menular Seksual.",
    formattedAnswer: "TIDAK DISARANKAN. Pengobatan Penyakit Menular Seksual membutuhkan diagnosis pasti oleh dokter. Obat yang salah bisa sebabkan resistensi antibiotik dan komplikasi.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa sembuh total?",
    variants: [
      "penyembuhan total Penyakit Menular Seksual",
      "apakah semua Penyakit Menular Seksual bisa disembuhkan",
      "perbedaan Penyakit Menular Seksual bakteri dan virus",
      "Penyakit Menular Seksual yang bisa dan tidak bisa disembuhkan",
      "prognosis Penyakit Menular Seksual"
    ],
    answer: "Beberapa Penyakit Menular Seksual bisa sembuh total, terutama yang disebabkan oleh bakteri seperti:\n\n✅ Klamidia  \n✅ Gonore  \n✅ Sifilis (jika ditangani sejak dini)\n\nNamun, ada juga Penyakit Menular Seksual yang tidak bisa sembuh total tetapi dapat dikontrol, seperti:\n\n🔸 HIV  \n🔸 Herpes genital  \n🔸 HPV\n\nPengobatan dan manajemen jangka panjang dapat membantu penderita hidup sehat dan menurunkan risiko penularan.",
    formattedAnswer: "Penyakit Menular Seksual bakteri (seperti klamidia, gonore, sifilis) bisa disembuhkan total. Penyakit Menular Seksual virus (seperti HIV, herpes, HPV) tidak bisa disembuhkan tetapi bisa dikendalikan.",
    category: null
  },
  {
    question: "Apakah saya harus berhenti berhubungan seksual selama pengobatan?",
    variants: [
      "pantangan seks selama pengobatan Penyakit Menular Seksual",
      "abstinensi pengobatan Penyakit Menular Seksual",
      "kapan boleh berhubungan lagi setelah obati Penyakit Menular Seksual",
      "mencegah reinfeksi Penyakit Menular Seksual",
      "perlunya pengobatan pasangan"
    ],
    answer: "Ya, **sangat disarankan untuk tidak berhubungan seksual selama proses pengobatan Penyakit Menular Seksual**. Hal ini untuk mencegah:\n\n🚫 Penularan ke pasangan  \n🚫 Infeksi ulang (reinfection)  \n🚫 Gangguan proses penyembuhan\n\nTunggulah hingga dinyatakan sembuh oleh dokter sebelum kembali berhubungan seksual.",
    formattedAnswer: "YA, mutlak. Hindari semua jenis hubungan seksual hingga pengobatan tuntas dan dokter menyatakan Anda sembuh. Pasangan juga harus diobati.",
    category: null
  },
  {
    question: "Bagaimana cara mencegah tertular Penyakit Menular Seksual?",
    variants: [
      "pencegahan penyakit menular seksual",
      "tips hindari Penyakit Menular Seksual",
      "cara agar tidak kena Penyakit Menular Seksual",
      "proteksi dari IMS",
      "langkah-langkah pencegahan Penyakit Menular Seksual"
    ],
    answer: "🔹 Gunakan kondom setiap berhubungan seks\n🔹 Hindari berganti pasangan\n🔹 Rutin tes Penyakit Menular Seksual bersama pasangan\n🔹 Jaga kebersihan alat kelamin",
    formattedAnswer: "Pencegahan: 1. Gunakan kondom lateks secara konsisten & benar. 2. Setia pada satu pasangan. 3. Skrining Penyakit Menular Seksual rutin. 4. Vaksinasi (HPV, Hepatitis B).",
    category: null
  },
  {
    question: "Apakah vaksin bisa mencegah Penyakit Menular Seksual?",
    variants: [
      "vaksin untuk pencegahan Penyakit Menular Seksual",
      "imunisasi HPV dan Hepatitis B",
      "efektivitas vaksin terhadap Penyakit Menular Seksual",
      "jenis vaksin untuk Penyakit Menular Seksual",
      "apakah ada vaksin untuk herpes"
    ],
    answer: "✅ Ya, tapi hanya untuk jenis tertentu (contoh: HPV dan Hepatitis B). Tidak semua Penyakit Menular Seksual bisa dicegah dengan vaksin.",
    formattedAnswer: "Ya, untuk Penyakit Menular Seksual tertentu. Vaksin HPV cegah kanker serviks & kutil kelamin. Vaksin Hepatitis B cegah hepatitis B. Tidak ada vaksin untuk Penyakit Menular Seksual lain seperti HIV/herpes.",
    category: null
  },
  {
    question: "Seberapa efektif kondom dalam mencegah Penyakit Menular Seksual?",
    variants: [
      "efektivitas kondom terhadap Penyakit Menular Seksual",
      "perlindungan kondom dari IMS",
      "apakah kondom aman dari Penyakit Menular Seksual",
      "persentase kondom cegah Penyakit Menular Seksual",
      "penggunaan kondom yang benar untuk pencegahan"
    ],
    answer: "⚡ Efektifitas 98% jika digunakan dengan benar. Namun tidak 100% aman karena bisa robek atau terlepas.",
    formattedAnswer: "Sangat efektif (>98%) jika digunakan dengan benar, konsisten, dan dari awal hingga akhir hubungan. Tidak melindungi area kulit yang tidak tertutup.",
    category: null
  },
  {
    question: "Apakah saya masih bisa tertular meskipun pasangan saya tidak punya gejala?",
    variants: [
      "penularan Penyakit Menular Seksual asimtomatik",
      "risiko dari pasangan tanpa gejala",
      "silent spread of STIs",
      "apakah aman jika pasangan tampak sehat",
      "pentingnya tes rutin meski tanpa gejala"
    ],
    answer: "⚠️ YA! Banyak Penyakit Menular Seksual yang tidak menunjukkan gejala (asimtomatik) tapi tetap menular.",
    formattedAnswer: "YA, sangat mungkin. Banyak Penyakit Menular Seksual (seperti klamidia, HPV, herpes) sering tanpa gejala tetapi sangat menular.",
    category: null
  },
  {
    question: "Apakah saya perlu rutin tes Penyakit Menular Seksual jika tidak berganti pasangan?",
    variants: [
      "skrining Penyakit Menular Seksual untuk pasangan tetap",
      "pentingnya tes rutin Penyakit Menular Seksual",
      "kapan harus tes Penyakit Menular Seksual",
      "frekuensi tes penyakit menular seksual",
      "tes Penyakit Menular Seksual sebelum menikah"
    ],
    answer: "🔍 Disarankan, terutama jika:\n- Pasangan punya riwayat Penyakit Menular Seksual\n- Ada gejala tidak biasa\n- Sebelum menikah/hamil\n- Setiap 6-12 bulan untuk skrining rutin",
    formattedAnswer: "Ya, dianjurkan. Skrining rutin (setahun sekali) penting bahkan dalam hubungan monogami, apalagi sebelum kehamilan atau jika ada gejala.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa memengaruhi kehamilan?",
    variants: [
      "dampak Penyakit Menular Seksual pada kehamilan",
      "risiko Penyakit Menular Seksual untuk ibu hamil dan janin",
      "kehamilan dengan Penyakit Menular Seksual",
      "komplikasi kehamilan akibat Penyakit Menular Seksual",
      "apakah Penyakit Menular Seksual menyebabkan keguguran"
    ],
    answer: "Ya, beberapa jenis Penyakit Menular Seksual dapat memengaruhi kehamilan dan membahayakan ibu maupun janin. Infeksi seperti sifilis, klamidia, dan gonore dapat menyebabkan komplikasi seperti:\n\n🔹 Keguguran\n🔹 Kelahiran prematur\n🔹 Infeksi pada bayi saat persalinan\n🔹 Berat badan lahir rendah",
    formattedAnswer: "Ya, sangat bisa. Penyakit Menular Seksual dapat menyebabkan keguguran, kelahiran prematur, berat badan lahir rendah, dan infeksi serius pada bayi.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa ditularkan ke bayi?",
    variants: [
      "penularan Penyakit Menular Seksual dari ibu ke anak",
      "transmisi vertikal Penyakit Menular Seksual",
      "bayi tertular Penyakit Menular Seksual dari ibu",
      "pencegahan penularan Penyakit Menular Seksual ke bayi",
      "risiko pada bayi yang lahir dari ibu dengan Penyakit Menular Seksual"
    ],
    answer: "Ya, beberapa Penyakit Menular Seksual bisa ditularkan dari ibu ke bayi selama kehamilan, saat persalinan, atau melalui ASI. Penularan ini disebut juga transmisi vertikal. Contohnya:\n\n🔹 HIV\n🔹 Sifilis\n🔹 Hepatitis B\n🔹 Herpes simpleks\n🔹 Klamidia dan gonore (saat lahir melalui jalan lahir)",
    formattedAnswer: "Ya, disebut transmisi vertikal. HIV, sifilis, hepatitis B, herpes, klamidia, dan gonore dapat menular ke bayi selama hamil, persalinan, atau menyusui.",
    category: null
  },
  {
    question: "Apakah ibu hamil bisa melakukan pengobatan Penyakit Menular Seksual?",
    variants: [
      "pengobatan Penyakit Menular Seksual saat hamil",
      "keamanan obat Penyakit Menular Seksual untuk ibu hamil",
      "penanganan Penyakit Menular Seksual pada kehamilan",
      "apakah antibiotik untuk Penyakit Menular Seksual aman untuk janin",
      "konsultasi dokter kandungan untuk Penyakit Menular Seksual"
    ],
    answer: "Bisa. Banyak jenis Penyakit Menular Seksual dapat diobati selama kehamilan dengan obat yang aman untuk ibu dan janin. Sangat penting untuk segera berkonsultasi ke dokter agar mendapatkan penanganan yang tepat dan mencegah komplikasi pada bayi.",
    formattedAnswer: "Bisa dan harus! Banyak obat Penyakit Menular Seksual yang aman untuk ibu hamil. Pengobatan tepat waktu melindungi ibu dan bayi dari komplikasi serius.",
    category: null
  },
  {
    question: "Apakah wanita hamil harus tes Penyakit Menular Seksual?",
    variants: [
      "skrining Penyakit Menular Seksual untuk ibu hamil",
      "tes wajib untuk bumil",
      "pentingnya tes Penyakit Menular Seksual saat hamil",
      "pemeriksaan antenatal untuk Penyakit Menular Seksual",
      "kapan bumil tes Penyakit Menular Seksual"
    ],
    answer: "Ya, tes Penyakit Menular Seksual sangat dianjurkan bagi wanita hamil, terutama pada trimester pertama. Ini penting untuk:\n\n🔹 Mengetahui infeksi sejak dini\n🔹 Mencegah penularan ke janin\n🔹 Memberikan pengobatan lebih cepat\n\nPemeriksaan biasanya mencakup HIV, sifilis, hepatitis B, dan klamidia.",
    formattedAnswer: "Ya, sangat dianjurkan (biasanya di trimester pertama). Skrining untuk HIV, sifilis, hepatitis B, dan klamidia adalah standar.",
    category: null
  },
  {
    question: "Bagaimana cara memberi tahu pasangan bahwa saya punya Penyakit Menular Seksual?",
    variants: [
      "cara komunikasi punya Penyakit Menular Seksual ke pasangan",
      "tips bicara soal Penyakit Menular Seksual dengan pacar",
      "memberitahu diagnosis Penyakit Menular Seksual",
      "diskusi kesehatan seksual dengan pasangan",
      "menghadapi reaksi pasangan tentang Penyakit Menular Seksual"
    ],
    answer: "💬 Komunikasikan dengan jujur dan terbuka, pilih waktu yang tepat, siapkan informasi tentang Penyakit Menular Seksual, dan tawarkan solusi bersama.",
    formattedAnswer: "1. Pilih waktu & tempat tenang. 2. Gunakan bahasa yang jelas & jujur. 3. Siapkan informasi faktual. 4. Tawarkan solusi (tes & pengobatan bersama). 5. Bersiaplah untuk berbagai reaksi.",
    category: null
  },
  {
    question: "Apakah saya tetap bisa menikah jika punya HIV?",
    variants: [
      "pernikahan dengan ODHA",
      "hidup berkeluarga dengan HIV",
      "risiko penularan HIV dalam pernikahan",
      "U=U untuk pasangan menikah",
      "cara aman berumah tangga dengan HIV"
    ],
    answer: "✅ Ya, dengan pengobatan ARV yang tepat, risiko penularan bisa diminimalkan. Penting untuk diskusi terbuka dengan pasangan dan dokter.",
    formattedAnswer: "Ya, pasti bisa. Dengan pengobatan ARV yang rutin sehingga viral load tidak terdeteksi (U=U), risiko penularan ke pasangan hampir nol.",
    category: null
  },
  {
    question: "Bagaimana cara menjelaskan ke pasangan soal pentingnya tes Penyakit Menular Seksual?",
    variants: [
      "mengajak pasangan tes Penyakit Menular Seksual",
      "edukasi pasangan tentang skrining Penyakit Menular Seksual",
      "alasan penting tes berdua",
      "komunikasi untuk tes kesehatan bersama",
      "meyakinkan pasangan untuk tes"
    ],
    answer: "📢 Tekankan bahwa tes Penyakit Menular Seksual adalah: \n- 🛡️ Bentuk perlindungan bersama \n- ❤️ Bukti komitmen pada kesehatan pasangan \n- 🔍 Deteksi dini = pengobatan lebih mudah",
    formattedAnswer: "Jelaskan bahwa tes bersama adalah: 1. Bentuk tanggung jawab & cinta kepada pasangan. 2. Untuk ketenangan pikiran bersama. 3. Deteksi dini membuat pengobatan lebih mudah & murah.",
    category: null
  },
  {
    question: "Apakah remaja juga bisa terkena Penyakit Menular Seksual?",
    variants: [
      "Penyakit Menular Seksual pada remaja",
      "risiko Penyakit Menular Seksual untuk anak muda",
      "usia berapa bisa kena Penyakit Menular Seksual",
      "edukasi Penyakit Menular Seksual untuk remaja",
      "vulnerabilitas remaja terhadap Penyakit Menular Seksual"
    ],
    answer: "Ya, remaja (terutama perempuan) bisa mengalami Penyakit Menular Seksual (Pre-Menstrual Syndrome) setelah mulai menstruasi. 🩸",
    formattedAnswer: "Pertanyaan ambigu. 'Penyakit Menular Seksual' bisa berarti Pre-Menstrual Syndrome (gejala sebelum haid) yang dialami remaja putri. Atau 'Penyakit Menular Seksual' yang bisa dialami remaja yang sudah aktif secara seksual.",
    category: null
  },
  {
    question: "Apakah penting memberikan edukasi Penyakit Menular Seksual sejak usia muda?",
    variants: [
      "pentingnya edukasi seks untuk remaja",
      "pencegahan Penyakit Menular Seksual melalui edukasi dini",
      "manfaat pendidikan kesehatan reproduksi",
      "mengajarkan tentang Penyakit Menular Seksual ke anak remaja",
      "kapan mulai edukasi Penyakit Menular Seksual"
    ],
    answer: "Sangat penting! Edukasi dini membantu remaja: 💡\n- Memahami perubahan tubuh\n- Mengelola gejala dengan baik\n- Menghindari mitos/miskonsepsi\n- Mempersiapkan diri secara mental",
    formattedAnswer: "Sangat penting! Edukasi dini melindungi remaja dari: 1. Risiko Penyakit Menular Seksual & kehamilan tidak direncanakan. 2. Misinformasi. 3. Stigma. 4. Membantu mereka membuat keputusan sehat.",
    category: null
  },
  {
    question: "Bagaimana cara menjelaskan Penyakit Menular Seksual kepada anak remaja?",
    variants: [
      "tips bicara Penyakit Menular Seksual dengan remaja",
      "bahasa yang tepat untuk edukasi Penyakit Menular Seksual",
      "pendekatan edukasi seks untuk remaja",
      "materi edukasi Penyakit Menular Seksual untuk anak muda",
      "peran orang tua dalam edukasi Penyakit Menular Seksual"
    ],
    answer: "Gunakan pendekatan sederhana dan empati: 🌸\n1. Jelaskan bahwa Penyakit Menular Seksual wajar terjadi sebelum menstruasi\n2. Sebut gejala umum (mood swing, kram)\n3. Tekankan bahwa ini bukan penyakit\n4. Ajarkan cara meredakan gejala (istirahat, kompres hangat)\n5. Dorong untuk konsultasi jika gejala berat",
    formattedAnswer: "1. Gunakan bahasa yang jelas & ilmiah. 2. Jelaskan secara faktual tentang cara penularan & pencegahan. 3. Tekankan pentingnya komunikasi terbuka dengan orang tua/dokter. 4. Hilangkan rasa malu & rasa bersalah. 5. Sediakan sumber informasi yang terpercaya.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual hanya bisa menular lewat seks bebas?",
    variants: [
      "mitos penularan Penyakit Menular Seksual",
      "apakah Penyakit Menular Seksual hanya untuk yang sering ganti pasangan",
      "penularan Penyakit Menular Seksual dalam hubungan monogami",
      "stigma tentang Penyakit Menular Seksual",
      "mematahkan mitos Penyakit Menular Seksual"
    ],
    answer: "Tidak. Penyakit Menular Seksual bisa menular melalui berbagai jenis aktivitas seksual, termasuk:\n    \n🔹 Hubungan seksual dengan pasangan tetap yang terinfeksi  \n🔹 Seks oral atau anal  \n🔹 Berbagi jarum suntik  \n🔹 Dari ibu ke bayi saat melahirkan atau menyusui\n\nJadi, tidak hanya seks bebas yang berisiko menularkan Penyakit Menular Seksual.",
    formattedAnswer: "TIDAK. Penyakit Menular Seksual bisa menular pada siapapun yang aktif seksual, bahkan dalam hubungan monogami, jika salah satu pasangan terinfeksi. Juga melalui jarum suntik dan dari ibu ke bayi.",
    category: null
  },
  {
    question: "Apakah orang yang tampak sehat pasti bebas dari Penyakit Menular Seksual?",
    variants: [
      "Penyakit Menular Seksual asimtomatik",
      "kenapa orang sehat bisa menularkan Penyakit Menular Seksual",
      "silent carrier Penyakit Menular Seksual",
      "penampilan luar vs status kesehatan",
      "pentingnya tes bukan hanya melihat gejala"
    ],
    answer: "Tidak. Banyak orang dengan Penyakit Menular Seksual tidak menunjukkan gejala apa pun, terutama di tahap awal. Mereka bisa terlihat sehat tetapi tetap bisa menularkan penyakitnya. Oleh karena itu, tes rutin sangat penting untuk mengetahui status kesehatan seksual.",
    formattedAnswer: "TIDAK. Banyak Penyakit Menular Seksual tidak bergejala (asimtomatik). Seseorang bisa terlihat sangat sehat tetapi membawa dan menularkan Penyakit Menular Seksual. Tes adalah satu-satunya cara pasti.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual hanya dialami oleh pekerja seks?",
    variants: [
      "stigma Penyakit Menular Seksual dan profesi",
      "apakah hanya pekerja seks yang kena Penyakit Menular Seksual",
      "Penyakit Menular Seksual pada semua kalangan",
      "mematahkan stereotip Penyakit Menular Seksual",
      "siapa saja yang bisa kena Penyakit Menular Seksual"
    ],
    answer: "Tidak. Siapa pun yang aktif secara seksual bisa terkena Penyakit Menular Seksual, tidak peduli status sosial, profesi, atau jumlah pasangan. Risiko meningkat jika:\n\n🔹 Tidak menggunakan kondom  \n🔹 Sering berganti pasangan  \n🔹 Tidak pernah tes Penyakit Menular Seksual  \n🔹 Berhubungan seksual dengan orang yang tidak diketahui status kesehatannya\n\nJadi, Penyakit Menular Seksual bukan hanya masalah pekerja seks, tapi bisa dialami oleh siapa saja.",
    formattedAnswer: "TIDAK. Siapa pun yang pernah berhubungan seksual bisa terkena Penyakit Menular Seksual, terlepas dari jenis kelamin, orientasi seksual, usia, atau profesi. Ini masalah kesehatan, bukan moral.",
    category: null
  },
  {
    question: "Apakah pria tidak perlu khawatir soal Penyakit Menular Seksual?",
    variants: [
      "Penyakit Menular Seksual pada pria",
      "apakah pria kebal Penyakit Menular Seksual",
      "risiko Penyakit Menular Seksual untuk laki-laki",
      "gejala Penyakit Menular Seksual pada pria",
      "pentingnya kesadaran Penyakit Menular Seksual untuk pria"
    ],
    answer: "Pria tetap perlu waspada terhadap Penyakit Menular Seksual. Meski gejalanya bisa lebih ringan atau tidak terasa, pria tetap bisa:\n\n🔹 Menularkan Penyakit Menular Seksual ke pasangan  \n🔹 Mengalami komplikasi kesehatan (misalnya infertilitas, nyeri, atau infeksi lainnya)  \n🔹 Membawa virus tanpa sadar\n\nPemeriksaan rutin dan edukasi sangat penting untuk pria juga.",
    formattedAnswer: "SANGAT PERLU. Pria bisa tertular, menularkan, dan mengalami komplikasi Penyakit Menular Seksual (seperti kemandulan, kanker). Pria sering tanpa gejala jadi bisa menjadi 'silent carrier'.",
    category: null
  },
  {
    question: "Apa itu penyakit menular seksual (Penyakit Menular Seksual)?",
    variants: [
      "definisi Penyakit Menular Seksual",
      "pengertian penyakit menular seksual",
      "apa yang dimaksud IMS",
      "arti Penyakit Menular Seksual",
      "penjelasan singkat Penyakit Menular Seksual"
    ],
    answer: "Penyakit menular seksual (Penyakit Menular Seksual) adalah infeksi yang ditularkan melalui hubungan seksual, termasuk hubungan vaginal, anal, dan oral. Penyakit Menular Seksual dapat disebabkan oleh bakteri, virus, atau parasit.",
    formattedAnswer: "Penyakit Menular Seksual (Penyakit Menular Seksual) atau IMS (Infeksi Menular Seksual) adalah infeksi yang ditularkan terutama melalui hubungan seksual.",
    category: null
  },
  {
    question: "Apa saja jenis-jenis Penyakit Menular Seksual yang umum terjadi?",
    variants: [
      "daftar Penyakit Menular Seksual umum",
      "macam-macam penyakit menular seksual",
      "contoh-contoh Penyakit Menular Seksual",
      "jenis IMS yang sering ditemui",
      "penyakit apa saja yang termasuk Penyakit Menular Seksual"
    ],
    answer: "Jenis-jenis Penyakit Menular Seksual yang umum meliputi HIV/AIDS, sifilis, gonore, klamidia, herpes genital, HPV, dan trikomoniasis.",
    formattedAnswer: "Penyakit Menular Seksual Umum: Klamidia, Gonore (Kencing Nanah), Sifilis (Raja Singa), Herpes Genital, HIV/AIDS, HPV (Kutil Kelamin & Kanker), Trikomoniasis.",
    category: null
  },
  {
    question: "apa saja jenis-jenis Penyakit Menular Seksual yang umum terjadi?",
    variants: [
      "jenis Penyakit Menular Seksual yang umum",
      "Penyakit Menular Seksual yang sering terjadi",
      "common STIs",
      "list penyakit menular seksual",
      "infeksi menular seksual yang umum"
    ],
    answer: "Jenis-jenis Penyakit Menular Seksual yang umum meliputi HIV/AIDS, sifilis, gonore, klamidia, herpes genital, HPV, dan trikomoniasis.",
    formattedAnswer: "Penyakit Menular Seksual Umum: Klamidia, Gonore, Sifilis, Herpes Genital, HIV, HPV, Trikomoniasis, Hepatitis B.",
    category: null
  },
  {
    question: "jenis-jenis Penyakit Menular Seksual",
    variants: [
      "list Penyakit Menular Seksual",
      "macam macam Penyakit Menular Seksual",
      "varietas penyakit menular seksual",
      "kategori Penyakit Menular Seksual",
      "apa saja Penyakit Menular Seksual"
    ],
    answer: "Jenis-jenis Penyakit Menular Seksual yang umum meliputi HIV/AIDS, sifilis, gonore, klamidia, herpes genital, HPV, dan trikomoniasis.",
    formattedAnswer: "Jenis Penyakit Menular Seksual: Bakteri (Klamidia, Gonore, Sifilis). Virus (HIV, Herpes, HPV, Hepatitis B). Parasit (Trikomoniasis).",
    category: null
  },
  {
    question: "jenis-jenis Penyakit Menular Seksual apa saja?",
    variants: [
      "Penyakit Menular Seksual apa aja",
      "sebutkan jenis Penyakit Menular Seksual",
      "nama-nama penyakit menular seksual",
      "berapa banyak jenis Penyakit Menular Seksual",
      "klasifikasi Penyakit Menular Seksual"
    ],
    answer: "Jenis-jenis Penyakit Menular Seksual yang umum meliputi HIV/AIDS, sifilis, gonore, klamidia, herpes genital, HPV, dan trikomoniasis.",
    formattedAnswer: "Jenis Penyakit Menular Seksual: 1. Klamidia 2. Gonore 3. Sifilis 4. Herpes Genital 5. HIV 6. HPV 7. Trikomoniasis 8. Hepatitis B.",
    category: null
  },
  {
    question: "Bagaimana cara penularan Penyakit Menular Seksual?",
    variants: [
      "cara penyebaran Penyakit Menular Seksual",
      "moda transmisi IMS",
      "jalan penularan penyakit kelamin",
      "faktor risiko tertular Penyakit Menular Seksual",
      "aktivitas yang menularkan Penyakit Menular Seksual"
    ],
    answer: "Penyakit Menular Seksual dapat ditularkan melalui hubungan seksual tanpa kondom, penggunaan jarum suntik yang tidak steril, transfusi darah yang terkontaminasi, atau dari ibu ke bayi selama kehamilan atau persalinan.",
    formattedAnswer: "Penularan: Seks vaginal/anal/oral tanpa kondom, berbagi jarum suntik, transfusi darah terinfeksi, dari ibu ke bayi (hamil, persalinan, menyusui).",
    category: null
  },
  {
    question: "Gejala umum penyakit menular seksual?",
    variants: [
      "tanda-tanda umum Penyakit Menular Seksual",
      "ciri-ciri terkena Penyakit Menular Seksual",
      "keluhan yang dirasakan penderita Penyakit Menular Seksual",
      "gejala awal IMS",
      "manifestasi klinis Penyakit Menular Seksual"
    ],
    answer: "Gejalanya bervariasi tergantung jenis Penyakit Menular Seksual, namun gejala umum meliputi nyeri saat buang air kecil, keputihan yang tidak normal, luka atau lepuhan di area genital, gatal atau iritasi, dan pembengkakan kelenjar getah bening.",
    formattedAnswer: "Gejala Umum: Nyeri saat kencing, keputihan abnormal, luka/lepuh/ruam di kelamin, gatal, nyeri panggul, pembengkakan kelenjar getah bening. Sering tanpa gejala.",
    category: "gejala"
  },
  {
    question: "Bisakah Penyakit Menular Seksual tidak menunjukkan gejala?",
    variants: [
      "Penyakit Menular Seksual asimtomatik",
      "apakah ada Penyakit Menular Seksual tanpa gejala",
      "silent infection Penyakit Menular Seksual",
      "kenapa Penyakit Menular Seksual tidak bergejala",
      "bahaya Penyakit Menular Seksual tanpa gejala"
    ],
    answer: "Ya, beberapa Penyakit Menular Seksual seperti klamidia dan HPV sering kali tidak menunjukkan gejala, sehingga seseorang bisa menularkannya tanpa menyadarinya.",
    formattedAnswer: "Ya, sangat sering. Klamidia, Gonore, HPV, Herpes, dan HIV seringkali tidak menunjukkan gejala sama sekali (asimtomatik).",
    category: null
  },
  {
    question: "Bagaimana cara mencegah Penyakit Menular Seksual?",
    variants: [
      "pencegahan IMS",
      "cara menghindari penyakit kelamin",
      "tips tidak tertular Penyakit Menular Seksual",
      "strategi pencegahan Penyakit Menular Seksual",
      "perlindungan dari Penyakit Menular Seksual"
    ],
    answer: "Pencegahan Penyakit Menular Seksual dapat dilakukan dengan menggunakan kondom saat berhubungan seksual, setia pada satu pasangan, tidak berbagi jarum suntik, dan menjalani tes Penyakit Menular Seksual secara rutin.",
    formattedAnswer: "Pencegahan: 1. Kondom (paling efektif). 2. Vaksinasi (HPV, Hep B). 3. Setia pada 1 pasangan. 4. Tidak berbagi jarum. 5. Skrining rutin. 6. PrEP untuk HIV.",
    category: null
  },
  {
    question: "Apakah semua Penyakit Menular Seksual bisa disembuhkan?",
    variants: [
      "keterobatan Penyakit Menular Seksual",
      "apakah ada Penyakit Menular Seksual yang tidak bisa disembuhkan",
      "permanennya infeksi Penyakit Menular Seksual",
      "prognosis penyakit menular seksual",
      "Penyakit Menular Seksual yang bisa dan tidak bisa diobati"
    ],
    answer: "Penyakit Menular Seksual yang disebabkan oleh bakteri seperti klamidia, gonore, dan sifilis bisa disembuhkan dengan antibiotik. Namun Penyakit Menular Seksual yang disebabkan oleh virus seperti HIV dan herpes tidak bisa disembuhkan, tapi dapat dikontrol dengan pengobatan.",
    formattedAnswer: "Tidak semua. Penyakit Menular Seksual bakteri (klamidia, gonore, sifilis) bisa disembuhkan. Penyakit Menular Seksual virus (HIV, herpes, HPV) tidak bisa disembuhkan tetapi bisa dikendalikan.",
    category: null
  },
  {
    question: "Apakah seseorang bisa terkena Penyakit Menular Seksual lebih dari sekali?",
    variants: [
      "reinfeksi Penyakit Menular Seksual",
      "apakah bisa kena Penyakit Menular Seksual berulang",
      "kekebalan terhadap Penyakit Menular Seksual",
      "tertular lagi setelah sembuh",
      "pencegahan infeksi ulang Penyakit Menular Seksual"
    ],
    answer: "Ya, meskipun sudah pernah sembuh dari Penyakit Menular Seksual tertentu, seseorang tetap bisa terinfeksi kembali jika melakukan hubungan seksual yang tidak aman.",
    formattedAnswer: "Ya. Sembuh dari Penyakit Menular Seksual (terutama bakteri) tidak memberikan kekebalan. Anda bisa terinfeksi ulang jenis yang sama lagi.",
    category: null
  },
  {
    question: "Apakah remaja bisa terkena Penyakit Menular Seksual?",
    variants: [
      "Penyakit Menular Seksual pada usia remaja",
      "risiko remaja tertular Penyakit Menular Seksual",
      "edukasi Penyakit Menular Seksual untuk anak muda",
      "kerentanan remaja terhadap IMS",
      "usia muda dan Penyakit Menular Seksual"
    ],
    answer: "Ya, remaja yang sudah aktif secara seksual memiliki risiko yang sama untuk tertular Penyakit Menular Seksual jika tidak melakukan hubungan seksual yang aman.",
    formattedAnswer: "Ya. Remaja yang aktif secara seksual memiliki risiko tertular Penyakit Menular Seksual yang sama seperti orang dewasa, bahkan lebih rentan secara biologis dan perilaku.",
    category: null
  },
  {
    question: "Apa yang harus dilakukan jika merasa terkena Penyakit Menular Seksual?",
    variants: [
      "langkah pertama jika curiga Penyakit Menular Seksual",
      "tindakan setelah terpapar Penyakit Menular Seksual",
      "haruskah ke dokter jika kena Penyakit Menular Seksual",
      "cara mengatasi kecurigaan Penyakit Menular Seksual",
      "akses pengobatan Penyakit Menular Seksual"
    ],
    answer: "Segera periksakan diri ke dokter atau layanan kesehatan untuk diagnosis dan pengobatan. Jangan melakukan hubungan seksual sampai pengobatan selesai dan infeksi sembuh.",
    formattedAnswer: "1. Segera ke dokter/klinik kesehatan seksual. 2. Jangan berhubungan seks. 3. Jangan mengobati sendiri. 4. Ajak pasangan untuk tes dan berobat. 5. Ikuti pengobatan hingga tuntas.",
    category: null
  },
  {
    question: "Apa itu HIV dan bagaimana cara penularannya?",
    variants: [
      "pengertian HIV",
      "cara penularan HIV",
      "definisi dan transmisi HIV",
      "human immunodeficiency virus",
      "risiko tertular HIV"
    ],
    answer: "HIV (Human Immunodeficiency Virus) adalah virus yang menyerang sistem kekebalan tubuh. Penularannya melalui cairan tubuh seperti darah, air mani, cairan vagina, dan ASI, biasanya melalui hubungan seksual tanpa kondom, jarum suntik, atau dari ibu ke bayi.",
    formattedAnswer: "HIV: Virus yang menyerang sistem kekebalan tubuh. Penularan: Seks tanpa kondom, berbagi jarum, dari ibu ke bayi.",
    category: null
  },
  {
    question: "Apa bedanya HIV dan AIDS?",
    variants: [
      "perbedaan HIV AIDS",
      "HIV vs AIDS",
      "stadium HIV menjadi AIDS",
      "apakah HIV sama dengan AIDS",
      "definisi AIDS"
    ],
    answer: "HIV adalah virusnya, sedangkan AIDS (Acquired Immunodeficiency Syndrome) adalah kondisi tahap akhir dari infeksi HIV ketika sistem imun sudah sangat lemah dan tidak bisa melawan infeksi lain.",
    formattedAnswer: "HIV adalah virus penyebabnya. AIDS adalah sindrom/keadaan ketika sistem imun sudah sangat rusak akibat HIV dan muncul penyakit oportunistik.",
    category: null
  },
  {
    question: "Apakah herpes genital bisa disembuhkan?",
    variants: [
      "penyembuhan herpes",
      "obat untuk herpes kelamin",
      "apakah herpes bisa hilang permanen",
      "manajemen herpes genital",
      "kekambuhan herpes"
    ],
    answer: "Herpes genital tidak bisa disembuhkan, tapi bisa dikontrol dengan pengobatan antivirus untuk mengurangi gejala dan risiko penularan.",
    formattedAnswer: "Tidak bisa disembuhkan total. Virusnya menetap seumur hidup. Obat antivirus dapat mengontrol gejala dan mengurangi kekambuhan & penularan.",
    category: null
  },
  {
    question: "Apa itu HPV dan kenapa penting untuk divaksinasi?",
    variants: [
      "pengertian HPV",
      "manfaat vaksin HPV",
      "pentingnya vaksinasi HPV",
      "HPV dan kanker serviks",
      "mencegah kanker dengan vaksin HPV"
    ],
    answer: "HPV (Human Papillomavirus) adalah virus yang bisa menyebabkan kutil kelamin dan kanker serviks. Vaksinasi HPV penting untuk mencegah infeksi dan komplikasi serius, terutama pada wanita.",
    formattedAnswer: "HPV: Virus penyebab kutil kelamin dan kanker (serviks, anus, tenggorokan). Vaksinasi penting untuk mencegah infeksi HPV dan kanker terkait.",
    category: null
  },
  {
    question: "Siapa saja yang sebaiknya menjalani tes Penyakit Menular Seksual secara rutin?",
    variants: [
      "target skrining Penyakit Menular Seksual",
      "kelompok yang perlu tes Penyakit Menular Seksual rutin",
      "indikasi tes penyakit menular seksual",
      "screening recommendations for STIs",
      "kapan dan siapa yang harus tes Penyakit Menular Seksual"
    ],
    answer: "Orang yang aktif secara seksual, memiliki pasangan lebih dari satu, atau berganti-ganti pasangan disarankan untuk rutin menjalani tes Penyakit Menular Seksual, minimal setahun sekali.",
    formattedAnswer: "Yang perlu skrining rutin: Yang aktif seksual & punya faktor risiko (pasangan baru, banyak pasangan, tidak pakai kondom, pria seks pria). Ibu hamil. Setiap orang yang merasa perlu.",
    category: null
  },
  {
    question: "Apakah penggunaan kondom 100% mencegah Penyakit Menular Seksual?",
    variants: [
      "efektivitas kondom",
      "perlindungan kondom dari Penyakit Menular Seksual",
      "apakah kondom menjamin aman",
      "kelemahan kondom",
      "cara meningkatkan efektivitas kondom"
    ],
    answer: "Kondom sangat efektif mengurangi risiko Penyakit Menular Seksual, tapi tidak 100% mencegah, karena beberapa infeksi seperti HPV atau herpes bisa menular melalui kontak kulit yang tidak tertutup kondom.",
    formattedAnswer: "Tidak 100%. Sangat efektif untuk Penyakit Menular Seksual yang menular melalui cairan (HIV, gonore, klamidia). Kurang efektif untuk yang menular melalui kulit (HPV, herpes).",
    category: null
  },
  {
    question: "Apa itu sifilis dan bagaimana gejalanya?",
    variants: [
      "pengertian sifilis",
      "tanda dan gejala sifilis",
      "stadium sifilis dan gejalanya",
      "penyakit raja singa",
      "ciri-ciri sifilis"
    ],
    answer: "Sifilis adalah infeksi bakteri yang ditandai dengan luka kecil di area genital atau mulut, ruam kulit, dan jika tidak diobati bisa merusak organ dalam tubuh. Gejalanya sering muncul bertahap.",
    formattedAnswer: "Sifilis: Penyakit Menular Seksual bakteri yang berjalan dalam stadium. Gejala: Luka tanpa sakit (stadium 1), ruam (stadium 2), tanpa gejala (laten), kerusakan organ (stadium 3).",
    category: null
  },
  {
    question: "Berapa lama Penyakit Menular Seksual mulai menunjukkan gejala setelah tertular?",
    variants: [
      "masa inkubasi Penyakit Menular Seksual",
      "kapan gejala Penyakit Menular Seksual muncul",
      "lama waktu sejak terpapar sampai bergejala",
      "periode inkubasi penyakit kelamin",
      "keterlambatan gejala Penyakit Menular Seksual"
    ],
    answer: "Tergantung jenis Penyakit Menular Seksual-nya, bisa dalam hitungan hari hingga minggu. Misalnya, klamidia bisa muncul dalam 1–3 minggu, sementara HIV bisa tidak bergejala selama bertahun-tahun.",
    formattedAnswer: "Bervariasi: Klamidia/Gonore: 1-3 minggu. Sifilis: 3 minggu-3 bulan. Herpes: 2-12 hari. HIV: Gejala awal 2-4 minggu, tapi bisa tanpa gejala tahunan.",
    category: null
  },
  {
    question: "Apakah bisa terkena Penyakit Menular Seksual meskipun hanya sekali berhubungan seksual?",
    variants: [
      "risiko sekali berhubungan seks",
      "apakah sekali saja bisa kena Penyakit Menular Seksual",
      "probabilitas tertular Penyakit Menular Seksual dari satu kali exposure",
      "mitos tentang frekuensi hubungan seks dan Penyakit Menular Seksual",
      "penularan Penyakit Menular Seksual dari single encounter"
    ],
    answer: "Ya, satu kali hubungan seksual tanpa pelindung sudah cukup untuk menularkan Penyakit Menular Seksual jika salah satu pasangan terinfeksi.",
    formattedAnswer: "Ya, bisa. Hanya butuh SATU KALI hubungan seks tanpa kondom dengan orang yang terinfeksi untuk tertular Penyakit Menular Seksual.",
    category: null
  },
  {
    question: "Apakah oral seks juga bisa menularkan Penyakit Menular Seksual?",
    variants: [
      "risiko oral seks",
      "Penyakit Menular Seksual dari seks oral",
      "penularan melalui mulut",
      "keamanan oral seks",
      "Penyakit Menular Seksual pada tenggorokan"
    ],
    answer: "Ya, beberapa Penyakit Menular Seksual seperti gonore, sifilis, herpes, dan HPV bisa ditularkan melalui oral seks.",
    formattedAnswer: "Ya. Gonore, Sifilis, Herpes, HPV, dan Klamidia dapat menular melalui seks oral, menyebabkan infeksi di tenggorokan atau mulut.",
    category: null
  },
  {
    question: "Bagaimana cara mengetahui apakah seseorang terkena Penyakit Menular Seksual?",
    variants: [
      "diagnosis Penyakit Menular Seksual",
      "cara memastikan terkena Penyakit Menular Seksual",
      "tes untuk mengetahui Penyakit Menular Seksual",
      "konfirmasi infeksi menular seksual",
      "alat tes Penyakit Menular Seksual"
    ],
    answer: "Cara paling akurat adalah dengan tes laboratorium, seperti tes darah, urine, atau swab dari area genital, tergantung jenis Penyakit Menular Seksual yang dicurigai.",
    formattedAnswer: "Satu-satunya cara pasti adalah dengan TES di fasilitas kesehatan: tes darah, urine, atau usap (swab) pada area yang dicurigai.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa memengaruhi kesuburan?",
    variants: [
      "dampak Penyakit Menular Seksual pada fertilitas",
      "Penyakit Menular Seksual penyebab kemandulan",
      "infeksi menular seksual dan infertilitas",
      "risiko mandul karena Penyakit Menular Seksual",
      "pencegahan infertilitas akibat Penyakit Menular Seksual"
    ],
    answer: "Ya, Penyakit Menular Seksual seperti klamidia dan gonore yang tidak diobati dapat menyebabkan komplikasi seperti radang panggul dan infertilitas (kemandulan).",
    formattedAnswer: "Ya, sangat bisa. Klamidia dan Gonore yang tidak diobati adalah penyebab utama penyakit radang panggul (PID) dan kemandulan pada wanita.",
    category: null
  },
  {
    question: "Apakah wanita lebih rentan terkena Penyakit Menular Seksual dibanding pria?",
    variants: [
      "kerentanan wanita terhadap Penyakit Menular Seksual",
      "perbedaan biologis risiko Penyakit Menular Seksual",
      "apakah wanita更容易得性病",
      "fisiologi wanita dan Penyakit Menular Seksual",
      "risiko Penyakit Menular Seksual berdasarkan gender"
    ],
    answer: "Secara biologis, wanita memang lebih mudah terinfeksi Penyakit Menular Seksual karena struktur organ reproduksi yang lebih terbuka dan rentan.",
    formattedAnswer: "Secara biologis, YA. Area genital wanita lebih luas dan lembab, sehingga lebih rentan terpapar dan terinfeksi pathogen Penyakit Menular Seksual.",
    category: null
  },
  {
    question: "Bisakah wanita hamil jika terkena Penyakit Menular Seksual?",
    variants: [
      "kesuburan dengan Penyakit Menular Seksual",
      "hamil saat punya Penyakit Menular Seksual",
      "apakah Penyakit Menular Seksual menyebabkan infertilitas permanen",
      "peluang hamil dengan riwayat Penyakit Menular Seksual",
      "pengobatan Penyakit Menular Seksual untuk program hamil"
    ],
    answer: "Ya, wanita tetap bisa hamil meski terkena Penyakit Menular Seksual. Namun, Penyakit Menular Seksual dapat membahayakan kehamilan dan bayi jika tidak ditangani.",
    formattedAnswer: "Bisa. Tapi Penyakit Menular Seksual dapat mempersulit kehamilan, menyebabkan kehamilan ektopik, atau membahayakan janin jika tidak diobati.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa dicegah dengan vaksin?",
    variants: [
      "vaksin untuk pencegahan Penyakit Menular Seksual",
      "imunisasi terhadap penyakit kelamin",
      "jenis vaksin pencegah Penyakit Menular Seksual",
      "keberadaan vaksin Penyakit Menular Seksual",
      "peran vaksinasi dalam pencegahan IMS"
    ],
    answer: "Beberapa Penyakit Menular Seksual bisa dicegah dengan vaksin, seperti HPV dan hepatitis B. Namun, sebagian besar lainnya perlu dicegah melalui perilaku seksual yang aman.",
    formattedAnswer: "Beberapa. Vaksin HPV (cegah kutil kelamin & kanker). Vaksin Hepatitis B (cegah hepatitis B). Tidak ada vaksin untuk HIV, herpes, sifilis, dll.",
    category: null
  },
  {
    question: "Apa itu trikomoniasis?",
    variants: [
      "pengertian trikomoniasis",
      "penyakit triko",
      "trichomonas vaginalis",
      "gejala trikomoniasis",
      "infeksi parasit kelamin"
    ],
    answer: "Trikomoniasis adalah infeksi menular seksual yang disebabkan oleh parasit *Trichomonas vaginalis*, dengan gejala seperti keputihan berbau busuk, gatal, dan nyeri saat buang air kecil.",
    formattedAnswer: "Trikomoniasis: Penyakit Menular Seksual parasit yang menyebabkan keputihan berbau busuk, hijau/kuning berbusa, gatal, dan nyeri pada wanita. Pria sering tanpa gejala.",
    category: null
  },
  {
    question: "Apa itu keputihan abnormal dan apakah selalu berarti Penyakit Menular Seksual?",
    variants: [
      "ciri keputihan tidak normal",
      "perbedaan keputihan normal dan abnormal",
      "penyebab keputihan abnormal",
      "apakah keputihan selalu Penyakit Menular Seksual",
      "diagnosis banding keputihan"
    ],
    answer: "Keputihan abnormal bisa berupa bau tidak sedap, warna kehijauan, atau disertai rasa gatal. Ini bisa jadi tanda infeksi, termasuk Penyakit Menular Seksual, tapi bisa juga infeksi jamur atau bakteri biasa.",
    formattedAnswer: "Keputihan abnormal: Warna tidak jernih/putih (kuning/hijau), konsistensi tidak normal, berbau, disertai gatal/nyeri. Bisa akibat Penyakit Menular Seksual (Trikomoniasis, Gonore) atau non-Penyakit Menular Seksual (Vaginosis Bakterial, Infeksi Jamur).",
    category: null
  },
  {
    question: "Bagaimana cara mengobati Penyakit Menular Seksual yang disebabkan bakteri?",
    variants: [
      "terapi Penyakit Menular Seksual bakteri",
      "antibiotik untuk penyakit kelamin",
      "pengobatan infeksi bakteri seksual",
      "menyembuhkan Penyakit Menular Seksual bakteri",
      "durasi pengobatan Penyakit Menular Seksual bakteri"
    ],
    answer: "Dengan antibiotik yang diresepkan oleh dokter. Penting untuk menyelesaikan semua obat meskipun gejala membaik.",
    formattedAnswer: "Dengan antibiotik yang diresepkan dokter. Sangat penting untuk menghabiskan semua obat meskipun gejala sudah membaik, untuk mencegah kekambuhan & resistensi.",
    category: null
  },
  {
    question: "Apakah laki-laki bisa terkena HPV?",
    variants: [
      "HPV pada pria",
      "risiko HPV untuk laki-laki",
      "gejala HPV pada penis",
      "kanker akibat HPV pada pria",
      "vaksin HPV untuk cowok"
    ],
    answer: "Ya, HPV bisa menyerang laki-laki dan menyebabkan kutil kelamin serta meningkatkan risiko kanker penis atau anus.",
    formattedAnswer: "Ya. Pria bisa terkena HPV, menyebabkan kutil kelamin dan meningkatkan risiko kanker anus, penis, dan tenggorokan.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa menular melalui sentuhan atau ciuman biasa?",
    variants: [
      "penularan non-seksual Penyakit Menular Seksual",
      "risiko ciuman dan sentuhan",
      "apakah berpelukan menularkan Penyakit Menular Seksual",
      "Penyakit Menular Seksual dan kontak sosial sehari-hari",
      "mitos penularan Penyakit Menular Seksual"
    ],
    answer: "Sebagian besar Penyakit Menular Seksual tidak menular melalui sentuhan biasa atau ciuman ringan. Namun, herpes oral dan sifilis bisa menular melalui ciuman jika ada luka terbuka.",
    formattedAnswer: "Umumnya TIDAK. Penyakit Menular Seksual tidak menular melalui pelukan, berjabat tangan, berbagi makanan, atau dudukan toilet. Herpes mulut dan sifilis bisa menular melalui ciuman dalam.",
    category: null
  },
  {
    question: "Apa dampak jangka panjang Penyakit Menular Seksual jika tidak diobati?",
    variants: [
      "komplikasi kronis Penyakit Menular Seksual",
      "akibat jangka panjang tidak mengobati Penyakit Menular Seksual",
      "risiko kesehatan jangka panjang dari IMS",
      "Penyakit Menular Seksual dan penyakit kronis",
      "konsekuensi mengabaikan Penyakit Menular Seksual"
    ],
    answer: "Penyakit Menular Seksual yang tidak diobati dapat menyebabkan kemandulan, komplikasi kehamilan, kanker, infeksi kronis, bahkan kematian dalam kasus HIV.",
    formattedAnswer: "Dampak Jangka Panjang: Kemandulan, nyeri panggul kronis, kehamilan ektopik, kanker, kerusakan organ (otak, jantung), meningkatkan risiko HIV, kematian.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa menyerang orang yang belum pernah berhubungan seksual?",
    variants: [
      "Penyakit Menular Seksual tanpa hubungan seksual",
      "penularan non-seksual",
      "apakah perawan bisa kena Penyakit Menular Seksual",
      "virgin dan penyakit kelamin",
      "cara lain penularan Penyakit Menular Seksual"
    ],
    answer: "Kemungkinan sangat kecil, tapi bisa saja tertular melalui transfusi darah, penggunaan jarum suntik bersama, atau penularan dari ibu ke bayi.",
    formattedAnswer: "Sangat jarang, tapi mungkin melalui: 1. Transfusi darah yang terkontaminasi. 2. Berbagi jarum suntik. 3. Dari ibu ke bayi selama hamil/persalinan.",
    category: null
  },
  {
    question: "Apa itu VCT dalam konteks Penyakit Menular Seksual?",
    variants: [
      "pengertian VCT",
      "konseling dan testing HIV",
      "layanan VCT",
      "voluntary counseling and testing",
      "tes HIV sukarela"
    ],
    answer: "VCT (Voluntary Counseling and Testing) adalah layanan konseling dan tes HIV secara sukarela, rahasia, dan dengan dukungan psikologis.",
    formattedAnswer: "VCT (Voluntary Counseling and Testing): Layanan Konseling dan Testing HIV sukarela, rahasia, dan didukung konselor.",
    category: null
  },
  {
    question: "Apakah pria bisa menjadi pembawa Penyakit Menular Seksual tanpa menunjukkan gejala?",
    variants: [
      "pembawa asimtomatik pria",
      "silent carrier laki-laki",
      "apakah cowok bisa menularkan Penyakit Menular Seksual tanpa gejala",
      "peran pria dalam penyebaran Penyakit Menular Seksual",
      "Penyakit Menular Seksual tanpa gejala pada pria"
    ],
    answer: "Ya, pria bisa membawa dan menularkan Penyakit Menular Seksual tanpa mengalami gejala apa pun, terutama untuk klamidia dan HPV.",
    formattedAnswer: "Ya, sangat mungkin. Pria sering menjadi 'silent carrier' untuk Penyakit Menular Seksual seperti Klamidia, Gonore, HPV, dan Herpes tanpa menunjukkan gejala.",
    category: null
  },
  {
    question: "Bagaimana mendukung pasangan yang terkena Penyakit Menular Seksual?",
    variants: [
      "cara menghadapi pasangan dengan Penyakit Menular Seksual",
      "dukungan untuk orang dengan IMS",
      "bersikap terhadap pasangan yang kena Penyakit Menular Seksual",
      "komunikasi dengan pasangan ber-Penyakit Menular Seksual",
      "menjaga hubungan saat ada diagnosis Penyakit Menular Seksual"
    ],
    answer: "Bersikap terbuka, tidak menghakimi, menemani dalam proses pengobatan, dan mengikuti anjuran dokter bersama-sama sangat penting untuk mendukung pasangan.",
    formattedAnswer: "1. Jangan menyalahkan atau menghakimi. 2. Dukung secara emosional. 3. Ikut serta dalam pengobatan (tes & obati bersama). 4. Edukasi diri sendiri. 5. Komunikasikan dengan terbuka.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual bisa menyebabkan kanker?",
    variants: [
      "hubungan Penyakit Menular Seksual dan kanker",
      "IMS pemicu kanker",
      "kanker akibat infeksi menular seksual",
      "HPV dan kanker serviks",
      "pencegahan kanker melalui pencegahan Penyakit Menular Seksual"
    ],
    answer: "Beberapa Penyakit Menular Seksual seperti HPV bisa menyebabkan kanker serviks, anus, penis, atau tenggorokan jika tidak tertangani.",
    formattedAnswer: "Ya. HPV adalah penyebab utama kanker serviks, anus, penis, vulva, vagina, dan tenggorokan. Hepatitis B & C dapat menyebabkan kanker hati.",
    category: null
  },
  {
    question: "Apa itu infeksi menular seksual rekuren?",
    variants: [
      "pengertian IMS rekuren",
      "Penyakit Menular Seksual yang kambuh",
      "herpes kambuhan",
      "kekambuhan penyakit kelamin",
      "mengelola Penyakit Menular Seksual rekuren"
    ],
    answer: "Adalah infeksi yang muncul berulang setelah sebelumnya sembuh, misalnya herpes yang bisa kambuh berkali-kali karena virus tetap tinggal dalam tubuh.",
    formattedAnswer: "IMS Rekuren: Infeksi yang kambuh kembali. Contoh: Herpes (karena virus dormant) atau infeksi ulang karena pasangan tidak diobati (klamidia/gonore).",
    category: null
  },
  {
    question: "Bagaimana mengurangi stigma terhadap penderita Penyakit Menular Seksual?",
    variants: [
      "melawan stigma Penyakit Menular Seksual",
      "cara menghilangkan stigma IMS",
      "edukasi untuk mengurangi stigma",
      "bersikap terhadap odha dan penderita Penyakit Menular Seksual",
      "kesehatan mental dan Penyakit Menular Seksual"
    ],
    answer: "Dengan edukasi, empati, dan menghindari penyebaran informasi keliru tentang Penyakit Menular Seksual. Perlakuan adil sangat penting untuk kesehatan mental penderita.",
    formattedAnswer: "1. Edukasi bahwa Penyakit Menular Seksual adalah masalah kesehatan, bukan aib. 2. Gunakan bahasa yang tidak menyalahkan. 3. Dorong tes & pengobatan terbuka. 4. Dukung kesehatan mental penderitanya.",
    category: null
  },
  {
    question: "Apakah Penyakit Menular Seksual hanya menyerang orang yang sering berganti pasangan?",
    variants: [
      "stigma dan Penyakit Menular Seksual",
      "mitos tentang penyebab Penyakit Menular Seksual",
      "apakah setia menjamin bebas Penyakit Menular Seksual",
      "risiko Penyakit Menular Seksual dalam hubungan monogami",
      "penularan Penyakit Menular Seksual dan jumlah pasangan"
    ],
    answer: "Tidak selalu. Bahkan satu kali hubungan seksual tanpa pelindung dengan pasangan yang terinfeksi sudah bisa menularkan Penyakit Menular Seksual.",
    formattedAnswer: "TIDAK. Siapa pun bisa terkena Penyakit Menular Seksual, bahkan dari satu kali hubungan seks atau dalam hubungan monogami jika pasangan terinfeksi.",
    category: null
  },
  {
    question: "Mengapa penting melakukan skrining Penyakit Menular Seksual sebelum menikah?",
    variants: [
      "manfaat tes Penyakit Menular Seksual pra nikah",
      "skrining kesehatan sebelum pernikahan",
      "mencegah penularan Penyakit Menular Seksual dalam pernikahan",
      "komunikasi kesehatan seksual dengan calon pasangan",
      "perencanaan keluarga dan tes Penyakit Menular Seksual"
    ],
    answer: "Untuk memastikan kedua calon pasangan sehat, mencegah penularan, dan menjaga kesehatan reproduksi serta calon keturunan di masa depan.",
    formattedAnswer: "Penting untuk: 1. Melindungi kesehatan pasangan. 2. Mencegah penularan. 3. Merencanakan kehamilan yang sehat. 4. Membangun kepercayaan & komunikasi terbuka sejak awal.",
    category: null
  },
   {
    question: "Apakah Penyakit Menular Seksual bisa SEMBUH?",
    variants: [
      "Penyakit Menular Seksual bisa sembuh nggak?",
      "Apakah Penyakit Menular Seksual bisa sembuh?",
      "Penyakit Menular Seksual bisa sembuh?"
    ],
    answer: "Beberapa PMS bisa disembuhkan (misalnya gonore, sifilis, klamidia) dengan obat dari dokter. Tapi ada juga yang tidak bisa sembuh total (seperti HIV, herpes, HPV), hanya bisa dikendalikan.",
    formattedAnswer: "Beberapa PMS bisa disembuhkan (misalnya gonore, sifilis, klamidia) dengan obat dari dokter. Tapi ada juga yang tidak bisa sembuh total (seperti HIV, herpes, HPV), hanya bisa dikendalikan.",
    category: null
  },
     {
    question: "Apakah Penyakit Menular Seksual bisa menular lewat berpegangan tangan?",
    variants: [
      "Berpegangan tangan",
      "saat berpeganggan tangan, apakah bisa menular?",
      "Apakah Penyakit Menular Seksual bisa menular lewat berpegangan tangan?"
    ],
    answer: "Tidak. Penyakit Menular Seksual tidak menular lewat sentuhan biasa seperti berjabat tangan.",
    formattedAnswer: "Tidak. PMS tidak menular lewat sentuhan biasa seperti berjabat tangan.",
    category: null
  }
];

async function runIndexing() {
  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    await collection.deleteMany({});

    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: GEMINI_API_KEY,
      modelName: "embedding-001",
    });

    // BUAT DOKUMEN YANG LEBIH SPESIFIK
    const docs = QA_DATA.flatMap((item) => {
      const allQuestions = [...(item.variants || []), item.question];
      
      return allQuestions.map((q) => {
        // Format yang sederhana dan konsisten
        return {
          pageContent: `PERTANYAAN: ${q}\nJAWABAN: ${item.answer}`,
          metadata: {
            originalQuestion: item.question,
            formattedAnswer: item.formattedAnswer,
            answer: item.answer,
            category: item.category || 'umum',
            searchQuery: q.toLowerCase().replace(/[^\w\s]/gi, '')
          },
        };
      });
    });

    console.log(`Membuat ${docs.length} dokumen...`);

    await MongoDBAtlasVectorSearch.fromDocuments(docs, embeddings, {
      collection,
      indexName: "vector_index",
      textKey: "pageContent",
      embeddingKey: "embedding",
    });

    console.log("✅ Indexing selesai!");
    console.log("Contoh dokumen yang dibuat:");
    docs.slice(0, 3).forEach((doc, i) => {
      console.log(`\n--- Dokumen ${i + 1} ---`);
      console.log("Pertanyaan:", doc.metadata.searchQuery);
      console.log("Jawaban:", doc.metadata.formattedAnswer.substring(0, 50) + "...");
    });

  } catch (err) {
    console.error("❌ Gagal indexing:", err);
  } finally {
    await client.close();
  }
}

runIndexing();
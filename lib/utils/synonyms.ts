export const DISEASE_SYNONYMS = {
  PMS: ["penyakit menular seksual", "ims", "infeksi menular seksual", "std", "sti"],
  HIV: ["aids", "human immunodeficiency virus"],
  AIDS: ["hiv", "acquired immunodeficiency syndrome"],
  GONORE: ["kencing nanah", "gonorrhea"],
  KLAMIDIA: ["chlamydia", "chlamydia trachomatis"],
  SIFILIS: ["raja singa", "syphilis"],
  HERPES: ["herpes genital", "herpes simplex"],
  HPV: ["human papillomavirus", "kutil kelamin"],
  TRIKOMONIASIS: ["trichomonas", "trichomoniasis"],
  VAGINOSIS: ["bacterial vaginosis", "bv"],
  PENYAKIT_MENULAR_SEKSUAL: ["penyakit menular seksual", "ims", "infeksi menular seksual", "std", "sti"],
};

export function normalizeDiseaseTerms(text: string): string {
  let normalized = text.toLowerCase();
  
  Object.entries(DISEASE_SYNONYMS).forEach(([mainTerm, synonyms]) => {
    synonyms.forEach(synonym => {
      const regex = new RegExp(`\\b${synonym}\\b`, 'gi');
      if (regex.test(normalized)) {
        normalized = normalized.replace(regex, mainTerm.toLowerCase());
      }
    });
  });
  
  return normalized;
}

export function expandQueryWithSynonyms(query: string): string[] {
  const queries = [query];
  const normalized = query.toLowerCase();
  
  // Tambahkan variasi sinonim untuk pencarian
  Object.entries(DISEASE_SYNONYMS).forEach(([mainTerm, synonyms]) => {
    if (normalized.includes(mainTerm.toLowerCase())) {
      synonyms.forEach(synonym => {
        queries.push(query.replace(new RegExp(mainTerm, 'gi'), synonym));
      });
    }
    
    synonyms.forEach(synonym => {
      if (normalized.includes(synonym)) {
        queries.push(query.replace(new RegExp(synonym, 'gi'), mainTerm.toLowerCase()));
      }
    });
  });
  
  return [...new Set(queries)]; // Hapus duplikat
}
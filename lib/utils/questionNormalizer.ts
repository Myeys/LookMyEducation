// utils/questionNormalizer.ts
export class QuestionNormalizer {
  private static stopWords = new Set([
    'apa', 'itu', 'apakah', 'bagaimana', 'saya', 'ingin', 'tahu', 
    'tentang', 'dengan', 'adalah', 'yaitu', 'yang', 'di', 'ke',
    'dalam', 'pada', 'untuk', 'dari', 'dok', 'tolong', 'bisa'
  ]);
  
  private static questionPatterns = {
    definition: ['pengertian', 'definisi', 'arti', 'apa'],
    symptoms: ['gejala', 'tanda', 'ciri', 'keluhan', 'rasa'],
    treatment: ['pengobatan', 'obat', 'terapi', 'sembuh', 'obatin'],
    prevention: ['pencegahan', 'cegah', 'hindari', 'jaga'],
    transmission: ['penularan', 'menular', 'tular', 'sakit'],
    hospital: ['rumah sakit', 'rs', 'klinik', 'dokter', 'berobat', 'periksa']
  };
  
  private static diseaseEntities = new Set([
    'pms', 'hiv', 'aids', 'gonore', 'klamidia', 'sifilis', 
    'herpes', 'hpv', 'trikomoniasis', 'vaginosis', 'ims',
    'kencing nanah', 'raja singa', 'kutil kelamin'
  ]);

  private static synonymMap: { [key: string]: string } = {
    'penyakit menular seksual': 'pms',
    'infeksi menular seksual': 'ims',
    'kencing nanah': 'gonore',
    'raja singa': 'sifilis',
    'kutil kelamin': 'hpv',
    'human immunodeficiency virus': 'hiv',
    'acquired immunodeficiency syndrome': 'aids'
  };
  
  static normalize(question: string): string {
    if (!question || question.trim().length === 0) return '';
    
    // 1. Lowercase dan remove punctuation
    let normalized = question.toLowerCase()
      .replace(/[^\w\s]/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    // 2. Replace synonyms
    Object.entries(this.synonymMap).forEach(([long, short]) => {
      const regex = new RegExp(long, 'gi');
      if (regex.test(normalized)) {
        normalized = normalized.replace(regex, short);
      }
    });
    
    // 3. Remove stop words
    const words = normalized.split(' ')
      .filter(word => !this.stopWords.has(word) && word.length > 2);
    
    if (words.length === 0) return '';
    
    // 4. Identify question type and entity
    let questionType = 'general';
    let entity = '';
    
    // Cari tipe pertanyaan
    for (const [type, keywords] of Object.entries(this.questionPatterns)) {
      for (const keyword of keywords) {
        if (words.includes(keyword)) {
          questionType = type;
          break;
        }
      }
      if (questionType !== 'general') break;
    }
    
    // Cari entity (penyakit)
    for (const word of words) {
      if (this.diseaseEntities.has(word)) {
        entity = word;
        break;
      }
    }
    
    // 5. Reconstruct standardized query
    if (entity && questionType !== 'general') {
      return `${questionType} ${entity}`;
    } else if (entity) {
      return entity;
    } else if (questionType !== 'general') {
      return questionType;
    } else {
      return words.join(' ');
    }
  }
  
  static areQuestionsSimilar(q1: string, q2: string): boolean {
    const norm1 = this.normalize(q1);
    const norm2 = this.normalize(q2);
    return norm1 === norm2;
  }

  static extractDisease(question: string): string {
    const normalized = this.normalize(question);
    for (const disease of this.diseaseEntities) {
      if (normalized.includes(disease)) {
        return disease;
      }
    }
    return '';
  }

  static getQuestionType(question: string): string {
    const normalized = this.normalize(question);
    for (const [type, keywords] of Object.entries(this.questionPatterns)) {
      for (const keyword of keywords) {
        if (normalized.includes(keyword)) {
          return type;
        }
      }
    }
    return 'general';
  }
}
export interface QuestionStep {
  title: string;
  formula?: string;
  calculation: string;
  result?: string;
}

export interface QuestionData {
  id: number;
  questionNumber: number; // 6, 7, 8, 9, 10
  title: string;
  category: string;
  cognitiveLevel: string;
  questionText: string;
  imageSrc: string;
  imageAlt: string;
  imageDescription: string;
  options: {
    key: 'a' | 'b' | 'c' | 'd';
    text: string;
  }[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  rawSolution: string[];
  known: string[];
  asked: string;
  formulas: string[];
  steps: QuestionStep[];
  conclusion: string;
  tips?: string;
}

export const QUESTIONS_DATA: QuestionData[] = [
  {
    id: 1,
    questionNumber: 6,
    title: 'Soal 6: Bangun Datar Campuran (Level Kognitif C4-Menganalisis)',
    category: 'Bangun Datar Campuran',
    cognitiveLevel: 'Level Kognitif C4-Menganalisis',
    questionText:
      'Kakek memiliki sebidang tanah berbentuk persegi dengan panjang sisi 14 m, kakek berencana ingin membuat sebuah kolam ikan berbentuk lingkaran di tengah sebidang tanah tersebut. Berapakah sisa tanah kakek setelah ditambahkan kolam ikan?',
    imageSrc: '/assets/aistudio/image_3f9fe1ac.png',
    imageAlt: 'Tanah persegi 14 m dengan kolam ikan lingkaran di dalamnya',
    imageDescription: 'Persegi dengan panjang sisi 14 m dan lingkaran berdiameter 14 m di bagian tengah.',
    options: [
      { key: 'a', text: '98 m²' },
      { key: 'b', text: '42 m²' },
      { key: 'c', text: '196 m²' },
      { key: 'd', text: '49 m²' },
    ],
    correctAnswer: 'b',
    rawSolution: [
      'Diketahui: sisi (s) = 14 m',
      '          diameter (d) = 14 m, maka jari-jari (r) = 14/2 = 7 m',
      '• Menentukan luas persegi:',
      '  L = s x s',
      '    = 14 m x 14 m',
      '    = 196 m²',
      '• Menentukan luas lingkaran:',
      '  L = π × r x r',
      '    = 22/7 × 7 m x 7 m',
      '    = 154 m²',
      '• Menentukan luas sisa tanah kakek:',
      '  L = 196 m² - 154 m²',
      '    = 42 m²',
    ],
    known: [
      'Panjang sisi (s) = 14 m',
      'Diameter (d) = 14 m, maka jari-jari (r) = 14/2 = 7 m',
    ],
    asked: 'Berapakah sisa tanah kakek setelah ditambahkan kolam ikan?',
    formulas: [
      'L_persegi = s × s',
      'L_lingkaran = π × r × r',
      'L_sisa = L_persegi − L_lingkaran',
    ],
    steps: [
      {
        title: 'Menentukan luas persegi',
        formula: 'L = s × s',
        calculation: 'L = 14 m × 14 m = 196 m²',
        result: '196 m²',
      },
      {
        title: 'Menentukan luas lingkaran',
        formula: 'L = π × r × r',
        calculation: 'L = 22/7 × 7 m × 7 m = 154 m²',
        result: '154 m²',
      },
      {
        title: 'Menentukan luas sisa tanah kakek',
        formula: 'L = L_persegi − L_lingkaran',
        calculation: 'L = 196 m² − 154 m² = 42 m²',
        result: '42 m²',
      },
    ],
    conclusion: 'Jadi, luas sisa tanah kakek setelah ditambahkan kolam ikan adalah 42 m² (Pilihan b).',
    tips: 'Sisi persegi bersinggungan dengan lingkaran, sehingga diameter lingkaran tepat sama dengan sisi persegi yaitu 14 m.',
  },
  {
    id: 2,
    questionNumber: 7,
    title: 'Soal 7: Bangun Datar Campuran (Level Kognitif C4-Menganalisis)',
    category: 'Bangun Datar Campuran',
    cognitiveLevel: 'Level Kognitif C4-Menganalisis',
    questionText:
      'Raka membuat kolam renang berbentuk persegi panjang berukuran 10 m dan lebar 8 m. Di sekeliling kolam dibuat jalan dengan lebar 1 m dan di pasang keramik. Tentukan luas keramik untuk jalan!',
    imageSrc: '/assets/aistudio/image_fcd7a231.png',
    imageAlt: 'Kolam renang ABCD berukuran 10m x 8m dikelilingi jalan EFGH',
    imageDescription: 'Kolam Renang persegi panjang 10 m × 8 m dikelilingi jalan berkeramik selebar 1 m.',
    options: [
      { key: 'a', text: '50 m²' },
      { key: 'b', text: '62 m²' },
      { key: 'c', text: '80 m²' },
      { key: 'd', text: '40 m²' },
    ],
    correctAnswer: 'd',
    rawSolution: [
      '• Menghitung luas persegi panjang ABCD (kolam):',
      '  L = p x l',
      '    = 10 m x 8 m',
      '    = 80 m²',
      '• Menghitung luas persegi panjang EFGH (kolam + jalan):',
      '  EF = 10 m + 2 m = 12 m',
      '  FG = 8 m + 2 m = 10 m',
      '  L = p x l',
      '    = 12 m x 10 m',
      '    = 120 m²',
      '• Menghitung luas jalan keramik:',
      '  L = 120 m² - 80 m²',
      '    = 40 m²',
    ],
    known: [
      'Kolam renang ABCD: panjang = 10 m, lebar = 8 m',
      'Lebar jalan = 1 m di setiap sisi keliling',
    ],
    asked: 'Tentukan luas keramik untuk jalan!',
    formulas: [
      'Luas ABCD = p × l',
      'Dimensi EFGH: EF = 10 + 2 = 12 m, FG = 8 + 2 = 10 m',
      'Luas Jalan = Luas EFGH − Luas ABCD',
    ],
    steps: [
      {
        title: 'Menghitung luas persegi panjang ABCD',
        formula: 'L = p × l',
        calculation: 'L = 10 m × 8 m = 80 m²',
        result: '80 m²',
      },
      {
        title: 'Menghitung luas persegi panjang EFGH',
        formula: 'EF = 10 + 2 = 12 m; FG = 8 + 2 = 10 m; L = p × l',
        calculation: 'L = 12 m × 10 m = 120 m²',
        result: '120 m²',
      },
      {
        title: 'Menghitung luas jalan',
        formula: 'L = Luas EFGH − Luas ABCD',
        calculation: 'L = 120 m² − 80 m² = 40 m²',
        result: '40 m²',
      },
    ],
    conclusion: 'Jadi, luas keramik untuk jalan adalah 40 m² (Pilihan d).',
    tips: 'Lebar jalan 1 m ditambahkan pada kedua ujung sisi panjang (+2m) dan kedua ujung sisi lebar (+2m).',
  },
  {
    id: 3,
    questionNumber: 8,
    title: 'Soal 8: Bangun Datar Campuran (Level Kognitif C4-Menganalisis)',
    category: 'Bangun Datar Campuran',
    cognitiveLevel: 'Level Kognitif C4-Menganalisis',
    questionText:
      'Kahla membuat 10 kartu tanda pengenal seperti pada gambar berikut! Berapakah luas karton yang dibutuhkan?',
    imageSrc: '/assets/aistudio/image_bb9bd278.png',
    imageAlt: 'Kartu tanda pengenal gabungan persegi 6 cm dan segitiga di bawahnya',
    imageDescription: 'Tanda pengenal gabungan persegi 6 cm × 6 cm dan 2 segitiga siku-siku (sisi miring 5 cm, alas 3 cm).',
    options: [
      { key: 'a', text: '600 cm²' },
      { key: 'b', text: '420 cm²' },
      { key: 'c', text: '560 cm²' },
      { key: 'd', text: '480 cm²' },
    ],
    correctAnswer: 'd',
    rawSolution: [
      '• Mencari tinggi segitiga (AC):',
      '  AB = (6 cm) / 2 = 3 cm',
      '  AC² = BC² - AB²',
      '  AC² = 5² - 3² = 25 - 9 = 16',
      '  AC  = 4 cm',
      '• Menghitung luas persegi:',
      '  L = s x s = 6 cm x 6 cm = 36 cm²',
      '• Menghitung luas kedua bangun datar segitiga:',
      '  L = 1/2 × a × t = 1/2 × 3 cm × 4 cm = 6 cm²',
      '  L total 2 segitiga = 6 cm² x 2 = 12 cm²',
      '• Menghitung luas 1 tanda pengenal:',
      '  L = 36 cm² + 12 cm² = 48 cm²',
      '• Menghitung luas karton yang diperlukan untuk 10 kartu:',
      '  L = 48 cm² x 10 = 480 cm²',
    ],
    known: [
      'Persegi dengan panjang sisi = 6 cm',
      'Sisi miring segitiga BC = 5 cm',
      'Alas setengah segitiga AB = 6 cm / 2 = 3 cm',
      'Banyak kartu yang dibuat = 10 buah',
    ],
    asked: 'Berapakah luas karton yang dibutuhkan?',
    formulas: [
      'AC² = BC² − AB²',
      'Luas Persegi = s × s',
      'Luas 2 Segitiga = 2 × (1/2 × a × t)',
      'Luas Karton = Luas 1 Kartu × 10',
    ],
    steps: [
      {
        title: 'Menentukan tinggi segitiga (AC) dengan rumus Pythagoras',
        formula: 'AC² = BC² − AB²',
        calculation: 'AC² = 5² − 3² = 25 − 9 = 16 ⟹ AC = √16 = 4 cm',
        result: 'AC = 4 cm',
      },
      {
        title: 'Menghitung luas persegi',
        formula: 'L = s × s',
        calculation: 'L = 6 cm × 6 cm = 36 cm²',
        result: '36 cm²',
      },
      {
        title: 'Menghitung luas kedua bangun datar segitiga',
        formula: 'L = 2 × (1/2 × a × t)',
        calculation: 'L = 2 × (1/2 × 3 cm × 4 cm) = 12 cm²',
        result: '12 cm²',
      },
      {
        title: 'Menghitung luas 1 kartu tanda pengenal',
        formula: 'L = Luas persegi + Luas kedua segitiga',
        calculation: 'L = 36 cm² + 12 cm² = 48 cm²',
        result: '48 cm²',
      },
      {
        title: 'Menghitung luas karton yang diperlukan (10 kartu)',
        formula: 'L_total = 48 cm² × 10',
        calculation: 'L = 48 cm² × 10 = 480 cm²',
        result: '480 cm²',
      },
    ],
    conclusion: 'Jadi, luas karton yang dibutuhkan adalah 480 cm² (Pilihan d).',
    tips: 'Tripel Pythagoras (3, 4, 5) memudahkan mencari panjang sisi tegak AC = 4 cm.',
  },
  {
    id: 4,
    questionNumber: 9,
    title: 'Soal 9: Bangun Datar Campuran (Level Kognitif C4-Menganalisis)',
    category: 'Bangun Datar Campuran',
    cognitiveLevel: 'Level Kognitif C4-Menganalisis',
    questionText:
      'Ruang tamu Pak Surya berbentuk persegi panjang berukuran 10 m × 9 m. Pak Surya berencana akan memasang ubin berukuran 30 cm × 30 cm. Berapa banyak ubin yang harus disiapkan Pak Surya?',
    imageSrc: '/assets/aistudio/image_c678940a.png',
    imageAlt: 'Ruang tamu berukuran 10 m x 9 m dan ubin 30 cm x 30 cm',
    imageDescription: 'Ruang tamu berukuran 10 m × 9 m dan ubin persegi berukuran 30 cm × 30 cm.',
    options: [
      { key: 'a', text: '84.000 ubin' },
      { key: 'b', text: '66.000 ubin' },
      { key: 'c', text: '90.000 ubin' },
      { key: 'd', text: '72.000 ubin' },
    ],
    correctAnswer: 'c',
    rawSolution: [
      '• Menghitung luas ruang tamu:',
      '  L = p x l',
      '    = 10 m x 9 m',
      '    = 90 m²',
      '• Ubah ke satuan ukur cm²:',
      '  Jadi, 90 m² = 900.000 cm²',
      '• Menghitung luas ubin:',
      '  L = s x s',
      '    = 30 cm x 30 cm',
      '• Menentukan banyaknya ubin yang dibutuhkan:',
      '  900.000 / 90 = 90.000 ubin',
    ],
    known: [
      'Ukuran ruang tamu = 10 m × 9 m',
      'Ukuran ubin = 30 cm × 30 cm',
    ],
    asked: 'Berapa banyak ubin yang harus disiapkan Pak Surya?',
    formulas: [
      'Luas Ruang Tamu = p × l',
      'Konversi ke cm²: 90 m² = 900.000 cm²',
      'Banyak ubin = Luas ruang tamu ÷ ukuran ubin',
    ],
    steps: [
      {
        title: 'Menghitung luas ruang tamu',
        formula: 'L = p × l',
        calculation: 'L = 10 m × 9 m = 90 m²',
        result: '90 m²',
      },
      {
        title: 'Ubah ke satuan ukur cm²',
        formula: '1 m² = 10.000 cm²',
        calculation: '90 m² = 90 × 10.000 cm² = 900.000 cm²',
        result: '900.000 cm²',
      },
      {
        title: 'Menentukan banyaknya ubin yang dibutuhkan',
        formula: 'Banyak ubin = 900.000 / 90',
        calculation: '900.000 / 90 = 90.000 ubin',
        result: '90.000 ubin',
      },
    ],
    conclusion: 'Jadi, banyak ubin yang harus disiapkan Pak Surya adalah 90.000 ubin (Pilihan c).',
    tips: 'Sesuai dengan pembahasan pada naskah soal: 900.000 / 90 = 90.000 ubin (Kunci c).',
  },
  {
    id: 5,
    questionNumber: 10,
    title: 'Soal 10: Bangun Datar Campuran (Level Kognitif C4-Menganalisis)',
    category: 'Bangun Datar Campuran',
    cognitiveLevel: 'Level Kognitif C4-Menganalisis',
    questionText:
      'Seorang petani mempunyai sebidang tanah berbentuk persegi panjang dengan panjang 25 m dan lebar 14 m. Tanah tersebut akan dibuat sebuah kolam berbentuk layang-layang dengan panjang diagonal masing-masing 9 m dan 12 m, sedangkan untuk sisanya akan di tanami sayuran. Berapakah luas tanah yang ditanami sayuran?',
    imageSrc: '/assets/aistudio/image_0a71e184.png',
    imageAlt: 'Tanah persegi panjang 25m x 14m dengan kolam layang-layang diagonal 9m dan 12m',
    imageDescription: 'Tanah persegi panjang 25 m × 14 m dengan kolam layang-layang berdiagonal 9 m dan 12 m.',
    options: [
      { key: 'a', text: '487 m²' },
      { key: 'b', text: '298 m²' },
      { key: 'c', text: '324 m²' },
      { key: 'd', text: '296 m²' },
    ],
    correctAnswer: 'd',
    rawSolution: [
      '• Menghitung luas tanah:',
      '  L = p x l',
      '    = 25 m x 14 m',
      '    = 350 m²',
      '• Menghitung luas kolam:',
      '  L = 1/2 × d1 x d2',
      '    = 1/2 × 9 m x 12 m',
      '    = 54 m²',
      '• Menghitung luas tanah yang ditanami sayur:',
      '  Luas tanah - luas kolam = 350 m² - 54 m²',
      '                         = 296 m²',
    ],
    known: [
      'Panjang tanah = 25 m, lebar tanah = 14 m',
      'Diagonal 1 kolam = 9 m, Diagonal 2 kolam = 12 m',
    ],
    asked: 'Berapakah luas tanah yang ditanami sayuran?',
    formulas: [
      'Luas Tanah = p × l',
      'Luas Kolam Layang-layang = 1/2 × d1 × d2',
      'Luas Tanah Sayur = Luas Tanah − Luas Kolam',
    ],
    steps: [
      {
        title: 'Menghitung luas tanah',
        formula: 'L = p × l',
        calculation: 'L = 25 m × 14 m = 350 m²',
        result: '350 m²',
      },
      {
        title: 'Menghitung luas kolam',
        formula: 'L = 1/2 × d1 × d2',
        calculation: 'L = 1/2 × 9 m × 12 m = 54 m²',
        result: '54 m²',
      },
      {
        title: 'Menghitung luas tanah yang ditanami sayur',
        formula: 'Luas tanah − luas kolam',
        calculation: 'L = 350 m² − 54 m² = 296 m²',
        result: '296 m²',
      },
    ],
    conclusion: 'Jadi, luas tanah yang ditanami sayuran adalah 296 m² (Pilihan d).',
    tips: 'Rumus luas layang-layang adalah 1/2 × diagonal 1 × diagonal 2.',
  },
];


export const FORMULA_CHEATSHEET = [
  {
    name: 'Persegi',
    formulas: [
      { label: 'Luas (L)', formula: 's × s = s²' },
      { label: 'Keliling (K)', formula: '4 × s' },
    ],
    description: 'Bangun datar dengan 4 sisi sama panjang dan 4 sudut siku-siku (90°).',
  },
  {
    name: 'Persegi Panjang',
    formulas: [
      { label: 'Luas (L)', formula: 'p × l' },
      { label: 'Keliling (K)', formula: '2 × (p + l)' },
    ],
    description: 'Bangun datar dengan 2 pasang sisi sejajar sama panjang dan 4 sudut siku-siku.',
  },
  {
    name: 'Lingkaran',
    formulas: [
      { label: 'Luas (L)', formula: 'π × r² atau 1/4 × π × d²' },
      { label: 'Keliling (K)', formula: '2 × π × r atau π × d' },
    ],
    description: 'r = jari-jari, d = diameter (2r). Nilai π = 22/7 (kelipatan 7) atau 3,14.',
  },
  {
    name: 'Segitiga',
    formulas: [
      { label: 'Luas (L)', formula: '1/2 × alas × tinggi' },
      { label: 'Keliling (K)', formula: 'sisi A + sisi B + sisi C' },
      { label: 'Pythagoras', formula: 'c² = a² + b² (segitiga siku-siku)' },
    ],
    description: 'Tinggi harus selalu tegak lurus dengan alas.',
  },
  {
    name: 'Layang-layang',
    formulas: [
      { label: 'Luas (L)', formula: '1/2 × d₁ × d₂' },
      { label: 'Keliling (K)', formula: '2 × (sisi a + sisi b)' },
    ],
    description: 'd₁ dan d₂ merupakan panjang kedua garis diagonal yang saling berpotongan tegak lurus.',
  },
];

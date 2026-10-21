import { AffirmationData } from '../types/quiz';

export const AFFIRMATION_TIERS: Record<number, AffirmationData> = {
  5: {
    score: 100,
    correctCount: 5,
    title: 'Sempurna & Sangat Luar Biasa!',
    tierBadge: '🏆 Master Geometri HOTS',
    headerColor: 'from-amber-500 via-orange-500 to-rose-500',
    textColor: 'text-amber-900',
    bgColor: 'bg-amber-50/90',
    borderColor: 'border-amber-300',
    affirmation:
      'Pikiranmu bekerja dengan ketelitian luar biasa! Menganalisis dan mengevaluasi soal-soal HOTS tingkat tinggi dengan sempurna membuktikan kekuatan fokus, penalaran mendalam, dan penguasaan konsep geometrimu.',
    quote:
      '“Keberhasilan bukanlah garis akhir, melainkan undangan untuk terus menjelajahi tantangan baru yang lebih menakjubkan.”',
    actionTip:
      'Tetaplah rendah hati dan bagikan cara berpikirmu yang sistematis kepada teman sekelas. Tantang dirimu dengan problem geometri 3 dimensi atau soal olimpiade sains berikutnya!',
  },
  4: {
    score: 80,
    correctCount: 4,
    title: 'Kerja Keras Mengagumkan!',
    tierBadge: '⭐ Pejuang Tangguh Geometri',
    headerColor: 'from-orange-500 to-amber-600',
    textColor: 'text-orange-900',
    bgColor: 'bg-orange-50/90',
    borderColor: 'border-orange-300',
    affirmation:
      'Kerja keras dan daya analisismu sungguh luar biasa! Mampu menaklukkan 4 dari 5 soal HOTS yang rumit membuktikan bahwa logika matematikamu sudah berada di level yang sangat tinggi.',
    quote:
      '“Satu kekeliruan kecil bukanlah tanda kekurangan, melainkan informasi berharga yang menunjukkan jalan menuju kesempurnaan.”',
    actionTip:
      'Buka pembahasan pada 1 soal yang meleset, cermati trik di balik perhitungannya, lalu coba kerjakan ulang. Kamu hanya selangkah kecil menuju skor sempurna 100!',
  },
  3: {
    score: 60,
    correctCount: 3,
    title: 'Fondasi Logika yang Kuat!',
    tierBadge: '🌱 Logika Bertumbuh',
    headerColor: 'from-amber-600 to-yellow-600',
    textColor: 'text-amber-950',
    bgColor: 'bg-amber-50/80',
    borderColor: 'border-amber-300',
    affirmation:
      'Hebat! Kamu berhasil menaklukkan mayoritas soal berbobot tinggi ini. Fondasi pemahaman konsep bangun datarmu sudah kokoh dan nyata.',
    quote:
      '“Kemampuan matematika bukanlah bakat bawaan, melainkan rangkaian latihan yang terus bertumbuh setiap kali kita berpikir kritis.”',
    actionTip:
      'Perhatikan kembali rincian rumus dan langkah perhitungan pada 2 soal lainnya di lembar pembahasan. Otakmu sedang membentuk koneksi neuron baru yang makin tajam!',
  },
  2: {
    score: 40,
    correctCount: 2,
    title: 'Langkah Awal yang Berarti!',
    tierBadge: '💪 Semangat Menempa Diri',
    headerColor: 'from-orange-400 to-rose-400',
    textColor: 'text-orange-950',
    bgColor: 'bg-orange-50/70',
    borderColor: 'border-orange-200',
    affirmation:
      'Setiap pemikiran yang kamu tuangkan adalah proses bertumbuh yang berharga. Kamu sudah membuktikan bahwa kamu mampu menyelesaikan persoalan HOTS yang penuh tantangan.',
    quote:
      '“Matematika ibarat melatih otot: saat terasa menantang, justru di situlah kekuatan akalmu sedang dibangun bertambah kuat.”',
    actionTip:
      'Jangan berkecil hati. Pelajari konsep segitiga siku-siku, lingkaran, dan layang-layang di buku rumus. Coba kerjakan kembali tanpa tergesa-gesa; kamu pasti bisa melesat!',
  },
  1: {
    score: 20,
    correctCount: 1,
    title: 'Jiwa Pemberani Penakluk Tantangan!',
    tierBadge: '✨ Benih Potensi Sejati',
    headerColor: 'from-rose-400 to-amber-500',
    textColor: 'text-rose-950',
    bgColor: 'bg-rose-50/70',
    borderColor: 'border-rose-200',
    affirmation:
      'Apresiasi setinggi-tingginya atas keberanianmu menghadapi tantangan sampai tuntas! Satu jawaban benarmu adalah bukti nyata benih potensi kemampuan yang siap mekar.',
    quote:
      '“Kesalahan hari ini adalah pupuk bagi keberhasilan esok hari. Orang yang tidak pernah salah adalah orang yang tidak pernah berani mencoba hal baru.”',
    actionTip:
      'Buka kembali pembahasan langkah demi langkah dengan santai. Tuliskan kembali perhitungannya di papan coretan agar tangan dan pikiranmu makin terbiasa!',
  },
  0: {
    score: 0,
    correctCount: 0,
    title: 'Karakter Juara Pantang Menyerah!',
    tierBadge: '🔥 Tekad Pejuang Sejati',
    headerColor: 'from-amber-600 via-rose-500 to-orange-600',
    textColor: 'text-slate-900',
    bgColor: 'bg-amber-50/60',
    borderColor: 'border-amber-200',
    affirmation:
      'Menyelesaikan seluruh soal HOTS yang menantang menunjukkan tekad kuat dan karakter pejuang sejati! Ini bukan akhir, melainkan titik tolak terbaik untuk memulai lompatan belajarmu.',
    quote:
      '“Semua ahli matematika pernah berada di titik awal. Tantangan yang berat adalah peluang terbesar untuk melipatgandakan kecerdasan.”',
    actionTip:
      'Jadikan pembahasan lengkap ini sebagai panduan belajarmu. Pahami konsep dasarnya perlahan, lalu tekan tombol "Kerjakan Soal Kembali" untuk melihat perkembangan nilaimu!',
  },
};

export const getAffirmationForScore = (correctCount: number): AffirmationData => {
  const count = Math.min(Math.max(0, correctCount), 5);
  return AFFIRMATION_TIERS[count] || AFFIRMATION_TIERS[0];
};

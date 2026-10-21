import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const formulaCategories = [
    {
      title: 'Persegi (Bujur Sangkar)',
      badge: 'Soal 6 & 8',
      desc: 'Bangun datar dengan 4 sisi sama panjang dan 4 sudut siku-siku (90°)',
      formulas: [
        { label: 'Luas (L)', math: 'L = s × s = s²' },
        { label: 'Keliling (K)', math: 'K = 4 × s' },
        { label: 'Panjang Sisi (s)', math: 's = √L atau s = K / 4' },
      ],
      example: 'Jika s = 14 m → L = 14 × 14 = 196 m²',
    },
    {
      title: 'Persegi Panjang',
      badge: 'Soal 7, 9 & 10',
      desc: 'Memiliki 2 pasang sisi sejajar berukuran panjang (p) dan lebar (l)',
      formulas: [
        { label: 'Luas (L)', math: 'L = p × l' },
        { label: 'Keliling (K)', math: 'K = 2 × (p + l)' },
        { label: 'Panjang (p)', math: 'p = L / l' },
      ],
      example: 'Jika p = 10 m, l = 8 m → L = 10 × 8 = 80 m²',
    },
    {
      title: 'Lingkaran & Bagian Lingkaran',
      badge: 'Soal 6',
      desc: 'Titik-titik berjarak sama dari titik pusat; diameter d = 2r atau r = d / 2',
      formulas: [
        { label: 'Luas (L)', math: 'L = π × r × r = πr²' },
        { label: 'Keliling (K)', math: 'K = 2 × π × r = π × d' },
        { label: 'Konstanta π', math: 'π = 22/7 (jika r kelipatan 7) atau 3,14' },
      ],
      example: 'Jika d = 14 m → r = 7 m → L = (22/7) × 7 × 7 = 154 m²',
    },
    {
      title: 'Segitiga Siku-siku & Pythagoras',
      badge: 'Soal 8',
      desc: 'Segitiga dengan salah satu sudut 90°, berlaku Teorema Pythagoras',
      formulas: [
        { label: 'Luas (L)', math: 'L = ½ × a × t' },
        { label: 'Teorema Pythagoras', math: 'c² = a² + b² → a² = c² - b²' },
        { label: 'Mencari Sisi Tegak', math: 't = √(sisi miring² - alas²)' },
      ],
      example: 'Sisi miring = 5 cm, alas = 3 cm → tinggi = √(25 - 9) = √16 = 4 cm',
    },
    {
      title: 'Layang-layang',
      badge: 'Soal 10',
      desc: 'Segiempat dengan 2 pasang sisi berdekatan sama panjang dan diagonal d₁ tegak lurus d₂',
      formulas: [
        { label: 'Luas (L)', math: 'L = ½ × d₁ × d₂' },
        { label: 'Keliling (K)', math: 'K = 2 × (s₁ + s₂)' },
      ],
      example: 'Jika d₁ = 9 m, d₂ = 12 m → L = ½ × 9 × 12 = 54 m²',
    },
    {
      title: 'Bangun Datar Campuran (Luas Sisa/Jalan)',
      badge: 'Konsep Kunci HOTS',
      desc: 'Menghitung sisa area atau jalan setapak di sekeliling bangun',
      formulas: [
        { label: 'Luas Sisa/Arsiran', math: 'L_sisa = L_bangun_luar − L_bangun_dalam' },
        { label: 'Jalan di Sekeliling', math: 'p_baru = p + 2w, l_baru = l + 2w (w = lebar jalan)' },
        { label: 'Banyak Ubin/Paving', math: 'Jumlah = Luas Lantai / Luas Ubin' },
      ],
      example: 'Sisa tanah = 196 m² - 154 m² = 42 m²',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col w-full max-w-3xl max-h-[90vh] border border-orange-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100 bg-linear-to-r from-orange-50 via-amber-50 to-orange-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-600/20">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Buku Rumus Bangun Datar
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200">
                  Panduan Rumus
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Referensi praktis rumus luas, keliling, dan strategi bangun datar campuran
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-orange-100/60 transition"
            title="Tutup Buku Rumus"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Key HOTS Hint banner */}
          <div className="bg-linear-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-200 rounded-2xl p-4 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed space-y-1">
              <strong className="text-orange-950 font-bold block">
                Strategi Cepat Menyelesaikan Soal Bangun Datar Campuran:
              </strong>
              <p>
                1. <strong>Identifikasi Bangun</strong>: Pisahkan mana bangun luar dan bangun di dalamnya.
              </p>
              <p>
                2. <strong>Samakan Satuan</strong>: Pastikan satuan panjang sudah sama (misalnya meter ke centimeter: 1 m = 100 cm, 1 m² = 10.000 cm²).
              </p>
              <p>
                3. <strong>Gunakan Rumus Pengurangan</strong>: Luas sisa = Luas bangun luar − Luas bangun dalam.
              </p>
            </div>
          </div>

          {/* Grid of Formulas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formulaCategories.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-orange-100 bg-orange-50/20 hover:bg-orange-50/40 hover:border-orange-300 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {item.title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-snug">{item.desc}</p>

                <div className="space-y-1.5 pt-1">
                  {item.formulas.map((f, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-600 font-medium">{f.label}</span>
                      <code className="font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md">
                        {f.math}
                      </code>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-600 bg-white/80 p-2 rounded-xl border border-dashed border-orange-200">
                  <span className="font-bold text-orange-900">Contoh Hitungan: </span>
                  {item.example}
                </div>
              </div>
            ))}
          </div>

          {/* Unit Conversion Bar */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-2xl p-4 space-y-2">
            <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              Tabel Konversi Satuan & Nilai Penting
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-amber-950 font-medium">
              <div className="bg-white p-2 rounded-xl border border-amber-200 text-center">
                1 m = <strong className="text-orange-700">100 cm</strong>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-200 text-center">
                1 m² = <strong className="text-orange-700">10.000 cm²</strong>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-200 text-center">
                π = <strong className="text-orange-700">22/7</strong> atau <strong className="text-orange-700">3,14</strong>
              </div>
              <div className="bg-white p-2 rounded-xl border border-amber-200 text-center">
                r = <strong className="text-orange-700">d / 2</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-orange-100 bg-orange-50/40 flex items-center justify-between">
          <p className="text-xs text-slate-500 hidden sm:block">
            Gunakan tombol ini kapan saja saat mengerjakan soal kuis.
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md transition active:scale-95"
          >
            Tutup Buku Rumus
          </button>
        </div>
      </div>
    </div>
  );
};

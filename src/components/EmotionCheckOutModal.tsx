import React from 'react';
import {
  HeartHandshake,
  Star,
  Sparkles,
  HelpCircle,
  Lightbulb,
  X,
  Send,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { EmotionCheckOutAndReflection } from '../types/quiz';

interface EmotionCheckOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  reflection: EmotionCheckOutAndReflection;
  onChangeReflection: (updated: EmotionCheckOutAndReflection) => void;
  studentName: string;
  answeredCount: number;
  totalQuestions: number;
}

export const CHECKOUT_EMOTION_OPTIONS = [
  {
    emotion: 'Bangga & Puas',
    emoji: '🥳',
    label: 'Bangga & Puas',
    desc: 'Mampu menyelesaikan soal sampai akhir',
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
  },
  {
    emotion: 'Paham Hal Baru',
    emoji: '💡',
    label: 'Paham Hal Baru',
    desc: 'Banyak trik rumus baru yang dipahami',
    border: 'border-amber-300',
    bg: 'bg-amber-50',
  },
  {
    emotion: 'Lega Sudah Berusaha',
    emoji: '😌',
    label: 'Lega & Tenang',
    desc: 'Semua kemampuan terbaik sudah dikeluarkan',
    border: 'border-blue-300',
    bg: 'bg-blue-50',
  },
  {
    emotion: 'Tertantang Latihan Lagi',
    emoji: '🤔',
    label: 'Ingin Latihan Lagi',
    desc: 'Penasaran dengan variasi soal lainnya',
    border: 'border-purple-300',
    bg: 'bg-purple-50',
  },
  {
    emotion: 'Cukup Menantang Tapi Seru',
    emoji: '😥',
    label: 'Cukup Menantang',
    desc: 'Menguras pikiran tapi membuat semakin terasah',
    border: 'border-orange-300',
    bg: 'bg-orange-50',
  },
];

export const CHALLENGING_QUESTIONS = [
  { id: 'Soal 6', label: 'Soal 6 (Sisa Tanah Persegi & Kolam Lingkaran)' },
  { id: 'Soal 7', label: 'Soal 7 (Luas Jalan Keramik Persegi Panjang)' },
  { id: 'Soal 8', label: 'Soal 8 (Karton Tanda Pengenal & Pythagoras)' },
  { id: 'Soal 9', label: 'Soal 9 (Jumlah Ubin Ruang Tamu & Konversi)' },
  { id: 'Soal 10', label: 'Soal 10 (Sisa Lahan Sayuran & Kolam Layang-layang)' },
];

export const NEW_INSIGHT_CHOICES = [
  'Cara mencari luas sisa: Luas Bangun Luar − Luas Bangun Dalam',
  'Mengubah satuan luas meter persegi (m²) ke centimeter persegi (cm²)',
  'Mencari tinggi segitiga dengan rumus Pythagoras: t² = c² − a²',
  'Rumus luas lingkaran πr² dengan jari-jari r = d / 2',
  'Menghitung dimensi baru kolam renang setelah ditambah lebar jalan di sekelilingnya',
];

export const EmotionCheckOutModal: React.FC<EmotionCheckOutModalProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  reflection,
  onChangeReflection,
  studentName,
  answeredCount,
  totalQuestions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] border border-orange-200 overflow-hidden flex flex-col my-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-600/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Check-out Emosi & Refleksi Belajar
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-950 border border-orange-200">
                  Refleksi Siswa
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Satu langkah terakhir sebelum melihat penilaian dan pembahasan lengkap
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-orange-100/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 flex-1">
          {/* Submission status snippet */}
          <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-100 flex flex-wrap items-center justify-between text-xs gap-2">
            <div>
              <span className="text-slate-600">Siswa: </span>
              <strong className="text-slate-800">{studentName || 'Murid Mandiri'}</strong>
            </div>
            <div className="text-emerald-700 font-bold">
              ✓ {answeredCount} dari {totalQuestions} Soal Terjawab
            </div>
          </div>

          {/* 1. CHECK-OUT EMOSI */}
          <div className="space-y-2.5">
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              1. Bagaimana perasaanmu setelah menyelesaikan soal kuis ini?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {CHECKOUT_EMOTION_OPTIONS.map((item) => {
                const isSelected = reflection.emotion === item.emotion;
                return (
                  <button
                    key={item.emotion}
                    type="button"
                    onClick={() =>
                      onChangeReflection({
                        ...reflection,
                        emotion: item.emotion,
                        emoji: item.emoji,
                      })
                    }
                    className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer select-none ${
                      isSelected
                        ? `${item.bg} ${item.border} ring-2 ring-orange-200 shadow-sm scale-102 font-bold`
                        : 'bg-white border-slate-200 hover:border-orange-200 hover:bg-orange-50/30'
                    }`}
                  >
                    <span className="text-2xl filter drop-shadow-xs">{item.emoji}</span>
                    <span className="text-[11px] font-bold text-slate-800 leading-tight">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. PENILAIAN USAHA DIRI (BINTANG) */}
          <div className="space-y-2 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                2. Beri nilai untuk usahamu hari ini:
              </label>
              <span className="text-xs font-bold text-amber-900 bg-white px-2 py-0.5 rounded-lg border border-amber-200">
                {reflection.effortRating} dari 5 Bintang
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => onChangeReflection({ ...reflection, effortRating: star })}
                  className="p-1 transition transform hover:scale-125 active:scale-95 cursor-pointer"
                  title={`${star} Bintang`}
                >
                  <Star
                    className={`w-7 sm:w-8 h-7 sm:h-8 transition-colors ${
                      star <= reflection.effortRating
                        ? 'text-amber-500 fill-amber-400 drop-shadow-xs'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 3. SOAL PALING MENANTANG */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
              3. Soal nomor berapa yang paling menantang bagimu?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CHALLENGING_QUESTIONS.map((q) => {
                const isSelected = reflection.hardestQuestion === q.id;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => onChangeReflection({ ...reflection, hardestQuestion: q.id })}
                    className={`p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isSelected ? 'text-orange-600 fill-orange-100' : 'text-slate-300'
                      }`}
                    />
                    <span className="leading-snug">{q.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. PEMAHAMAN BARU */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              4. Hal baru yang kamu pahami hari ini:
            </label>
            <div className="space-y-1.5">
              {NEW_INSIGHT_CHOICES.map((choice, idx) => {
                const isSelected = reflection.learnedConcept === choice;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onChangeReflection({ ...reflection, learnedConcept: choice })}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs transition cursor-pointer flex items-start space-x-2 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-2xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        isSelected ? 'text-amber-600 fill-amber-100' : 'text-slate-300'
                      }`}
                    />
                    <span className="leading-snug">{choice}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. PESAN / KESAN SISWA (OPSIONAL) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700">
              Catatan Refleksi Pribadi (Opsional):
            </label>
            <input
              type="text"
              placeholder="Contoh: Saya senang karena ternyata bangun datar campuran sangat seru!"
              value={reflection.studentNotes || ''}
              onChange={(e) => onChangeReflection({ ...reflection, studentNotes: e.target.value })}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-slate-800 bg-white"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-orange-100 bg-orange-50/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
          >
            Kembali ke Soal
          </button>

          <button
            onClick={onConfirmSubmit}
            className="w-full sm:w-auto px-7 py-3 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Refleksi & Lihat Penilaian</span>
          </button>
        </div>
      </div>
    </div>
  );
};

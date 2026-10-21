import React from 'react';
import { Smile, Sparkles, HeartHandshake, CheckCircle2, Target } from 'lucide-react';
import { EmotionCheckIn } from '../types/quiz';

interface EmotionCheckInCardProps {
  checkIn: EmotionCheckIn;
  onChange: (updated: EmotionCheckIn) => void;
  isSubmitted?: boolean;
}

export const EMOTION_CHECKIN_OPTIONS = [
  {
    emotion: 'Bersemangat',
    emoji: '🤩',
    label: 'Bersemangat',
    desc: 'Siap menaklukkan tantangan soal HOTS!',
    color: 'from-amber-500 to-orange-500',
    border: 'border-orange-300',
    bg: 'bg-orange-50',
    supportMessage: 'Luar biasa! Energi positifmu adalah kunci konsentrasi terbaik.',
  },
  {
    emotion: 'Senang & Yakin',
    emoji: '😊',
    label: 'Senang & Yakin',
    desc: 'Percaya diri dan siap belajar matematika.',
    color: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-300',
    bg: 'bg-emerald-50',
    supportMessage: 'Hebat! Sikap percaya diri membuat penalaran matematika terasa lebih mudah.',
  },
  {
    emotion: 'Tenang & Cermat',
    emoji: '😌',
    label: 'Tenang & Cermat',
    desc: 'Fokus, teliti, dan santai mengerjakan.',
    color: 'from-blue-500 to-indigo-500',
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    supportMessage: 'Ketenangan adalah sahabat ketelitian. Kerjakan langkah demi langkah!',
  },
  {
    emotion: 'Agak Cemas / Gugup',
    emoji: '😟',
    label: 'Gugup / Cemas',
    desc: 'Merasa soal agak sulit atau takut salah.',
    color: 'from-purple-500 to-pink-500',
    border: 'border-purple-300',
    bg: 'bg-purple-50',
    supportMessage: 'Tidak apa-apa! Kesalahan adalah bagian dari proses belajar. Buka Buku Rumus kapan saja!',
  },
  {
    emotion: 'Lelah / Mengantuk',
    emoji: '😴',
    label: 'Lelah / Mengantuk',
    desc: 'Kurang energi tapi tetap mau berusaha.',
    color: 'from-slate-500 to-amber-600',
    border: 'border-slate-300',
    bg: 'bg-slate-50',
    supportMessage: 'Tarik napas dalam-dalam, minum air putih, dan mulailah dengan senyuman!',
  },
];

export const READINESS_TARGETS = [
  '🎯 Membaca setiap soal cerita dengan cermat dan tidak terburu-buru.',
  '📐 Memanfaatkan Buku Rumus dan Papan Coretan untuk menghitung susun.',
  '💡 Teliti memisahkan bangun luar dan bangun di dalamnya.',
  '💪 Pantang menyerah dan yakin setiap usaha membawa kemajuan.',
];

export const EmotionCheckInCard: React.FC<EmotionCheckInCardProps> = ({
  checkIn,
  onChange,
  isSubmitted = false,
}) => {
  const currentOption = EMOTION_CHECKIN_OPTIONS.find((o) => o.emotion === checkIn.emotion) || EMOTION_CHECKIN_OPTIONS[0];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-orange-200/90 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            <Smile className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Check-in Emosi Siswa (Sebelum Mengerjakan)
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Kesiapan Belajar (PSE)
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Bagaimana perasaan dan kesiapan pikiranmu sebelum mulai menyelesaikan soal geometri hari ini?
            </p>
          </div>
        </div>

        {checkIn.emotion && (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-orange-50 text-orange-800 text-xs font-bold rounded-full border border-orange-200">
            <span>{checkIn.emoji}</span>
            <span>{checkIn.emotion}</span>
          </span>
        )}
      </div>

      {/* Emoji Selection Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {EMOTION_CHECKIN_OPTIONS.map((item) => {
          const isSelected = checkIn.emotion === item.emotion;
          return (
            <button
              key={item.emotion}
              type="button"
              disabled={isSubmitted}
              onClick={() =>
                onChange({
                  ...checkIn,
                  emotion: item.emotion,
                  emoji: item.emoji,
                })
              }
              className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer select-none ${
                isSelected
                  ? `${item.bg} ${item.border} ring-2 ring-orange-200 shadow-sm scale-102`
                  : 'bg-white border-slate-200/80 hover:border-orange-200 hover:bg-orange-50/30'
              } ${isSubmitted ? 'opacity-85 cursor-default' : 'active:scale-95'}`}
            >
              <span className="text-2xl sm:text-3xl filter drop-shadow-xs">{item.emoji}</span>
              <span className="text-xs font-bold text-slate-800 leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] text-slate-500 line-clamp-1">
                {item.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* Supportive Affirmation for chosen emotion */}
      {currentOption && (
        <div className="bg-orange-50/60 p-3 sm:p-3.5 rounded-2xl border border-orange-100 flex items-start space-x-2.5 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-orange-950 font-bold block">
              Pesan Afirmasi: {currentOption.emoji} {currentOption.emotion}
            </strong>
            <p className="mt-0.5">{currentOption.supportMessage}</p>
          </div>
        </div>
      )}

      {/* Target Kesiapan Belajar Murid */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-orange-600" />
          Komitmen & Target Belajar Pribadi:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {READINESS_TARGETS.map((target, idx) => {
            const isSelected = checkIn.readinessNote === target;
            return (
              <button
                key={idx}
                type="button"
                disabled={isSubmitted}
                onClick={() => onChange({ ...checkIn, readinessNote: target })}
                className={`p-2.5 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-start space-x-2 select-none ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 text-amber-950 font-semibold shadow-2xs'
                    : 'bg-white border-slate-200 hover:bg-orange-50/40 text-slate-600'
                } ${isSubmitted ? 'cursor-default' : 'active:scale-98'}`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                    isSelected ? 'text-amber-600 fill-amber-100' : 'text-slate-300'
                  }`}
                />
                <span className="leading-snug">{target}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

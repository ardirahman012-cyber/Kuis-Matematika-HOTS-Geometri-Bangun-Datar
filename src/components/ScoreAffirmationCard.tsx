import React from 'react';
import { Award, BookOpen, Printer, RotateCcw, Sparkles, Target, Compass, HeartHandshake, UserPlus, CheckCircle2 } from 'lucide-react';
import { AffirmationData } from '../types/quiz';

interface ScoreAffirmationCardProps {
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  studentName: string;
  schoolName: string;
  affirmation: AffirmationData;
  onScrollToSolutions: () => void;
  onPrint: () => void;
  onReset: () => void;
}

export const ScoreAffirmationCard: React.FC<ScoreAffirmationCardProps> = ({
  score,
  correctCount,
  totalQuestions,
  timeSpentSeconds,
  studentName,
  schoolName,
  affirmation,
  onScrollToSolutions,
  onPrint,
  onReset,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} menit ${s} detik`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-orange-200 overflow-hidden animate-fadeIn">
      {/* Top Gradient Banner */}
      <div className={`p-6 sm:p-8 bg-linear-to-r ${affirmation.headerColor} text-white relative overflow-hidden`}>
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center sm:text-left space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{affirmation.tierBadge}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {affirmation.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-medium">
              Evaluasi Hasil HOTS Geometri untuk:{' '}
              <strong className="underline underline-offset-4 font-bold">{studentName || 'Murid Berprestasi'}</strong>
              {schoolName ? ` • ${schoolName}` : ''}
            </p>
          </div>

          {/* Big Score Pill */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-5 text-center min-w-44 shrink-0 shadow-inner">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
              Skor Perolehan
            </span>
            <div className="flex items-baseline justify-center space-x-1 my-1">
              <span className="text-5xl font-black text-amber-200">{score}</span>
              <span className="text-lg font-bold text-white/80">/ 100</span>
            </div>
            <span className="text-xs font-semibold text-white/90">
              {correctCount} dari {totalQuestions} Soal Benar
            </span>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="p-4 sm:p-5 bg-orange-50/60 border-b border-orange-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-white p-3 rounded-2xl border border-orange-100 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Jawaban Benar</span>
          <span className="text-xl font-black text-emerald-600">{correctCount} Soal (+{correctCount * 20} Poin)</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-orange-100 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Perlu Evaluasi</span>
          <span className="text-xl font-black text-rose-500">{totalQuestions - correctCount} Soal</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-orange-100 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Akurasi HOTS</span>
          <span className="text-xl font-black text-orange-600">{score}%</span>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-orange-100 shadow-2xs">
          <span className="text-[11px] text-slate-500 font-medium block">Waktu Selesai</span>
          <span className="text-sm font-bold text-slate-700 mt-1 block">{formatTime(timeSpentSeconds)}</span>
        </div>
      </div>

      {/* Growth Mindset Content Card */}
      <div className="p-6 sm:p-8 space-y-6">
        <div className={`p-5 sm:p-6 rounded-3xl border ${affirmation.bgColor} ${affirmation.borderColor} space-y-4`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-slate-900">
                Afirmasi Semangat Belajar (Growth Mindset)
              </h3>
              <p className="text-xs text-slate-500">Pesan penguatan proses berpikir untukmu hari ini</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {affirmation.affirmation}
          </p>

          {/* Inspirational Quote */}
          <div className="bg-white/90 p-4 rounded-2xl border border-orange-200/80 text-xs sm:text-sm italic font-serif text-orange-950 flex items-start space-x-2.5">
            <span className="text-2xl text-orange-400 font-black leading-none">“</span>
            <div className="flex-1">
              <p>{affirmation.quote.replace(/^[“”"]|[“”"]$/g, '')}</p>
            </div>
          </div>

          {/* Action Tip */}
          <div className="bg-amber-100/60 p-4 rounded-2xl border border-amber-300 text-xs text-amber-950 flex items-start space-x-2.5">
            <Compass className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5 text-amber-900">Langkah Aksi Berikutnya:</strong>
              <p>{affirmation.actionTip}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 pt-2">
          <button
            onClick={onScrollToSolutions}
            className="flex items-center space-x-2 px-5 py-3 bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition active:scale-98"
          >
            <BookOpen className="w-4 h-4" />
            <span>Lihat Pembahasan & Kunci Jawaban</span>
          </button>

          <button
            onClick={onPrint}
            className="flex items-center space-x-2 px-5 py-3 bg-white hover:bg-orange-50 text-slate-700 font-bold text-xs sm:text-sm rounded-2xl border border-orange-200 shadow-xs transition active:scale-98"
          >
            <Printer className="w-4 h-4 text-orange-600" />
            <span>Cetak Lembar Hasil</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-5 py-3 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-95 cursor-pointer"
            title="Selesai mengerjakan dan berikan giliran ke siswa selanjutnya dengan form kosong"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-100" />
            <span>Selesai & Berikan ke Siswa Selanjutnya</span>
          </button>
        </div>
      </div>
    </div>
  );
};

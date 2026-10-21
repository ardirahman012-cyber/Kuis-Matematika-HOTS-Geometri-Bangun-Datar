import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Printer, CheckCircle2, XCircle, Clock, BookOpen, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { QUESTIONS_DATA } from '../data/questions';
import { ExplanationCard } from './ExplanationCard';
import { CertificateModal } from './CertificateModal';
import { sounds } from '../utils/audio';

interface ResultScreenProps {
  answers: Record<number, 'a' | 'b' | 'c' | 'd'>;
  timeSpentSeconds: number;
  studentName: string;
  studentClass: string;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  answers,
  timeSpentSeconds,
  studentName,
  studentClass,
  onRestart,
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [copied, setCopied] = useState(false);

  // Calculate score
  let correctCount = 0;
  QUESTIONS_DATA.forEach((q) => {
    if (answers[q.id] === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const totalQuestions = QUESTIONS_DATA.length;
  const score = Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    sounds.playComplete();
    if (score >= 80) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  }, [score]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m} menit ${s} detik`;
  };

  const handleShare = () => {
    const text = `Saya mendapatkan nilai ${score}/100 pada Latihan Soal Matematika Bangun Datar Campuran C4!`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const todayStr = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Score Hero Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-blue-800 p-8 text-white text-center relative overflow-hidden">
            <div className="w-20 h-20 mx-auto rounded-full bg-white/20 backdrop-blur-md border-4 border-white/40 flex items-center justify-center shadow-lg mb-4">
              <Award className="w-10 h-10 text-amber-300" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Hasil Evaluasi Matematika C4
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {score >= 80 ? 'Luar Biasa, Prestasi Hebat!' : score >= 60 ? 'Bagus! Terus Tingkatkan!' : 'Perlu Berlatih Lagi!'}
            </h1>
            <p className="text-blue-100 text-sm max-w-md mx-auto mt-2">
              Siswa: <span className="font-bold text-white">{studentName}</span>
              {studentClass && ` • ${studentClass}`}
            </p>

            {/* Score Big Pill */}
            <div className="mt-6 inline-flex flex-col items-center bg-white/10 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/20">
              <div className="flex items-baseline space-x-1">
                <span className="text-6xl sm:text-7xl font-black text-amber-300">{score}</span>
                <span className="text-xl text-blue-200 font-bold">/ 100</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-blue-100 font-semibold mt-1">
                Nilai Akhir Ujian
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">Benar</span>
              <span className="text-2xl font-bold text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
                {correctCount}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">Salah / Kosong</span>
              <span className="text-2xl font-bold text-rose-500 flex items-center justify-center gap-1 mt-0.5">
                <XCircle className="w-5 h-5" />
                {totalQuestions - correctCount}
              </span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">Tingkat Akurasi</span>
              <span className="text-2xl font-bold text-blue-600 mt-0.5 block">{score}%</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs text-slate-500 font-medium block">Waktu Pengerjaan</span>
              <span className="text-base font-bold text-slate-700 flex items-center justify-center gap-1 mt-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                {formatTime(timeSpentSeconds)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-6 bg-white flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-md transition active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sertifikat Prestasi</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Bagikan Nilai'}</span>
            </button>

            <button
              onClick={onRestart}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Latihan</span>
            </button>
          </div>
        </div>

        {/* Pembahasan Lengkap Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Kunci Jawaban & Pembahasan Lengkap
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              5 Butir Soal C4 Menganalisis
            </span>
          </div>

          <div className="space-y-4">
            {QUESTIONS_DATA.map((q) => (
              <ExplanationCard
                key={q.id}
                question={q}
                userAnswer={answers[q.id]}
                defaultExpanded={true}
              />
            ))}
          </div>
        </div>

        {/* Certificate Modal */}
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          studentName={studentName}
          studentClass={studentClass}
          score={score}
          correctCount={correctCount}
          totalQuestions={totalQuestions}
          dateStr={todayStr}
        />
      </div>
    </div>
  );
};

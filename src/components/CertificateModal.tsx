import React, { useRef } from 'react';
import { X, Printer, Award, CheckCircle, Calendar, Star } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentClass: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  dateStr: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  studentClass,
  score,
  correctCount,
  totalQuestions,
  dateStr,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getPredicate = (s: number) => {
    if (s >= 100) return { label: 'SANGAT MEMUASKAN (PERFECT)', color: 'text-amber-600', badge: '🏆 Juara Geometri' };
    if (s >= 80) return { label: 'SANGAT BAIK (EXCELLENT)', color: 'text-emerald-600', badge: '⭐ Mahir Geometri' };
    if (s >= 60) return { label: 'BAIK (GOOD)', color: 'text-blue-600', badge: '👍 Berkembang' };
    return { label: 'CUKUP (PERLU BERLATIH)', color: 'text-slate-600', badge: '📖 Semangat Belajar' };
  };

  const pred = getPredicate(score);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col print:shadow-none print:border-none print:max-w-none">
        {/* Actions bar (hidden in print) */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white print:hidden">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">Sertifikat Prestasi Belajar</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-12 relative bg-white flex flex-col items-center text-center border-8 border-double border-amber-600/30 m-4 rounded-xl"
          style={{
            backgroundImage: 'radial-gradient(#f8fafc 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* Ornamental corner icons */}
          <div className="absolute top-3 left-3 text-amber-500/40">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div className="absolute top-3 right-3 text-amber-500/40">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div className="absolute bottom-3 left-3 text-amber-500/40">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div className="absolute bottom-3 right-3 text-amber-500/40">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>

          {/* Badge Icon */}
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-400 to-amber-200 border-4 border-amber-100 flex items-center justify-center shadow-lg mb-3">
            <Award className="w-9 h-9 text-amber-900" />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-wider text-slate-900 uppercase font-serif">
            Sertifikat Prestasi
          </h2>
          <p className="text-xs uppercase tracking-widest text-amber-700 font-semibold mt-1">
            Latihan Soal Matematika • Bangun Datar Campuran C4
          </p>

          <div className="w-24 h-0.5 bg-amber-400 my-4" />

          <p className="text-xs text-slate-500 italic">Diberikan kepada siswa berprestasi:</p>
          <h3 className="text-2xl sm:text-3xl font-black text-blue-900 mt-2 font-serif underline decoration-amber-400 decoration-2 underline-offset-8">
            {studentName || 'Siswa Berprestasi'}
          </h3>
          <p className="text-xs text-slate-600 mt-3 font-medium">
            {studentClass ? `Kelas / Instansi: ${studentClass}` : 'Peserta Ujian Mandiri'}
          </p>

          <p className="text-xs text-slate-600 max-w-md mt-4 leading-relaxed">
            Telah menyelesaikan evaluasi pemecahan masalah materi <strong>Bangun Datar Campuran (Level Kognitif C4 - Menganalisis)</strong> dengan hasil capaian:
          </p>

          {/* Score Display Card */}
          <div className="mt-5 bg-amber-50/70 border border-amber-200 rounded-2xl p-4 w-full max-w-sm flex items-center justify-around">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Nilai Akhir</span>
              <span className="text-4xl font-black text-amber-600">{score}</span>
              <span className="text-xs text-slate-400 font-bold"> / 100</span>
            </div>
            <div className="h-10 w-px bg-amber-200" />
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block">Ketepatan</span>
              <span className="text-xl font-bold text-slate-800">
                {correctCount} / {totalQuestions} Soal
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold block flex items-center gap-1 justify-center mt-0.5">
                <CheckCircle className="w-3 h-3" /> {(score)}% Benar
              </span>
            </div>
          </div>

          <div className={`mt-3 text-xs font-black uppercase tracking-wider ${pred.color}`}>
            {pred.label} • {pred.badge}
          </div>

          <div className="w-full mt-8 pt-4 border-t border-slate-200 flex items-end justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Tanggal: {dateStr}</span>
            </div>
            <div className="text-right">
              <span className="font-semibold text-slate-700 block">Guru Pembimbing / Sistem CBT</span>
              <span className="text-[10px] text-slate-400 italic">Terverifikasi Otomatis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

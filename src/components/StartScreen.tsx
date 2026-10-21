import React, { useState } from 'react';
import { Play, Sparkles, BookOpen, Clock, Target, CheckCircle2, User, School } from 'lucide-react';

interface StartScreenProps {
  onStart: (studentInfo: { name: string; schoolClass: string; mode: 'exam' | 'practice'; timerMinutes: number }) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [mode, setMode] = useState<'exam' | 'practice'>('exam');
  const [timerMinutes, setTimerMinutes] = useState(15);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({
      name: name.trim() || 'Siswa Mandiri',
      schoolClass: schoolClass.trim() || 'Kelas 6 SD / 7 SMP',
      mode,
      timerMinutes: mode === 'exam' ? timerMinutes : 0,
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-slate-50 to-indigo-50 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Hero Banner */}
        <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Matematika Geometri • Bangun Datar Campuran</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Latihan Soal Matematika
          </h1>
          <p className="text-sm text-blue-100 max-w-md mx-auto mt-2 leading-relaxed">
            Level Kognitif C4 (Menganalisis) • Soal 6 s.d. 10 dilengkapi diagram geometri dan pembahasan bertahap.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="bg-blue-500/40 px-3 py-1 rounded-lg border border-white/20">
              📌 5 Butir Soal C4
            </span>
            <span className="bg-blue-500/40 px-3 py-1 rounded-lg border border-white/20">
              📐 Diagram Asli
            </span>
            <span className="bg-blue-500/40 px-3 py-1 rounded-lg border border-white/20">
              🏆 Sertifikat Nilai
            </span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                Nama Lengkap Siswa
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Pratama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-medium transition"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-blue-600" />
                Kelas / Sekolah
              </label>
              <input
                type="text"
                placeholder="Contoh: Kelas 6 SD / SMPN 1"
                value={schoolClass}
                onChange={(e) => setSchoolClass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-medium transition"
              />
            </div>
          </div>

          {/* Mode Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pilih Mode Pengerjaan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => setMode('exam')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start space-x-3 ${
                  mode === 'exam'
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-100'
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                    mode === 'exam' ? 'border-blue-600 bg-blue-600' : 'border-slate-400'
                  }`}
                >
                  {mode === 'exam' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Mode Simulasi Ujian (CBT)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Waktu dihitung mundur, navigasi palet soal, dan pembahasan lengkap ditampilkan setelah selesai.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setMode('practice')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start space-x-3 ${
                  mode === 'practice'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-100'
                    : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
                    mode === 'practice' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-400'
                  }`}
                >
                  {mode === 'practice' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Mode Latihan Mandiri</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Tanpa batas waktu kaku, bisa langsung intip rumus dan cek kebenaran jawaban di setiap nomor.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Limit Setting for exam */}
          {mode === 'exam' && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Durasi Waktu Pengerjaan</span>
                  <span className="text-[11px] text-slate-500">Standar 3 menit per soal (Total 15 menit)</span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                {[10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimerMinutes(mins)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition ${
                      timerMinutes === mins
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {mins} Menit
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Start CTA */}
          <button
            type="submit"
            className="w-full py-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-98 flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Mulai Mengerjakan Soal</span>
          </button>
        </form>

        {/* Footer info */}
        <div className="px-8 py-3.5 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Materi: Persegi, Persegi Panjang, Segitiga, Lingkaran, Layang-layang, dan Teorema Pythagoras
        </div>
      </div>
    </div>
  );
};

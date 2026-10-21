import { StudentIdentity, EmotionCheckIn, EmotionCheckOutAndReflection } from '../types/quiz';
import { HOTS_QUESTIONS } from '../data/hotsQuestions';
import { getAffirmationForScore } from '../data/affirmations';

interface PrintResultViewProps {
  identity: StudentIdentity;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, string>;
  checkIn?: EmotionCheckIn;
  checkOut?: EmotionCheckOutAndReflection;
  onClose: () => void;
}

export const PrintResultView: React.FC<PrintResultViewProps> = ({
  identity,
  score,
  correctCount,
  totalQuestions,
  timeSpentSeconds,
  userAnswers,
  checkIn,
  checkOut,
  onClose,
}) => {
  const aff = getAffirmationForScore(correctCount);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto p-6 sm:p-10 font-sans text-slate-800">
      {/* Non-print control bar */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between no-print">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
        >
          ← Kembali ke Halaman Kuis
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md transition"
        >
          Cetak Lembar Nilai (PDF / Printer)
        </button>
      </div>

      {/* Printable Sheet */}
      <div className="max-w-3xl mx-auto border-2 border-slate-300 p-8 sm:p-10 rounded-2xl bg-white space-y-6">
        {/* Official Header */}
        <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-900">
            LEMBAR HASIL EVALUASI MATEMATIKA HOTS
          </h1>
          <h2 className="text-sm font-extrabold text-orange-800 uppercase tracking-widest">
            MATERI: GEOMETRI BANGUN DATAR (LEVEL KOGNITIF C4 – C6)
          </h2>
          <p className="text-xs text-slate-500">
            Asesmen Berbasis Penalaran Kritis & Pemecahan Masalah Kontekstual
          </p>
        </div>

        {/* Student Identity Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-500">Nama Lengkap Murid:</span>
            <div className="font-extrabold text-sm text-slate-900">{identity.name || '-'}</div>
          </div>
          <div>
            <span className="text-slate-500">Asal Sekolah:</span>
            <div className="font-extrabold text-sm text-orange-950">{identity.schoolName || '-'}</div>
          </div>
          <div>
            <span className="text-slate-500">Kelas / No. Absen:</span>
            <div className="font-bold text-slate-800">
              {identity.studentClass || '-'} / Absen {identity.absenceNumber || '-'}
            </div>
          </div>
          <div>
            <span className="text-slate-500">Tanggal & Durasi Pengerjaan:</span>
            <div className="font-bold text-slate-800">
              {identity.date} ({Math.round(timeSpentSeconds / 60)} menit)
            </div>
          </div>
        </div>

        {/* Score & Tier Card */}
        <div className="border border-orange-300 bg-orange-50/50 rounded-2xl p-5 flex items-center justify-around text-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Nilai Akhir
            </span>
            <span className="text-5xl font-black text-orange-600">{score}</span>
            <span className="text-xs font-bold text-slate-400"> / 100</span>
          </div>
          <div className="h-12 w-px bg-orange-200" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Capaian Soal
            </span>
            <span className="text-2xl font-black text-slate-900">
              {correctCount} / {totalQuestions} Benar
            </span>
            <span className="text-xs font-bold text-emerald-700 block mt-0.5">
              Predikat: {aff.tierBadge}
            </span>
          </div>
        </div>

        {/* Growth Mindset Card */}
        <div className="border border-amber-200 bg-amber-50/60 p-4 rounded-xl space-y-1.5 text-xs">
          <strong className="text-amber-950 font-bold block">
            Catatan Afirmasi Guru (Growth Mindset):
          </strong>
          <p className="text-slate-700 leading-relaxed">{aff.affirmation}</p>
          <p className="text-[11px] italic font-serif text-amber-900 pt-1">{aff.quote}</p>
        </div>

        {/* Table of Questions and Answers */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Daftar Jawaban Murid:
          </h3>
          <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 font-bold">
              <tr>
                <th className="p-2 border-b text-center">No</th>
                <th className="p-2 border-b text-left">Topik Bangun Datar & HOTS</th>
                <th className="p-2 border-b text-center">Jawaban Murid</th>
                <th className="p-2 border-b text-center">Kunci Jawaban</th>
                <th className="p-2 border-b text-center">Status</th>
                <th className="p-2 border-b text-center">Poin</th>
              </tr>
            </thead>
            <tbody>
              {HOTS_QUESTIONS.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <tr key={q.id} className="border-b last:border-none">
                    <td className="p-2 text-center font-bold">{idx + 1}</td>
                    <td className="p-2">
                      <span className="font-bold">{q.shapeType}</span> ({q.cognitiveLevel})
                    </td>
                    <td className="p-2 text-center font-mono font-bold uppercase">
                      {userAns || '-'}
                    </td>
                    <td className="p-2 text-center font-mono font-bold uppercase text-emerald-800">
                      {q.correctAnswer}
                    </td>
                    <td className="p-2 text-center font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700">✓ Tepat</span>
                      ) : (
                        <span className="text-rose-600">✕ Meleset</span>
                      )}
                    </td>
                    <td className="p-2 text-center font-bold font-mono">
                      {isCorrect ? '20' : '0'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Catatan Pembelajaran Sosial Emosional (PSE) & Refleksi Siswa */}
        {(checkIn || checkOut) && (
          <div className="border border-slate-300 rounded-xl p-4 bg-slate-50 space-y-2 text-xs">
            <h4 className="font-extrabold uppercase text-slate-800 tracking-wider">
              Catatan Pembelajaran Sosial Emosional (PSE) & Refleksi Siswa:
            </h4>
            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div>
                <span className="text-slate-500 block">Check-in Emosi Sebelum Kuis:</span>
                <strong>{checkIn?.emoji || '😊'} {checkIn?.emotion || '-'}</strong>
                {checkIn?.readinessNote && (
                  <p className="text-[11px] text-slate-600 mt-0.5 italic">{checkIn.readinessNote}</p>
                )}
              </div>
              <div>
                <span className="text-slate-500 block">Check-out Emosi & Usaha:</span>
                <strong>{checkOut?.emoji || '🥳'} {checkOut?.emotion || '-'} ({checkOut?.effortRating || 5}/5 Bintang)</strong>
                {checkOut?.hardestQuestion && (
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Menantang: <strong>{checkOut.hardestQuestion}</strong>
                  </p>
                )}
              </div>
            </div>
            {checkOut?.learnedConcept && (
              <div className="pt-1 text-[11px] border-t border-slate-200">
                <span className="text-slate-500">Pemahaman baru: </span>
                <span className="font-semibold text-slate-800">{checkOut.learnedConcept}</span>
              </div>
            )}
          </div>
        )}

        {/* Signatures */}
        <div className="pt-6 grid grid-cols-2 text-xs text-center text-slate-600">
          <div>
            <p>Orang Tua / Wali Murid</p>
            <div className="h-16" />
            <p className="font-bold border-t border-slate-400 mx-10 pt-1">( ........................................ )</p>
          </div>
          <div>
            <p>Guru Pembimbing Matematika</p>
            <div className="h-16" />
            <p className="font-bold border-t border-slate-400 mx-10 pt-1">( ........................................ )</p>
          </div>
        </div>
      </div>
    </div>
  );
};

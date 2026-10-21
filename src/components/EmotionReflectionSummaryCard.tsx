import React from 'react';
import { HeartHandshake, Smile, Sparkles, Star, Lightbulb, HelpCircle, ArrowRight } from 'lucide-react';
import { EmotionCheckIn, EmotionCheckOutAndReflection } from '../types/quiz';

interface EmotionReflectionSummaryCardProps {
  checkIn?: EmotionCheckIn;
  checkOut?: EmotionCheckOutAndReflection;
}

export const EmotionReflectionSummaryCard: React.FC<EmotionReflectionSummaryCardProps> = ({
  checkIn,
  checkOut,
}) => {
  if (!checkIn && !checkOut) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-orange-200/90 space-y-5">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-orange-100 pb-3.5">
        <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-black text-slate-900 text-base sm:text-lg">
            Hasil Check-in Emosi & Refleksi Belajar Siswa
          </h3>
          <p className="text-xs text-slate-500">
            Catatan kesiapan emosi sebelum kuis dan refleksi pemahaman bermakna setelah selesai
          </p>
        </div>
      </div>

      {/* Grid: Check-in vs Check-out */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Check-in Emosi */}
        <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
              <Smile className="w-3.5 h-3.5 text-orange-600" />
              Check-in Emosi Awal
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-orange-200 text-orange-800">
              Sebelum Kuis
            </span>
          </div>

          <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-orange-200/80">
            <span className="text-3xl">{checkIn?.emoji || '😊'}</span>
            <div>
              <strong className="text-sm font-extrabold text-slate-900 block">
                {checkIn?.emotion || 'Senang & Yakin'}
              </strong>
              <p className="text-xs text-slate-500 mt-0.5">
                {checkIn?.readinessNote || 'Membaca soal cerita dengan cermat dan tidak terburu-buru.'}
              </p>
            </div>
          </div>
        </div>

        {/* Check-out Emosi + Refleksi */}
        <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Check-out Emosi & Kepuasan
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-800">
              Setelah Kuis
            </span>
          </div>

          <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-amber-200/80">
            <span className="text-3xl">{checkOut?.emoji || '🥳'}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <strong className="text-sm font-extrabold text-slate-900">
                  {checkOut?.emotion || 'Bangga & Puas'}
                </strong>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= (checkOut?.effortRating || 5)
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Tingkat Usaha Diri: <strong>{checkOut?.effortRating || 5} dari 5 Bintang</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Refleksi Pembelajaran Siswa */}
      <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          <span>Rangkuman Refleksi Belajar HOTS:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">Soal Paling Menantang:</span>
            <strong className="text-orange-950 font-bold">
              {checkOut?.hardestQuestion || 'Soal 6 (Sisa Tanah Persegi & Kolam Lingkaran)'}
            </strong>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">Pemahaman Baru yang Didapat:</span>
            <strong className="text-emerald-950 font-bold">
              {checkOut?.learnedConcept || 'Cara mencari luas sisa: Luas Bangun Luar − Luas Bangun Dalam'}
            </strong>
          </div>
        </div>

        {checkOut?.studentNotes && (
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-0.5 font-medium">Catatan Refleksi Pribadi Siswa:</span>
            <p className="text-slate-800 italic">“{checkOut.studentNotes}”</p>
          </div>
        )}
      </div>
    </div>
  );
};

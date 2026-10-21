import React from 'react';
import { User, School, Calendar, Hash, GraduationCap, CheckCircle2, RotateCcw } from 'lucide-react';
import { StudentIdentity } from '../types/quiz';

interface StudentIdentityFormProps {
  identity: StudentIdentity;
  onChange: (updated: Partial<StudentIdentity>) => void;
  onClearForm?: () => void;
  isLocked?: boolean;
}

export const StudentIdentityForm: React.FC<StudentIdentityFormProps> = ({
  identity,
  onChange,
  onClearForm,
  isLocked = false,
}) => {
  const hasData = Boolean(identity.name || identity.absenceNumber || identity.studentClass);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-orange-200/90 space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
              Identitas Siswa Pengerjaan
            </h2>
            <p className="text-xs text-slate-500">
              Lengkapi identitas sebelum mengumpulkan kuis untuk rekapitulasi nilai guru
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!hasData && (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Form Baru Bersih (Siap Diisi)</span>
            </span>
          )}

          {hasData && onClearForm && !isLocked && (
            <button
              type="button"
              onClick={onClearForm}
              className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-bold rounded-xl border border-slate-200 hover:border-rose-200 transition cursor-pointer"
              title="Kosongkan form untuk siswa baru"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Kosongkan Form Siswa</span>
            </button>
          )}

          {identity.name && identity.schoolName && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Identitas Terisi</span>
            </span>
          )}
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Nama Lengkap */}
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-orange-600" />
            Nama Lengkap Murid <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            disabled={isLocked}
            placeholder="Contoh: Muhammad Fatih"
            value={identity.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-orange-200/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-slate-800 bg-orange-50/20 transition disabled:opacity-75 disabled:bg-slate-50"
          />
        </div>

        {/* Asal Sekolah (Wajib diisi) */}
        <div className="lg:col-span-1">
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <School className="w-3.5 h-3.5 text-orange-600" />
            Asal Sekolah <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            disabled={isLocked}
            placeholder="Contoh: SDN Menteng 01"
            value={identity.schoolName}
            onChange={(e) => onChange({ schoolName: e.target.value })}
            className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-orange-200/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-slate-800 bg-orange-50/20 transition disabled:opacity-75 disabled:bg-slate-50"
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
            Kelas
          </label>
          <input
            type="text"
            disabled={isLocked}
            placeholder="Contoh: 6A / 7B"
            value={identity.studentClass}
            onChange={(e) => onChange({ studentClass: e.target.value })}
            className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-orange-200/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-slate-800 bg-orange-50/20 transition disabled:opacity-75 disabled:bg-slate-50"
          />
        </div>

        {/* Nomor Absen */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Hash className="w-3.5 h-3.5 text-orange-600" />
            No. Absen
          </label>
          <input
            type="text"
            disabled={isLocked}
            placeholder="Contoh: 14"
            value={identity.absenceNumber}
            onChange={(e) => onChange({ absenceNumber: e.target.value })}
            className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl border border-orange-200/90 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-slate-800 bg-orange-50/20 transition disabled:opacity-75 disabled:bg-slate-50"
          />
        </div>
      </div>

      {/* Date note */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <div className="flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-orange-500" />
          <span>
            Tanggal Pengerjaan:{' '}
            <input
              type="date"
              disabled={isLocked}
              value={identity.date}
              onChange={(e) => onChange({ date: e.target.value })}
              className="font-bold text-slate-700 bg-transparent border-b border-orange-300 focus:outline-hidden px-1"
            />
          </span>
        </div>
        <span className="text-[10px] text-orange-700 font-medium bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
          * Asal Sekolah wajib diisi untuk pengelompokan rekapitulasi guru
        </span>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  Lock,
  Unlock,
  School,
  Users,
  TrendingUp,
  Award,
  Search,
  ArrowUpDown,
  Download,
  Trash2,
  Edit3,
  Eye,
  KeyRound,
  FileSpreadsheet,
  PlusCircle,
  X,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { StudentSubmission } from '../types/quiz';
import { getAffirmationForScore } from '../data/affirmations';
import { HOTS_QUESTIONS } from '../data/hotsQuestions';

interface TeacherPortalProps {
  submissions: StudentSubmission[];
  onUpdateSubmissions: (newList: StudentSubmission[]) => void;
  onClosePortal: () => void;
  isFormulaAllowed: boolean;
  onToggleFormulaAllowed: (allowed: boolean) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({
  submissions,
  onUpdateSubmissions,
  onClosePortal,
  isFormulaAllowed,
  onToggleFormulaAllowed,
}) => {
  // Authentication State
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedPin, setStoredPin] = useState<string>(() => {
    return localStorage.getItem('hots_teacher_pin') || '1234';
  });
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');

  // Filtering & Sorting State
  const [selectedSchool, setSelectedSchool] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score-desc' | 'score-asc' | 'date-desc' | 'name-asc'>('score-desc');

  // Modals for Actions
  const [viewingSubmission, setViewingSubmission] = useState<StudentSubmission | null>(null);
  const [editingSubmission, setEditingSubmission] = useState<StudentSubmission | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Handle PIN verification
  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === storedPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN keamanan salah! Silakan coba lagi (Default PIN: 1234)');
    }
  };

  const handleKeypadPress = (digit: string) => {
    if (pinInput.length < 4) {
      const next = pinInput + digit;
      setPinInput(next);
      if (next.length === 4) {
        if (next === storedPin) {
          setIsAuthenticated(true);
          setPinError('');
        } else {
          setPinError('PIN keamanan salah! (Default PIN: 1234)');
          setTimeout(() => setPinInput(''), 600);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPinInput((prev) => prev.slice(0, -1));
    setPinError('');
  };

  const handleSaveNewPin = () => {
    if (newPinInput.length === 4 && /^\d+$/.test(newPinInput)) {
      localStorage.setItem('hots_teacher_pin', newPinInput);
      setStoredPin(newPinInput);
      setIsChangingPin(false);
      setNewPinInput('');
      alert('PIN Guru berhasil diubah!');
    } else {
      alert('PIN harus terdiri dari 4 digit angka!');
    }
  };

  // Unique list of schools
  const uniqueSchools = useMemo(() => {
    const schools = new Set<string>();
    submissions.forEach((s) => {
      if (s.schoolName?.trim()) {
        schools.add(s.schoolName.trim());
      }
    });
    return Array.from(schools);
  }, [submissions]);

  // Filtered & Sorted Submissions
  const filteredSubmissions = useMemo(() => {
    let result = submissions;

    // Filter by school
    if (selectedSchool !== 'ALL') {
      result = result.filter(
        (s) => s.schoolName?.trim().toLowerCase() === selectedSchool.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.studentName.toLowerCase().includes(q) ||
          s.schoolName.toLowerCase().includes(q) ||
          s.studentClass.toLowerCase().includes(q) ||
          s.absenceNumber.toLowerCase().includes(q)
      );
    }

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'score-desc') return b.score - a.score;
      if (sortBy === 'score-asc') return a.score - b.score;
      if (sortBy === 'date-desc') return b.timestamp - a.timestamp;
      if (sortBy === 'name-asc') return a.studentName.localeCompare(b.studentName);
      return 0;
    });
  }, [submissions, selectedSchool, searchQuery, sortBy]);

  // KPI Calculations
  const stats = useMemo(() => {
    const list =
      selectedSchool === 'ALL'
        ? submissions
        : submissions.filter((s) => s.schoolName?.trim().toLowerCase() === selectedSchool.toLowerCase());

    const total = list.length;
    if (total === 0) {
      return { total: 0, avg: 0, max: 0, min: 0, passCount: 0, passRate: 0 };
    }

    const sum = list.reduce((acc, curr) => acc + curr.score, 0);
    const avg = Math.round(sum / total);
    const max = Math.max(...list.map((s) => s.score));
    const min = Math.min(...list.map((s) => s.score));
    const passCount = list.filter((s) => s.score >= 60).length;
    const passRate = Math.round((passCount / total) * 100);

    return { total, avg, max, min, passCount, passRate };
  }, [submissions, selectedSchool]);

  // Dummy Data Generator
  const handleGenerateDummyData = () => {
    const sampleSchools = ['SDN Menteng 01', 'SMP Nusa Bangsa', 'SD Cendekia Harapan', 'SMP Bintang Kejora'];
    const sampleNames = [
      { name: 'Ahmad Raihan Pratama', school: 'SDN Menteng 01', class: '6A', abs: '03', score: 100, correct: 5 },
      { name: 'Aisyah Putri Azzahra', school: 'SDN Menteng 01', class: '6A', abs: '05', score: 80, correct: 4 },
      { name: 'Bagas Aditya Nugraha', school: 'SMP Nusa Bangsa', class: '7B', abs: '08', score: 60, correct: 3 },
      { name: 'Cantika Dewi Lestari', school: 'SMP Nusa Bangsa', class: '7B', abs: '11', score: 100, correct: 5 },
      { name: 'Davin Maulana Malik', school: 'SD Cendekia Harapan', class: '6B', abs: '14', score: 80, correct: 4 },
      { name: 'Farhan Rizky Ramadhan', school: 'SD Cendekia Harapan', class: '6B', abs: '18', score: 40, correct: 2 },
      { name: 'Gisella Natasha Putri', school: 'SMP Bintang Kejora', class: '7A', abs: '19', score: 80, correct: 4 },
      { name: 'Hafiz Al-Fathir', school: 'SMP Bintang Kejora', class: '7A', abs: '22', score: 20, correct: 1 },
      { name: 'Kania Salsabila', school: 'SDN Menteng 01', class: '6A', abs: '25', score: 60, correct: 3 },
    ];

    const newSubmissions: StudentSubmission[] = sampleNames.map((s, idx) => ({
      id: `sample-${Date.now()}-${idx}`,
      timestamp: Date.now() - idx * 3600000 * 2,
      studentName: s.name,
      absenceNumber: s.abs,
      studentClass: s.class,
      schoolName: s.school,
      date: new Date().toISOString().split('T')[0],
      score: s.score,
      answers: s.correct === 5
        ? { 1: 'b', 2: 'd', 3: 'd', 4: 'c', 5: 'd' }
        : s.correct === 4
        ? { 1: 'b', 2: 'd', 3: 'd', 4: 'c', 5: 'a' }
        : s.correct === 3
        ? { 1: 'b', 2: 'd', 3: 'd', 4: 'a', 5: 'a' }
        : s.correct === 2
        ? { 1: 'b', 2: 'd', 3: 'a', 4: 'a', 5: 'a' }
        : { 1: 'b', 2: 'a', 3: 'a', 4: 'a', 5: 'a' },
      correctCount: s.correct,
      totalQuestions: 5,
      timeSpentSeconds: 420 + idx * 45,
    }));

    const merged = [...newSubmissions, ...submissions];
    onUpdateSubmissions(merged);
    localStorage.setItem('hots_geometri_submissions', JSON.stringify(merged));
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredSubmissions.length === 0) {
      alert('Tidak ada data nilai murid untuk diekspor!');
      return;
    }

    const headers = [
      'No',
      'Asal Sekolah',
      'Nama Murid',
      'No Absen',
      'Kelas',
      'Tanggal Pengerjaan',
      'Benar (Soal)',
      'Salah (Soal)',
      'Skor Akhir (100)',
      'Predikat Afirmasi',
      'Durasi (Detik)',
    ];

    const rows = filteredSubmissions.map((s, idx) => {
      const aff = getAffirmationForScore(s.correctCount);
      return [
        idx + 1,
        `"${s.schoolName}"`,
        `"${s.studentName}"`,
        `"${s.absenceNumber}"`,
        `"${s.studentClass}"`,
        `"${s.date}"`,
        s.correctCount,
        s.totalQuestions - s.correctCount,
        s.score,
        `"${aff.tierBadge}"`,
        s.timeSpentSeconds,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_HOTS_Geometri_${selectedSchool}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Delete submission
  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter((s) => s.id !== id);
    onUpdateSubmissions(updated);
    localStorage.setItem('hots_geometri_submissions', JSON.stringify(updated));
    setDeletingId(null);
  };

  // Save edited submission
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubmission) return;

    const updated = submissions.map((s) =>
      s.id === editingSubmission.id ? editingSubmission : s
    );
    onUpdateSubmissions(updated);
    localStorage.setItem('hots_geometri_submissions', JSON.stringify(updated));
    setEditingSubmission(null);
  };

  // If Not Authenticated: Show PIN Pad Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl border border-orange-200/90 p-6 sm:p-8 max-w-sm w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-linear-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Portal Khusus Guru</h2>
            <p className="text-xs text-slate-500 mt-1">
              Masukkan 4 digit PIN keamanan guru untuk mengakses rekapitulasi nilai murid
            </p>
          </div>

          {/* PIN Indicators */}
          <div className="flex items-center justify-center space-x-3 my-2">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  pinInput.length > idx
                    ? 'bg-orange-500 border-orange-500 scale-110 shadow-xs'
                    : 'border-slate-300 bg-slate-50'
                }`}
              />
            ))}
          </div>

          {pinError && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 animate-fadeIn">
              {pinError}
            </p>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => handleKeypadPress(digit)}
                className="h-12 rounded-2xl bg-slate-50 hover:bg-orange-50 active:bg-orange-100 text-slate-800 font-bold text-lg border border-slate-200 shadow-2xs transition"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPinInput('')}
              className="h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200 transition"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => handleKeypadPress('0')}
              className="h-12 rounded-2xl bg-slate-50 hover:bg-orange-50 active:bg-orange-100 text-slate-800 font-bold text-lg border border-slate-200 shadow-2xs transition"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="h-12 rounded-2xl bg-slate-50 hover:bg-rose-50 text-slate-700 font-bold text-xs border border-slate-200 transition"
            >
              Hapus
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            Default PIN Guru: <span className="font-mono font-bold text-orange-600">1234</span>
          </div>

          <button
            onClick={onClosePortal}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
          >
            Kembali ke Latihan Siswa
          </button>
        </div>
      </div>
    );
  }

  // Authenticated Teacher Portal Dashboard
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-orange-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md">
            <School className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-slate-900 text-base sm:text-lg">
                Portal Rekapitulasi Guru
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <Unlock className="w-3 h-3" /> Terbuka
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Pengelompokan data nilai HOTS Geometri otomatis berdasarkan Asal Sekolah murid
            </p>
          </div>
        </div>

        {/* Top Actions: Lock, Change PIN, Demo Data */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerateDummyData}
            className="flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition"
            title="Tambahkan 9 data simulasi murid"
          >
            <PlusCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>+ Data Contoh Demo</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Ekspor Excel/CSV</span>
          </button>

          <button
            onClick={() => setIsChangingPin(true)}
            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
            title="Ganti PIN Guru"
          >
            <KeyRound className="w-4 h-4 text-orange-600" />
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Kunci Portal</span>
          </button>
        </div>
      </div>

      {/* CARD KHUSUS PERATURAN GURU: KONTROL AKSES BUKU RUMUS MURID */}
      <div className="bg-linear-to-r from-amber-50/90 via-orange-50/80 to-amber-50/90 rounded-3xl p-5 sm:p-6 shadow-sm border-2 border-orange-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                isFormulaAllowed
                  ? 'bg-linear-to-tr from-emerald-500 to-teal-600 text-white'
                  : 'bg-linear-to-tr from-rose-500 to-red-600 text-white'
              }`}
            >
              {isFormulaAllowed ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-black text-slate-900 text-sm sm:text-base">
                  Peraturan Akses Buku Rumus untuk Murid
                </h3>
                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                    isFormulaAllowed
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border-rose-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full animate-ping inline-block bg-current" />
                  {isFormulaAllowed ? 'STATUS: DIIZINKAN (AKTIF)' : 'STATUS: DIKUNCI (NONAKTIF)'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {isFormulaAllowed ? (
                  <>
                    <strong className="text-emerald-800">Buku Rumus diaktifkan:</strong> Murid dapat membuka panduan rumus bangun datar selama kuis untuk membantu memahami konsep.
                  </>
                ) : (
                  <>
                    <strong className="text-rose-800">Buku Rumus dinonaktifkan:</strong> Ikon Buku Rumus di sisi murid dikunci. Murid diarahkan mengingat rumus dan mengasah logika mandiri tanpa contekan.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Tombol Aksi Pengaturan */}
          <div className="shrink-0 self-start sm:self-center">
            <button
              onClick={() => onToggleFormulaAllowed(!isFormulaAllowed)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer shadow-md active:scale-95 ${
                isFormulaAllowed
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              {isFormulaAllowed ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Kunci / Nonaktifkan Buku Rumus</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Buka / Izinkan Buku Rumus</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* School Filter Tabs */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-orange-200 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
          <span className="flex items-center gap-1.5">
            <School className="w-4 h-4 text-orange-600" />
            Pilih Kelompok Asal Sekolah:
          </span>
          <span className="text-[11px] text-slate-400">
            {uniqueSchools.length} Sekolah Terdaftar
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedSchool('ALL')}
            className={`px-4 py-2 rounded-2xl text-xs font-black shrink-0 transition flex items-center space-x-1.5 ${
              selectedSchool === 'ALL'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-orange-50/70 hover:bg-orange-100/70 text-slate-700 border border-orange-200'
            }`}
          >
            <span>Semua Sekolah ({submissions.length})</span>
          </button>

          {uniqueSchools.map((sch) => {
            const count = submissions.filter(
              (s) => s.schoolName?.trim().toLowerCase() === sch.toLowerCase()
            ).length;
            const isSelected = selectedSchool.toLowerCase() === sch.toLowerCase();

            return (
              <button
                key={sch}
                onClick={() => setSelectedSchool(sch)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white hover:bg-orange-50 text-slate-700 border border-orange-200/90'
                }`}
              >
                <span>{sch}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-800'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* KPI Statistic Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-3xl border border-orange-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Murid</span>
            <Users className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.total}</div>
          <span className="text-[10px] text-slate-400 block">Peserta Evaluasi</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-orange-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Rata-rata Nilai</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-600">{stats.avg}</div>
          <span className="text-[10px] text-slate-400 block">Skala 0 - 100</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-orange-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Nilai Tertinggi</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{stats.max}</div>
          <span className="text-[10px] text-slate-400 block">Skor Maksimal</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-orange-200/90 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Nilai Terendah</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-500">{stats.min}</div>
          <span className="text-[10px] text-slate-400 block">Perlu Remedial</span>
        </div>

        <div className="bg-white p-4 rounded-3xl border border-orange-200/90 shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Ketuntasan (≥60)</span>
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-600">{stats.passRate}%</div>
          <span className="text-[10px] text-slate-400 block">{stats.passCount} dari {stats.total} murid tuntas</span>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-orange-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-6">
        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari nama, kelas, absen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-2xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-200"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 text-xs font-bold rounded-2xl border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
            >
              <option value="score-desc">Nilai Tertinggi ➔ Terendah</option>
              <option value="score-asc">Nilai Terendah ➔ Tertinggi</option>
              <option value="date-desc">Tanggal Terbaru</option>
              <option value="name-asc">Nama Murid (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-orange-50/70 text-slate-700 font-extrabold uppercase tracking-wider text-[11px] border-b border-orange-100">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Asal Sekolah</th>
                <th className="py-3 px-4">Nama Murid</th>
                <th className="py-3 px-4">Absen</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4 text-center">Benar / Soal</th>
                <th className="py-3 px-4 text-center">Skor & Afirmasi</th>
                <th className="py-3 px-4 text-center">Aksi Guru</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm">Belum ada data pengerjaan murid yang sesuai.</p>
                    <p className="text-xs mt-1">Siswa dapat mengerjakan kuis, atau klik tombol "+ Data Contoh Demo" di atas.</p>
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map((sub, idx) => {
                  const aff = getAffirmationForScore(sub.correctCount);
                  return (
                    <tr key={sub.id} className="hover:bg-orange-50/30 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-3.5 px-4 font-semibold text-orange-950">
                        <span className="px-2 py-0.5 rounded-lg bg-orange-100/70 border border-orange-200">
                          {sub.schoolName || 'Umum'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-black text-slate-900">{sub.studentName}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono">{sub.absenceNumber || '-'}</td>
                      <td className="py-3.5 px-4 text-slate-600">{sub.studentClass || '-'}</td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono">{sub.date}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          {sub.correctCount} / {sub.totalQuestions}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="font-black text-sm text-slate-900">{sub.score}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                            {aff.tierBadge}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button
                            onClick={() => setViewingSubmission(sub)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-900 transition"
                            title="Lihat Detail Lembar Jawaban"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingSubmission(sub)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition"
                            title="Edit Data Nilai"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingId(sub.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 transition"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View Details */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-orange-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-orange-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Rincian Lembar Jawaban Murid
                </h3>
              </div>
              <button
                onClick={() => setViewingSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile snapshot */}
            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 text-xs grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block">Nama Murid:</span>
                <strong className="text-sm text-slate-900">{viewingSubmission.studentName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Asal Sekolah:</span>
                <strong className="text-sm text-orange-900">{viewingSubmission.schoolName}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Kelas / Absen:</span>
                <strong className="text-slate-800">
                  {viewingSubmission.studentClass || '-'} / No. {viewingSubmission.absenceNumber || '-'}
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Tanggal & Waktu:</span>
                <strong className="text-slate-800">
                  {viewingSubmission.date} ({Math.round(viewingSubmission.timeSpentSeconds / 60)} menit)
                </strong>
              </div>
            </div>

            {/* Score & Affirmation Tier */}
            {(() => {
              const aff = getAffirmationForScore(viewingSubmission.correctCount);
              return (
                <div className={`p-4 rounded-2xl border ${aff.bgColor} ${aff.borderColor} space-y-1.5 text-xs`}>
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-slate-700">Afirmasi Diterima Murid:</span>
                    <span className="font-black text-sm text-orange-700">Skor {viewingSubmission.score}/100</span>
                  </div>
                  <p className="font-extrabold text-orange-950">{aff.tierBadge}</p>
                  <p className="text-slate-700 italic">“{aff.affirmation}”</p>
                </div>
              );
            })()}

            {/* Social-Emotional Learning (PSE) & Refleksi Siswa */}
            {(viewingSubmission.checkInEmotion || viewingSubmission.checkOutReflection) && (
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/90 space-y-2.5 text-xs">
                <div className="flex items-center justify-between font-extrabold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Asesmen Emosi & Refleksi Siswa (PSE)
                  </span>
                  {viewingSubmission.checkOutReflection?.effortRating && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900">
                      Usaha: {viewingSubmission.checkOutReflection.effortRating} / 5 ⭐
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="text-slate-500 block text-[11px]">Check-in Emosi Awal:</span>
                    <strong className="text-slate-900">
                      {viewingSubmission.checkInEmotion?.emoji || '😊'} {viewingSubmission.checkInEmotion?.emotion || 'Senang'}
                    </strong>
                    {viewingSubmission.checkInEmotion?.readinessNote && (
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 italic">
                        {viewingSubmission.checkInEmotion.readinessNote}
                      </p>
                    )}
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70">
                    <span className="text-slate-500 block text-[11px]">Check-out Emosi Pasca-Kuis:</span>
                    <strong className="text-slate-900">
                      {viewingSubmission.checkOutReflection?.emoji || '🥳'} {viewingSubmission.checkOutReflection?.emotion || 'Bangga & Puas'}
                    </strong>
                    {viewingSubmission.checkOutReflection?.hardestQuestion && (
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Menantang: <strong>{viewingSubmission.checkOutReflection.hardestQuestion}</strong>
                      </p>
                    )}
                  </div>
                </div>

                {viewingSubmission.checkOutReflection?.learnedConcept && (
                  <div className="bg-white p-2.5 rounded-xl border border-amber-200/70 text-[11px]">
                    <span className="text-slate-500 block">Refleksi Pemahaman Baru:</span>
                    <p className="font-semibold text-slate-800">
                      {viewingSubmission.checkOutReflection.learnedConcept}
                    </p>
                    {viewingSubmission.checkOutReflection.studentNotes && (
                      <p className="text-slate-600 italic mt-1 border-t border-slate-100 pt-1">
                        Catatan: “{viewingSubmission.checkOutReflection.studentNotes}”
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Answers Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Jawaban Tiap Nomor:
              </span>
              <div className="space-y-2">
                {HOTS_QUESTIONS.map((q) => {
                  const userAns = viewingSubmission.answers[q.id];
                  const isCorrect = userAns === q.correctAnswer;
                  return (
                    <div
                      key={q.id}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                      }`}
                    >
                      <div>
                        <strong className="block text-slate-800">
                          Soal {q.id} ({q.shapeType} - {q.cognitiveLevel})
                        </strong>
                        <span className="text-slate-500">
                          Pilihan Murid: <strong className="uppercase">{userAns || 'Kosong'}</strong> • Kunci: <strong className="text-emerald-700 uppercase">{q.correctAnswer}</strong>
                        </span>
                      </div>
                      <span className={`font-black text-xs ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {isCorrect ? '+20 Poin' : '0 Poin'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingSubmission(null)}
                className="px-5 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Submission */}
      {editingSubmission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-orange-200"
          >
            <div className="flex items-center justify-between border-b border-orange-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">Edit Data & Nilai Murid</h3>
              <button
                type="button"
                onClick={() => setEditingSubmission(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Murid</label>
                <input
                  type="text"
                  required
                  value={editingSubmission.studentName}
                  onChange={(e) =>
                    setEditingSubmission({ ...editingSubmission, studentName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Asal Sekolah</label>
                <input
                  type="text"
                  required
                  value={editingSubmission.schoolName}
                  onChange={(e) =>
                    setEditingSubmission({ ...editingSubmission, schoolName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <input
                    type="text"
                    value={editingSubmission.studentClass}
                    onChange={(e) =>
                      setEditingSubmission({ ...editingSubmission, studentClass: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No. Absen</label>
                  <input
                    type="text"
                    value={editingSubmission.absenceNumber}
                    onChange={(e) =>
                      setEditingSubmission({ ...editingSubmission, absenceNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Jumlah Benar (0 - 5)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={editingSubmission.correctCount}
                  onChange={(e) => {
                    const c = Math.min(5, Math.max(0, parseInt(e.target.value) || 0));
                    setEditingSubmission({
                      ...editingSubmission,
                      correctCount: c,
                      score: c * 20,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-orange-500"
                />
                <span className="text-[10px] text-slate-500">
                  Skor Otomatis: {editingSubmission.correctCount * 20} Poin
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingSubmission(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-rose-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900">Hapus Data Nilai Murid?</h3>
            <p className="text-xs text-slate-500">
              Tindakan ini permanen dan akan menghapus data pengerjaan ini dari rekapitulasi nilai.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setDeletingId(null)}
                className="py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteSubmission(deletingId)}
                className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Change Teacher PIN */}
      {isChangingPin && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-orange-200">
            <div className="flex items-center justify-between border-b border-orange-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-orange-600" />
                Ubah PIN Guru Baru
              </h3>
              <button onClick={() => setIsChangingPin(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="block text-slate-600">Masukkan 4 digit PIN baru:</label>
              <input
                type="password"
                maxLength={4}
                placeholder="Contoh: 5678"
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center tracking-widest text-lg font-mono py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setIsChangingPin(false)}
                className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 text-slate-600"
              >
                Batal
              </button>
              <button
                onClick={handleSaveNewPin}
                className="px-4 py-1.5 text-xs font-bold rounded-xl bg-orange-600 text-white"
              >
                Simpan PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

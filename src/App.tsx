import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  BookOpen,
  PenTool,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flag,
  Award,
  RotateCcw,
  Layers,
  ChevronLeft,
  ChevronRight,
  School,
  UserCheck,
  ShieldAlert,
  Send,
  Printer,
  Bookmark,
  UserPlus,
  Lock,
  Unlock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOTS_QUESTIONS } from './data/hotsQuestions';
import { getAffirmationForScore } from './data/affirmations';
import {
  StudentIdentity,
  OptionKey,
  StudentSubmission,
  EmotionCheckIn,
  EmotionCheckOutAndReflection,
} from './types/quiz';
import { StudentIdentityForm } from './components/StudentIdentityForm';
import { QuestionCard } from './components/QuestionCard';
import { ScoreAffirmationCard } from './components/ScoreAffirmationCard';
import { DetailedSolutions } from './components/DetailedSolutions';
import { TeacherPortal } from './components/TeacherPortal';
import { PrintResultView } from './components/PrintResultView';
import { Scratchpad } from './components/Scratchpad';
import { FormulaModal } from './components/FormulaModal';
import { EmotionCheckInCard } from './components/EmotionCheckInCard';
import { EmotionCheckOutModal } from './components/EmotionCheckOutModal';
import { EmotionReflectionSummaryCard } from './components/EmotionReflectionSummaryCard';

export default function App() {
  // Navigation Tab: 'student' | 'teacher'
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');

  // Student Identity State (Persisted in localStorage)
  const [identity, setIdentity] = useState<StudentIdentity>(() => {
    const saved = localStorage.getItem('hots_student_identity');
    const today = new Date().toISOString().split('T')[0];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || '',
          absenceNumber: parsed.absenceNumber || '',
          studentClass: parsed.studentClass || '',
          schoolName: parsed.schoolName || '',
          date: parsed.date || today,
        };
      } catch {
        // ignore
      }
    }
    return {
      name: '',
      absenceNumber: '',
      studentClass: '',
      schoolName: '',
      date: today,
    };
  });

  // Save Identity to localStorage on update
  const handleIdentityChange = (updated: Partial<StudentIdentity>) => {
    setIdentity((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('hots_student_identity', JSON.stringify(next));
      return next;
    });
  };

  // Question Display Mode: 'all' (Semua Soal) vs 'single' (Satu per Satu)
  const [viewMode, setViewMode] = useState<'all' | 'single'>('single');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Student Answers & Flags
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

  // Submission Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmSubmitOpen, setIsConfirmSubmitOpen] = useState(false);
  const [isCheckOutModalOpen, setIsCheckOutModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Social-Emotional Learning (SEL / PSE) Check-in & Check-out States
  const [checkInEmotion, setCheckInEmotion] = useState<EmotionCheckIn>({
    emotion: 'Bersemangat',
    emoji: '🤩',
    readinessNote: '🎯 Membaca setiap soal cerita dengan cermat dan tidak terburu-buru.',
  });

  const [checkOutReflection, setCheckOutReflection] = useState<EmotionCheckOutAndReflection>({
    emotion: 'Bangga & Puas',
    emoji: '🥳',
    effortRating: 5,
    hardestQuestion: 'Soal 6',
    learnedConcept: 'Cara mencari luas sisa: Luas Bangun Luar − Luas Bangun Dalam',
    studentNotes: '',
  });

  // Snapshots of emotion & reflection for current submitted student
  const [submittedCheckIn, setSubmittedCheckIn] = useState<EmotionCheckIn | null>(null);
  const [submittedCheckOut, setSubmittedCheckOut] = useState<EmotionCheckOutAndReflection | null>(null);

  // Timer State (counts up in seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Tool Modals
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [isFormulaLockedModalOpen, setIsFormulaLockedModalOpen] = useState(false);
  const [newStudentBanner, setNewStudentBanner] = useState(false);

  // Peraturan Khusus Guru: Mengaktifkan / Menonaktifkan Buku Rumus untuk Murid
  const [isFormulaAllowed, setIsFormulaAllowed] = useState<boolean>(() => {
    const saved = localStorage.getItem('hots_allow_formula_book');
    return saved !== null ? saved === 'true' : true;
  });

  const handleToggleFormulaAllowed = (allowed: boolean) => {
    setIsFormulaAllowed(allowed);
    localStorage.setItem('hots_allow_formula_book', String(allowed));
  };

  const handleOpenFormulaModal = () => {
    if (!isFormulaAllowed) {
      setIsFormulaLockedModalOpen(true);
    } else {
      setIsFormulaOpen(true);
    }
  };

  // Submissions Database (Persisted in localStorage)
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    const saved = localStorage.getItem('hots_geometri_submissions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Timer Tick
  useEffect(() => {
    if (!isTimerRunning || isSubmitted || activeTab !== 'student') return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted, activeTab]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Option selection
  const handleSelectOption = (questionId: number, key: OptionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: key,
    }));
  };

  // Flag toggle
  const handleToggleFlag = (questionId: number) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  // Calculate Scores
  const { correctCount, score } = useMemo(() => {
    let correct = 0;
    HOTS_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correctCount: correct,
      score: correct * 20,
    };
  }, [answers]);

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const totalQuestions = HOTS_QUESTIONS.length;
  const affirmation = getAffirmationForScore(correctCount);

  // Pre-submit validation
  const handleAttemptSubmit = () => {
    if (!identity.schoolName.trim()) {
      alert('Mohon isi kolom "Asal Sekolah" di formulir identitas siswa untuk pengelompokan data guru!');
      const el = document.getElementById('identity-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!identity.name.trim()) {
      if (!window.confirm('Nama murid masih kosong. Apakah Anda ingin tetap mengumpulkan kuis ini?')) {
        return;
      }
    }

    // Buka modal Check-out Emosi & Refleksi Siswa yang disatukan
    setIsCheckOutModalOpen(true);
  };

  // Track the student who submitted the current results (for display in score card)
  const [submittedStudent, setSubmittedStudent] = useState<{
    name: string;
    schoolName: string;
    class: string;
    absenceNumber: string;
  }>({
    name: '',
    schoolName: '',
    class: '',
    absenceNumber: '',
  });

  // Final Submit with Emotion Check-out & Reflection
  const handleConfirmSubmit = () => {
    setIsCheckOutModalOpen(false);
    setIsConfirmSubmitOpen(false);
    setIsSubmitted(true);
    setIsTimerRunning(false);

    const studentNameRecorded = identity.name.trim() || 'Murid Mandiri';
    const schoolNameRecorded = identity.schoolName.trim() || 'Sekolah Belum Terdata';

    // Simpan snapshot emosi & refleksi untuk siswa yang baru submit
    setSubmittedCheckIn({ ...checkInEmotion });
    setSubmittedCheckOut({ ...checkOutReflection });

    // Simpan data siswa yang baru submit untuk ditampilkan di kartu hasil & sertifikat
    setSubmittedStudent({
      name: studentNameRecorded,
      schoolName: schoolNameRecorded,
      class: identity.studentClass.trim(),
      absenceNumber: identity.absenceNumber.trim(),
    });

    // Save record to submissions database for teacher portal
    const newSubmission: StudentSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      studentName: studentNameRecorded,
      absenceNumber: identity.absenceNumber.trim(),
      studentClass: identity.studentClass.trim(),
      schoolName: schoolNameRecorded,
      date: identity.date,
      answers,
      score,
      correctCount,
      totalQuestions,
      timeSpentSeconds: elapsedSeconds,
      checkInEmotion: { ...checkInEmotion },
      checkOutReflection: { ...checkOutReflection },
    };

    const updatedSubmissions = [newSubmission, ...submissions];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('hots_geometri_submissions', JSON.stringify(updatedSubmissions));

    // OTOMATIS KOSONGKAN SELURUH DATA IDENTITAS SISWA:
    // Hapus draft siswa lama dari localStorage agar siswa selanjutnya tinggal mengisi data baru
    localStorage.removeItem('hots_student_identity');

    // Kosongkan form identitas untuk siswa berikutnya (Nama, Sekolah, Kelas, Absen)
    const today = new Date().toISOString().split('T')[0];
    setIdentity({
      name: '',
      absenceNumber: '',
      studentClass: '',
      schoolName: '',
      date: today,
    });

    // Confetti on good score
    if (score >= 60) {
      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f97316', '#fbbf24', '#10b981', '#3b82f6', '#ec4899'],
        });
      } catch {
        // ignore
      }
    }

    // Scroll to results
    setTimeout(() => {
      const resultCard = document.getElementById('score-affirmation-card');
      if (resultCard) {
        resultCard.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  // Mulai sesi kuis baru untuk siswa berikutnya (Form otomatis bersih & kosong)
  const handleStartNextStudent = (clearSchool = true) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.removeItem('hots_student_identity');
    setIdentity({
      name: '',
      absenceNumber: '',
      studentClass: '',
      schoolName: clearSchool ? '' : identity.schoolName,
      date: today,
    });
    setAnswers({});
    setFlagged({});
    setIsSubmitted(false);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setCurrentQuestionIndex(0);
    setCheckInEmotion({
      emotion: 'Bersemangat',
      emoji: '🤩',
      readinessNote: '🎯 Membaca setiap soal cerita dengan cermat dan tidak terburu-buru.',
    });
    setCheckOutReflection({
      emotion: 'Bangga & Puas',
      emoji: '🥳',
      effortRating: 5,
      hardestQuestion: 'Soal 6',
      learnedConcept: 'Cara mencari luas sisa: Luas Bangun Luar − Luas Bangun Dalam',
      studentNotes: '',
    });
    setSubmittedCheckIn(null);
    setSubmittedCheckOut(null);
    setNewStudentBanner(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset quiz
  const handleResetQuiz = () => {
    if (
      window.confirm(
        'Mulai pengerjaan untuk siswa berikutnya? Data identitas dan jawaban saat ini akan di-reset ke kondisi kosong.'
      )
    ) {
      handleStartNextStudent(true);
    }
  };

  const scrollToSolutions = () => {
    const el = document.getElementById('pembahasan-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-200/80 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-linear-to-tr from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Layers className="w-5 sm:w-6 h-5 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-slate-900 text-sm sm:text-base leading-tight tracking-tight">
                  Geometri Bangun Datar HOTS
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200">
                  Level C4 – C6
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden xs:block">
                Kuis Penalaran Geometri & Penilaian Afirmasi Bertumbuh
              </p>
            </div>
          </div>

          {/* Right Navigation & Tools matching header in reference */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* View Switcher: Murid vs Portal Guru */}
            <div className="bg-orange-50/80 p-1 rounded-2xl border border-orange-200/90 flex items-center shadow-2xs">
              <button
                onClick={() => setActiveTab('student')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'student'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kuis Siswa</span>
              </button>
              <button
                onClick={() => setActiveTab('teacher')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center space-x-1.5 cursor-pointer ${
                  activeTab === 'teacher'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <School className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Portal Guru</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </button>
            </div>

            {/* Quick Header Icon Action Buttons */}
            <button
              onClick={() => {
                // If there are flagged questions, scroll to the first one or alert
                if (flaggedCount > 0) {
                  const firstFlaggedIndex = HOTS_QUESTIONS.findIndex(q => flagged[q.id]);
                  if (firstFlaggedIndex !== -1) {
                    if (viewMode === 'single') setCurrentQuestionIndex(firstFlaggedIndex);
                    const el = document.getElementById(`soal-${HOTS_QUESTIONS[firstFlaggedIndex].id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition cursor-pointer ${
                flaggedCount > 0
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-orange-200 bg-white hover:bg-orange-50 text-slate-600'
              }`}
              title={flaggedCount > 0 ? `${flaggedCount} Soal ditandai ragu-ragu` : 'Tandai Ragu'}
            >
              <Bookmark className={`w-4 h-4 ${flaggedCount > 0 ? 'fill-amber-500 text-amber-600' : 'text-orange-600'}`} />
            </button>

            <button
              onClick={() => setIsFormulaOpen(true)}
              className="w-9 h-9 rounded-xl border border-orange-200 bg-white hover:bg-orange-50 text-amber-600 flex items-center justify-center transition cursor-pointer shadow-2xs"
              title="Tips HOTS & Rumus"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              onClick={handleOpenFormulaModal}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition cursor-pointer shadow-2xs relative ${
                isFormulaAllowed
                  ? 'border-orange-200 bg-white hover:bg-orange-50 text-orange-600'
                  : 'border-slate-300 bg-slate-100 text-slate-400'
              }`}
              title={isFormulaAllowed ? 'Buku Rumus Bangun Datar' : 'Buku Rumus Dinonaktifkan Guru'}
            >
              {isFormulaAllowed ? <BookOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 space-y-6">
        {activeTab === 'teacher' ? (
          /* TEACHER PORTAL VIEW */
          <TeacherPortal
            submissions={submissions}
            onUpdateSubmissions={(newList) => setSubmissions(newList)}
            onClosePortal={() => setActiveTab('student')}
            isFormulaAllowed={isFormulaAllowed}
            onToggleFormulaAllowed={handleToggleFormulaAllowed}
          />
        ) : (
          /* STUDENT QUIZ VIEW */
          <div className="space-y-6">
            {/* Notifikasi Sesi Murid Baru setelah menekan tombol Selesai */}
            {newStudentBanner && (
              <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 rounded-3xl p-4 sm:p-5 text-xs text-emerald-950 font-bold flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn shadow-md shadow-emerald-500/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      Sesi Siswa Sebelumnya Telah Selesai!
                    </h4>
                    <p className="text-emerald-800 text-xs mt-0.5">
                      Seluruh isian identitas dan jawaban telah dikosongkan. Silakan murid selanjutnya mengisi nama dan mulai mengerjakan latihan.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setNewStudentBanner(false)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition cursor-pointer shrink-0 shadow-xs"
                >
                  Mulai Mengisi
                </button>
              </div>
            )}

            {/* Identity Form Section */}
            <div id="identity-section">
              <StudentIdentityForm
                identity={identity}
                onChange={(upd) => {
                  setNewStudentBanner(false);
                  handleIdentityChange(upd);
                }}
                onClearForm={() => handleStartNextStudent(true)}
                isLocked={false}
              />
            </div>

            {/* 1. Check-in Emosi Siswa Sebelum Mengerjakan Soal */}
            <EmotionCheckInCard
              checkIn={checkInEmotion}
              onChange={setCheckInEmotion}
              isSubmitted={isSubmitted}
            />

            {/* Quiz Control Bar & Progress Palette */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left: View Mode Toggle & Timer */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-start">
                <div className="flex items-center space-x-1 bg-orange-50/80 p-1 rounded-2xl border border-orange-200">
                  <button
                    onClick={() => setViewMode('single')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      viewMode === 'single'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Satu per Satu
                  </button>
                  <button
                    onClick={() => setViewMode('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      viewMode === 'all'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Semua Soal
                  </button>
                </div>

                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-orange-50/60 border border-orange-200 font-mono font-bold text-xs text-orange-900">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Waktu: {formatTimer(elapsedSeconds)}</span>
                </div>
              </div>

              {/* Right: Question Palette Pills */}
              <div className="flex items-center space-x-2 w-full md:w-auto justify-center md:justify-end overflow-x-auto py-1">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">
                  Nomor:
                </span>
                {HOTS_QUESTIONS.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex && viewMode === 'single';
                  const isAns = answers[q.id] !== undefined;
                  const isFlg = flagged[q.id];

                  let pillColor = 'bg-slate-50 text-slate-700 border-slate-300 hover:border-orange-300';

                  if (isSubmitted) {
                    const isRight = answers[q.id] === q.correctAnswer;
                    pillColor = isRight
                      ? 'bg-emerald-500 text-white border-emerald-600'
                      : 'bg-rose-500 text-white border-rose-600';
                  } else if (isCurrent) {
                    pillColor = 'bg-orange-600 text-white border-orange-600 ring-2 ring-orange-200 font-black';
                  } else if (isFlg) {
                    pillColor = 'bg-amber-400 text-amber-950 border-amber-500 font-bold';
                  } else if (isAns) {
                    pillColor = 'bg-orange-100 text-orange-900 border-orange-300 font-bold';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        if (viewMode === 'all') {
                          const el = document.getElementById(`soal-${q.id}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          setCurrentQuestionIndex(idx);
                        }
                      }}
                      className={`w-9 h-9 rounded-xl border flex flex-col items-center justify-center text-xs transition active:scale-95 ${pillColor}`}
                      title={`Soal ${q.id} (${q.shapeType})`}
                    >
                      <span>{q.id}</span>
                      {isFlg && !isSubmitted && !isCurrent && (
                        <span className="w-1 h-1 rounded-full bg-amber-900" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions View */}
            <div className="space-y-6">
              {(viewMode === 'all'
                ? HOTS_QUESTIONS
                : [HOTS_QUESTIONS[currentQuestionIndex]]
              ).map((q) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  selectedAnswer={answers[q.id]}
                  isFlagged={flagged[q.id]}
                  isSubmitted={isSubmitted}
                  onSelectOption={(key) => handleSelectOption(q.id, key)}
                  onToggleFlag={() => handleToggleFlag(q.id)}
                />
              ))}
            </div>

            {/* Single View Navigation Buttons (Previous / Next) */}
            {viewMode === 'single' && !isSubmitted && (
              <div className="flex items-center justify-between bg-white rounded-3xl p-4 shadow-xs border border-orange-200">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition ${
                    currentQuestionIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-white hover:bg-orange-50 text-slate-700 border-orange-200 shadow-2xs'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <span className="text-xs font-bold text-slate-500">
                  Soal {currentQuestionIndex + 1} dari {HOTS_QUESTIONS.length}
                </span>

                {currentQuestionIndex === HOTS_QUESTIONS.length - 1 ? (
                  <button
                    onClick={handleAttemptSubmit}
                    className="flex items-center space-x-1.5 px-6 py-2.5 rounded-2xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kumpulkan Jawaban</span>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setCurrentQuestionIndex((prev) =>
                        Math.min(HOTS_QUESTIONS.length - 1, prev + 1)
                      )
                    }
                    className="flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-md transition active:scale-95"
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Submit Bar when in 'All Questions' mode */}
            {viewMode === 'all' && !isSubmitted && (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Selesai Mengerjakan Seluruh Soal?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Terjawab: <strong>{answeredCount}</strong> dari {totalQuestions} soal
                    {flaggedCount > 0 && ` (${flaggedCount} ditandai ragu-ragu)`}
                  </p>
                </div>
                <button
                  onClick={handleAttemptSubmit}
                  className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition active:scale-98 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kumpulkan & Lihat Penilaian</span>
                </button>
              </div>
            )}

            {/* Post-Submission Results Section */}
            {isSubmitted && (
              <div id="score-affirmation-card" className="space-y-6 pt-4">
                {/* Banner Status Selesai & Berikan Giliran Siswa Baru */}
                <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-400 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-slate-900 text-sm sm:text-base">
                          Pengerjaan Selesai! Data {submittedStudent.name || 'Siswa'} Tersimpan
                        </h4>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 uppercase tracking-wider">
                          Tersimpan
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Nilai dan refleksi telah masuk ke Portal Guru. Klik tombol di samping agar murid selanjutnya dapat langsung mengisi identitas dan mulai.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartNextStudent(true)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all hover:scale-102 active:scale-95 flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                    <span>Selesai & Ganti Siswa Baru</span>
                  </button>
                </div>

                <ScoreAffirmationCard
                  score={score}
                  correctCount={correctCount}
                  totalQuestions={totalQuestions}
                  timeSpentSeconds={elapsedSeconds}
                  studentName={submittedStudent.name || identity.name}
                  schoolName={submittedStudent.schoolName || identity.schoolName}
                  affirmation={affirmation}
                  onScrollToSolutions={scrollToSolutions}
                  onPrint={() => setIsPrintModalOpen(true)}
                  onReset={() => handleStartNextStudent(true)}
                />

                {/* Hasil Check-in Emosi & Refleksi Pembelajaran Siswa (Disatukan) */}
                <EmotionReflectionSummaryCard
                  checkIn={submittedCheckIn || checkInEmotion}
                  checkOut={submittedCheckOut || checkOutReflection}
                />

                {/* Step by step solutions section */}
                <DetailedSolutions
                  questions={HOTS_QUESTIONS}
                  userAnswers={answers}
                />

                {/* Card Selesai di Bagian Paling Bawah Halaman Pembahasan */}
                <div className="bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center mx-auto text-xl font-black">
                    🎉
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-black">
                      Selesai Mempelajari Seluruh Soal & Pembahasan!
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                      Latihan geometri HOTS telah selesai. Klik tombol <strong>"Selesai & Berikan ke Siswa Selanjutnya"</strong> agar lembar pengerjaan bersih kembali dan murid berikutnya dapat langsung mulai.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                    <button
                      onClick={() => handleStartNextStudent(true)}
                      className="px-6 sm:px-8 py-3.5 bg-white hover:bg-orange-50 text-orange-700 hover:text-orange-800 font-black text-xs sm:text-sm rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Selesai & Berikan ke Siswa Selanjutnya</span>
                    </button>
                    <button
                      onClick={() => setIsPrintModalOpen(true)}
                      className="px-5 py-3.5 bg-black/20 hover:bg-black/30 text-white font-bold text-xs sm:text-sm rounded-2xl border border-white/30 transition cursor-pointer flex items-center space-x-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Lembar Nilai</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Confirmation Modal before Submit */}
      {isConfirmSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-orange-200">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="font-black text-lg text-slate-900">Kumpulkan Kuis HOTS Sekarang?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Pastikan identitas murid dan seluruh nomor soal sudah Anda periksa sebelum dikirimkan.
              </p>
            </div>

            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Asal Sekolah:</span>
                <strong className="text-orange-950">{identity.schoolName || 'Belum diisi'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Nama Murid:</span>
                <strong className="text-slate-800">{identity.name || 'Murid Mandiri'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status Soal Terjawab:</span>
                <strong className="text-emerald-700">
                  {answeredCount} dari {totalQuestions} Soal
                </strong>
              </div>
              {totalQuestions - answeredCount > 0 && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Belum Dijawab:</span>
                  <span>{totalQuestions - answeredCount} Soal Kosong</span>
                </div>
              )}
              {flaggedCount > 0 && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>Masih Ditandai Ragu-ragu:</span>
                  <span>{flaggedCount} Soal</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsConfirmSubmitOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                Cek Lagi
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print View Modal */}
      {isPrintModalOpen && (
        <PrintResultView
          identity={{
            ...identity,
            name: submittedStudent.name || identity.name,
            schoolName: submittedStudent.schoolName || identity.schoolName,
            studentClass: submittedStudent.class || identity.studentClass,
            absenceNumber: submittedStudent.absenceNumber || identity.absenceNumber,
          }}
          score={score}
          correctCount={correctCount}
          totalQuestions={totalQuestions}
          timeSpentSeconds={elapsedSeconds}
          userAnswers={answers}
          checkIn={submittedCheckIn || checkInEmotion}
          checkOut={submittedCheckOut || checkOutReflection}
          onClose={() => setIsPrintModalOpen(false)}
        />
      )}

      {/* DOCKED SYMBOL BUTTONS DI SEBELAH KANAN (TENGAH LAYAR) - TIDAK MENGHALANGI TOMBOL SELANJUTNYA/NAVIGASI DI BAWAH */}
      <div className="fixed right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 pointer-events-auto select-none print:hidden bg-white/95 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl border border-orange-200/90 shadow-xl shadow-orange-950/10">
        {/* 1. Tombol Simbol: Papan Coretan Hitungan */}
        <div className="relative group">
          <button
            onClick={() => setIsScratchpadOpen(true)}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200/90 text-orange-600 shadow-2xs hover:shadow-md transition-all duration-150 hover:scale-105 active:scale-95 flex flex-col items-center justify-center cursor-pointer"
            title="Papan Coretan Hitungan"
            aria-label="Papan Coretan Hitungan"
          >
            <PenTool className="w-5 h-5 text-orange-600" />
            <span className="text-[8px] font-black uppercase tracking-tighter text-orange-900 mt-0.5">
              Coret
            </span>
          </button>
          {/* Tooltip Melayang ke Kiri */}
          <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900/95 backdrop-blur-xs text-white text-[11px] font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-xl border border-slate-700 hidden sm:block">
            Papan Coretan Hitungan
          </div>
        </div>

        {/* Small Divider */}
        <div className="w-6 h-px bg-orange-200/80 my-0.5" />

        {/* 2. Tombol Simbol: Buku Rumus (Dengan Indikator Terkunci jika dinonaktifkan guru) */}
        <div className="relative group">
          <button
            onClick={handleOpenFormulaModal}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl text-white shadow-2xs hover:shadow-md transition-all duration-150 hover:scale-105 active:scale-95 flex flex-col items-center justify-center cursor-pointer relative ${
              isFormulaAllowed
                ? 'bg-linear-to-tr from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
                : 'bg-slate-400 hover:bg-slate-500'
            }`}
            title={isFormulaAllowed ? 'Buku Rumus Bangun Datar' : 'Buku Rumus Dinonaktifkan oleh Guru'}
            aria-label="Buku Rumus Bangun Datar"
          >
            {isFormulaAllowed ? (
              <BookOpen className="w-5 h-5 text-white" />
            ) : (
              <Lock className="w-5 h-5 text-white" />
            )}
            <span className="text-[8px] font-black uppercase tracking-tighter text-white mt-0.5">
              {isFormulaAllowed ? 'Rumus' : 'Kunci'}
            </span>
            {!isFormulaAllowed && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 border border-white text-[9px] font-black text-white flex items-center justify-center shadow-xs">
                ✕
              </span>
            )}
          </button>
          {/* Tooltip Melayang ke Kiri */}
          <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900/95 backdrop-blur-xs text-white text-[11px] font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none shadow-xl border border-slate-700 hidden sm:block">
            {isFormulaAllowed ? 'Buku Rumus Bangun Datar' : 'Buku Rumus Dinonaktifkan Guru'}
          </div>
        </div>
      </div>

      {/* Modal Dialog: Informasi Buku Rumus Dinonaktifkan Oleh Guru */}
      {isFormulaLockedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 space-y-4 border-2 border-rose-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                Buku Rumus Dinonaktifkan Guru
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Bapak/Ibu Guru telah mengunci akses Buku Rumus untuk sesi latihan ini. Anda diminta mengerjakan soal HOTS secara mandiri untuk mengasah daya ingat rumus dan analisis logika tanpa bantuan contekan.
              </p>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
              💡 <em>Tip: Papan Coretan Hitungan tetap dapat kamu gunakan untuk mencakar dan menghitung!</em>
            </div>
            <button
              onClick={() => setIsFormulaLockedModalOpen(false)}
              className="w-full py-3 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-xs rounded-2xl shadow-md transition active:scale-95 cursor-pointer"
            >
              Mengerti, Saya Siap Berpikir Mandiri!
            </button>
          </div>
        </div>
      )}

      {/* Modal Check-out Emosi Siswa & Refleksi Belajar yang Disatukan */}
      <EmotionCheckOutModal
        isOpen={isCheckOutModalOpen}
        onClose={() => setIsCheckOutModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        reflection={checkOutReflection}
        onChangeReflection={setCheckOutReflection}
        studentName={identity.name}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />

      {/* Sticky Bottom Bar saat sesi pengerjaan sudah selesai (Memastikan tombol "Selesai" selalu tampak di layar) */}
      {isSubmitted && activeTab === 'student' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2.5 rounded-2xl border-2 border-emerald-400 shadow-2xl flex items-center justify-between gap-2 animate-fadeIn print:hidden">
          <div className="flex items-center space-x-2 pl-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-500 block leading-tight">
                Status Kuis:
              </span>
              <strong className="text-xs font-black text-slate-800">
                Selesai (Skor: {score})
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer flex items-center space-x-1"
              title="Cetak lembar nilai"
            >
              <Printer className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            <button
              onClick={() => handleStartNextStudent(true)}
              className="px-4 py-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all hover:scale-102 active:scale-95 flex items-center space-x-1.5 cursor-pointer ring-2 ring-emerald-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-100" />
              <span>Selesai & Ganti Siswa</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating / Dialog Tools */}
      <Scratchpad isOpen={isScratchpadOpen} onClose={() => setIsScratchpadOpen(false)} />
      <FormulaModal isOpen={isFormulaOpen} onClose={() => setIsFormulaOpen(false)} />
    </div>
  );
}

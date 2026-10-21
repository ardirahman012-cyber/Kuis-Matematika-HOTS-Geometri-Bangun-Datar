import React, { useState } from 'react';
import { BookOpen, CheckCircle2, XCircle, Calculator, Lightbulb, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { HOTSQuestion, OptionKey } from '../types/quiz';
import { GeometryDiagram } from './GeometryDiagram';

interface DetailedSolutionsProps {
  questions: HOTSQuestion[];
  userAnswers: Record<number, OptionKey>;
}

export const DetailedSolutions: React.FC<DetailedSolutionsProps> = ({
  questions,
  userAnswers,
}) => {
  const [openIds, setOpenIds] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  const toggleOpen = (id: number) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = (show: boolean) => {
    const newState: Record<number, boolean> = {};
    questions.forEach((q) => {
      newState[q.id] = show;
    });
    setOpenIds(newState);
  };

  return (
    <div id="pembahasan-section" className="space-y-6 pt-2">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-orange-200 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900">
              Pembahasan Mendalam & Kunci Jawaban Lengkap
            </h2>
            <p className="text-xs text-slate-500">
              Uraian langkah kerja matematis, rumus kunci, dan analisis logika geometri HOTS
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-bold">
          <button
            onClick={() => toggleAll(true)}
            className="px-3 py-1.5 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition"
          >
            Buka Semua
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
          >
            Tutup Semua
          </button>
        </div>
      </div>

      {/* Questions Solution List */}
      <div className="space-y-5">
        {questions.map((q) => {
          const userKey = userAnswers[q.id];
          const isCorrect = userKey === q.correctAnswer;
          const isAnswered = userKey !== undefined;
          const isOpen = openIds[q.id];

          return (
            <div
              key={q.id}
              className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition ${
                isCorrect
                  ? 'border-emerald-200'
                  : isAnswered
                  ? 'border-rose-200'
                  : 'border-slate-200'
              }`}
            >
              {/* Question Solution Header */}
              <div
                onClick={() => toggleOpen(q.id)}
                className={`p-5 flex items-center justify-between cursor-pointer select-none transition ${
                  isCorrect
                    ? 'bg-emerald-50/60 hover:bg-emerald-100/40'
                    : isAnswered
                    ? 'bg-rose-50/60 hover:bg-rose-100/40'
                    : 'bg-slate-50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswered
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {isCorrect ? '✓' : isAnswered ? '✕' : '?'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                        {q.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Jawabanmu:{' '}
                      <strong className={`uppercase ${isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {userKey || 'Tidak Dijawab'}
                      </strong>{' '}
                      • Kunci Jawaban:{' '}
                      <strong className="text-emerald-700 uppercase font-bold">
                        {q.correctAnswer} ({q.options.find((o) => o.key === q.correctAnswer)?.text})
                      </strong>
                    </p>
                  </div>
                </div>

                <button className="text-slate-400 hover:text-slate-700 p-1">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              {/* Solution Body */}
              {isOpen && (
                <div className="p-5 sm:p-7 border-t border-slate-100 space-y-6">
                  {/* Context & Diagram */}
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                      {q.questionText}
                    </div>
                    <div className="max-w-md mx-auto">
                      <GeometryDiagram questionId={q.id} imageSrc={q.imageSrc} imageAlt={q.imageAlt} />
                    </div>
                  </div>

                  {/* Exact Jawaban / Pembahasan from User */}
                  <div className="bg-orange-50/90 rounded-2xl p-4 sm:p-5 border border-orange-200/90 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-orange-600" />
                      <h4 className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                        Kunci Jawaban & Langkah Resmi:
                      </h4>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-orange-200 font-mono text-xs text-slate-800 space-y-1 shadow-2xs leading-relaxed whitespace-pre-wrap">
                      {q.rawSolution.map((line, idx) => (
                        <div
                          key={idx}
                          className={
                            line.startsWith('•') || line.startsWith('Diketahui:')
                              ? 'font-bold text-orange-900 pt-1'
                              : 'pl-2 text-slate-700'
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-orange-200/60 space-y-1">
                      <span className="text-[11px] font-bold text-orange-900 block uppercase">
                        Rumus yang Digunakan:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {q.formulas.map((f, fIdx) => (
                          <code
                            key={fIdx}
                            className="text-xs font-mono font-bold text-orange-900 bg-white px-2.5 py-1 rounded-lg border border-orange-200 shadow-2xs"
                          >
                            {f}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step by Step Mathematical Breakdown */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4 text-slate-700" />
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Langkah Perhitungan Matematis Terperinci:
                      </h4>
                    </div>

                    <div className="space-y-2.5">
                      {q.steps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 text-xs sm:text-sm space-y-1.5"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-800">
                            <span>{st.title}</span>
                            {st.result && (
                              <span className="font-mono font-extrabold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-lg text-xs">
                                {st.result}
                              </span>
                            )}
                          </div>
                          {st.formula && (
                            <div className="text-[11px] font-mono text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                              Rumus: {st.formula}
                            </div>
                          )}
                          <div className="font-mono text-slate-700 pt-1 leading-relaxed">
                            {st.calculation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Geometry Tips / Trap Avoidance */}
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-950 flex items-start space-x-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold text-amber-900 mb-0.5">
                        Tips Logika Geometri & Antisipasi Jebakan:
                      </strong>
                      <p className="leading-relaxed">{q.geometryTips}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

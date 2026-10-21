import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Lightbulb, Calculator, HelpCircle } from 'lucide-react';
import { QuestionData } from '../data/questions';

interface ExplanationCardProps {
  question: QuestionData;
  userAnswer?: 'a' | 'b' | 'c' | 'd';
  isFlagged?: boolean;
  defaultExpanded?: boolean;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({
  question,
  userAnswer,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const isCorrect = userAnswer === question.correctAnswer;
  const isAnswered = userAnswer !== undefined;

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all bg-white ${
        !isAnswered
          ? 'border-slate-300 shadow-xs'
          : isCorrect
          ? 'border-emerald-300 shadow-sm'
          : 'border-rose-300 shadow-sm'
      }`}
    >
      {/* Top Banner */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`px-5 py-3.5 flex items-center justify-between cursor-pointer select-none transition ${
          !isAnswered
            ? 'bg-slate-50 hover:bg-slate-100'
            : isCorrect
            ? 'bg-emerald-50/70 hover:bg-emerald-100/60'
            : 'bg-rose-50/70 hover:bg-rose-100/60'
        }`}
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
              !isAnswered
                ? 'bg-slate-200 text-slate-700'
                : isCorrect
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 text-white'
            }`}
          >
            {isCorrect ? '✓' : isAnswered ? '✕' : '?'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">{question.title}</span>
              <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {question.cognitiveLevel}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Jawaban Anda: <strong className="uppercase">{userAnswer || 'Tidak Dijawab'}</strong> • Kunci Jawaban: <strong className="text-emerald-700 uppercase">{question.correctAnswer}</strong>
            </p>
          </div>
        </div>

        <button className="text-slate-400 hover:text-slate-700 p-1">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-5 border-t border-slate-100 space-y-6">
          {/* Question Text & Diagram */}
          <div className="flex flex-col md:flex-row gap-5 items-start">
            <div className="flex-1 space-y-3">
              <div className="text-sm text-slate-800 leading-relaxed font-medium">
                {question.questionText}
              </div>

              {/* Options status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {question.options.map((opt) => {
                  const isThisCorrect = opt.key === question.correctAnswer;
                  const isThisChosen = opt.key === userAnswer;

                  let badgeStyle = 'border-slate-200 bg-slate-50 text-slate-700';
                  if (isThisCorrect) {
                    badgeStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-400';
                  } else if (isThisChosen && !isThisCorrect) {
                    badgeStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through';
                  }

                  return (
                    <div
                      key={opt.key}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl border text-xs ${badgeStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold uppercase shrink-0">
                        {opt.key}
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {isThisCorrect && (
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle className="w-3.5 h-3.5" /> Benar
                        </span>
                      )}
                      {isThisChosen && !isThisCorrect && (
                        <span className="text-[11px] font-bold text-rose-600 flex items-center gap-0.5">
                          <XCircle className="w-3.5 h-3.5" /> Dipilih
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image card */}
            <div className="w-full md:w-56 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col items-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
                Gambar Geometri
              </span>
              <img
                src={question.imageSrc}
                alt={question.imageAlt}
                className="max-h-36 object-contain rounded-lg border border-slate-200 bg-white p-1 shadow-xs"
              />
              <p className="text-[11px] text-slate-500 text-center mt-2 leading-tight">
                {question.imageDescription}
              </p>
            </div>
          </div>

          {/* Step by Step Pembahasan */}
          <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-200 pb-2.5">
              <Calculator className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Kunci Jawaban & Pembahasan Lengkap:
              </h4>
            </div>

            {/* Raw Solution Text format from user prompt */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-1.5 shadow-2xs leading-relaxed whitespace-pre-wrap">
              {question.rawSolution.map((line, idx) => (
                <div key={idx} className={line.startsWith('•') || line.startsWith('Diketahui:') ? 'font-bold text-blue-800 pt-1' : 'pl-2 text-slate-700'}>
                  {line}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs text-emerald-950 font-semibold flex items-center justify-between">
              <span>{question.conclusion}</span>
              <span className="text-emerald-700 font-mono font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                Kunci: {question.correctAnswer.toUpperCase()}
              </span>
            </div>

            {question.tips && (
              <div className="flex items-start space-x-2 text-xs text-amber-900 bg-amber-50/90 border border-amber-200 p-3 rounded-xl">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Tips Memahami: </strong>
                  {question.tips}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

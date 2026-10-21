import React from 'react';
import { Flag, CheckCircle2, XCircle, Sparkles, HelpCircle, Bookmark } from 'lucide-react';
import { HOTSQuestion, OptionKey } from '../types/quiz';
import { GeometryDiagram } from './GeometryDiagram';

interface QuestionCardProps {
  question: HOTSQuestion;
  selectedAnswer?: OptionKey;
  isFlagged?: boolean;
  isSubmitted?: boolean;
  onSelectOption: (key: OptionKey) => void;
  onToggleFlag: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  isFlagged = false,
  isSubmitted = false,
  onSelectOption,
  onToggleFlag,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div
      id={`soal-${question.id}`}
      className={`bg-white rounded-3xl shadow-sm border transition-all overflow-hidden ${
        isSubmitted
          ? isCorrect
            ? 'border-emerald-300 ring-2 ring-emerald-100'
            : selectedAnswer
            ? 'border-rose-300 ring-2 ring-rose-100'
            : 'border-slate-300'
          : selectedAnswer
          ? 'border-orange-300'
          : 'border-orange-100 hover:border-orange-200'
      }`}
    >
      {/* Top Header matching reference layout */}
      <div className="px-5 sm:px-7 py-3.5 bg-linear-to-r from-orange-50/90 via-amber-50/60 to-orange-50/90 border-b border-orange-100 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-orange-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {question.id}
          </div>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {question.shapeType}
          </span>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
            {question.cognitiveLevel.includes('C4') ? 'C4-Analisis' : question.cognitiveLevel}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-lg">
            Bobot: {question.points} Poin
          </span>

          {!isSubmitted && (
            <button
              onClick={onToggleFlag}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                isFlagged
                  ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-xs'
                  : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-300 hover:border-amber-300'
              }`}
              title="Tandai jika masih ragu-ragu"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-950 text-amber-950' : 'text-slate-500'}`} />
              <span>{isFlagged ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
            </button>
          )}

          {isSubmitted && (
            <span
              className={`text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1.5 ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Benar (+20)
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" /> Salah (0)
                </>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-7 space-y-5">
        {/* Scenario / Story Context */}
        <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <strong className="text-orange-900 block mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            Konteks Masalah Geometri:
          </strong>
          {question.scenario}
        </div>

        {/* Question Prompt */}
        <div className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
          {question.questionText}
        </div>

        {/* SVG / Image Geometry Diagram */}
        <GeometryDiagram
          questionId={question.id}
          imageSrc={question.imageSrc}
          imageAlt={question.imageAlt}
        />

        {/* Options */}
        <div className="space-y-2.5 pt-1">
          <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pilihan Jawaban (A, B, C, D):
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedAnswer === opt.key;
              const isThisCorrect = opt.key === question.correctAnswer;

              let style =
                'border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/30 text-slate-800';

              if (!isSubmitted) {
                if (isSelected) {
                  style =
                    'border-orange-500 bg-orange-50/80 text-orange-950 ring-2 ring-orange-200 font-semibold shadow-xs';
                }
              } else {
                if (isThisCorrect) {
                  style =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200';
                } else if (isSelected && !isThisCorrect) {
                  style =
                    'border-rose-400 bg-rose-50 text-rose-900 line-through';
                } else {
                  style = 'border-slate-200 bg-slate-50/60 opacity-60 text-slate-500';
                }
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => !isSubmitted && onSelectOption(opt.key)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 transition flex items-center space-x-3.5 select-none ${
                    isSubmitted ? 'cursor-default' : 'cursor-pointer active:scale-99'
                  } ${style}`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs uppercase shrink-0 transition ${
                      isSelected
                        ? isSubmitted
                          ? isThisCorrect
                            ? 'bg-emerald-600 text-white'
                            : 'bg-rose-600 text-white'
                          : 'bg-orange-600 text-white'
                        : isSubmitted && isThisCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {opt.key}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                    {opt.text}
                  </span>

                  {isSubmitted && isThisCorrect && (
                    <span className="text-xs font-black text-emerald-700 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Kunci Benar
                    </span>
                  )}
                  {isSubmitted && isSelected && !isThisCorrect && (
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1 shrink-0">
                      <XCircle className="w-4 h-4 text-rose-600" /> Jawabanmu
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

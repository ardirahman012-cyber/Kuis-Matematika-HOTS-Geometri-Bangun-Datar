import React, { useState } from 'react';
import { Calculator as CalcIcon, X, Delete } from 'lucide-react';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  if (!isOpen) return null;

  const handleNumber = (n: string) => {
    if (display === '0') {
      setDisplay(n);
    } else {
      setDisplay(display + n);
    }
  };

  const handleOp = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBack = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleEqual = () => {
    try {
      const full = (equation + display).replace(/×/g, '*').replace(/÷/g, '/');
      // eslint-disable-next-line no-eval
      const res = Function(`'use strict'; return (${full})`)();
      setDisplay(String(Number(res.toFixed(4))));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs border border-slate-200 overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white">
          <div className="flex items-center space-x-2">
            <CalcIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-xs tracking-wider">KALKULATOR HITUNG</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Display */}
        <div className="bg-slate-800 p-4 text-right">
          <div className="text-xs text-slate-400 h-4 font-mono">{equation}</div>
          <div className="text-3xl font-bold font-mono text-white tracking-wider truncate">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="p-3 grid grid-cols-4 gap-2 bg-slate-100">
          <button
            onClick={handleClear}
            className="col-span-2 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-sm rounded-xl transition active:scale-95"
          >
            AC
          </button>
          <button
            onClick={handleBack}
            className="flex items-center justify-center py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition active:scale-95"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOp('÷')}
            className="py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-lg rounded-xl transition active:scale-95"
          >
            ÷
          </button>

          {['7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n)}
              className="py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-lg rounded-xl shadow-xs transition active:scale-95"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp('×')}
            className="py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-lg rounded-xl transition active:scale-95"
          >
            ×
          </button>

          {['4', '5', '6'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n)}
              className="py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-lg rounded-xl shadow-xs transition active:scale-95"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp('-')}
            className="py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-lg rounded-xl transition active:scale-95"
          >
            −
          </button>

          {['1', '2', '3'].map((n) => (
            <button
              key={n}
              onClick={() => handleNumber(n)}
              className="py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-lg rounded-xl shadow-xs transition active:scale-95"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleOp('+')}
            className="py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold text-lg rounded-xl transition active:scale-95"
          >
            +
          </button>

          <button
            onClick={() => handleNumber('0')}
            className="col-span-2 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-lg rounded-xl shadow-xs transition active:scale-95"
          >
            0
          </button>
          <button
            onClick={() => handleNumber('.')}
            className="py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-lg rounded-xl shadow-xs transition active:scale-95"
          >
            .
          </button>
          <button
            onClick={handleEqual}
            className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl shadow-md transition active:scale-95"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

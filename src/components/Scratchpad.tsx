import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Eraser, Trash2, X, Download, Grid, Undo2 } from 'lucide-react';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#ea580c'); // Default orange
  const [lineWidth, setLineWidth] = useState(3);
  const [showGrid, setShowGrid] = useState(true);

  // Initialize and resize canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (mode === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = lineWidth * 5;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'coretan-hitungan-matematika.png';
    a.click();
  };

  const penColors = [
    { label: 'Orange', value: '#ea580c' },
    { label: 'Biru', value: '#2563eb' },
    { label: 'Hijau', value: '#16a34a' },
    { label: 'Merah', value: '#dc2626' },
    { label: 'Hitam', value: '#0f172a' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col w-full max-w-3xl h-[85vh] border border-orange-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-orange-100 bg-linear-to-r from-orange-50 via-amber-50 to-orange-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-orange-600 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-600/20">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  Papan Coretan Hitungan
                </h3>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 border border-orange-200">
                  Kertas Coretan
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Gunakan untuk perkalian susun, pembagian, atau sketsa bangun datar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-orange-100/60 transition"
            title="Tutup Papan Coretan"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2.5 border-b border-orange-100 bg-orange-50/30 gap-2">
          {/* Tools */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setMode('pen')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                mode === 'pen'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Pena</span>
            </button>

            <button
              onClick={() => setMode('eraser')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition ${
                mode === 'eraser'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
              }`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>Penghapus</span>
            </button>

            {/* Color palette */}
            {mode === 'pen' && (
              <div className="flex items-center gap-1 ml-1 pl-2 border-l border-slate-200">
                {penColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setColor(c.value)}
                    className={`w-6 h-6 rounded-full transition transform ${
                      color === c.value
                        ? 'ring-2 ring-orange-500 ring-offset-2 scale-110 shadow-xs'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.label}
                  />
                ))}
              </div>
            )}

            {/* Brush size */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-200 text-xs font-bold text-slate-600">
              <span className="hidden sm:inline">Ukuran:</span>
              {[2, 4, 7].map((s) => (
                <button
                  key={s}
                  onClick={() => setLineWidth(s)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition ${
                    lineWidth === s
                      ? 'bg-orange-100 text-orange-900 border border-orange-300'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {s === 2 ? 'S' : s === 4 ? 'M' : 'L'}
                </button>
              ))}
            </div>

            {/* Grid Pattern Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold rounded-xl transition border ${
                showGrid
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Kertas Berpetak (Grid)"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kertas Berpetak</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={clearCanvas}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition"
              title="Hapus Semua Coretan"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Bersihkan</span>
            </button>

            <button
              onClick={downloadCanvas}
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition"
              title="Simpan Hasil Coretan ke Gambar"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Simpan</span>
            </button>
          </div>
        </div>

        {/* Canvas Area with Optional Grid Pattern */}
        <div
          className={`flex-1 w-full h-full relative bg-white cursor-crosshair overflow-hidden ${
            showGrid ? 'bg-grid-slate' : ''
          }`}
          style={{
            backgroundImage: showGrid
              ? 'radial-gradient(#cbd5e1 1px, transparent 1px)'
              : 'none',
            backgroundSize: '20px 20px',
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full block touch-none"
          />
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-orange-50/30 border-t border-orange-100 flex items-center justify-between text-xs text-slate-500">
          <span>Tips: Anda bisa mencoret hitungan di sini tanpa mempengaruhi jawaban kuis.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-xs transition"
          >
            Selesai Mencoret
          </button>
        </div>
      </div>
    </div>
  );
};

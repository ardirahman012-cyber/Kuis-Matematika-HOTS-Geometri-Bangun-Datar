import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

interface GeometryDiagramProps {
  questionId: number;
  imageSrc?: string;
  imageAlt?: string;
}

export const GeometryDiagram: React.FC<GeometryDiagramProps> = ({
  questionId,
  imageSrc,
  imageAlt,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Fallback map if imageSrc is not directly passed
  const imageMap: Record<number, { src: string; alt: string; label: string }> = {
    1: {
      src: '/assets/aistudio/image_3f9fe1ac.png',
      alt: 'Soal 6: Tanah persegi 14 m dengan kolam lingkaran',
      label: 'Tanah persegi 14 m × 14 m dengan kolam ikan lingkaran (diameter = 14 m)',
    },
    2: {
      src: '/assets/aistudio/image_fcd7a231.png',
      alt: 'Soal 7: Kolam renang ABCD 10 m x 8 m dikelilingi jalan EFGH',
      label: 'Kolam renang ABCD (10 m × 8 m) dikelilingi jalan berkeramik selebar 1 m',
    },
    3: {
      src: '/assets/aistudio/image_bb9bd278.png',
      alt: 'Soal 8: Kartu tanda pengenal persegi 6 cm dan segitiga siku-siku',
      label: 'Tanda pengenal gabungan persegi 6 cm × 6 cm dan 2 segitiga siku-siku (BC = 5 cm, AB = 3 cm)',
    },
    4: {
      src: '/assets/aistudio/image_c678940a.png',
      alt: 'Soal 9: Ruang tamu 10 m x 9 m dan ubin 30 cm x 30 cm',
      label: 'Ruang tamu berukuran 10 m × 9 m dan ubin persegi berukuran 30 cm × 30 cm',
    },
    5: {
      src: '/assets/aistudio/image_0a71e184.png',
      alt: 'Soal 10: Tanah persegi panjang 25 m x 14 m dengan kolam layang-layang',
      label: 'Tanah 25 m × 14 m dengan kolam layang-layang (diagonal 9 m dan 12 m)',
    },
  };

  const item = imageMap[questionId] || {
    src: imageSrc || '',
    alt: imageAlt || 'Diagram Geometri',
    label: '',
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center p-3 sm:p-5 bg-linear-to-b from-orange-50/70 to-amber-50/40 rounded-2xl border border-orange-200/80">
        <div className="text-[11px] font-bold text-orange-950 uppercase tracking-wider mb-2">
          Gambar Ilustrasi Geometri
        </div>

        <div
          onClick={() => setIsZoomed(true)}
          className="relative cursor-pointer group bg-white p-2.5 rounded-2xl border border-orange-200 shadow-2xs hover:shadow-md transition overflow-hidden"
        >
          <img
            src={imageSrc || item.src}
            alt={imageAlt || item.alt}
            className="max-h-48 sm:max-h-56 object-contain rounded-xl transition group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 flex items-center justify-center rounded-2xl transition">
            <span className="opacity-0 group-hover:opacity-100 bg-slate-900/80 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md transition">
              <ZoomIn className="w-3.5 h-3.5" /> Perbesar Gambar
            </span>
          </div>
        </div>

        <p className="text-[11px] font-medium text-amber-950 text-center mt-2 max-w-md">
          {item.label}
        </p>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-xl max-h-[90vh] bg-white p-4 rounded-3xl shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 p-1.5 bg-slate-900 text-white rounded-xl hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={imageSrc || item.src}
              alt={imageAlt || item.alt}
              className="max-h-[75vh] object-contain rounded-2xl"
            />
            <p className="text-xs text-slate-700 mt-3 font-semibold text-center">
              {item.label}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

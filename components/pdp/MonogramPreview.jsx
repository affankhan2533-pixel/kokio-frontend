'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Sparkles, Check, Info } from 'lucide-react';

const FOIL_COLORS = [
  { id: 'gold', name: 'Champagne Gold Foil', textColor: '#D4AF37', border: '#D4AF37' },
  { id: 'blind', name: 'Blind Deboss', textColor: '#222222', border: '#444444' },
  { id: 'silver', name: 'Silver Foil', textColor: '#E5E7EB', border: '#9CA3AF' },
];

const POSITIONS = [
  { id: 'tag', name: 'Bespoke Leather Tag' },
  { id: 'patch', name: 'Center Leather Patch' },
];

export default function MonogramPreview({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initials, setInitials] = useState('AK');
  const [selectedColor, setSelectedColor] = useState('gold');
  const [selectedPosition, setSelectedPosition] = useState('tag');

  // Verify whether product supports monogramming based on catalog data
  const supportsMonogram = Boolean(
    product.highlights?.some((h) => h.toLowerCase().includes('monogram')) ||
    product.materialType === 'leather' ||
    product.category === 'accessories' ||
    product.category === 'bags' ||
    product.id === 'monolith-carryon-35l'
  );

  if (!supportsMonogram) return null;

  const currentColor = FOIL_COLORS.find((c) => c.id === selectedColor) || FOIL_COLORS[0];

  const handleInitialsChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 3).toUpperCase();
    setInitials(val);
  };

  return (
    <div className="pt-2">
      {/* Entry Button on PDP */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full min-h-[46px] px-5 py-3 bg-[#EFEAE2] hover:bg-[#E5DFD4] text-[#161616] border border-black/10 rounded-xs text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B8892D]" />
          <span>PERSONALIZE YOUR PIECE</span>
        </div>
        <span className="text-[11px] font-sans font-semibold text-[#B8892D] group-hover:translate-x-1 transition-transform">
          BESPOKE MONOGRAMMING →
        </span>
      </button>

      {/* Monogram Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-[#F8F6F2] text-[#161616] w-full max-w-3xl rounded-sm border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] selection:bg-[#B8892D]/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between bg-[#F8F6F2] shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#B8892D]" />
                <h3 className="font-serif text-lg tracking-[0.16em] font-light text-[#161616]">
                  ATELIER BESPOKE MONOGRAMMING
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#B8892D]/15 text-[#B8892D] text-[10px] font-sans rounded-xs font-semibold uppercase tracking-wider">
                  PREVIEW ONLY
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-[#777777] hover:text-[#161616] transition-colors rounded-full cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close Monogram Preview"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Modal Body: Split Preview & Controls */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Visual Monogram Preview (6 cols on md) */}
              <div className="md:col-span-6 relative aspect-[4/5] bg-[#EFEAE2] rounded-xs overflow-hidden border border-black/8 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Foil Embossed Tag Overlay */}
                <div className="absolute inset-x-6 bottom-8 z-10 flex flex-col items-center">
                  <div className="bg-[#1C1713]/90 backdrop-blur-xs px-6 py-4 rounded-xs border border-white/20 shadow-xl flex flex-col items-center space-y-1">
                    <span className="text-[8px] font-sans tracking-[0.25em] text-[#B8892D] uppercase font-semibold">
                      {selectedPosition === 'tag' ? 'LEATHER LUGGAGE TAG' : 'BESPOKE PATCH'}
                    </span>
                    <div
                      key={initials + selectedColor}
                      className="font-serif text-3xl sm:text-4xl tracking-[0.25em] font-light leading-none select-none transition-all duration-300 transform scale-100"
                      style={{ color: currentColor.textColor }}
                    >
                      {initials || '••'}
                    </div>
                    <span className="text-[8px] font-sans text-[#A0A0A0] uppercase tracking-widest pt-1">
                      KOKIO • PARIS
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Monogram Controls (6 cols on md) */}
              <div className="md:col-span-6 space-y-6">
                
                {/* Initials Input */}
                <div className="space-y-2">
                  <label htmlFor="monogram-initials" className="block text-xs font-sans uppercase text-[#555555] font-semibold tracking-wider">
                    ENTER INITIALS (UP TO 3 CHARACTERS)
                  </label>
                  <input
                    id="monogram-initials"
                    type="text"
                    value={initials}
                    onChange={handleInitialsChange}
                    maxLength={3}
                    placeholder="AK"
                    className="w-full min-h-[48px] px-4 py-3 bg-white border border-black/15 focus:border-[#B8892D] rounded-xs text-xl font-serif text-[#161616] tracking-[0.2em] uppercase focus:outline-none focus:ring-1 focus:ring-[#B8892D] transition-colors"
                  />
                  <p className="text-[11px] text-[#777777] font-light">
                    Hand-stamped in Paris using traditional heated brass typesets.
                  </p>
                </div>

                {/* Foil Color Choice */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase text-[#555555] font-semibold tracking-wider">
                    FOIL FINISH
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {FOIL_COLORS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedColor(col.id)}
                        className={`p-2.5 rounded-xs border text-center transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-1.5 ${
                          selectedColor === col.id
                            ? 'bg-[#161616] text-[#F8F6F2] border-[#161616] font-semibold'
                            : 'bg-white hover:bg-[#F8F6F2] text-[#555555] border-black/10'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border shrink-0"
                          style={{ backgroundColor: col.textColor, borderColor: col.border }}
                        />
                        <span className="text-[11px] font-sans">{col.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Placement Choice */}
                <div className="space-y-2">
                  <label className="block text-xs font-sans uppercase text-[#555555] font-semibold tracking-wider">
                    STAMP POSITION
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {POSITIONS.map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setSelectedPosition(pos.id)}
                        className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer min-h-[44px] flex items-center justify-between text-xs font-sans ${
                          selectedPosition === pos.id
                            ? 'bg-[#161616] text-[#F8F6F2] border-[#161616] font-semibold'
                            : 'bg-white hover:bg-[#F8F6F2] text-[#555555] border-black/10'
                        }`}
                      >
                        <span>{pos.name}</span>
                        {selectedPosition === pos.id && <Check className="w-3 h-3 text-[#B8892D]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notice */}
                <div className="p-3 bg-[#EFEAE2] border border-black/8 rounded-xs flex items-start gap-2 text-xs text-[#666666]">
                  <Info className="w-4 h-4 text-[#B8892D] shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Preview Only:</strong> Bespoke personalization options are confirmed upon order completion with our client liaison.
                  </p>
                </div>

                {/* Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="btn-primary-gold w-full min-h-[48px]"
                  >
                    <span>CONFIRM PREVIEW & CLOSE</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

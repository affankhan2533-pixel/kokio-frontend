'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Subtle Entry Row on PDP */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 border border-[#EAEAEA] hover:border-[#B8892D] rounded-xs text-xs font-sans text-[#161616] flex items-center justify-between transition-colors cursor-pointer group bg-white"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
          <span className="font-medium tracking-[0.12em] uppercase text-[11px]">
            Personalize Your Piece
          </span>
        </div>
        <span className="text-[11px] text-[#777777] group-hover:text-[#B8892D] transition-colors">
          Preview Monogram →
        </span>
      </button>

      {/* Monogram Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white text-[#161616] w-full max-w-2xl rounded-xs border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#EAEAEA] flex items-center justify-between shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B8892D]" />
                <h3 className="font-serif text-base tracking-wider font-light text-[#161616]">
                  Personalize Your Piece
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-[#B8892D]/10 text-[#B8892D] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-xs border border-[#B8892D]/20">
                  PREVIEW ONLY
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-[#777777] hover:text-[#161616] transition-colors cursor-pointer"
                  aria-label="Close Monogram Preview"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left: Visual Preview */}
              <div className="md:col-span-6 relative aspect-[1/1] bg-white rounded-xs overflow-hidden border border-[#EAEAEA] flex items-center justify-center p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain object-center p-4"
                  sizes="(max-width: 768px) 100vw, 300px"
                />

                {/* Stamped Tag Overlay */}
                <motion.div
                  layout
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute z-10 flex flex-col items-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    selectedPosition === 'tag'
                      ? 'inset-x-4 bottom-4'
                      : 'inset-x-4 top-1/2 -translate-y-1/2'
                  }`}
                >
                  <div className="bg-[#1C1713]/90 backdrop-blur-xs px-5 py-3 rounded-xs border border-white/20 shadow-lg flex flex-col items-center space-y-0.5">
                    <span className="text-[8px] font-sans tracking-[0.2em] text-[#B8892D] uppercase font-semibold">
                      {selectedPosition === 'tag' ? 'LEATHER TAG' : 'BESPOKE PATCH'}
                    </span>
                    <motion.div
                      key={initials + selectedColor + selectedPosition}
                      initial={{ opacity: 0.7, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="font-serif text-2xl tracking-[0.2em] font-light leading-none select-none"
                      style={{ color: currentColor.textColor }}
                    >
                      {initials || '••'}
                    </motion.div>
                    <span className="text-[7px] font-sans text-[#A0A0A0] uppercase tracking-widest">
                      KOKIO • PARIS
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right: Controls */}
              <div className="md:col-span-6 space-y-4">
                {/* Initials Input */}
                <div className="space-y-1.5">
                  <label htmlFor="monogram-initials" className="block text-[11px] font-sans uppercase text-[#555555] font-medium tracking-wider">
                    ENTER INITIALS (UP TO 3 LETTERS)
                  </label>
                  <input
                    id="monogram-initials"
                    type="text"
                    value={initials}
                    onChange={handleInitialsChange}
                    maxLength={3}
                    placeholder="AK"
                    className="w-full min-h-[44px] px-3 py-2 bg-white border border-[#EAEAEA] focus:border-[#B8892D] rounded-xs text-lg font-serif text-[#161616] tracking-[0.2em] uppercase focus:outline-none transition-colors"
                  />
                </div>

                {/* Foil Choice */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-sans uppercase text-[#555555] font-medium tracking-wider">
                    FOIL FINISH
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {FOIL_COLORS.map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedColor(col.id)}
                        className={`p-2 rounded-xs border text-center transition-all cursor-pointer min-h-[38px] flex items-center justify-center gap-1.5 ${
                          selectedColor === col.id
                            ? 'bg-[#161616] text-[#F8F6F2] border-[#161616] font-medium'
                            : 'bg-white hover:bg-[#F8F6F2] text-[#555555] border-[#EAEAEA]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border shrink-0"
                          style={{ backgroundColor: col.textColor, borderColor: col.border }}
                        />
                        <span className="text-[10px] font-sans">{col.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Placement */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-sans uppercase text-[#555555] font-medium tracking-wider">
                    PLACEMENT
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {POSITIONS.map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setSelectedPosition(pos.id)}
                        className={`p-2 rounded-xs border text-left transition-all cursor-pointer min-h-[38px] flex items-center justify-between text-[11px] font-sans ${
                          selectedPosition === pos.id
                            ? 'bg-[#161616] text-[#F8F6F2] border-[#161616] font-medium'
                            : 'bg-white hover:bg-[#F8F6F2] text-[#555555] border-[#EAEAEA]'
                        }`}
                      >
                        <span>{pos.name}</span>
                        {selectedPosition === pos.id && <Check className="w-3 h-3 text-[#B8892D]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Note */}
                <div className="p-2.5 bg-[#F8F6F2] border border-[#EAEAEA] rounded-xs flex items-start gap-2 text-xs text-[#666666]">
                  <Info className="w-3.5 h-3.5 text-[#B8892D] shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed">
                    <strong>PREVIEW ONLY:</strong> Monogramming details are confirmed with client liaison prior to dispatch.
                  </p>
                </div>

                {/* Action */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full min-h-[44px] px-6 py-2.5 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-colors cursor-pointer"
                >
                  CONFIRM PREVIEW & CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

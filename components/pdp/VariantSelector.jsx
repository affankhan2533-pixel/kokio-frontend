'use client';

import { Check } from 'lucide-react';

export default function VariantSelector({ colors, selectedColor, onSelectColor }) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs font-sans tracking-[0.14em] uppercase text-xs">
        <span className="text-[#777777] uppercase tracking-wider font-bold">FINISH / COLOR:</span>
        <span className="text-[#161616] font-semibold">{selectedColor}</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {colors.map((color, idx) => {
          const isSelected = selectedColor === color;
          return (
            <button
              key={color}
              onClick={() => onSelectColor(color)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-sans tracking-[0.14em] uppercase text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'border-[#B8892D] bg-[#B8892D]/15 text-[#161616] font-bold shadow-xs'
                  : 'border-black/10 bg-white/60 text-[#666666] hover:border-black/30 hover:text-[#161616]'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full border border-black/20 shrink-0 ${
                  idx === 0 ? 'bg-[#C0C0C0]' : idx === 1 ? 'bg-[#111111]' : 'bg-[#B8892D]'
                }`}
              />
              <span>{color}</span>
              {isSelected && <Check className="w-3.5 h-3.5 text-[#B8892D]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

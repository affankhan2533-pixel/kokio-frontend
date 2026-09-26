'use client';

import Image from 'next/image';
import { X, ArrowUpRight, Scale } from 'lucide-react';
import { useCompareStore } from '@store/useCompareStore';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

export default function CompareBar() {
  const { compareList, removeCompare, clearCompare, openCompare } = useCompareStore();

  if (compareList.length === 0) return null;

  const selectedProducts = compareList
    .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id || p.slug === id))
    .filter(Boolean);

  return (
    <aside aria-label="Product Comparison Bar" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-[#161616]/95 backdrop-blur-md text-[#F8F6F2] rounded-xs p-3 sm:p-4 border border-white/15 shadow-xl animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Left: Indicator & Thumbnails */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-sans text-[#B8892D] shrink-0 font-semibold tracking-wider">
            <Scale className="w-4 h-4" />
            <span className="uppercase">COMPARE</span>
            <span className="text-[11px] text-[#A0A0A0]">({compareList.length}/3)</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {selectedProducts.map((prod) => (
              <div
                key={prod.id}
                className="relative group w-11 h-12 rounded-xs bg-[#222] border border-white/10 overflow-hidden shrink-0"
              >
                <Image
                  src={prod.image}
                  alt={prod.name}
                  fill
                  className="object-cover object-center"
                  sizes="44px"
                />
                <button
                  type="button"
                  onClick={() => removeCompare(prod.id)}
                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                  aria-label={`Remove ${prod.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {/* Empty slots placeholders */}
            {Array.from({ length: 3 - compareList.length }).map((_, idx) => (
              <div
                key={idx}
                className="w-11 h-12 rounded-xs border border-dashed border-white/20 flex items-center justify-center text-[10px] font-sans text-[#666] shrink-0"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Right: Compare Action & Clear */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="px-3 py-2 text-[11px] font-sans text-[#888888] hover:text-white uppercase transition-colors cursor-pointer tracking-wider"
          >
            CLEAR
          </button>

          <button
            type="button"
            onClick={openCompare}
            className="btn-primary-gold min-h-[44px]"
          >
            <span>COMPARE PIECES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
}

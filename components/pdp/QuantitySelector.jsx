'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="space-y-1.5">
      <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs text-[#777777] uppercase tracking-wider font-bold block">
        QUANTITY:
      </span>
      <div className="inline-flex items-center bg-[#EFEAE2] border border-black/10 rounded-xl overflow-hidden">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="min-h-[44px] min-w-[44px] px-3.5 text-[#161616] hover:bg-[#B8892D]/20 disabled:opacity-40 transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Decrease Quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-10 text-center font-sans tracking-[0.14em] uppercase text-xs text-xs font-semibold text-[#161616]">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="min-h-[44px] min-w-[44px] px-3.5 text-[#161616] hover:bg-[#B8892D]/20 transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Increase Quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

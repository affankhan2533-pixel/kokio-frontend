'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center border border-[#EAEAEA] rounded-xs bg-white text-[#161616]">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#777777] hover:text-[#161616] disabled:opacity-30 transition-colors cursor-pointer"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5 stroke-[1.5]" />
      </button>
      <span className="w-9 text-center font-sans text-xs font-medium text-[#161616] select-none">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#777777] hover:text-[#161616] transition-colors cursor-pointer"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
      </button>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function EmptyCart({ onClose }) {
  return (
    <div className="py-20 px-6 text-center max-w-md mx-auto flex flex-col items-center justify-center bg-white">
      <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#161616] tracking-wide mb-3">
        YOUR BAG IS EMPTY
      </h3>
      <p className="text-sm text-[#666666] font-normal leading-relaxed font-sans mb-8">
        Begin your journey with KOKIO.
      </p>
      <Link
        href="/collections/all"
        onClick={onClose}
        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-8 py-3 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer group"
      >
        <span>EXPLORE COLLECTIONS</span>
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}

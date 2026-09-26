'use client';

import Link from 'next/link';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CheckoutHeader() {
  return (
    <header className="bg-[#F8F6F2] border-b border-black/10 py-4 px-6 md:px-12 sticky top-0 z-40 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Back to Cart link */}
        <Link 
          href="/cart"
          className="flex items-center gap-2 text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#777777] hover:text-[#B8892D] transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">RETURN TO BAG</span>
        </Link>

        {/* Minimal KOKIO Brand Logo */}
        <Link href="/" className="group flex flex-col items-center">
          <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-light text-[#161616] group-hover:text-[#B8892D] transition-colors">
            KOKIO
          </span>
          <span className="text-[9px] font-sans tracking-[0.14em] uppercase text-xs tracking-[0.3em] text-[#888888] uppercase -mt-1">
            PARIS • MUMBAI
          </span>
        </Link>

        {/* Security Indicator */}
        <div className="flex items-center gap-1.5 text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#2E7D32] bg-[#E8F5E9] px-3 py-1.5 rounded-full border border-[#C8E6C9]">
          <Lock className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span className="hidden sm:inline tracking-wider font-semibold uppercase text-[10px]">
            SECURE CHECKOUT
          </span>
          <span className="sm:hidden font-semibold text-[10px]">SECURE</span>
        </div>

      </div>
    </header>
  );
}

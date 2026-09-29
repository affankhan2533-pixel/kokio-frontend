'use client';

import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-[#EAEAEA] py-4 px-4 sm:px-8 lg:px-12 sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        
        {/* Left: RETURN TO BAG */}
        <Link 
          href="/cart"
          className="flex items-center gap-1.5 text-[11px] font-sans tracking-[0.14em] uppercase text-[#777777] hover:text-[#161616] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[1.5]" />
          <span className="hidden sm:inline">RETURN TO BAG</span>
          <span className="sm:hidden">BAG</span>
        </Link>

        {/* Center: Minimal KOKIO Brand */}
        <Link href="/" className="text-center group">
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light text-[#161616] group-hover:text-[#B8892D] transition-colors">
            KOKIO
          </span>
        </Link>

        {/* Right: SECURE CHECKOUT */}
        <div className="flex items-center gap-1.5 text-[11px] font-sans tracking-[0.14em] uppercase text-[#777777]">
          <Lock className="w-3.5 h-3.5 stroke-[1.5] text-[#161616]" />
          <span className="hidden sm:inline font-medium">SECURE CHECKOUT</span>
          <span className="sm:hidden font-medium">SECURE</span>
        </div>

      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function EmptyCart({ onClose }) {
  return (
    <div className="py-16 px-6 text-center space-y-4 max-w-sm mx-auto flex flex-col items-center justify-center">
      <span className="text-[11px] font-sans tracking-[0.25em] font-semibold text-[#B8892D] uppercase block">
        HAUT VOYAGE • PARIS
      </span>
      <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#161616]">
        YOUR BAG IS EMPTY
      </h3>
      <p className="text-xs text-[#666666] font-light leading-relaxed font-sans">
        Begin your journey with KOKIO. Explore our aerospace aluminum luggage, Tuscan leather weekenders, and bespoke travel instruments.
      </p>
      <div className="pt-4">
        <Link
          href="/collections/all"
          onClick={onClose}
          className="btn-primary-luxury group"
        >
          <span>EXPLORE COLLECTIONS</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

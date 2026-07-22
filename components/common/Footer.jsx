'use client';

import { ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif tracking-[0.28em] text-3xl font-light text-white block">
              KOKIO
            </span>
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
              Engineered for the discerning voyager. Aerospace-grade aluminum luggage and Italian vachetta leather goods built for a lifetime of movement.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                LIFETIME GUARANTEE
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
                GLOBAL BOUTIQUES
              </span>
            </div>
          </div>

          {/* Boutique Flagships */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-300 uppercase border-b border-neutral-800 pb-2">
              FLAGSHIP BOUTIQUES
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li className="hover:text-amber-300 transition-colors cursor-pointer">PARIS — Place Vendôme</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">NEW YORK — Madison Avenue</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">TOKYO — Ginza Six</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">MUMBAI — Jio World Plaza</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-300 uppercase border-b border-neutral-800 pb-2">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Private Concierge</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Warranty & Repair Registration</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Complimentary Monogramming</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Global Express Shipping</li>
            </ul>
          </div>

          {/* Legal & Corporate */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] font-semibold text-neutral-300 uppercase border-b border-neutral-800 pb-2">
              HOUSE OF KOKIO
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Our Heritage & Metrology</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Sustainability Commitment</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Press & Editorial Inquiries</li>
              <li className="hover:text-amber-300 transition-colors cursor-pointer">Terms & Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light gap-4">
          <p>© {new Date().getFullYear()} KOKIO HAUT VOYAGE S.A. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center space-x-6 text-[11px] tracking-wider">
            <span>PARIS • NEW YORK • TOKYO</span>
            <span className="text-amber-400">USD ($)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

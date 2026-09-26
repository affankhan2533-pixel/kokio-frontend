'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Sparkles, Truck, Package, Compass } from 'lucide-react';
import { useJourneyStore } from '@store/useJourneyStore';

const SHOP_ITEMS = [
  { label: 'Cabin Carry-On', desc: 'Overhead bin aerospace aluminum 35L trunks', href: '/collections/carry-on' },
  { label: 'Check-In Luggage', desc: 'Medium & extended volume travel cases', href: '/collections/luggage' },
  { label: 'Extended Trunks', desc: 'Deep-capacity continental travel trunks', href: '/collections/trunks' },
  { label: 'Bags & Backpacks', desc: 'College satchels, school backpacks & leather weekenders', href: '/collections/bags' },
  { label: 'Bespoke Accessories', desc: 'Passport folios, luggage tags & organizers', href: '/collections/accessories' },
];

const COLLECTION_ITEMS = [
  { label: 'Monolith Series', tagline: 'Aerospace 6061-T6 Aluminum Trunks', href: '/collections/monolith' },
  { label: 'Metropolitan Line', tagline: 'Urban Travel & Business Executive Gear', href: '/collections/metropolitan' },
  { label: 'Expedition Sub-Zero', tagline: 'Hermetic Hydro-Seal Gasket Cases', href: '/collections/expedition' },
  { label: 'Atelier Bespoke', tagline: 'Hand-Finished Limited Run Masterpieces', href: '/collections/atelier' },
];

const SERVICE_ITEMS = [
  { label: 'Personalization & Monogramming', icon: Sparkles, detail: 'Bespoke laser & leather stamping' },
  { label: 'KOKIO Care & Warranty', icon: ShieldCheck, detail: 'Metrology-backed durability guarantee' },
  { label: 'Client Advisory Support', icon: Package, detail: 'Dedicated 1-on-1 luggage care advisors' },
  { label: 'Insured India Shipping', icon: Truck, detail: 'Secure express dispatch across India' },
];

export default function MegaMenu({ isOpen, activeCategory, onClose }) {
  const menuRef = useRef(null);
  const { openJourney } = useJourneyStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 right-0 w-full bg-[#111111]/98 backdrop-blur-3xl border-b border-white/10 text-[#F8F6F2] shadow-2xl z-40 hidden lg:block overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-8 py-10">
            <div className="grid grid-cols-12 gap-8 items-start">
              
              {/* Column 01: SHOP */}
              <div className="col-span-3 space-y-4 border-r border-white/10 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans tracking-[0.3em] text-[#B8892D] uppercase font-bold">
                    01 • SHOP
                  </span>
                </div>
                <ul className="space-y-3">
                  {SHOP_ITEMS.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group block space-y-0.5 hover:translate-x-1 transition-transform duration-200"
                      >
                        <div className="text-sm font-medium text-[#F8F6F2] group-hover:text-[#B8892D] transition-colors flex items-center justify-between">
                          <span>{item.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#B8892D]" />
                        </div>
                        <p className="text-[11px] text-[#A0A0A0] font-light truncate">
                          {item.desc}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 02: COLLECTIONS */}
              <div className="col-span-3 space-y-4 border-r border-white/10 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans tracking-[0.3em] text-[#B8892D] uppercase font-bold">
                    02 • COLLECTIONS
                  </span>
                </div>
                <ul className="space-y-3.5">
                  {COLLECTION_ITEMS.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group block space-y-0.5 hover:translate-x-1 transition-transform duration-200"
                      >
                        <div className="text-sm font-medium text-[#F8F6F2] group-hover:text-[#B8892D] transition-colors flex items-center justify-between">
                          <span>{item.label}</span>
                        </div>
                        <p className="text-[11px] text-[#A0A0A0] font-light">
                          {item.tagline}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 03: FEATURED */}
              <div className="col-span-3 space-y-3 border-r border-white/10 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans tracking-[0.3em] text-[#B8892D] uppercase font-bold">
                    03 • FEATURED HIGHLIGHT
                  </span>
                </div>
                <Link
                  href="/collections/monolith"
                  onClick={onClose}
                  className="group block rounded-xl overflow-hidden bg-[#1A1A1A] border border-white/10 hover:border-[#B8892D]/50 transition-all shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#222]">
                    <Image
                      src="/images/monolith.png"
                      alt="The Monolith Carry-On 35L"
                      fill
                      sizes="25vw"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#111]/80 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-sans text-[#B8892D] uppercase tracking-wider border border-[#B8892D]/30">
                      ICONIC CREATION
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-serif text-base font-medium text-[#F8F6F2] group-hover:text-[#B8892D] transition-colors flex items-center justify-between">
                      <span>The Monolith Carry-On 35L</span>
                      <ArrowUpRight className="w-4 h-4 text-[#B8892D]" />
                    </h4>
                    <p className="text-xs font-sans text-[#B8892D]">Crafted from ₹1,09,999</p>
                  </div>
                </Link>
              </div>

              {/* Column 04: SERVICES */}
              <div className="col-span-3 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans tracking-[0.3em] text-[#B8892D] uppercase font-bold">
                    04 • HOUSE SERVICES
                  </span>
                </div>
                <ul className="space-y-3">
                  {SERVICE_ITEMS.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.label} className="flex items-start gap-3 group cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#B8892D] shrink-0 group-hover:bg-[#B8892D]/20 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-semibold text-[#F8F6F2] group-hover:text-[#B8892D] transition-colors">
                            {service.label}
                          </h5>
                          <p className="text-[11px] text-[#A0A0A0] font-light leading-snug">
                            {service.detail}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* FIND YOUR JOURNEY discovery button */}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openJourney();
                  }}
                  className="w-full mt-4 p-3 bg-[#B8892D]/15 hover:bg-[#B8892D]/25 border border-[#B8892D]/40 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#B8892D]" />
                    <div>
                      <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#F8F6F2] group-hover:text-[#B8892D]">
                        FIND YOUR JOURNEY
                      </span>
                      <p className="text-[10px] text-[#A0A0A0] font-light">Interactive 4-step luggage curator</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

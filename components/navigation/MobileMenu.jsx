'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Search, ShoppingBag, ArrowUpRight, ShieldCheck, Globe, Heart, User, Compass } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import { useJourneyStore } from '@store/useJourneyStore';

const MOBILE_NAV_DATA = [
  {
    title: 'LUGGAGE',
    subitems: [
      { name: 'Cabin Carry-On (35L)', href: '/collections/carry-on' },
      { name: 'Check-In Cases (68L)', href: '/collections/luggage' },
      { name: 'Extended Trunks (88L - 110L)', href: '/collections/trunks' },
      { name: 'Sub-Zero Hydro Series', href: '/collections/expedition' },
    ],
  },
  {
    title: 'BAGS & DUFFELS',
    subitems: [
      { name: 'Horizon Leather Weekender', href: '/collections/bags' },
      { name: 'Executive Briefcases', href: '/collections/metropolitan' },
      { name: 'Crossbody Slings & Folios', href: '/collections/accessories' },
      { name: 'Backpacks & Commuter Bags', href: '/collections/bags' },
    ],
  },
  {
    title: 'ACCESSORIES',
    subitems: [
      { name: 'Tuscan Leather Passport Folio', href: '/collections/accessories' },
      { name: 'Luggage Tags & Monogramming', href: '/collections/atelier' },
      { name: 'Modular Packing Organizers', href: '/collections/accessories' },
    ],
  },
  {
    title: 'COLLECTIONS',
    subitems: [
      { name: 'The Monolith Series (Aerospace 6061-T6)', href: '/collections/monolith' },
      { name: 'Tuscan Vachetta Line', href: '/collections/atelier' },
      { name: 'Titanium Metrology Edition', href: '/collections/expedition' },
    ],
  },
  {
    title: 'THE HOUSE',
    subitems: [
      { name: 'Our Heritage & Metrology', href: '/collections/all' },
      { name: 'KOKIO Care & Warranty', href: '/collections/all' },
      { name: 'India Flagship Boutiques', href: '/collections/all' },
      { name: 'Client Advisory Support', href: '/collections/all' },
    ],
  },
];

export default function MobileMenu({ isOpen, onClose, onOpenSearch }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { cartItemsCount, toggleCart } = useCartStore();
  const { openJourney } = useJourneyStore();

  const toggleAccordion = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-[#0D0D0D] text-[#F8F6F2] flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:hidden selection:bg-[#B8892D]/30"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <button
              onClick={onClose}
              className="p-2 -ml-2 text-[#F8F6F2] hover:text-[#B8892D] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>

            <Link href="/" onClick={onClose} className="flex flex-col items-center select-none">
              <span className="font-serif text-lg tracking-[0.25em] text-[#F8F6F2]">KOKIO</span>
              <span className="text-[8px] tracking-[0.35em] text-[#B8892D]">PARIS</span>
            </Link>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="p-2 text-[#F8F6F2] hover:text-[#B8892D] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open Search"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  toggleCart();
                }}
                className="relative p-2 text-[#F8F6F2] hover:text-[#B8892D] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#B8892D] text-[#111] font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Center Accordion List */}
          <div className="flex-1 px-6 py-6 space-y-2 divide-y divide-white/10 overflow-y-auto">
            {MOBILE_NAV_DATA.map((cat, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <div key={cat.title} className="pt-3 first:pt-0">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full py-3.5 min-h-[48px] flex items-center justify-between text-left text-base font-serif tracking-[0.15em] text-[#F8F6F2] uppercase hover:text-[#B8892D] transition-colors cursor-pointer"
                  >
                    <span>{cat.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B8892D] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="pl-3 pb-3 space-y-2.5 overflow-hidden"
                      >
                        {cat.subitems.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="block py-2 min-h-[44px] text-xs text-[#C0C0C0] hover:text-[#B8892D] transition-colors flex items-center justify-between"
                            >
                              <span>{item.name}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]/70" />
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Signature Experience: FIND YOUR JOURNEY */}
          <div className="px-6 pt-3 pb-1 border-t border-white/10 bg-[#0F0F0F] shrink-0">
            <button
              onClick={() => {
                onClose();
                openJourney();
              }}
              className="w-full px-4 py-3 bg-[#B8892D]/15 hover:bg-[#B8892D]/25 border border-[#B8892D]/40 rounded-xl flex items-center justify-between text-xs font-sans uppercase font-bold tracking-wider text-[#F8F6F2] hover:text-[#B8892D] transition-colors min-h-[44px] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#B8892D]" />
                <span>FIND YOUR JOURNEY</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
            </button>
          </div>

          {/* Quick Utility Links (Wishlist & Account) */}
          <div className="px-6 py-3 border-t border-white/10 bg-[#101010] grid grid-cols-2 gap-3 shrink-0">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-sans tracking-wider text-[#F8F6F2] hover:text-[#B8892D] rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <Heart className="w-4 h-4 text-[#B8892D]" />
              <span>WISHLIST</span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="px-3 py-2.5 bg-white/5 hover:bg-white/10 text-xs font-sans tracking-wider text-[#F8F6F2] hover:text-[#B8892D] rounded-xl flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <User className="w-4 h-4 text-[#B8892D]" />
              <span>ACCOUNT</span>
            </Link>
          </div>

          {/* Bottom Drawer Footer Context */}
          <div className="px-6 py-5 border-t border-white/10 bg-[#141414] space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs text-[#A0A0A0]">
              <span className="flex items-center gap-1.5 text-[#B8892D] font-semibold">
                <Globe className="w-3.5 h-3.5" />
                MUMBAI • NEW DELHI • BENGALURU
              </span>
              <span className="font-sans text-xs text-[#F8F6F2]">INR (₹)</span>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#A0A0A0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8892D]" />
              <span>KOKIO Care & Maintenance Services</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

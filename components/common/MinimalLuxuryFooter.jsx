'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';

const FOOTER_NAV = [
  {
    title: 'SHOP',
    links: [
      { name: 'Cabin Carry-On (35L)', href: '/collections/carry-on' },
      { name: 'Check-In Cases (68L)', href: '/collections/luggage' },
      { name: 'Extended Trunks (88L)', href: '/collections/trunks' },
      { name: 'Leather Duffels', href: '/collections/bags' },
      { name: 'Bespoke Accessories', href: '/collections/accessories' },
    ],
  },
  {
    title: 'COLLECTIONS',
    links: [
      { name: 'The Monolith Series', href: '/collections/monolith' },
      { name: 'Metropolitan Line', href: '/collections/metropolitan' },
      { name: 'Expedition Sub-Zero', href: '/collections/expedition' },
      { name: 'Atelier Bespoke', href: '/collections/atelier' },
    ],
  },
  {
    title: 'CUSTOMER CARE',
    links: [
      { name: 'Insured Transit & Delivery', href: '/collections/all' },
      { name: 'KOKIO Care & Maintenance', href: '/collections/all' },
      { name: 'Bespoke Monogramming', href: '/collections/all' },
      { name: 'Client Advisory', href: '/collections/all' },
    ],
  },
  {
    title: 'THE HOUSE',
    links: [
      { name: 'Our Story & Metrology', href: '/collections/all' },
      { name: 'Editorial Journal', href: '/collections/all' },
      { name: 'India Boutiques', href: '/collections/all' },
      { name: 'Client Care Support', href: '/collections/all' },
    ],
  },
];

export default function MinimalLuxuryFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const toggleAccordion = (idx) => {
    setExpandedMobile(expandedMobile === idx ? null : idx);
  };

  return (
    <footer className="bg-[#0D0D0D] text-[#F8F6F2] border-t border-white/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-14">
        
        {/* TOP TIER: Logotype & Integrated Voyager Club Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10 pb-12">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-serif text-3xl tracking-[0.25em] text-[#F8F6F2] font-light block">
              K O K I O
            </span>
            <p className="text-xs text-[#A0A0A0] font-light leading-relaxed max-w-sm">
              Engineered for the discerning voyager. Aerospace-grade aluminum trunks and Tuscan vachetta leather goods crafted for long-distance transit.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#B8892D]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-sans tracking-wider uppercase text-[11px] font-semibold">
                KOKIO CARE & MAINTENANCE SERVICES
              </span>
            </div>
          </div>

          {/* Integrated Voyager Club Newsletter Form */}
          <div className="lg:col-span-7 bg-[#141414] rounded-xs p-6 border border-white/10 space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-sans tracking-[0.3em] text-[#B8892D] uppercase font-bold block">
                THE VOYAGER CLUB
              </span>
              <h4 className="font-serif text-xl font-light text-[#F8F6F2]">
                Subscribe to Private Dispatches
              </h4>
              <p className="text-xs text-[#A0A0A0] font-light">
                Receive invitations to private collection releases, client updates, and editorial dispatches.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#1A1A1A] border border-white/15 rounded-xs px-4 py-3 text-xs text-[#F8F6F2] placeholder-[#777777] focus:outline-none focus:border-[#B8892D] transition-colors font-sans tracking-wide"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B8892D] hover:bg-[#161616] hover:text-[#F8F6F2] text-[#111111] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-300 shrink-0 cursor-pointer flex items-center justify-center gap-2 group border border-[#B8892D]"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>SUBSCRIBED</span>
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* CENTER TIER: Desktop 4-Column Links / Mobile Collapsible Accordions */}
        <div className="hidden lg:grid grid-cols-4 gap-8">
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="space-y-3">
              <h5 className="text-xs font-sans tracking-[0.25em] text-[#B8892D] uppercase font-bold border-b border-white/10 pb-2">
                {col.title}
              </h5>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#A0A0A0] hover:text-[#B8892D] transition-colors font-light block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Accordion Links */}
        <div className="lg:hidden divide-y divide-white/10 border-b border-white/10 pb-4">
          {FOOTER_NAV.map((col, idx) => {
            const isExpanded = expandedMobile === idx;
            return (
              <div key={col.title} className="py-2.5">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full py-2 flex items-center justify-between text-xs font-sans tracking-[0.2em] text-[#B8892D] uppercase font-bold text-left cursor-pointer"
                >
                  <span>{col.title}</span>
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
                      className="pl-2 pt-2 space-y-2 overflow-hidden"
                    >
                      {col.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-xs text-[#A0A0A0] hover:text-[#B8892D] transition-colors font-light block py-1.5 min-h-[44px] flex items-center"
                          >
                            {link.name}
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

        {/* BOTTOM TIER: Copyright & Legal */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#777777] font-light gap-4">
          <p>© {new Date().getFullYear()} KOKIO HAUT VOYAGE S.A. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <Link href="/collections/all" className="hover:text-[#B8892D] transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/collections/all" className="hover:text-[#B8892D] transition-colors">Terms of Service</Link>
            <span>•</span>
            <span className="text-[#B8892D] font-sans font-semibold tracking-wider uppercase text-[11px]">MUMBAI • NEW DELHI • BENGALURU • INDIA (₹)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

const ANNOUNCEMENTS = [
  { id: 1, text: 'COMPLIMENTARY EXPRESS SHIPPING ACROSS INDIA ON ORDERS OVER ₹25,000', tag: 'WHITE-GLOVE' },
  { id: 2, text: 'THE MONOLITH AEROSPACE LUGGAGE COLLECTION — LIMITED EDITION 01', tag: 'NEW DROP' },
  { id: 3, text: 'LIFETIME GUARANTEE & BESPOKE MONOGRAMMING INCLUDED', tag: 'BESPOKE' },
];

export default function AnnouncementBar({ scrolled = false }) {
  const [index, setIndex] = useState(0);
  const [currency, setCurrency] = useState('INR (₹)');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`w-full transition-all duration-500 ease-in-out relative z-50 ${
        scrolled
          ? 'max-h-0 opacity-0 py-0 overflow-hidden border-none'
          : 'max-h-12 opacity-100 py-2.5 px-4 md:px-8 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 text-[#EFEAE2]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Region & Store Locator */}
        <div className="hidden xl:flex items-center space-x-5 text-[11px] tracking-wider text-[#EFEAE2]/70">
          <span className="flex items-center gap-1.5 hover:text-[#F8F6F2] transition-colors cursor-pointer whitespace-nowrap">
            <Globe className="w-3.5 h-3.5 text-[#B8892D]" />
            MUMBAI • NEW DELHI • BENGALURU • PARIS
          </span>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1 hover:text-[#F8F6F2] transition-colors cursor-pointer whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8892D]" />
            LIFETIME WARRANTY
          </span>
        </div>

        {/* Center: Animated Rotating Announcements */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-5 px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={ANNOUNCEMENTS[index].id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2.5 text-[10px] sm:text-[11px] md:text-xs tracking-[0.18em] font-medium whitespace-nowrap"
            >
              <span className="px-2 py-0.5 text-[9px] tracking-widest font-bold bg-[#B8892D] text-[#111111] rounded-xs uppercase whitespace-nowrap shadow-xs">
                {ANNOUNCEMENTS[index].tag}
              </span>
              <span className="text-[#F8F6F2] truncate max-w-[260px] sm:max-w-[440px] lg:max-w-[650px]">
                {ANNOUNCEMENTS[index].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Currency Selector */}
        <div className="hidden sm:flex items-center space-x-4 text-[11px] tracking-wider text-[#EFEAE2]/80 relative">
          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="flex items-center gap-1 hover:text-[#B8892D] transition-colors cursor-pointer font-medium"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-[#B8892D]" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 top-6 bg-[#181818] border border-white/15 rounded-[12px] shadow-2xl py-2 w-32 z-50 text-[#F8F6F2]">
                {['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      setCurrency(curr);
                      setShowCurrencyDropdown(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-[11px] hover:bg-[#B8892D]/20 hover:text-[#B8892D] transition-colors font-medium cursor-pointer"
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1 text-[#F8F6F2] font-semibold hover:text-[#B8892D] cursor-pointer transition-colors">
            <Sparkles className="w-3 h-3 text-[#B8892D]" />
            CONCIERGE
          </span>
        </div>

      </div>
    </div>
  );
}

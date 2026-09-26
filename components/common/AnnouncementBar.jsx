'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ANNOUNCEMENTS = [
  'INSURED TRANSIT ACROSS INDIA • DISPATCH WITHIN 48 HOURS',
  'KOKIO CARE WARRANTY & BESPOKE MONOGRAMMING OPTIONS AVAILABLE',
  'THE MONOLITH AEROSPACE LUGGAGE COLLECTION — LIMITED EDITION 01',
];

export default function AnnouncementBar({ scrolled = false }) {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`w-full transition-all duration-300 relative z-50 bg-[#0D0D0D] text-[#EFEAE2] border-b border-white/10 select-none overflow-hidden ${
        scrolled ? 'max-h-0 opacity-0 py-0 border-none' : 'max-h-10 opacity-100 py-1.5 px-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px] tracking-[0.18em] uppercase font-medium">
        
        {/* Left Spacer for balance on desktop */}
        <div className="hidden lg:block w-16" />

        {/* Center: Single-line Rotating Message */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-5 px-2 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="truncate text-[#F8F6F2]"
            >
              <span className="text-[#B8892D] font-semibold mr-2">●</span>
              {ANNOUNCEMENTS[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Region Indicator & Dismiss Button */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-block text-[10px] text-[#B8892D] tracking-widest font-semibold">
            INDIA (₹)
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/60 hover:text-white transition-colors p-0.5 cursor-pointer"
            aria-label="Dismiss Announcement"
          >
            <X className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>

      </div>
    </div>
  );
}


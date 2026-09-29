'use client';

import { X } from 'lucide-react';

export default function PaymentNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="bg-white text-[#161616] w-full max-w-md rounded-xs border border-[#EAEAEA] shadow-xl overflow-hidden p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-[#777777] hover:text-[#161616] transition-colors cursor-pointer p-1"
          aria-label="Close Notice"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Brand Monogram / Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#777777] font-medium block">
            KOKIO
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-light text-[#161616] tracking-wide">
            CHECKOUT INFORMATION
          </h3>
        </div>

        {/* Clean Neutral State */}
        <div className="py-4 border-y border-[#EAEAEA] space-y-2">
          <p className="font-sans text-xs tracking-[0.1em] uppercase font-semibold text-[#161616]">
            PAYMENT WILL BE AVAILABLE AT FINAL CHECKOUT
          </p>
          <p className="text-xs text-[#666666] font-normal leading-relaxed font-sans">
            Your shipping details have been recorded for this session. Direct payment gateway connectivity will be available upon launch.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            type="button"
            className="w-full min-h-[44px] px-6 py-3 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-200 cursor-pointer text-center"
          >
            RETURN TO CHECKOUT
          </button>
        </div>

      </div>
    </div>
  );
}

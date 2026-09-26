'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';

export default function ProductAccordion({ product }) {
  const [openSections, setOpenSections] = useState({
    description: true,
    specs: false,
    care: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="border-t border-black/10 divide-y divide-black/10 text-[#161616]">
      {/* 01. Description & Story */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('description')}
          className="w-full py-1.5 flex items-center justify-between text-xs font-sans font-bold tracking-[0.2em] text-[#161616] uppercase text-left cursor-pointer"
        >
          <span>PRODUCT OVERVIEW</span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8892D] transition-transform duration-300 ${
              openSections.description ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-3 space-y-3 overflow-hidden"
            >
              <p className="text-xs sm:text-sm text-[#555555] font-light leading-relaxed">
                {product.story}
              </p>
              
              {product.highlights && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-[#B8892D] uppercase block">
                    ENGINEERING HIGHLIGHTS
                  </span>
                  <ul className="space-y-1.5">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-[#161616]">
                        <Check className="w-3.5 h-3.5 text-[#B8892D] shrink-0" />
                        <span className="font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 02. Specifications & Dimensions */}
      {product.details && (
        <div className="py-4">
          <button
            onClick={() => toggleSection('specs')}
            className="w-full py-1.5 flex items-center justify-between text-xs font-sans font-bold tracking-[0.2em] text-[#161616] uppercase text-left cursor-pointer"
          >
            <span>SPECIFICATIONS & DIMENSIONS</span>
            <ChevronDown
              className={`w-4 h-4 text-[#B8892D] transition-transform duration-300 ${
                openSections.specs ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          <AnimatePresence>
            {openSections.specs && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="pt-3 overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 bg-[#EFEAE2]/60 p-4 rounded-xl text-xs font-sans">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="space-y-0.5">
                      <span className="text-[9px] text-[#777777] uppercase tracking-wider block font-bold">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-[#161616] font-semibold block">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 03. Shipping, Warranty & Care */}
      <div className="py-4">
        <button
          onClick={() => toggleSection('care')}
          className="w-full py-1.5 flex items-center justify-between text-xs font-sans font-bold tracking-[0.2em] text-[#161616] uppercase text-left cursor-pointer"
        >
          <span>SHIPPING, WARRANTY & CARE</span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8892D] transition-transform duration-300 ${
              openSections.care ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence>
          {openSections.care && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-3 space-y-3 text-xs text-[#555555] font-light leading-relaxed overflow-hidden"
            >
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#B8892D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#161616] font-semibold block font-sans text-[11px] uppercase">
                    Insured Express Delivery
                  </strong>
                  <span>Insured transit with secure tracking across all India destinations.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#B8892D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#161616] font-semibold block font-sans text-[11px] uppercase">
                    KOKIO Care Warranty
                  </strong>
                  <span>Structural durability guarantee backed by metrology inspection standards.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#B8892D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#161616] font-semibold block font-sans text-[11px] uppercase">
                    Bespoke Monogramming Options
                  </strong>
                  <span>Precision laser or leather foil personalization available on select models.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function ProductAccordion({ product }) {
  const [openSections, setOpenSections] = useState({
    overview: true,
    specs: false,
    materials: false,
    care: false,
    shipping: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getCareInstructions = () => {
    if (product.materialType === 'aluminum' || product.materialType === 'titanium') {
      return 'Maintain anodized aluminum and titanium surfaces with a soft microfiber cloth and mild neutral cleaner. Avoid abrasive cleansers or scouring pads.';
    }
    if (product.materialType === 'leather') {
      return 'Full-grain Tuscan vachetta develops a rich natural patina over time. Treat periodically with neutral leather balm. Keep away from prolonged moisture.';
    }
    return 'Clean ballistic nylon shell with a soft brush and lukewarm water. Allow to air dry naturally away from direct heat sources.';
  };

  return (
    <div className="border-t border-[#EAEAEA] divide-y divide-[#EAEAEA] text-[#161616]">
      {/* 01. PRODUCT OVERVIEW */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection('overview')}
          className="w-full py-1 flex items-center justify-between text-xs font-sans font-medium tracking-[0.12em] text-[#161616] uppercase text-left cursor-pointer group"
          aria-expanded={openSections.overview}
        >
          <span className="group-hover:text-[#B8892D] transition-colors">PRODUCT OVERVIEW</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#777777] transition-transform duration-200 ${
              openSections.overview ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.overview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-2.5 pb-1 space-y-3">
                <p className="text-xs text-[#555555] font-light leading-relaxed">
                  {product.story}
                </p>

                {product.highlights && product.highlights.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-xs text-[#161616]">
                        <Check className="w-3 h-3 text-[#B8892D] shrink-0 stroke-[2]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 02. SPECIFICATIONS */}
      {product.details && (
        <div className="py-3.5">
          <button
            type="button"
            onClick={() => toggleSection('specs')}
            className="w-full py-1 flex items-center justify-between text-xs font-sans font-medium tracking-[0.12em] text-[#161616] uppercase text-left cursor-pointer group"
            aria-expanded={openSections.specs}
          >
            <span className="group-hover:text-[#B8892D] transition-colors">SPECIFICATIONS</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#777777] transition-transform duration-200 ${
                openSections.specs ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openSections.specs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="pt-2.5 pb-1 space-y-2 text-xs">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-[#F0F0F0]">
                      <span className="text-[#777777] uppercase text-[11px] font-sans">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="text-[#161616] font-medium text-[11px] text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 03. MATERIALS */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection('materials')}
          className="w-full py-1 flex items-center justify-between text-xs font-sans font-medium tracking-[0.12em] text-[#161616] uppercase text-left cursor-pointer group"
          aria-expanded={openSections.materials}
        >
          <span className="group-hover:text-[#B8892D] transition-colors">MATERIALS</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#777777] transition-transform duration-200 ${
              openSections.materials ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.materials && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-2.5 pb-1 text-xs text-[#555555] font-light leading-relaxed">
                <span className="text-[#161616] font-medium block pb-1">{product.material}</span>
                <span>Crafted using certified premium materials and rigorous metrology inspection standards.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 04. CARE */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection('care')}
          className="w-full py-1 flex items-center justify-between text-xs font-sans font-medium tracking-[0.12em] text-[#161616] uppercase text-left cursor-pointer group"
          aria-expanded={openSections.care}
        >
          <span className="group-hover:text-[#B8892D] transition-colors">CARE</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#777777] transition-transform duration-200 ${
              openSections.care ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.care && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-2.5 pb-1 text-xs text-[#555555] font-light leading-relaxed">
                <p>{getCareInstructions()}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 05. SHIPPING & RETURNS */}
      <div className="py-3.5">
        <button
          type="button"
          onClick={() => toggleSection('shipping')}
          className="w-full py-1 flex items-center justify-between text-xs font-sans font-medium tracking-[0.12em] text-[#161616] uppercase text-left cursor-pointer group"
          aria-expanded={openSections.shipping}
        >
          <span className="group-hover:text-[#B8892D] transition-colors">SHIPPING & RETURNS</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#777777] transition-transform duration-200 ${
              openSections.shipping ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {openSections.shipping && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-2.5 pb-1 space-y-2 text-xs text-[#555555] font-light leading-relaxed">
                <p>Insured dispatch across India. Each piece is packaged in protective transit shielding with tracking details provided upon handover.</p>
                <p>For returns or client inquiries, contact KOKIO client advisory services.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

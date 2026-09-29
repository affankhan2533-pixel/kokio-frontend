'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check } from 'lucide-react';
import { FILTER_SECTIONS } from '@components/plp/FilterBar';

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalCount,
  hasActiveFilters,
}) {
  const [openSections, setOpenSections] = useState({
    category: true,
    productType: true,
    material: false,
    collection: false,
    colour: false,
    price: false,
  });

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden cursor-pointer"
          />

          {/* Slide-over Filter Panel on Pure White Canvas */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 bottom-0 right-0 w-[88%] max-w-sm bg-white text-[#161616] z-50 flex flex-col justify-between shadow-2xl lg:hidden font-sans"
          >
            {/* Top Header */}
            <div className="px-5 py-4 border-b border-[#EAEAEA] flex items-center justify-between shrink-0 bg-white">
              <div>
                <h3 className="font-serif text-lg font-light text-[#161616]">Filters</h3>
                <span className="text-[11px] text-[#777777] font-sans">
                  {totalCount} {totalCount === 1 ? 'Product' : 'Products'} Available
                </span>
              </div>

              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="text-xs text-[#777777] hover:text-[#B8892D] uppercase font-medium cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
                  aria-label="Close Filters"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Accordion List Body */}
            <div className="flex-1 overflow-y-auto px-5 py-1 divide-y divide-[#EAEAEA]">
              {FILTER_SECTIONS.map((section) => {
                const isExpanded = Boolean(openSections[section.id]);
                const selectedValues = filters[section.id] || [];

                return (
                  <div key={section.id} className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between text-left py-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-medium tracking-wider text-[#161616]">
                          {section.label}
                        </span>
                        {selectedValues.length > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B8892D]" />
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#777777] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pb-1 space-y-2">
                            {section.options.map((opt) => {
                              const isChecked = selectedValues.includes(opt.id);

                              return (
                                <label
                                  key={opt.id}
                                  className="flex items-center gap-3 cursor-pointer py-1 text-xs text-[#555555]"
                                >
                                  <div
                                    className={`w-3.5 h-3.5 rounded-[1px] border flex items-center justify-center transition-colors shrink-0 ${
                                      isChecked
                                        ? 'border-[#B8892D] bg-[#B8892D] text-white'
                                        : 'bg-white border-black/25'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                  </div>
                                  <span className={`text-[12px] font-sans ${isChecked ? 'font-medium text-[#161616]' : 'text-[#555555]'}`}>
                                    {opt.label}
                                  </span>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => onFilterChange(section.id, opt.id)}
                                    className="sr-only"
                                  />
                                </label>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-[#EAEAEA] bg-white space-y-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="btn-primary-luxury w-full py-3 text-xs"
              >
                VIEW {totalCount} {totalCount === 1 ? 'PIECE' : 'PIECES'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FILTER_SECTIONS = [
  {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'luggage', label: 'Luggage' },
      { id: 'bags', label: 'Bags & Duffels' },
      { id: 'accessories', label: 'Travel Accessories' },
    ],
  },
  {
    id: 'productType',
    label: 'Product Type',
    options: [
      { id: 'carry-on', label: 'Carry-On Luggage' },
      { id: 'trunks', label: 'Extended Trunks' },
      { id: 'backpack', label: 'Backpacks' },
      { id: 'briefcase', label: 'Briefcases & Satchels' },
      { id: 'duffel', label: 'Duffels & Weekenders' },
      { id: 'accessory', label: 'Small Accessories' },
    ],
  },
  {
    id: 'material',
    label: 'Material',
    options: [
      { id: 'aluminum', label: 'Aerospace Aluminum' },
      { id: 'titanium', label: 'Brushed Titanium' },
      { id: 'leather', label: 'Tuscan Leather' },
      { id: 'nylon', label: 'Ballistic Nylon' },
    ],
  },
  {
    id: 'collection',
    label: 'Collection',
    options: [
      { id: 'monolith', label: 'The Monolith Series' },
      { id: 'expedition', label: 'Expedition Series' },
      { id: 'metropolitan', label: 'Metropolitan Line' },
      { id: 'atelier', label: 'Atelier Bespoke' },
    ],
  },
  {
    id: 'colour',
    label: 'Colour',
    options: [
      { id: 'Silver Aluminum', label: 'Silver' },
      { id: 'Onyx Black', label: 'Black' },
      { id: 'Champagne Gold', label: 'Champagne Gold' },
      { id: 'Titanium Grey', label: 'Titanium Grey' },
      { id: 'Chestnut Brown', label: 'Chestnut Brown' },
      { id: 'Arctic White', label: 'Arctic White' },
    ],
  },
  {
    id: 'price',
    label: 'Price',
    options: [
      { id: 'under-50k', label: 'Under ₹50,000' },
      { id: '50k-100k', label: '₹50,000 – ₹1,00,000' },
      { id: '100k-150k', label: '₹1,00,000 – ₹1,50,000' },
      { id: 'over-150k', label: 'Over ₹1,50,000' },
    ],
  },
];

export default function FilterBar({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
}) {
  // Accordion open/collapse state (top sections open by default)
  const [openSections, setOpenSections] = useState({
    category: true,
    productType: true,
    material: true,
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
    <aside className="w-[195px] shrink-0 text-[#161616] font-sans select-none space-y-0.5">
      {/* Active Filters Reset Trigger */}
      {hasActiveFilters && (
        <div className="pb-3 border-b border-[#EAEAEA] flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#777777] uppercase tracking-wider">
            Active Filters
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] text-[#B8892D] hover:underline uppercase font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      )}

      {/* Accordion Filter Rows */}
      {FILTER_SECTIONS.map((section) => {
        const isOpen = Boolean(openSections[section.id]);
        const selectedValues = filters[section.id] || [];

        return (
          <div key={section.id} className="border-b border-[#EAEAEA] py-3">
            {/* Accordion Header Button */}
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between text-left cursor-pointer group py-1"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-[#161616] group-hover:text-[#B8892D] transition-colors">
                  {section.label}
                </span>
                {selectedValues.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8892D]" />
                )}
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#777777] group-hover:text-[#161616] transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {/* Accordion Content Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-2.5 pb-1 space-y-2">
                    {section.options.map((opt) => {
                      const isChecked = selectedValues.includes(opt.id);

                      return (
                        <label
                          key={opt.id}
                          className="flex items-center gap-2.5 cursor-pointer text-xs text-[#555555] hover:text-[#161616] transition-colors py-0.5 group"
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-[1px] border flex items-center justify-center transition-colors shrink-0 ${
                              isChecked
                                ? 'border-[#B8892D] bg-[#B8892D] text-white'
                                : 'bg-white border-black/25 group-hover:border-black/50'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className={`text-[12px] ${isChecked ? 'font-medium text-[#161616]' : 'text-[#555555]'}`}>
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
    </aside>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

const RECENT_SEARCHES = ['Monolith Carry-On', 'Titanium Spinner', 'Vachetta Duffel', 'Passport Folio'];

const SUGGESTED_PRODUCTS = [
  {
    id: 'monolith-carryon',
    name: 'The Monolith Carry-On 35L',
    category: 'AEROSPACE ALUMINUM',
    price: '₹1,09,999',
    image: '/images/monolith.png',
  },
  {
    id: 'horizon-duffel',
    name: 'The Horizon Leather Weekender',
    category: 'TUSCAN VACHETTA LEATHER',
    price: '₹79,999',
    image: '/images/duffel.png',
  },
  {
    id: 'apex-titanium',
    name: 'The Apex Titanium Spinner 88L',
    category: 'BRUSHED TITANIUM',
    price: '₹1,49,999',
    image: '/images/titanium_trunk.png',
  },
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectProduct = (product) => {
    addItem(product);
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#111111]/70 backdrop-blur-md z-50"
          />

          {/* Fullscreen Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F2] text-[#161616] border-b border-[rgba(0,0,0,0.08)] shadow-2xl p-6 sm:p-12 max-h-[90vh] overflow-y-auto"
          >
            <div className="max-w-5xl mx-auto space-y-10">
              
              {/* Top Search Input Line */}
              <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.12)] pb-4">
                <div className="flex items-center gap-4 flex-1">
                  <Search className="w-6 h-6 text-[#B8892D] stroke-[1.5]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search luxury luggage, leather goods..."
                    className="w-full bg-transparent font-serif text-2xl sm:text-4xl text-[#161616] placeholder-[#666666]/60 focus:outline-none tracking-tight font-light"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-[#666666] hover:text-[#161616] hover:bg-[#EFEAE2] rounded-full transition-colors cursor-pointer"
                  aria-label="Close search overlay"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Recent Searches & Quick Filters */}
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.3em] font-semibold text-[#B8892D] uppercase block">
                  RECENT & POPULAR SEARCHES
                </span>
                <div className="flex flex-wrap gap-2">
                  {RECENT_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-[#EFEAE2] hover:bg-[#111111] hover:text-[#F8F6F2] rounded-full text-xs tracking-wider text-[#161616] transition-all cursor-pointer flex items-center gap-2 border border-[rgba(0,0,0,0.06)]"
                    >
                      <TrendingUp className="w-3 h-3 text-[#B8892D]" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggested Product Results Grid */}
              <div className="space-y-4 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                <span className="text-[10px] tracking-[0.3em] font-semibold text-[#666666] uppercase block">
                  SUGGESTED VOYAGE INSTRUMENTS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {SUGGESTED_PRODUCTS.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="group cursor-pointer bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] rounded-[18px] p-4 flex flex-col justify-between hover:border-[#B8892D]/40 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="h-44 w-full overflow-hidden rounded-[12px] bg-[#F8F6F2] mb-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] tracking-widest text-[#B8892D] uppercase font-semibold">
                          {prod.category}
                        </span>
                        <h4 className="font-serif text-lg text-[#161616] font-light leading-snug group-hover:text-[#B8892D] transition-colors">
                          {prod.name}
                        </h4>
                        <div className="flex items-center justify-between pt-2">
                          <span className="font-serif text-base text-[#161616] font-semibold">
                            {prod.price}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-[#666666] group-hover:text-[#B8892D] transition-colors" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

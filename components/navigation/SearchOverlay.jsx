'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, TrendingUp, Sparkles, Folder } from 'lucide-react';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

const TRENDING_SEARCHES = [
  'Monolith Carry-On',
  'Leather Weekender',
  'Travel Accessories',
  'Expedition Trunk',
];

const POPULAR_COLLECTIONS = [
  { name: 'Monolith', href: '/collections/monolith' },
  { name: 'Metropolitan', href: '/collections/metropolitan' },
  { name: 'Expedition', href: '/collections/expedition' },
  { name: 'Atelier', href: '/collections/atelier' },
];

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
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

  // Local filter against catalogData.js
  const trimmedQuery = query.trim().toLowerCase();
  const searchResults = trimmedQuery.length > 0
    ? PRODUCTS_CATALOG.filter((item) => {
        const matchName = item.name.toLowerCase().includes(trimmedQuery);
        const matchCategory = item.categoryLabel?.toLowerCase().includes(trimmedQuery) || item.category.toLowerCase().includes(trimmedQuery);
        const matchCollection = item.collectionLabel?.toLowerCase().includes(trimmedQuery) || item.collection.toLowerCase().includes(trimmedQuery);
        const matchMaterial = item.material?.toLowerCase().includes(trimmedQuery);
        const matchTag = item.tag?.toLowerCase().includes(trimmedQuery);
        return matchName || matchCategory || matchCollection || matchMaterial || matchTag;
      })
    : [];

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        onClose();
        router.push(`/products/${searchResults[0].slug}`);
      }
    }
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
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0D0D0D]/75 backdrop-blur-md z-50 cursor-pointer"
          />

          {/* Luxury Search Overlay Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#F8F6F2] text-[#161616] border-b border-black/10 shadow-2xl max-h-[88vh] overflow-y-auto selection:bg-[#B8892D]/30"
          >
            <div className="max-w-5xl mx-auto px-6 py-6 md:py-10 space-y-8">
              
              {/* Header Bar with Brand Title and Close Button */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xs md:text-sm tracking-[0.25em] font-light uppercase text-[#777777]">
                    SEARCH KOKIO
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-[#777777] hover:text-[#161616] transition-colors rounded-full cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Large Elegant Search Input */}
              <div className="relative flex items-center border-b border-black/15 pb-3 sm:pb-4 focus-within:border-[#B8892D] transition-colors">
                <Search className="w-6 h-6 md:w-8 md:h-8 text-[#B8892D] stroke-[1.5] shrink-0 mr-3 md:mr-4" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDownInput}
                  placeholder="Search luggage, bags, accessories..."
                  className="w-full bg-transparent font-serif text-xl sm:text-3xl md:text-4xl text-[#161616] placeholder-[#888888] focus:outline-none font-light tracking-tight"
                />
                {query.length > 0 && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-xs font-sans text-[#888888] hover:text-[#161616] uppercase p-2 cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* State A: Before typing (Trending Searches & Popular Collections) */}
              {trimmedQuery.length === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  
                  {/* Trending Searches */}
                  <div className="space-y-3">
                    <span className="text-xs font-sans tracking-[0.25em] font-semibold text-[#888888] uppercase block">
                      TRENDING SEARCHES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TRENDING_SEARCHES.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3.5 py-2 bg-white hover:bg-[#161616] hover:text-[#F8F6F2] text-[#161616] border border-black/8 rounded-xs text-xs font-sans tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 min-h-[44px]"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-[#B8892D]" />
                          <span>{term}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular Collections */}
                  <div className="space-y-3">
                    <span className="text-xs font-sans tracking-[0.2em] font-semibold text-[#888888] uppercase block">
                      POPULAR COLLECTIONS
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {POPULAR_COLLECTIONS.map((col) => (
                        <Link
                          key={col.name}
                          href={col.href}
                          onClick={onClose}
                          className="px-4 py-2.5 bg-white hover:border-[#B8892D]/40 text-[#161616] border border-black/8 rounded-xs text-xs font-sans uppercase tracking-wider transition-all duration-200 flex items-center justify-between group min-h-[44px]"
                        >
                          <span>{col.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#777777] group-hover:text-[#B8892D] transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* State B: Results when query is active */}
              {trimmedQuery.length > 0 && searchResults.length > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between border-b border-black/8 pb-2">
                    <span className="text-xs font-sans tracking-[0.2em] font-semibold text-[#888888] uppercase">
                      RESULTS ({searchResults.length})
                    </span>
                    <span className="text-[11px] font-sans text-[#777777]">
                      Press <kbd className="px-1.5 py-0.5 bg-black/5 rounded-xs text-[10px]">Enter</kbd> to open first match
                    </span>
                  </div>

                  {/* Editorial Compact Result List */}
                  <div className="divide-y divide-black/8">
                    {searchResults.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18, delay: idx * 0.04, ease: 'easeOut' }}
                      >
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={onClose}
                          className="group py-3.5 px-3 flex items-center justify-between rounded-xs hover:bg-white transition-colors cursor-pointer min-h-[56px]"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="relative w-12 h-14 bg-[#EFEAE2] rounded-xs overflow-hidden shrink-0 border border-black/8">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                                sizes="48px"
                              />
                            </div>
                            <div className="min-w-0 space-y-0.5">
                              <span className="text-[9px] font-sans uppercase tracking-widest text-[#777777] font-semibold block truncate">
                                {item.collectionLabel || item.collection}
                              </span>
                              <h4 className="font-serif text-base text-[#161616] group-hover:text-[#B8892D] transition-colors truncate font-light">
                                {item.name}
                              </h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 shrink-0 pl-4">
                            <span className="font-sans text-xs sm:text-sm font-semibold text-[#161616]">
                              {item.price}
                            </span>
                            <span className="hidden sm:flex items-center gap-1 text-[11px] font-sans font-semibold tracking-wider uppercase text-[#B8892D] group-hover:translate-x-1 transition-transform">
                              <span>EXPLORE</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* State C: No results */}
              {trimmedQuery.length > 0 && searchResults.length === 0 && (
                <div className="py-12 text-center space-y-4">
                  <p className="font-serif text-2xl text-[#161616] font-light">
                    NO RESULTS FOR &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs font-sans text-[#777777] max-w-md mx-auto">
                    We could not find matching pieces. Explore our full catalog of aerospace luggage and handcrafted leather goods.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/collections/all"
                      onClick={onClose}
                      className="btn-primary-gold"
                    >
                      <span>EXPLORE ALL COLLECTIONS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

'use client';

import Link from 'next/link';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

import { motion } from 'framer-motion';

export default function CollectionHeader({
  meta,
  totalCount,
  showFilters,
  onToggleFilters,
  sortOption,
  onSortChange,
  onOpenMobileFilters,
}) {
  return (
    <header className="w-full bg-white border-b border-[#EAEAEA] pt-24 pb-4 md:pt-28 md:pb-5 text-[#161616]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-3">
        
        {/* Breadcrumb Navigation (Restrained, Muted, Clean) */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-[11px] font-sans text-[#777777]">
          <Link href="/" className="hover:text-[#161616] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-[#161616] transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-[#161616] font-medium">{meta.title}</span>
        </nav>

        {/* Main Header Title & Desktop Action Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
          
          {/* Left: Collection Title (Cormorant Garamond 42-48px on desktop) */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-light text-[#161616] leading-tight tracking-tight"
            >
              {meta.title}
            </motion.h1>
          </div>

          {/* Right (Desktop): Product Count, Hide Filters Toggle, Sort Dropdown */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-sans text-[#161616]">
            
            {/* Dynamic Product Count */}
            <span className="text-[#777777] text-xs font-normal">
              {totalCount} {totalCount === 1 ? 'Product' : 'Products'}
            </span>

            {/* Hide/Show Filters Button (Quiet text + icon, no pills) */}
            <button
              type="button"
              onClick={onToggleFilters}
              className="inline-flex items-center gap-1.5 text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer py-1 font-medium"
              aria-label={showFilters ? 'Hide filter sidebar' : 'Show filter sidebar'}
            >
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <SlidersHorizontal className="w-3 h-3 stroke-[1.5]" />
            </button>

            {/* Sort Dropdown (Quiet text + minimal select) */}
            <div className="flex items-center space-x-1.5">
              <label htmlFor="desktop-sort" className="text-[#777777]">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="desktop-sort"
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-transparent border-none text-[#161616] font-medium pr-4 py-1 focus:outline-none cursor-pointer appearance-none text-xs"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#555555] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Mobile Action Controls Bar (Quiet text controls, no pills) */}
          <div className="flex lg:hidden items-center justify-between pt-2 border-t border-[#EAEAEA]">
            <span className="text-xs text-[#777777] font-sans">
              {totalCount} {totalCount === 1 ? 'Product' : 'Products'}
            </span>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onOpenMobileFilters}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-[#161616] hover:text-[#B8892D] transition-colors py-1 cursor-pointer font-medium"
              >
                <SlidersHorizontal className="w-3 h-3 stroke-[1.5]" />
                <span>Filters</span>
              </button>

              <div className="relative flex items-center">
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-transparent text-xs font-sans text-[#161616] font-medium pr-4 py-1 focus:outline-none appearance-none cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#555555] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

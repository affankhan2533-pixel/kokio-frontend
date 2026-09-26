'use client';

import Link from 'next/link';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

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
    <header className="w-full bg-white border-b border-black/8 pt-24 pb-4 md:pt-32 md:pb-5 text-[#161616]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-3">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-[11px] font-sans tracking-wider text-[#777777]">
          <Link href="/" className="hover:text-[#161616] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-[#161616] transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-[#161616] font-medium">{meta.title}</span>
        </nav>

        {/* Main Header Title & Desktop Action Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
          
          {/* Left: Collection Title */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-light text-[#161616] leading-tight tracking-tight">
              {meta.title}
            </h1>
          </div>

          {/* Right (Desktop): Product Count, Hide Filters Toggle, Sort Dropdown */}
          <div className="hidden lg:flex items-center space-x-8 text-xs font-sans text-[#161616]">
            
            {/* Dynamic Product Count */}
            <span className="text-[#666666] tracking-wide text-xs">
              {totalCount} {totalCount === 1 ? 'Product' : 'Products'}
            </span>

            {/* Hide/Show Filters Button */}
            <button
              type="button"
              onClick={onToggleFilters}
              className="inline-flex items-center gap-2 text-[#161616] hover:text-[#B8892D] transition-colors cursor-pointer py-1 font-medium tracking-wide"
              aria-label={showFilters ? 'Hide filter sidebar' : 'Show filter sidebar'}
            >
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="desktop-sort" className="text-[#666666] tracking-wide">
                Sort by:
              </label>
              <div className="relative">
                <select
                  id="desktop-sort"
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-transparent border-none text-[#161616] font-medium pr-5 py-1 focus:outline-none cursor-pointer appearance-none text-xs"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#555555] absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Mobile Action Controls Bar */}
          <div className="flex lg:hidden items-center justify-between pt-2 border-t border-black/6">
            <span className="text-xs text-[#666666] font-sans">
              {totalCount} {totalCount === 1 ? 'Product' : 'Products'}
            </span>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={onOpenMobileFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-black/15 rounded-xs text-xs font-sans text-[#161616] hover:border-[#B8892D] transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3 h-3 text-[#B8892D]" />
                <span>Filters</span>
              </button>

              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="bg-white border border-black/15 rounded-xs px-3 py-1.5 text-xs font-sans text-[#161616] pr-6 focus:outline-none appearance-none cursor-pointer"
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#555555] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}

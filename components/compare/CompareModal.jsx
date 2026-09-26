'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, Scale, Check } from 'lucide-react';
import { useCompareStore } from '@store/useCompareStore';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

export default function CompareModal() {
  const { compareList, isOpen, closeCompare, removeCompare, clearCompare } = useCompareStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeCompare();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCompare]);

  if (!isOpen || compareList.length === 0) return null;

  const products = compareList
    .map((id) => PRODUCTS_CATALOG.find((p) => p.id === id || p.slug === id))
    .filter(Boolean);

  const specRows = [
    { label: 'PRICE', key: 'price' },
    { label: 'COLLECTION', key: 'collectionLabel' },
    { label: 'CATEGORY', key: 'categoryLabel' },
    { label: 'MATERIAL', key: 'material' },
    { label: 'CAPACITY', getValue: (p) => p.details?.volume || p.specs?.split('•')[0] || '—' },
    { label: 'DIMENSIONS', getValue: (p) => p.details?.dimensions || '—' },
    { label: 'WEIGHT', getValue: (p) => p.details?.weight || '—' },
    { label: 'LOCK SYSTEM', getValue: (p) => p.details?.locks || 'Standard Zippers' },
    { label: 'WHEEL SYSTEM', getValue: (p) => p.details?.wheels || 'Handheld / Strap' },
    { label: 'WARRANTY', getValue: (p) => p.details?.warranty || 'KOKIO Care Warranty' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#F8F6F2] text-[#161616] w-full max-w-5xl rounded-xs border border-black/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] selection:bg-[#B8892D]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-black/10 flex items-center justify-between bg-[#F8F6F2] shrink-0">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#B8892D]" />
            <span className="font-serif text-lg sm:text-xl tracking-[0.2em] font-light text-[#161616]">
              COMPARE SPECIFICATIONS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs font-sans tracking-[0.14em] uppercase text-[#777777] hover:text-[#161616] cursor-pointer"
            >
              CLEAR ALL
            </button>
            <button
              onClick={closeCompare}
              className="p-2 -mr-2 text-[#777777] hover:text-[#161616] transition-colors rounded-full cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Comparison Grid */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-8">
          <div className="min-w-[600px] sm:min-w-0">
            {/* Products Top Header Row */}
            <div className={`grid gap-4 sm:gap-6 border-b border-black/10 pb-6 ${
              products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}>
              {products.map((prod) => (
                <div key={prod.id} className="space-y-3 relative">
                  <button
                    onClick={() => removeCompare(prod.id)}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10 cursor-pointer"
                    aria-label={`Remove ${prod.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="relative aspect-[4/5] bg-[#EFEAE2] rounded-xs overflow-hidden border border-black/8">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover object-center"
                      sizes="33vw"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-sans text-[#888888] uppercase tracking-widest font-semibold block">
                      {prod.collectionLabel}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-light text-[#161616] line-clamp-1">
                      {prod.name}
                    </h3>
                    <div className="font-sans text-sm font-semibold text-[#161616]">
                      {prod.price}
                    </div>
                  </div>

                  <Link
                    href={`/products/${prod.slug}`}
                    onClick={closeCompare}
                    className="btn-primary-luxury w-full"
                  >
                    <span>VIEW PIECE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Specification Rows */}
            <div className="divide-y divide-black/8 pt-2">
              {specRows.map((spec) => (
                <div key={spec.label} className="py-3.5 space-y-1">
                  <span className="text-[10px] font-sans tracking-widest text-[#B8892D] uppercase font-semibold block">
                    {spec.label}
                  </span>
                  <div className={`grid gap-4 sm:gap-6 ${
                    products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                  }`}>
                    {products.map((prod) => {
                      const value = spec.getValue ? spec.getValue(prod) : prod[spec.key];
                      return (
                        <div key={prod.id} className="text-xs sm:text-sm font-sans text-[#333333] leading-relaxed">
                          {value}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-black/10 bg-white/60 flex items-center justify-between text-xs font-sans text-[#777777] shrink-0">
          <span>Comparing verified catalog specifications.</span>
          <button
            onClick={closeCompare}
            className="btn-secondary-luxury"
          >
            CLOSE
          </button>
        </div>
      </motion.div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Scale, X, ArrowUpRight, Plus } from 'lucide-react';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import { useCompareStore } from '@store/useCompareStore';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

export default function ComparePage() {
  const { compareList, removeCompare, clearCompare } = useCompareStore();

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
    <div className="min-h-screen bg-white text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/20 selection:text-[#161616]">
      <Header />

      <main className="flex-1 w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          
          {/* Breadcrumb & Header */}
          <div className="space-y-3 border-b border-[#EAEAEA] pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] font-sans tracking-widest text-[#777777] uppercase font-semibold">
              <Link href="/" className="hover:text-[#161616] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#161616] font-medium">COMPARE</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616]">
                  COMPARE PIECES
                </h1>
                <p className="text-xs sm:text-sm text-[#666666] font-light mt-1">
                  Side-by-side metrology and craftsmanship specifications.
                </p>
              </div>

              {products.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="text-xs font-sans text-[#777777] hover:text-[#161616] uppercase cursor-pointer tracking-wider"
                >
                  CLEAR ALL ({products.length})
                </button>
              )}
            </div>
          </div>

          {/* Empty State */}
          {products.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-16 sm:py-24 px-4 space-y-5">
              <div className="w-12 h-12 rounded-full bg-[#F9F9F9] border border-[#EAEAEA] flex items-center justify-center mx-auto text-[#161616]">
                <Scale className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161616]">
                  NO PIECES SELECTED FOR COMPARISON
                </h2>
                <p className="text-xs sm:text-sm text-[#777777] font-light leading-relaxed max-w-md mx-auto">
                  Select up to 3 travel pieces from any collection to inspect dimensions, weight, capacity, and materials side-by-side.
                </p>
              </div>
              <div className="pt-3">
                <Link
                  href="/collections/all"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-medium tracking-[0.14em] uppercase transition-all duration-200 min-h-[44px]"
                >
                  <span>EXPLORE ALL COLLECTIONS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Populated Comparison Grid (Contained Horizontal Scrolling Only) */
            <div className="bg-white rounded-xs p-4 sm:p-8 border border-[#EAEAEA] overflow-x-auto">
              <div className="min-w-[640px]">
                
                {/* Header Row: Products */}
                <div className={`grid gap-6 border-b border-black/10 pb-8 ${
                  products.length === 1 ? 'grid-cols-1 sm:grid-cols-2' : products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                }`}>
                  {products.map((prod) => (
                    <div key={prod.id} className="space-y-4 relative">
                      <button
                        onClick={() => removeCompare(prod.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                        aria-label={`Remove ${prod.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="relative aspect-[4/5] bg-[#EFEAE2] rounded-2xl overflow-hidden border border-black/8">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover object-center"
                          sizes="33vw"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs text-[#777777] uppercase tracking-widest block">
                          {prod.collectionLabel}
                        </span>
                        <h3 className="font-serif text-lg font-light text-[#161616]">
                          {prod.name}
                        </h3>
                        <div className="font-sans tracking-[0.14em] uppercase text-xs text-base font-semibold text-[#161616]">
                          {prod.price}
                        </div>
                      </div>

                      <Link
                        href={`/products/${prod.slug}`}
                        className="w-full min-h-[44px] px-4 py-2.5 bg-[#161616] hover:bg-[#333333] text-[#F8F6F2] rounded-xl text-xs font-sans tracking-[0.14em] uppercase text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <span>VIEW PIECE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
                      </Link>
                    </div>
                  ))}

                  {/* Add more button slot if < 3 */}
                  {products.length < 3 && (
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/15 rounded-2xl p-8 text-center space-y-3 min-h-[300px]">
                      <div className="w-10 h-10 rounded-full bg-[#EFEAE2] flex items-center justify-center text-[#777777]">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-serif text-base font-light text-[#161616]">Add another piece</p>
                        <p className="text-xs text-[#777777]">Select up to {3 - products.length} more piece(s) to compare</p>
                      </div>
                      <Link
                        href="/collections/all"
                        className="text-xs font-sans tracking-[0.14em] uppercase text-xs text-[#B8892D] hover:underline uppercase font-bold"
                      >
                        BROWSE COLLECTIONS →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Specification Rows */}
                <div className="divide-y divide-black/8 pt-4">
                  {specRows.map((spec) => (
                    <div key={spec.label} className="py-4 space-y-1.5">
                      <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs tracking-widest text-[#B8892D] uppercase font-bold block">
                        {spec.label}
                      </span>
                      <div className={`grid gap-6 ${
                        products.length === 1 ? 'grid-cols-1 sm:grid-cols-2' : products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
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
          )}

        </div>
      </main>

      <MinimalLuxuryFooter />
    </div>
  );
}

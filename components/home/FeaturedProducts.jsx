'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

const FILTER_TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'cabin', label: 'CABIN' },
  { id: 'trunks', label: 'TRUNKS' },
  { id: 'bags', label: 'BAGS' },
  { id: 'accessories', label: 'ACCESSORIES' },
];

const FEATURED_PRODUCTS = [
  {
    id: 'monolith-carryon-35l',
    slug: 'monolith-carryon-35l',
    category: 'cabin',
    categoryLabel: 'MONOLITH SERIES • AEROSPACE ALUMINUM',
    name: 'The Monolith Carry-On 35L',
    desc: 'Forged 6061-T6 aluminum shell with flush TSA zinc latches.',
    price: '₹1,09,999',
    image: '/images/monolith.png',
  },
  {
    id: 'horizon-leather-weekender',
    slug: 'horizon-leather-weekender',
    category: 'bags',
    categoryLabel: 'BESPOKE CRAFT • TUSCAN VACHETTA',
    name: 'The Horizon Leather Weekender',
    desc: 'Hand-stitched Tuscan full-grain leather with solid brass hardware.',
    price: '₹79,999',
    image: '/images/duffel.png',
  },
  {
    id: 'apex-titanium-trunk-88l',
    slug: 'apex-titanium-trunk-88l',
    category: 'trunks',
    categoryLabel: 'EXPEDITION SERIES • BRUSHED TITANIUM',
    name: 'The Apex Titanium Trunk 88L',
    desc: 'Continental trunk with reinforced titanium corner armor.',
    price: '₹1,39,999',
    image: '/images/titanium_trunk.png',
  },
  {
    id: 'florentine-executive-briefcase',
    slug: 'florentine-executive-briefcase',
    category: 'accessories',
    categoryLabel: 'URBAN COMMUTER • VACHETTA LEATHER',
    name: 'Florentine Executive Briefcase',
    desc: 'Slim executive briefcase with padded laptop core.',
    price: '₹49,999',
    image: '/images/executive_briefcase.png',
  },
  {
    id: 'iceland-subzero-trunk',
    slug: 'iceland-subzero-trunk',
    category: 'trunks',
    categoryLabel: 'ARCTIC SPECIFICATION • LIMITED 01',
    name: 'Iceland Sub-Zero Trunk 110L',
    desc: 'Hermetic hydro-seal gasket trunk tested in sub-zero environments.',
    price: '₹1,89,999',
    image: '/images/iceland.png',
  },
];

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [addedId, setAddedId] = useState(null);
  const { addItem, toggleCart } = useCartStore();

  const filtered = activeFilter === 'all'
    ? FEATURED_PRODUCTS.slice(0, 4)
    : FEATURED_PRODUCTS.filter((p) => p.category === activeFilter).slice(0, 4);

  const handleQuickAdd = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
    toggleCart();
  };

  return (
    <section
      id="featured"
      className="py-10 sm:py-14 md:py-20 bg-[#F8F6F2] text-[#161616]"
      aria-label="Featured Products"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-6 md:space-y-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/8 pb-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-sans tracking-[0.25em] font-semibold text-[#B8892D] uppercase block">
              THE KOKIO EDIT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616] leading-tight">
              Featured <span className="italic font-normal text-champagne-gradient">Pieces</span>
            </h2>
          </div>
          <p className="text-xs text-[#3E3E3E] font-normal max-w-xs font-sans">
            A considered selection for modern journeys.
          </p>
        </motion.div>

        {/* Lightweight Filter Bar */}
        <div className="flex items-center gap-6 border-b border-black/8 pb-3 overflow-x-auto no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`text-xs font-sans tracking-[0.16em] uppercase transition-colors py-1 relative shrink-0 cursor-pointer ${
                  isActive ? 'text-[#161616] font-semibold' : 'text-[#555555] hover:text-[#161616]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B8892D]"
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, idx) => {
              const isAdded = addedId === product.id;
              const productUrl = `/products/${product.slug || product.id}`;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{
                    duration: 0.38,
                    delay: Math.min(idx * 0.05, 0.15),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative bg-white rounded-xs overflow-hidden border border-black/8 hover:border-[#B8892D]/40 transition-colors duration-250 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <Link href={productUrl} className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFEAE2] block">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-[1.018] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      loading="lazy"
                    />

                    {/* Category Label Overlay */}
                    <div className="absolute top-3 left-3 bg-[#111111]/85 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[9px] font-sans text-[#EFEAE2] tracking-wider uppercase border border-white/10 max-w-[85%] truncate">
                      {product.categoryLabel}
                    </div>

                    {/* Desktop Quick Add Hover Button */}
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="hidden lg:flex absolute bottom-3 right-3 left-3 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] py-2.5 px-4 rounded-xs text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer items-center justify-center gap-2 z-10"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED TO BAG</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>ADD TO BAG</span>
                        </>
                      )}
                    </button>
                  </Link>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <Link href={productUrl}>
                        <h3 className="font-serif text-base sm:text-lg font-light text-[#161616] group-hover:text-[#B8892D] transition-colors leading-snug line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#4A4A4A] font-normal leading-relaxed line-clamp-2">
                        {product.desc}
                      </p>
                    </div>

                    {/* Price & Action Footer */}
                    <div className="pt-3 border-t border-black/6 flex items-center justify-between gap-2">
                      <span className="font-sans text-sm font-semibold text-[#161616]">
                        {product.price}
                      </span>

                      {/* Mobile Action Trigger */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className="lg:hidden text-xs font-sans font-semibold text-[#B8892D] uppercase flex items-center gap-1 cursor-pointer py-1 min-h-[44px]"
                      >
                        <span>{isAdded ? 'ADDED TO BAG' : 'ADD'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {/* Desktop Link indicator */}
                      <Link href={productUrl} className="hidden lg:inline-flex text-xs font-sans font-medium text-[#555555] group-hover:text-[#B8892D] transition-colors uppercase items-center gap-1 min-h-[44px]">
                        <span>EXPLORE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]" />
                      </Link>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View All Collections Button */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/collections/all"
            className="btn-secondary-luxury"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}

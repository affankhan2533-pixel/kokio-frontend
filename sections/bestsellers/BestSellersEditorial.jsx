'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, X, Compass, ShoppingBag, Eye } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

const CATEGORIES = [
  { id: 'all', label: 'All Instruments' },
  { id: 'cabin', label: 'Cabin' },
  { id: 'checkin', label: 'Check-In' },
  { id: 'trunks', label: 'Trunks' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'limited', label: 'Limited Edition' },
];

const PRODUCTS = [
  {
    id: 'monolith-carryon-35l',
    category: 'cabin',
    categoryLabel: 'CABIN',
    tag: 'COLLECTION MMXXVI • AEROSPACE ALUMINUM',
    name: 'The Monolith Carry-On 35L',
    story: 'Forged 6061-T6 aluminum shell with flush TSA zinc latches and whisper-glide bearings.',
    specs: '35L Capacity • 4.2 kg • 18µ Anodized',
    price: '₹1,09,999',
    rawPrice: 109999,
    image: '/images/monolith.png',
    gridSpan: 'lg:col-span-7',
    aspectRatio: 'aspect-[16/10]',
    alignment: 'text-left',
    highlights: [
      'Aerospace 6061-T6 Aluminum',
      'Dual Flush TSA Zinc Latches',
      'Whisper-Glide Bearing Wheels',
    ],
  },
  {
    id: 'apex-titanium-trunk-88l',
    category: 'trunks',
    categoryLabel: 'TRUNKS',
    tag: 'EXPEDITION SERIES • BRUSHED TITANIUM',
    name: 'The Apex Titanium Trunk 88L',
    story: 'Full-sized continental trunk with dual-chamber dividers and reinforced titanium corner armor.',
    specs: '88L Capacity • 6.1 kg • Dual TSA Locks',
    price: '₹1,39,999',
    rawPrice: 139999,
    image: '/images/titanium_trunk.png',
    gridSpan: 'lg:col-span-5',
    aspectRatio: 'aspect-[4/5]',
    alignment: 'text-left',
    highlights: [
      'Brushed Titanium Alloy Frame',
      'Dual-Chamber Zip Dividers',
      'Reinforced Corner Shields',
    ],
  },
  {
    id: 'horizon-leather-weekender',
    category: 'accessories',
    categoryLabel: 'ACCESSORIES',
    tag: 'BESPOKE CRAFT • TUSCAN VACHETTA',
    name: 'The Horizon Leather Weekender',
    story: 'Hand-stitched full-grain Italian leather duffel with brass hardware and organic patina.',
    specs: '45L Capacity • Tuscan Vachetta • Waxed Thread',
    price: '₹79,999',
    rawPrice: 79999,
    image: '/images/duffel.png',
    gridSpan: 'lg:col-span-4',
    aspectRatio: 'aspect-[1/1]',
    alignment: 'text-center',
    highlights: [
      '100% Tuscan Full-Grain Leather',
      'Hand Saddle-Stitching',
      'Solid Brass Hardware',
    ],
  },
  {
    id: 'iceland-subzero-trunk',
    category: 'limited',
    categoryLabel: 'LIMITED EDITION',
    tag: 'LIMITED EDITION • SUB-ZERO TESTED',
    name: 'Iceland Sub-Zero Trunk 110L',
    story: 'Architectural trunk engineered to withstand -40°C sub-zero environments and high-impact drops.',
    specs: '110L Capacity • Sub-Zero Rubber Seal • Serial Stamped',
    price: '₹1,89,999',
    rawPrice: 189999,
    image: '/images/iceland.png',
    gridSpan: 'lg:col-span-8',
    aspectRatio: 'aspect-[16/9]',
    alignment: 'text-left',
    highlights: [
      'Tested at -40°C Sub-Zero',
      'Hermetic Hydro-Seal Gasket',
      'Laser Stamped Serial Number',
    ],
  },
  {
    id: 'florentine-briefcase',
    category: 'accessories',
    categoryLabel: 'ACCESSORIES',
    tag: 'URBAN COMMUTER • VACHETTA LEATHER',
    name: 'Florentine Executive Briefcase',
    story: 'Slim executive briefcase with padded laptop core and brass TSA combination lock.',
    specs: '16L Capacity • Tuscan Leather • Laptop Core',
    price: '₹49,999',
    rawPrice: 49999,
    image: '/images/executive_briefcase.png',
    gridSpan: 'lg:col-span-6',
    aspectRatio: 'aspect-[4/3]',
    alignment: 'text-left',
    highlights: [
      'Water-Resistant Tuscan Leather',
      'TSA Laptop Protective Core',
      'Solid Brass Lock',
    ],
  },
  {
    id: 'monolith-checkin-68l',
    category: 'checkin',
    categoryLabel: 'CHECK-IN',
    tag: 'CONTINENTAL SERIES • UNIBODY SHELL',
    name: 'The Monolith Check-In 68L',
    story: 'Medium check-in luggage forged with 5-axis CNC chassis and soundproof interior lining.',
    specs: '68L Capacity • 5.1 kg • Soundproof Interior',
    price: '₹1,24,999',
    rawPrice: 124999,
    image: '/images/craftsmanship.png',
    gridSpan: 'lg:col-span-6',
    aspectRatio: 'aspect-[4/3]',
    alignment: 'text-left',
    highlights: [
      'Unibody CNC Aluminum Shell',
      'Soundproof Jacquard Lining',
      '360° Ball Bearing Wheels',
    ],
  },
];

export default function BestSellersEditorial() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem, toggleCart } = useCartStore();

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setSelectedProduct(null);
    toggleCart();
  };

  return (
    <section
      id="catalog"
      className="relative bg-[#F8F6F2] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Curated Voyage Catalog"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
            <Compass className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase">
              EXHIBITION CATALOG
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#161616] leading-tight tracking-tight">
            CURATED VOYAGE <span className="italic font-normal text-champagne-gradient">INSTRUMENTS</span>
          </h2>

          <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed max-w-2xl">
            Explore museum-grade luggage, weekenders, and leather instruments—crafted for discernment across 100,000 miles.
          </p>
        </div>

        {/* Luxury Filter Bar (Pill Selectors with Champagne Gold Outlines) */}
        <div className="mb-16 md:mb-20 overflow-x-auto no-scrollbar pb-3">
          <div className="flex items-center gap-3 shrink-0" role="tablist" aria-label="Catalog Filters">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer shrink-0 border ${
                    isActive
                      ? 'border-[#B8892D] text-[#161616] font-semibold bg-[#B8892D]/10 shadow-xs'
                      : 'border-[rgba(0,0,0,0.12)] text-[#666666] hover:border-[#B8892D]/50 hover:text-[#161616]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric 12-Column Editorial Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`${product.gridSpan} group cursor-pointer`}
              >
                {/* Product Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_80px_rgba(184,137,45,0.12)] hover:border-[#B8892D]/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between h-full">
                  
                  {/* Image Container with 1.03x Hover Zoom */}
                  <div className={`relative ${product.aspectRatio} w-full overflow-hidden bg-[#EFEAE2]`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    {/* Subtle Overlay Tag */}
                    <div className="absolute top-4 left-4 bg-[#161616]/75 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-white/90 tracking-widest uppercase border border-white/10">
                      {product.categoryLabel}
                    </div>

                    {/* Quick Preview Trigger Button (Reveals on Hover) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-[#B8892D] text-[#161616] hover:text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer flex items-center gap-2 text-xs font-semibold px-4"
                      aria-label={`Quick Preview ${product.name}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">QUICK VIEW</span>
                    </button>
                  </div>

                  {/* Editorial Card Content */}
                  <div className={`p-8 space-y-4 flex-1 flex flex-col justify-between ${product.alignment}`}>
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#B8892D] uppercase block">
                        {product.tag}
                      </span>

                      {/* Title with Animating Gold Underline on Hover */}
                      <h3 className="font-serif text-2xl md:text-[28px] font-light text-[#161616] leading-tight relative inline-block group-hover:text-[#B8892D] transition-colors">
                        {product.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8892D] group-hover:w-full transition-all duration-400 ease-out" />
                      </h3>

                      <p className="text-sm md:text-base text-[#555555] font-light leading-relaxed pt-1">
                        {product.story}
                      </p>
                    </div>

                    {/* Specs & Pricing Footer */}
                    <div className="pt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono text-[#888888] tracking-wider uppercase block">
                          STARTING AT
                        </span>
                        <span className="font-serif text-xl font-semibold text-[#161616]">
                          {product.price}
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#161616] group-hover:text-[#B8892D] uppercase transition-colors"
                      >
                        <span>EXPLORE</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Quick Preview Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-[#111111]/80 backdrop-blur-lg z-50 cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 260 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-4xl max-h-[90vh] bg-[#F8F6F2] text-[#161616] z-50 rounded-3xl border border-[rgba(0,0,0,0.12)] shadow-2xl overflow-y-auto p-6 sm:p-10 flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#EFEAE2] hover:bg-[#B8892D] text-[#161616] hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Modal Product Image */}
                <div className="md:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] shadow-md">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-4 left-4 bg-[#161616]/80 text-white text-[10px] font-mono px-3 py-1 rounded-md tracking-wider">
                    {selectedProduct.specs}
                  </div>
                </div>

                {/* Modal Info & Engineering Highlights */}
                <div className="md:col-span-6 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#B8892D] uppercase block">
                      {selectedProduct.tag}
                    </span>
                    <h3 className="font-serif text-3xl font-light text-[#161616]">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-base text-[#4A4A4A] font-light leading-relaxed">
                      {selectedProduct.story}
                    </p>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2 border-t border-[rgba(0,0,0,0.08)]">
                    <span className="text-[11px] font-mono text-[#888888] uppercase tracking-wider block font-semibold">
                      METROLOGY SPECIFICATIONS
                    </span>
                    {selectedProduct.highlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#161616]">
                        <div className="w-4 h-4 rounded-full bg-[#B8892D]/20 text-[#B8892D] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-[#888888] uppercase block">PRICE</span>
                      <span className="font-serif text-2xl font-semibold text-[#161616]">
                        {selectedProduct.price}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(selectedProduct)}
                      className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#161616] font-semibold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>ADD TO BAG</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

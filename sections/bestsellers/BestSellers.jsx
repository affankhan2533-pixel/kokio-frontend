'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import { gsap } from '@lib/gsap';

const SIGNATURE_PIECES = [
  {
    id: 'monolith-carryon-35l',
    number: '01',
    label: 'SIGNATURE CREATION 01 • AEROSPACE 6061-T6',
    name: 'The Monolith Carry-On 35L',
    craftsmanship: 'Forged under 1,200 tons of hydraulic pressure with flush TSA zinc latches and whisper-glide bearings.',
    whyItExists: 'Created for travelers who believe precision is the highest form of luxury.',
    price: 'Crafted from ₹1,09,999',
    cta: 'Discover Piece',
    image: '/images/monolith.png',
    gridSpan: 'lg:col-span-8',
    aspectRatio: 'aspect-[16/10]',
    isHero: true,
  },
  {
    id: 'horizon-leather-weekender',
    number: '02',
    label: 'SIGNATURE CREATION 02 • TUSCAN VACHETTA',
    name: 'The Horizon Leather Weekender',
    craftsmanship: 'Hand-selected Tuscan full-grain leather tanned in organic chestnut extracts that ages into a rich patina.',
    whyItExists: 'Crafted for short departures where elegance and tactile richness define the journey.',
    price: 'Crafted from ₹79,999',
    cta: 'Discover Piece',
    image: '/images/duffel.png',
    gridSpan: 'lg:col-span-4',
    aspectRatio: 'aspect-[4/5]',
    isHero: false,
  },
  {
    id: 'apex-titanium-trunk-88l',
    number: '03',
    label: 'SIGNATURE CREATION 03 • TITANIUM METROLOGY',
    name: 'The Apex Titanium Trunk 88L',
    craftsmanship: 'Full-sized continental trunk featuring 18-micron anodized titanium corner armor and dual-chamber dividers.',
    whyItExists: 'Designed to safeguard long-haul wardrobes against extreme carousel shock and transit conditions.',
    price: 'Available from ₹1,39,999',
    cta: 'Discover Piece',
    image: '/images/titanium_trunk.png',
    gridSpan: 'lg:col-span-6',
    aspectRatio: 'aspect-[4/3]',
    isHero: false,
  },
  {
    id: 'iceland-subzero-trunk',
    number: '04',
    label: 'SIGNATURE CREATION 04 • ARCTIC SPECIFICATION',
    name: 'Iceland Sub-Zero Trunk 110L',
    craftsmanship: 'Hermetic hydro-seal gasket trunk tested under sub-zero arctic fjords with laser serial number stamping.',
    whyItExists: 'Engineered for explorers who venture beyond paved roads into extreme sub-zero solitude.',
    price: 'Available from ₹1,89,999',
    cta: 'Discover Piece',
    image: '/images/iceland.png',
    gridSpan: 'lg:col-span-6',
    aspectRatio: 'aspect-[4/3]',
    isHero: false,
  },
];

export default function BestSellers() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);
  const mobileScrollRef = useRef(null);
  const { addItem, toggleCart } = useCartStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        gsap.fromTo(
          cardEl,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: idx * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardEl,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const scrollLeft = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveMobileSlide(newIndex);
  };

  const handleAddToCart = (piece) => {
    addItem({
      id: piece.id,
      name: piece.name,
      price: piece.price,
      image: piece.image,
    });
    toggleCart();
  };

  return (
    <section
      ref={sectionRef}
      id="signature-pieces"
      className="relative bg-[#F3EFE8] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Signature Pieces"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
            <Award className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase">
              SIGNATURE EDITION
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#161616] leading-tight tracking-tight">
            OBJECTS WORTH <span className="italic font-normal text-champagne-gradient">TRAVELING WITH</span>
          </h2>

          <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed max-w-2xl">
            Our most celebrated creations, engineered to accompany extraordinary journeys across generations.
          </p>
        </div>

        {/* DESKTOP ASYMMETRIC MASONRY LAYOUT (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {SIGNATURE_PIECES.map((piece, idx) => (
            <div
              key={piece.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`${piece.gridSpan} group relative rounded-3xl overflow-hidden bg-white border border-[rgba(0,0,0,0.08)] shadow-[0_15px_45px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_80px_rgba(184,137,45,0.12)] hover:border-[#B8892D]/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between`}
            >
              {/* Product Image Container */}
              <div className={`relative ${piece.aspectRatio} w-full overflow-hidden bg-[#EFEAE2]`}>
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                {/* Subtle Image Tag */}
                <div className="absolute top-4 left-4 bg-[#161616]/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-white tracking-widest uppercase border border-white/10">
                  {piece.number} • ICONIC CREATION
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#B8892D] uppercase block">
                    {piece.label}
                  </span>

                  {/* Title with Gold Underline on Hover */}
                  <div className="relative inline-block">
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161616] group-hover:text-[#B8892D] transition-colors leading-snug">
                      {piece.name}
                    </h3>
                    <div className="w-0 h-[1.5px] bg-[#B8892D] group-hover:w-full transition-all duration-400 ease-out mt-1" />
                  </div>

                  <p className="text-sm md:text-base text-[#4A4A4A] font-light leading-relaxed">
                    {piece.craftsmanship}
                  </p>

                  {/* "Why It Exists" Emotional Highlight Sentence (Requirement 3) */}
                  <div className="pt-2">
                    <p className="font-serif italic text-sm text-[#B8892D] font-light leading-relaxed border-l-2 border-[#B8892D]/40 pl-3.5">
                      &ldquo;{piece.whyItExists}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Footer with Editorial Price & CTA */}
                <div className="pt-6 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between gap-4">
                  <span className="font-serif text-base md:text-lg font-medium text-[#161616]">
                    {piece.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(piece)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#161616] group-hover:text-[#B8892D] uppercase transition-colors cursor-pointer"
                  >
                    <span>{piece.cta}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE SWIPE CAROUSEL (Independent Design for Mobile Only) */}
        <div className="md:hidden space-y-6">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 -mx-6 px-6"
          >
            {SIGNATURE_PIECES.map((piece) => (
              <div
                key={piece.id}
                className="min-w-[85vw] snap-center rounded-3xl overflow-hidden bg-white border border-[rgba(0,0,0,0.08)] shadow-lg flex flex-col justify-between shrink-0"
              >
                <div className="relative aspect-[4/3] w-full bg-[#EFEAE2]">
                  <Image
                    src={piece.image}
                    alt={piece.name}
                    fill
                    sizes="85vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-4 left-4 bg-[#161616]/75 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-white tracking-widest uppercase">
                    {piece.number} • SIGNATURE
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#B8892D] uppercase block">
                      {piece.label}
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#161616]">
                      {piece.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#555555] font-light leading-relaxed">
                    {piece.craftsmanship}
                  </p>

                  <p className="font-serif italic text-xs text-[#B8892D] font-light border-l-2 border-[#B8892D]/40 pl-3">
                    &ldquo;{piece.whyItExists}&rdquo;
                  </p>

                  <div className="pt-4 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-[#161616]">
                      {piece.price}
                    </span>

                    <button
                      onClick={() => handleAddToCart(piece)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#B8892D] uppercase"
                    >
                      <span>{piece.cta}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Indicator */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {SIGNATURE_PIECES.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeMobileSlide === idx ? 'w-6 bg-[#B8892D]' : 'w-1.5 bg-[#B8892D]/30'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

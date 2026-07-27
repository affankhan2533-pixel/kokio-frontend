'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Sparkles, Layers, ShieldCheck, Feather } from 'lucide-react';
import { gsap, ScrollTrigger } from '@lib/gsap';

const COLLECTIONS = [
  {
    id: 'aviation-series',
    number: '01',
    category: 'AEROSPACE METROLOGY',
    title: 'The Aviation Series',
    subtitle: 'High-Altitude Transits & Supersonic Contours',
    philosophy: 'Engineered in Zurich for supersonic continental travel. Unibody 6061-T6 aluminum shells crafted to navigate international air terminals with silent precision.',
    count: '12 ARCHIVAL INSTRUMENTS',
    cta: 'Enter the Collection',
    image: '/images/hero_bg.png',
    gridSpan: 'lg:col-span-8',
    aspectRatio: 'aspect-[16/10]',
    theme: {
      accent: 'text-[#B8892D]',
      border: 'border-[#B8892D]/30',
      gradient: 'from-[#14171F]/90 via-[#0D1016]/60 to-transparent',
      tagBg: 'bg-[#0D1016]/80 text-[#EFEAE2] border-white/10',
      icon: Compass,
      align: 'items-end text-left',
    },
  },
  {
    id: 'metropolitan-collection',
    number: '02',
    category: 'GRAND HOTEL HERITAGE',
    title: 'The Metropolitan Collection',
    subtitle: 'Grand Hotels, Private Lounges & Vachetta Leather',
    philosophy: 'Hand-stitched Tuscan full-grain leather instruments designed for executive travel, boutique hotels, and seamless urban mobility.',
    count: '18 HAND-CRAFTED PIECES',
    cta: 'Enter the Collection',
    image: '/images/lounge_bg.png',
    gridSpan: 'lg:col-span-4',
    aspectRatio: 'aspect-[4/5]',
    theme: {
      accent: 'text-[#C5A265]',
      border: 'border-[#C5A265]/30',
      gradient: 'from-[#221B14]/90 via-[#17120D]/60 to-transparent',
      tagBg: 'bg-[#221B14]/80 text-[#F8F6F2] border-white/10',
      icon: Feather,
      align: 'items-end text-left',
    },
  },
  {
    id: 'expedition-series',
    number: '03',
    category: 'SUB-ZERO ARCTIC METROLOGY',
    title: 'The Expedition Series',
    subtitle: 'Arctic Environments & High-Impact Solitude',
    philosophy: 'Tested at -40°C in the glacial fjords of Iceland. Featuring hermetic hydro-seal gaskets built to survive extreme sub-zero journeys.',
    count: '08 LIMITED TRUNKS',
    cta: 'Enter the Collection',
    image: '/images/iceland.png',
    gridSpan: 'lg:col-span-6',
    aspectRatio: 'aspect-[4/3]',
    theme: {
      accent: 'text-[#9BB8D4]',
      border: 'border-[#9BB8D4]/30',
      gradient: 'from-[#0C1520]/90 via-[#080E16]/60 to-transparent',
      tagBg: 'bg-[#0C1520]/80 text-[#EFEAE2] border-white/10',
      icon: ShieldCheck,
      align: 'items-end text-left',
    },
  },
  {
    id: 'limited-atelier-editions',
    number: '04',
    category: 'ATELIER BESPOKE EDITIONS',
    title: 'Limited Atelier Editions',
    subtitle: 'Hand-Engraved Titanium & Laser Serial Stamps',
    philosophy: 'Individualized masterworks from our Zurich metrology atelier. Laser-engraved with unique serial numbers for collectors of rare movement.',
    count: '04 INDIVIDUAL EDITIONS',
    cta: 'Enter the Collection',
    image: '/images/craftsmanship.png',
    gridSpan: 'lg:col-span-6',
    aspectRatio: 'aspect-[4/3]',
    theme: {
      accent: 'text-[#D4AF37]',
      border: 'border-[#D4AF37]/30',
      gradient: 'from-[#20180E]/90 via-[#140F08]/60 to-transparent',
      tagBg: 'bg-[#20180E]/80 text-[#F8F6F2] border-white/10',
      icon: Sparkles,
      align: 'items-end text-left',
    },
  },
];

export default function AsymmetricCollections() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeMobileSlide, setActiveMobileSlide] = useState(0);
  const mobileScrollRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // GSAP Scroll Reveal and Parallax for Cards
      cardsRef.current.forEach((cardEl, idx) => {
        if (!cardEl) return;

        gsap.fromTo(
          cardEl,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
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

  // Track mobile swipe slider active slide index
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const scrollLeft = mobileScrollRef.current.scrollLeft;
    const width = mobileScrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveMobileSlide(newIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="relative bg-[#F8F6F2] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Featured Collections"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase">
                SIGNATURE CAMPAIGNS
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-6xl font-light text-[#161616] leading-tight tracking-tight">
              FEATURED <span className="italic font-normal text-champagne-gradient">COLLECTIONS</span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-[#555555] font-light max-w-md leading-relaxed">
            Immerse yourself in KOKIO’s four editorial campaigns—each engineered for distinct global landscapes and movements.
          </p>
        </div>

        {/* DESKTOP 12-COLUMN MASONRY GRID (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {COLLECTIONS.map((col, idx) => {
            const Icon = col.theme.icon;

            return (
              <a
                key={col.id}
                href="#catalog"
                ref={(el) => (cardsRef.current[idx] = el)}
                className={`${col.gridSpan} group relative rounded-3xl overflow-hidden bg-[#161616] border border-[rgba(0,0,0,0.1)] shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_90px_rgba(184,137,45,0.16)] transition-all duration-700 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Background Image Container with 1.03x Hover Zoom & Parallax */}
                <div className={`relative ${col.aspectRatio} w-full overflow-hidden`}>
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    loading="lazy"
                  />

                  {/* Art Direction Color Mood Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${col.theme.gradient} opacity-90 group-hover:opacity-75 transition-opacity duration-700`} />

                  {/* Top Bar Badges */}
                  <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                    <span className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg backdrop-blur-md border ${col.theme.tagBg}`}>
                      {col.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#EFEAE2]/80 tracking-widest">
                      {col.count}
                    </span>
                  </div>

                  {/* Editorial Campaign Content Layer */}
                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-end z-10 text-[#F8F6F2]">
                    <div className="space-y-3 transform transition-transform duration-500 group-hover:-translate-y-1">
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold tracking-[0.25em] ${col.theme.accent}`}>
                          SERIES {col.number}
                        </span>
                        <span className="w-8 h-[1px] bg-white/20" />
                        <span className="text-xs font-light text-[#EFEAE2]/70 italic truncate">
                          {col.subtitle}
                        </span>
                      </div>

                      {/* Title with Animating Gold Divider on Hover */}
                      <div className="relative">
                        <h3 className="font-serif text-3xl md:text-4xl font-light leading-tight text-[#F8F6F2] group-hover:text-white transition-colors">
                          {col.title}
                        </h3>

                        {/* Gold Underline Divider */}
                        <div className="w-0 h-[1.5px] bg-[#B8892D] group-hover:w-full transition-all duration-500 ease-out mt-2" />
                      </div>

                      <p className="text-sm text-[#EFEAE2]/80 font-light leading-relaxed max-w-xl opacity-90 group-hover:opacity-100 transition-opacity">
                        {col.philosophy}
                      </p>

                      {/* Editorial CTA */}
                      <div className="pt-4 flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#EFEAE2] group-hover:text-[#B8892D] uppercase transition-colors">
                        <span>{col.cta}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* MOBILE MAGAZINE CAROUSEL (Independent Design for Mobile Only) */}
        <div className="md:hidden space-y-6">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 -mx-6 px-6"
          >
            {COLLECTIONS.map((col) => {
              return (
                <a
                  key={col.id}
                  href="#catalog"
                  className="min-w-[85vw] snap-center relative rounded-3xl overflow-hidden bg-[#161616] border border-white/10 aspect-[3/4] flex flex-col justify-end p-6 text-[#F8F6F2] shadow-xl shrink-0"
                >
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="85vw"
                    className="object-cover object-center opacity-85"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${col.theme.gradient} opacity-90`} />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono tracking-widest font-bold ${col.theme.accent}`}>
                        SERIES {col.number}
                      </span>
                      <span className="text-[10px] font-mono text-white/70">
                        {col.count}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-light text-white leading-snug">
                      {col.title}
                    </h3>

                    <p className="text-xs text-[#EFEAE2]/80 font-light leading-relaxed line-clamp-3">
                      {col.philosophy}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-[#B8892D] uppercase">
                      <span>{col.cta}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Mobile Pagination Indicator */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {COLLECTIONS.map((_, idx) => (
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

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Compass, ShieldCheck, Award, Layers } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

const CHAPTERS_DATA = [
  {
    num: '01',
    id: 'origin',
    label: 'CHAPTER 01 • ORIGIN',
    title: 'Forged from Pure Aerospace 6061-T6',
    desc: 'Hydraulic pressure forging under 1,200 tons of force creates a seamless, indestructible shell engineered for extreme international transit.',
    image: '/images/monolith.png',
    cta: 'DISCOVER METROLOGY',
    href: '#gallery',
    surface: 'bg-[#EFEAE2]',
    layout: 'left-image',
  },
  {
    num: '02',
    id: 'craftsmanship',
    label: 'CHAPTER 02 • CRAFTSMANSHIP',
    title: 'Hand-Stitched Florentine Vachetta',
    desc: 'Full-grain Tuscan vachetta leather handles are hand-stitched by master artisans using traditional waxed linen threads that age gracefully with every voyage.',
    image: '/images/duffel.png',
    cta: 'EXPLORE ATELIER',
    href: '#gallery',
    surface: 'bg-[#F8F6F2]',
    layout: 'right-image',
  },
  {
    num: '03',
    id: 'engineering',
    label: 'CHAPTER 03 • ENGINEERING',
    title: 'Tested at Sub-Zero -40°C Arctic Conditions',
    desc: 'Subjected to severe thermal shocks and 100,000 continuous carousel drop impacts at our metrology lab to guarantee lifetime resilience.',
    image: '/images/iceland.png',
    cta: 'VIEW TEST PROTOCOLS',
    href: '#manifesto',
    surface: 'bg-[#111111]',
    layout: 'full-cinematic',
  },
  {
    num: '04',
    id: 'journey',
    label: 'CHAPTER 04 • GLOBAL JOURNEY',
    title: 'Laser-Etched Monograms & Custom Brass Tags',
    desc: 'Bespoke monogramming and custom brass plaque identification engraved directly onto the aluminum frame for a lifetime of international travel.',
    image: '/images/craftsmanship.png',
    cta: 'REQUEST MONOGRAMMING',
    href: '#newsletter',
    surface: 'bg-[#EFEAE2]',
    layout: 'split-magazine',
  },
];

export default function HorizontalStorySection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const containerRef = useGsapReveal({ childrenSelector: '.chapter-reveal', y: 35, duration: 1, start: 'top 85%' });

  return (
    <section 
      id="chapters"
      ref={containerRef}
      className="border-t border-[rgba(0,0,0,0.08)] relative overflow-hidden"
    >
      {/* Editorial Header Bar & Chapter Progress Tabs */}
      <div className="bg-[#F8F6F2] border-b border-[rgba(0,0,0,0.08)] py-8 px-6 md:px-12 sticky top-20 z-30 shadow-sm backdrop-blur-xl bg-[#F8F6F2]/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
              CHAPTERS OF MOTION
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-[#161616]">
              THE 100,000 MILE <span className="italic font-normal text-champagne-gradient">EDITORIAL JOURNEY</span>
            </h2>
          </div>

          {/* Interactive Chapter Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {CHAPTERS_DATA.map((chap, idx) => (
              <a
                key={chap.num}
                href={`#chapter-${chap.id}`}
                onClick={() => setActiveChapter(idx)}
                className={`px-4 py-2 rounded-full text-xs tracking-widest font-semibold uppercase transition-all duration-300 shrink-0 cursor-pointer ${
                  activeChapter === idx
                    ? 'bg-[#111111] text-[#F8F6F2] border border-[#B8892D]'
                    : 'bg-[#EFEAE2] text-[#666666] hover:text-[#161616] border border-[rgba(0,0,0,0.08)]'
                }`}
              >
                {chap.num} {chap.id}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Unique Editorial Chapters */}
      <div className="space-y-0">
        
        {/* Chapter 01 — Origin (Image Left, Text Right) */}
        <div 
          id="chapter-origin"
          className="section-padding bg-[#EFEAE2] text-[#161616] border-b border-[rgba(0,0,0,0.08)]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 chapter-reveal relative group overflow-hidden rounded-[18px] border border-[rgba(0,0,0,0.08)] shadow-lg bg-[#F8F6F2]">
              <img
                src={CHAPTERS_DATA[0].image}
                alt={CHAPTERS_DATA[0].title}
                className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute top-6 left-6 px-4 py-1 bg-[#111111]/80 backdrop-blur-md rounded-full border border-white/20 text-[#F8F6F2] font-serif text-sm font-light">
                CHAPTER 01
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 chapter-reveal">
              <span className="text-xs tracking-[0.38em] font-semibold text-[#B8892D] uppercase block">
                {CHAPTERS_DATA[0].label}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#161616] leading-[1.15]">
                {CHAPTERS_DATA[0].title}
              </h3>
              <p className="font-sans text-[16px] sm:text-[18px] text-[#666666] font-light leading-[1.8]">
                {CHAPTERS_DATA[0].desc}
              </p>
              <a href={CHAPTERS_DATA[0].href} className="btn-primary-luxury inline-flex">
                <span>{CHAPTERS_DATA[0].cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

        {/* Chapter 02 — Craftsmanship (Text Left, Image Right) */}
        <div 
          id="chapter-craftsmanship"
          className="section-padding bg-[#F8F6F2] text-[#161616] border-b border-[rgba(0,0,0,0.08)]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6 chapter-reveal order-2 lg:order-1">
              <span className="text-xs tracking-[0.38em] font-semibold text-[#B8892D] uppercase block">
                {CHAPTERS_DATA[1].label}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#161616] leading-[1.15]">
                {CHAPTERS_DATA[1].title}
              </h3>
              <p className="font-sans text-[16px] sm:text-[18px] text-[#666666] font-light leading-[1.8]">
                {CHAPTERS_DATA[1].desc}
              </p>
              <a href={CHAPTERS_DATA[1].href} className="btn-primary-luxury inline-flex">
                <span>{CHAPTERS_DATA[1].cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-7 chapter-reveal order-1 lg:order-2 relative group overflow-hidden rounded-[18px] border border-[rgba(0,0,0,0.08)] shadow-lg bg-[#EFEAE2]">
              <img
                src={CHAPTERS_DATA[1].image}
                alt={CHAPTERS_DATA[1].title}
                className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute top-6 right-6 px-4 py-1 bg-[#111111]/80 backdrop-blur-md rounded-full border border-white/20 text-[#F8F6F2] font-serif text-sm font-light">
                CHAPTER 02
              </div>
            </div>

          </div>
        </div>

        {/* Chapter 03 — Engineering (Full-Width Cinematic Card) */}
        <div 
          id="chapter-engineering"
          className="section-padding bg-[#111111] text-[#F8F6F2] relative overflow-hidden border-b border-[rgba(255,255,255,0.1)]"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={CHAPTERS_DATA[2].image}
              alt={CHAPTERS_DATA[2].title}
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-2xl bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-[18px] p-8 sm:p-12 space-y-6 chapter-reveal shadow-2xl">
              <span className="text-xs tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#B8892D]" />
                {CHAPTERS_DATA[2].label}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F8F6F2] leading-[1.15]">
                {CHAPTERS_DATA[2].title}
              </h3>
              <p className="font-sans text-[16px] sm:text-[18px] text-[#EFEAE2]/80 font-light leading-[1.8]">
                {CHAPTERS_DATA[2].desc}
              </p>
              <a href={CHAPTERS_DATA[2].href} className="btn-primary-luxury inline-flex">
                <span>{CHAPTERS_DATA[2].cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Chapter 04 — Global Journey (Split 60/40 Magazine Spread) */}
        <div 
          id="chapter-journey"
          className="section-padding bg-[#EFEAE2] text-[#161616]"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 chapter-reveal relative group overflow-hidden rounded-[18px] border border-[rgba(0,0,0,0.08)] shadow-lg bg-[#F8F6F2]">
              <img
                src={CHAPTERS_DATA[3].image}
                alt={CHAPTERS_DATA[3].title}
                className="w-full h-[400px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute top-6 left-6 px-4 py-1 bg-[#111111]/80 backdrop-blur-md rounded-full border border-white/20 text-[#F8F6F2] font-serif text-sm font-light">
                CHAPTER 04
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6 chapter-reveal">
              <span className="text-xs tracking-[0.38em] font-semibold text-[#B8892D] uppercase block">
                {CHAPTERS_DATA[3].label}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#161616] leading-[1.15]">
                {CHAPTERS_DATA[3].title}
              </h3>
              <p className="font-sans text-[16px] sm:text-[18px] text-[#666666] font-light leading-[1.8]">
                {CHAPTERS_DATA[3].desc}
              </p>
              <a href={CHAPTERS_DATA[3].href} className="btn-primary-luxury inline-flex">
                <span>{CHAPTERS_DATA[3].cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}




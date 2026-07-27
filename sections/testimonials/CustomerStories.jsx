'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { gsap } from '@lib/gsap';

const TRAVEL_STORIES = [
  {
    id: 'tokyo-transit',
    number: '01',
    destination: 'TOKYO, JAPAN',
    route: 'Tokyo → Zurich → New York',
    traveler: 'Takashi Sato',
    role: 'Venture Partner & Photographer',
    context: 'Transcontinental Transit 2026',
    quote: 'After 40 flights through East Asia, the anodized chassis hasn’t lost a single millimeter of alignment. Midnight hotel check-ins are completely silent thanks to the whisper-glide bearings.',
    story: 'Navigating cobblestone alleys in Kyoto and high-speed Shinkansen trains between Tokyo and Osaka requires instruments that move without friction or distraction.',
    primaryStat: '42,000 KM TRAVELED',
    secondaryStats: [
      { label: 'Countries', value: '18' },
      { label: 'Flights', value: '73' },
      { label: 'Years Owned', value: '4' },
    ],
    traveledWith: 'The Monolith Carry-On 35L',
    image: '/images/hero_bg.png',
  },
  {
    id: 'milan-design',
    number: '02',
    destination: 'MILAN, ITALY',
    route: 'Milan → Paris → London',
    traveler: 'Elena Rostova',
    role: 'Creative Director',
    context: 'Milan Design Week 2026',
    quote: 'The Tuscan vachetta handles age into a deep bronze patina that draws compliments from atelier master craftsmen in Milan and Paris.',
    story: 'From fashion week showcases in Lombardy to weekend retreats in Lake Como, the Horizon Weekender blends organic leather warmth with structural rigor.',
    primaryStat: '28,500 KM TRAVELED',
    secondaryStats: [
      { label: 'Countries', value: '12' },
      { label: 'Flights', value: '48' },
      { label: 'Years Owned', value: '3' },
    ],
    traveledWith: 'The Horizon Leather Weekender',
    image: '/images/duffel.png',
  },
  {
    id: 'iceland-expedition',
    number: '03',
    destination: 'REYKJAVÍK, ICELAND',
    route: 'Reykjavík → Akureyri → Glacier Fjords',
    traveler: 'Marcus Vane',
    role: 'Architectural Photographer',
    context: 'Sub-Zero Glacial Expedition',
    quote: 'Sub-zero winds at -25°C on black sand beaches couldn’t penetrate the hydro-seal gasket. The titanium trunk kept $30,000 in optical equipment bone dry.',
    story: 'Extremely harsh sub-zero conditions demand zero structural compromise. The Iceland Expedition Trunk handled frozen basalt rocks and rough cargo holds with ease.',
    primaryStat: '65,000 KM TRAVELED',
    secondaryStats: [
      { label: 'Countries', value: '24' },
      { label: 'Flights', value: '92' },
      { label: 'Years Owned', value: '5' },
    ],
    traveledWith: 'Iceland Sub-Zero Trunk 110L',
    image: '/images/iceland.png',
  },
  {
    id: 'dubai-executive',
    number: '04',
    destination: 'DUBAI, UAE',
    route: 'Dubai → London → Singapore',
    traveler: 'Amira Al-Mansoor',
    role: 'Aviation Executive',
    context: 'Executive Global Summit',
    quote: 'The flush zinc latches and heat-reflecting aluminum shell withstand 48°C tarmac heat effortlessly. It is the pinnacle of executive travel.',
    story: 'Navigating private terminals in Dubai and transatlantic routes to London requires a trunk that balances thermal resilience with refined presence.',
    primaryStat: '88,000 KM TRAVELED',
    secondaryStats: [
      { label: 'Countries', value: '31' },
      { label: 'Flights', value: '120' },
      { label: 'Years Owned', value: '4' },
    ],
    traveledWith: 'The Apex Titanium Trunk 88L',
    image: '/images/titanium_trunk.png',
  },
  {
    id: 'newyork-atelier',
    number: '05',
    destination: 'NEW YORK, USA',
    route: 'Manhattan → Geneva → Tokyo',
    traveler: 'Julian Mercer',
    role: 'Industrial Designer',
    context: 'Tribeca Metrology Atelier',
    quote: 'As a designer, I appreciate zero-play tolerances. The unibody CNC shell is a masterclass in modern industrial metrology.',
    story: 'Commuting between Tribeca design studios and international summits demands a companion built with zero rattle and instant deployment.',
    primaryStat: '34,000 KM TRAVELED',
    secondaryStats: [
      { label: 'Countries', value: '15' },
      { label: 'Flights', value: '56' },
      { label: 'Years Owned', value: '2' },
    ],
    traveledWith: 'Florentine Executive Briefcase',
    image: '/images/craftsmanship.png',
  },
];

export default function CustomerStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const activeStory = TRAVEL_STORIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TRAVEL_STORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TRAVEL_STORIES.length) % TRAVEL_STORIES.length);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journeys"
      className="relative bg-[#F8F6F2] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Customer Journeys"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* DESKTOP 40% / 60% SPLIT LAYOUT (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN (40% Width = 5 cols) */}
          <div className="col-span-5 space-y-8 pr-4">
            
            {/* Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
                <Compass className="w-3.5 h-3.5 text-[#B8892D]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase">
                  JOURNEYS
                </span>
              </div>

              <h2 className="font-serif text-4xl lg:text-5xl font-light text-[#161616] leading-tight tracking-tight">
                STORIES CARRIED <br />
                <span className="italic font-normal text-champagne-gradient">ACROSS THE WORLD</span>
              </h2>

              <p className="text-sm lg:text-base text-[#555555] font-light leading-relaxed">
                Every destination leaves a mark. These journeys were accompanied by KOKIO, crafted to move effortlessly through airports, cities, and continents.
              </p>
            </div>

            {/* Active Story Counter & Minimal Circular Navigation Arrows */}
            <div className="pt-6 border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between">
              <div className="flex items-baseline gap-2 font-mono">
                <span className="text-2xl font-bold text-[#B8892D]">
                  {activeStory.number}
                </span>
                <span className="text-sm text-[#888888]">/ 05</span>
                <span className="text-xs text-[#888888] tracking-widest uppercase ml-3">
                  {activeStory.destination.split(',')[0]}
                </span>
              </div>

              {/* Minimal Circular Navigation Arrows (Requirement 4) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full border border-[#B8892D]/30 hover:border-[#B8892D] bg-white hover:bg-[#B8892D] text-[#161616] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm group"
                  aria-label="Previous Journey Story"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full border border-[#B8892D]/30 hover:border-[#B8892D] bg-white hover:bg-[#B8892D] text-[#161616] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm group"
                  aria-label="Next Journey Story"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Traveler & Journey Context Breakdown */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4 pt-2"
              >
                <div>
                  <h3 className="font-serif text-2xl text-[#161616] font-medium">
                    {activeStory.traveler}
                  </h3>
                  <p className="text-xs font-mono text-[#B8892D] font-semibold tracking-wider uppercase mt-0.5">
                    {activeStory.route}
                  </p>
                  <p className="text-xs text-[#777777] font-light mt-1">
                    {activeStory.context}
                  </p>
                </div>

                {/* Editorial Traveled With Link (Requirement 3) */}
                <div className="pt-3 border-t border-[rgba(0,0,0,0.06)]">
                  <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase block">
                    Traveled With
                  </span>
                  <a
                    href="#catalog"
                    className="inline-flex items-center gap-1.5 text-sm font-serif font-semibold text-[#161616] hover:text-[#B8892D] transition-colors mt-0.5 group"
                  >
                    <span>{activeStory.traveledWith}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#B8892D]" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* RIGHT COLUMN (60% Width = 7 cols) - Hero Cinematic Photography Card */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStory.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-3xl overflow-hidden bg-[#161616] border border-[rgba(0,0,0,0.1)] shadow-[0_25px_60px_rgba(0,0,0,0.1)] aspect-[4/3] flex flex-col justify-end p-8 lg:p-12 text-[#F8F6F2]"
              >
                {/* Hero Destination Background Image */}
                <Image
                  src={activeStory.image}
                  alt={activeStory.destination}
                  fill
                  sizes="60vw"
                  className="object-cover object-center transition-transform duration-1000 opacity-75"
                  loading="lazy"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/50 to-transparent" />

                {/* Top Destination Badge */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono tracking-widest uppercase px-3.5 py-1.5 rounded-lg bg-[#111111]/80 backdrop-blur-md text-[#EFEAE2] border border-white/10">
                    {activeStory.destination}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#B8892D]" />
                </div>

                {/* Story Content Layer */}
                <div className="relative z-10 space-y-6">
                  
                  {/* Editorial Quote */}
                  <p className="font-serif italic text-lg lg:text-2xl text-[#F8F6F2] leading-relaxed font-light">
                    &ldquo;{activeStory.quote}&rdquo;
                  </p>

                  {/* Gold Divider Line */}
                  <div className="w-full h-[1px] bg-gradient-to-r from-[#B8892D] via-[#B8892D]/40 to-transparent" />

                  {/* Primary & Secondary Journey Statistics (Requirement 2) */}
                  <div className="flex flex-wrap items-end justify-between gap-4 pt-1">
                    
                    {/* Primary Highlight Metric */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono tracking-widest text-[#B8892D] uppercase block">
                        PRIMARY MILESTONE
                      </span>
                      <span className="font-serif text-2xl lg:text-3xl font-light text-white tracking-tight block">
                        {activeStory.primaryStat}
                      </span>
                    </div>

                    {/* Secondary Editorial Metrics */}
                    <div className="flex items-center gap-6 font-mono text-xs">
                      {activeStory.secondaryStats.map((stat, i) => (
                        <div key={i} className="text-right">
                          <span className="text-white font-bold block">{stat.value}</span>
                          <span className="text-[#A0A0A0] text-[10px] tracking-wider uppercase">{stat.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* MOBILE LUXURY TRAVEL JOURNAL (Independent Design for Mobile Only) */}
        <div className="md:hidden space-y-6">
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 -mx-6 px-6">
            {TRAVEL_STORIES.map((story) => (
              <div
                key={story.id}
                className="min-w-[88vw] snap-center relative rounded-3xl overflow-hidden bg-[#161616] border border-white/10 aspect-[3/4] flex flex-col justify-end p-6 text-[#F8F6F2] shadow-xl shrink-0"
              >
                <Image
                  src={story.image}
                  alt={story.destination}
                  fill
                  sizes="88vw"
                  className="object-cover object-center opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/60 to-transparent" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-[#B8892D] uppercase font-bold">
                      {story.destination}
                    </span>
                    <span className="text-[10px] font-mono text-white/70">
                      {story.number} / 05
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-light text-white">
                      {story.traveler}
                    </h3>
                    <p className="text-[11px] font-mono text-[#B8892D] tracking-wide">
                      {story.route}
                    </p>
                  </div>

                  <p className="font-serif italic text-sm text-[#EFEAE2]/90 font-light leading-relaxed line-clamp-4">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-white/60 tracking-widest uppercase block">PRIMARY METRIC</span>
                      <span className="font-serif text-base text-[#B8892D] font-medium">{story.primaryStat}</span>
                    </div>

                    <a
                      href="#catalog"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-white uppercase"
                    >
                      <span>Traveled With</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Story Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {TRAVEL_STORIES.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-6 bg-[#B8892D]' : 'w-1.5 bg-[#B8892D]/30'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

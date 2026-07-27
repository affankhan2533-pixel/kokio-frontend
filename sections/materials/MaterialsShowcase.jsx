'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ShieldCheck, Cpu, Sparkles, Check, ArrowUpRight, Compass } from 'lucide-react';
import { gsap } from '@lib/gsap';

const MATERIALS = [
  {
    id: 'aluminum',
    number: '01',
    category: 'AEROSPACE ALUMINUM',
    title: '6061-T6 Aerospace Grade Aluminum Shell',
    subtitle: '1,200-Ton Hydraulic Forging & 18µ Anodization',
    description: 'Forged under 1,200 tons of hydraulic pressure and finished with an 18-micron electrochemical anodized layer. Provides military-grade structural rigidity while preserving an ultralight 4.2kg payload ratio.',
    specs: 'Tolerances: ±0.01mm • Hardness: 95 HB • Surface: Anodized 18µ',
    benefits: ['Impact-Resistant Geometry', 'Scratch & Corrosion Proof', '100% Recyclable Alloy'],
    stats: [
      { label: 'Weight Reduction', value: '30%', detail: 'vs standard aluminum' },
      { label: 'Surface Coating', value: '18µ', detail: 'Military anodization' },
      { label: 'Chassis Warranty', value: 'Lifetime', detail: 'Structural guarantee' },
    ],
    image: '/images/materials/aluminum.png',
    icon: Layers,
    colorMood: 'from-[#24211D] via-[#1A1815] to-[#12100E]',
  },
  {
    id: 'leather',
    number: '02',
    category: 'FULL GRAIN LEATHER',
    title: 'Tuscan Vachetta Full-Grain Leather',
    subtitle: 'Vegetable-Tanned in Santa Croce sull’Arno',
    description: 'Hand-selected full-grain hides tanned in century-old Tuscan vats using organic chestnut extracts. Stitched with wax-dipped linen thread, it develops a deep, individual patina across a lifetime of travel.',
    specs: 'Origin: Tuscany, Italy • Thread: 3-Ply Waxed Linen • Finish: Aniline',
    benefits: ['Organic Patina Aging', 'Ergonomic Hand Comfort', 'Hand Saddle-Stitched'],
    stats: [
      { label: 'Tannage Duration', value: '60 Days', detail: 'Slow vat processing' },
      { label: 'Tensile Yield', value: '45 MPa', detail: 'Tear-proof strength' },
      { label: 'Heritage Origin', value: '100%', detail: 'Tuscan certified' },
    ],
    image: '/images/materials/leather.png',
    icon: Sparkles,
    colorMood: 'from-[#2D2115] via-[#1E160E] to-[#120D08]',
  },
  {
    id: 'lining',
    number: '03',
    category: 'PREMIUM INTERIOR LINING',
    title: 'Jacquard Silk-Poly Micro-Weave Lining',
    subtitle: 'Waterproof Teflon Coating & Antimicrobial Weave',
    description: 'Engineered with high-density jacquard silk-polyester fibers and treated with hydrophobic liquid repellency. Protects tailored garments against spills, humidity variations, and friction.',
    specs: 'Density: 400 GSM • Finish: Hydrophobic Teflon • Weave: Monogram Jacquard',
    benefits: ['Water & Oil Repellent', 'Antimicrobial Odor Shield', 'Garment-Safe Smoothness'],
    stats: [
      { label: 'Hydrostatic Seal', value: '10,000mm', detail: 'Liquid resistance' },
      { label: 'Abrasion Endurance', value: '50,000+', detail: 'Martindale test' },
      { label: 'Weave Density', value: '400 GSM', detail: 'Ultra-dense weave' },
    ],
    image: '/images/craftsmanship.png',
    icon: ShieldCheck,
    colorMood: 'from-[#1C1D21] via-[#141518] to-[#0D0E10]',
  },
  {
    id: 'wheels',
    number: '04',
    category: 'SILENT SPINNER WHEELS',
    title: 'Japanese Whisper-Glide Ball-Bearing Wheels',
    subtitle: 'Shock-Absorbing Rubber Tread & Solid Brass Axle',
    description: 'Dual 360-degree casters equipped with sealed Japanese NMB ball bearings and noise-damping polyurethane treads. Glides silently across cobblestone streets and airport terminals without vibration.',
    specs: 'Bearings: Japanese NMB • Tread: Shock Polyurethane • Noise Level: <12 dB',
    benefits: ['360° Effortless Glide', 'Cobblestone Vibration Dampening', 'Acoustic Silence (<12dB)'],
    stats: [
      { label: 'Endurance Rating', value: '100 km', detail: 'Rough terrain test' },
      { label: 'Acoustic Noise', value: '<12 dB', detail: 'Whisper-quiet glide' },
      { label: 'Rotation Arc', value: '360°', detail: 'Dual ball bearings' },
    ],
    image: '/images/titanium_trunk.png',
    icon: Cpu,
    colorMood: 'from-[#18191C] via-[#101114] to-[#0A0B0C]',
  },
  {
    id: 'handle',
    number: '05',
    category: 'AIRCRAFT GRADE HANDLE SYSTEM',
    title: 'Multi-Stage Ergonomic Telescoping Chassis',
    subtitle: 'Aircraft-Grade 7075 Aluminum & Flush Latch Lock',
    description: 'Engineered with zero-play tolerances and 3-stage height adjustment. The flush-recessed release button is integrated into a zinc-alloy handle head for instant, one-touch deployment.',
    specs: 'Alloy: 7075-T6 Aerospace • Play Tolerance: <0.5mm • Cycles: 25,000 Locks',
    benefits: ['Zero-Play Stability', '3-Stage Ergonomic Height', 'One-Touch Deployment'],
    stats: [
      { label: 'Cycle Endurance', value: '25,000+', detail: 'Fatigue stress test' },
      { label: 'Chassis Play', value: '<0.5 mm', detail: 'Zero-rattle tolerance' },
      { label: 'Height Stages', value: '3 Level', detail: 'Universal ergonomics' },
    ],
    image: '/images/monolith.png',
    icon: Compass,
    colorMood: 'from-[#221D17] via-[#181410] to-[#0F0D0A]',
  },
];

export default function MaterialsShowcase() {
  const [activeMaterial, setActiveMaterial] = useState(MATERIALS[0]);
  const macroImageRef = useRef(null);
  const lightSheenRef = useRef(null);

  // GSAP light sheen and subtle macro image zoom effect on active material change
  useEffect(() => {
    if (!macroImageRef.current || typeof window === 'undefined') return;

    gsap.fromTo(
      macroImageRef.current,
      { scale: 1.08, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
    );

    if (lightSheenRef.current) {
      gsap.fromTo(
        lightSheenRef.current,
        { x: '-100%', opacity: 0.6 },
        { x: '100%', opacity: 0, duration: 1.4, ease: 'power3.inOut' }
      );
    }
  }, [activeMaterial.id]);

  return (
    <section
      id="materials-showcase"
      className="relative bg-[#F8F6F2] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Materials Showcase"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
            <Layers className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase">
              UNCOMPROMISING METROLOGY
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#161616] leading-tight tracking-tight">
            THE ANATOMY OF <span className="italic font-normal text-champagne-gradient">EXCELLENCE</span>
          </h2>

          <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed max-w-2xl">
            Explore the five aerospace and artisanal materials engineered into every KOKIO trunk—crafted for extreme longevity and refined aesthetics.
          </p>
        </div>

        {/* Desktop 40% / 60% Split Layout & Mobile Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT 40% COLUMN: Material Selector & Specification Breakdown */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            
            {/* Horizontal / Vertical Material Selector Navigation */}
            <div
              role="tablist"
              aria-label="Material categories"
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar pb-4 lg:pb-0 gap-2 border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.08)] lg:pr-6"
            >
              {MATERIALS.map((mat) => {
                const isSelected = activeMaterial.id === mat.id;
                const MatIcon = mat.icon;

                return (
                  <button
                    key={mat.id}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${mat.id}`}
                    id={`tab-${mat.id}`}
                    onClick={() => setActiveMaterial(mat)}
                    className={`relative text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between group whitespace-nowrap lg:whitespace-normal shrink-0 ${
                      isSelected
                        ? 'bg-white border border-[#B8892D]/40 shadow-md text-[#161616]'
                        : 'bg-[#EFEAE2]/60 hover:bg-white/70 text-[#555555] border border-transparent'
                    }`}
                  >
                    {/* Active Sliding Gold Line Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeMaterialIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[#B8892D] rounded-l-2xl"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#161616] text-[#F8F6F2]'
                            : 'bg-white text-[#888888] group-hover:text-[#161616]'
                        }`}
                      >
                        <MatIcon className="w-4 h-4" />
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono tracking-widest text-[#B8892D] font-bold block">
                          MATERIAL {mat.number}
                        </span>
                        <span className="font-serif text-sm md:text-base font-medium tracking-tight block text-[#161616]">
                          {mat.category}
                        </span>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-300 hidden sm:block ${
                        isSelected ? 'text-[#B8892D] translate-x-0.5 -translate-y-0.5' : 'text-[#BBBBBB] opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Panel for Active Material */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMaterial.id}
                id={`panel-${activeMaterial.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeMaterial.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-6 bg-white p-8 rounded-3xl border border-[rgba(0,0,0,0.08)] shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-[0.25em] text-[#B8892D] font-bold uppercase block">
                    {activeMaterial.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161616] leading-tight">
                    {activeMaterial.title}
                  </h3>
                </div>

                <p className="text-base text-[#4A4A4A] font-light leading-relaxed">
                  {activeMaterial.description}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-2.5 pt-2 border-t border-[rgba(0,0,0,0.06)]">
                  <span className="text-[11px] font-mono text-[#888888] uppercase tracking-wider block font-semibold">
                    ENGINEERING HIGHLIGHTS
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {activeMaterial.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-[#222222]">
                        <div className="w-4 h-4 rounded-full bg-[#B8892D]/15 text-[#B8892D] flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statistics Cards Grid (Requirement 4: Premium Data Cards) */}
                <div className="grid grid-cols-3 gap-3 pt-4">
                  {activeMaterial.stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="bg-[#F8F6F2] border border-[#B8892D]/20 rounded-2xl p-3 text-center space-y-1 shadow-2xs hover:border-[#B8892D]/50 transition-colors"
                    >
                      <span className="font-serif text-lg md:text-xl font-medium text-[#161616] block">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-mono text-[#B8892D] font-bold uppercase block leading-none">
                        {stat.label}
                      </span>
                      <span className="text-[9px] text-[#777777] font-light block leading-tight">
                        {stat.detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT 60% COLUMN: Large Interactive Macro Photography Viewport */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-[rgba(0,0,0,0.1)] shadow-[0_30px_90px_rgba(0,0,0,0.12)] group">
              
              {/* Macro Image */}
              <div ref={macroImageRef} className="w-full h-full relative">
                <Image
                  src={activeMaterial.image}
                  alt={activeMaterial.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Dark Gradient Overlay for Specular Depth */}
              <div className={`absolute inset-0 bg-gradient-to-t ${activeMaterial.colorMood} opacity-40 mix-blend-multiply pointer-events-none transition-all duration-700`} />

              {/* Light Sheen Specular Reflection Effect */}
              <div
                ref={lightSheenRef}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
              />

              {/* Floating Macro Spec Badge */}
              <div className="absolute top-6 left-6 bg-[#161616]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-xs font-mono flex items-center gap-2.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#B8892D] animate-ping" />
                <span className="tracking-widest">MACRO SPEC {activeMaterial.number} • 10X MAGNIFICATION</span>
              </div>

              {/* Floating Micro-Spec Pill */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#161616]/75 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 text-white flex items-center justify-between text-xs font-mono shadow-2xl">
                <span className="text-[#EFEAE2]/90 truncate max-w-[280px] sm:max-w-none">
                  {activeMaterial.specs}
                </span>
                <span className="text-[#B8892D] font-bold tracking-wider uppercase shrink-0 hidden sm:block">
                  VERIFIED SPEC
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

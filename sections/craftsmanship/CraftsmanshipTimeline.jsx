'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Compass, ShieldCheck, ArrowRight, Layers, Cpu, Hammer, CheckCircle2, Award } from 'lucide-react';
import { gsap, ScrollTrigger } from '@lib/gsap';

const STAGES = [
  {
    id: '01',
    number: '01',
    category: 'ARCHITECTURAL CAD & DRAFTING',
    title: 'Aerospace Blueprint & Kinetic Testing',
    story: 'Every KOKIO silhouette begins with 180 hours of CAD drafting in our Zurich design studio. We simulate stress distribution across 3,000 thermal and pressure scenarios to guarantee unyielding structural integrity.',
    specs: ['±0.01mm Tolerances', '180h CAD Simulation', 'Aerospace Geometry'],
    image: '/images/stage_1.png',
    icon: Compass,
  },
  {
    id: '02',
    number: '02',
    category: 'METALLURGY & LEATHER TANNAGE',
    title: 'Aerospace 6061-T6 & Tuscan Vachetta',
    story: 'We source high-purity 6061-T6 aluminum alloys from European aerospace foundries, paired with full-grain vegetable-tanned leather from Tuscany. Each hide and metal coil is hand-certified for grain purity and tensile strength.',
    specs: ['310 MPa Tensile Strength', 'Full-Grain Tuscan Vachetta', 'Zero Heavy Metals'],
    image: '/images/stage_2.png',
    icon: Layers,
  },
  {
    id: '03',
    number: '03',
    category: '5-AXIS CNC MACHINING',
    title: 'Micron-Level Chassis Milling',
    story: 'Using 5-axis computer numerical control (CNC) mills, raw aluminum billets are shaped into ultra-rigid unibody shells. Zero welding joints ensure flawless structural continuity under extreme impact.',
    specs: ['5-Axis Milling Precision', 'Unibody Structural Shell', '18-Micron Anodized Finish'],
    image: '/images/craftsmanship.png',
    icon: Cpu,
  },
  {
    id: '04',
    number: '04',
    category: 'MASTER ARTISAN STITCHING',
    title: 'Saddle-Stitched Handles & Latches',
    story: 'Master leather artisans with over 20 years of experience hand-stitch handle grips using wax-coated linen thread. Heavy-duty zinc-alloy TSA security latches are individually fitted and calibrated by hand.',
    specs: ['Hand-Stitching (Waxed Linen)', 'Zinc-Alloy TSA Latches', 'Hand-Riveted Corners'],
    image: '/images/duffel.png',
    icon: Hammer,
  },
  {
    id: '05',
    number: '05',
    category: 'ACOUSTIC & DROP STRESS',
    title: '50kg Drop Test & Acoustic Calibration',
    story: 'Each prototype undergoes 42 destructive quality tests: 50kg drop impacts onto concrete, 100km wheel endurance on cobblestone, and acoustic soundproofing calibration for silent airport navigation.',
    specs: ['42 Point Quality Audit', '50kg Impact Rating', 'Whisper-Glide Dual Bearings'],
    image: '/images/titanium_trunk.png',
    icon: ShieldCheck,
  },
  {
    id: '06',
    number: '06',
    category: 'THE ULTIMATE EXPRESSION',
    title: 'Ready for a Lifetime of Journeys',
    story: 'Hand-polished to a mirror sheen, individually stamped with a unique laser-engraved serial number, and encased in a tailored luxury travel dust sleeve. Your KOKIO trunk is ready for its maiden voyage.',
    specs: ['Laser Serial Stamped', 'Lifetime Warranty', 'Bespoke Storage Sleeve'],
    image: '/images/lounge_bg.png',
    icon: Award,
    isFinal: true,
  },
];

export default function CraftsmanshipTimeline() {
  const sectionRef = useRef(null);
  const timelineLineRef = useRef(null);
  const stagesRef = useRef([]);
  const nodesRef = useRef([]);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Timeline Line Scroll Progress (desktop central line)
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 35%',
              end: 'bottom 75%',
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Animate each stage reveal and node activation
      STAGES.forEach((stage, index) => {
        const stageEl = stagesRef.current[index];
        if (!stageEl) return;

        // Image Reveal (clipPath curtain + subtle zoom out)
        const imgContainer = stageEl.querySelector('.stage-img-container');
        const imgElement = stageEl.querySelector('.stage-img');
        const contentBox = stageEl.querySelector('.stage-content');

        if (imgContainer && imgElement) {
          gsap.fromTo(
            imgContainer,
            { clipPath: 'inset(10% 10% 10% 10%)', opacity: 0 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              opacity: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stageEl,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );

          // Subtle Parallax on Image
          gsap.fromTo(
            imgElement,
            { y: -20, scale: 1.1 },
            {
              y: 20,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: stageEl,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        // Text Content Fade Up
        if (contentBox) {
          gsap.fromTo(
            contentBox,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stageEl,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        // Node Glow and Active State Tracker
        ScrollTrigger.create({
          trigger: stageEl,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craftsmanship"
      className="relative bg-[#EFEAE2] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Craftsmanship Timeline"
    >
      {/* Sticky Mobile Progress Indicator */}
      <div className="md:hidden sticky top-16 z-30 bg-[#EFEAE2]/95 backdrop-blur-md border-y border-[#B8892D]/20 px-6 py-3 shadow-xs transition-all">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8892D] animate-pulse" />
            <span className="font-mono text-[#B8892D] tracking-widest font-semibold">
              STAGE {STAGES[activeStage].number} / 06
            </span>
          </div>
          <span className="font-serif italic text-[#161616] truncate max-w-[180px]">
            {STAGES[activeStage].title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
            <Compass className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase">
              CHRONOLOGY OF CRAFTSMANSHIP
            </span>
          </div>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#161616] leading-tight tracking-tight">
            THE ARCHITECTURE OF <span className="italic font-normal text-champagne-gradient">PERFECTION</span>
          </h2>

          <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed max-w-2xl mx-auto">
            Discover the six-stage engineering process behind KOKIO’s luxury luggage—where aerospace precision meets hand-crafted Tuscan artistry.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line (Desktop Only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-12 bottom-48 -translate-x-1/2 w-[2px] bg-[#B8892D]/20 z-0 pointer-events-none"
          >
            {/* Animated Active Line */}
            <div
              ref={timelineLineRef}
              className="w-full h-full bg-gradient-to-b from-[#B8892D] via-[#D4AF37] to-[#B8892D] origin-top shadow-[0_0_12px_rgba(184,137,45,0.4)]"
            />
          </div>

          {/* Stages List */}
          <div className="space-y-24 md:space-y-36">
            {STAGES.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = idx === activeStage;
              const isCompleted = idx < activeStage;
              const StageIcon = stage.icon;

              if (stage.isFinal) {
                // STAGE 06: GRAND CONCLUSION (VISUALLY DISTINCT)
                return (
                  <div
                    key={stage.id}
                    ref={(el) => (stagesRef.current[idx] = el)}
                    className="relative pt-12"
                  >
                    {/* Central Node for Final Stage */}
                    <div className="hidden md:flex absolute left-1/2 -top-4 -translate-x-1/2 z-20 items-center justify-center">
                      <div
                        ref={(el) => (nodesRef.current[idx] = el)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
                          isActive || isCompleted
                            ? 'bg-[#B8892D] border-[#D4AF37] shadow-[0_0_20px_rgba(184,137,45,0.6)] text-[#161616]'
                            : 'bg-[#EFEAE2] border-[#B8892D]/40 text-[#B8892D]'
                        }`}
                      >
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Elevated Dark Grand Finale Card */}
                    <div className="stage-content relative rounded-3xl bg-gradient-to-br from-[#1C1917] via-[#26221D] to-[#12100E] text-[#F8F6F2] p-8 md:p-16 border border-[#B8892D]/30 shadow-[0_30px_90px_rgba(0,0,0,0.25)] overflow-hidden">
                      {/* Decorative Gold Radial Glow */}
                      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#B8892D]/15 blur-3xl pointer-events-none" />

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
                        {/* Image Container */}
                        <div className="lg:col-span-6 order-2 lg:order-1">
                          <div className="stage-img-container relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#B8892D]/30 shadow-2xl group">
                            <Image
                              src={stage.image}
                              alt={stage.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="stage-img object-cover object-center transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/80 via-transparent to-transparent" />
                            
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#EFEAE2]/80 bg-[#161616]/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                              <span className="font-mono tracking-wider">SERIAL NO. KOKIO-2026-N1</span>
                              <span className="flex items-center gap-1.5 text-[#B8892D] font-semibold">
                                <CheckCircle2 className="w-4 h-4" /> PASSED AUDIT
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Text & Story */}
                        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#B8892D] uppercase px-3 py-1 bg-[#B8892D]/10 rounded-md border border-[#B8892D]/30">
                              STAGE {stage.number} • {stage.category}
                            </span>
                          </div>

                          <h3 className="font-serif text-3xl md:text-5xl font-light text-[#F8F6F2] leading-tight">
                            {stage.title}
                          </h3>

                          <p className="text-base md:text-lg text-[#D1C9BF] font-light leading-relaxed">
                            {stage.story}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            {stage.specs.map((spec, i) => (
                              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-[#EFEAE2] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#B8892D]" />
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-4">
                            <a
                              href="#catalog"
                              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#B8892D] text-[#161616] font-semibold text-sm tracking-widest uppercase hover:bg-[#D4AF37] transition-all duration-300 shadow-[0_10px_30px_rgba(184,137,45,0.3)] hover:shadow-[0_15px_40px_rgba(184,137,45,0.5)] hover:-translate-y-0.5 group"
                            >
                              <span>Explore The Monolith Series</span>
                              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // STAGES 01–05: ALTERNATING EDITORIAL DESKTOP LAYOUT
              return (
                <div
                  key={stage.id}
                  ref={(el) => (stagesRef.current[idx] = el)}
                  className="relative group"
                >
                  {/* Central Node Axis (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 z-20 items-center justify-center">
                    <div
                      ref={(el) => (nodesRef.current[idx] = el)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-500 flex items-center justify-center font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-[#B8892D] border-[#D4AF37] text-[#161616] shadow-[0_0_18px_rgba(184,137,45,0.6)] scale-110'
                          : isCompleted
                          ? 'bg-[#B8892D]/80 border-[#B8892D] text-[#161616] shadow-2xs'
                          : 'bg-[#EFEAE2] border-[#B8892D]/40 text-[#B8892D]'
                      }`}
                    >
                      {stage.number}
                    </div>
                  </div>

                  {/* Desktop Grid Layout (Alternating) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
                    {/* Image Column */}
                    <div
                      className={`lg:col-span-6 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="stage-img-container relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br border border-[rgba(0,0,0,0.08)] shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:shadow-[0_25px_60px_rgba(184,137,45,0.15)] transition-all duration-500">
                        <Image
                          src={stage.image}
                          alt={stage.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="stage-img object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                        {/* Subtle Badge Overlay */}
                        <div className="absolute top-4 left-4 bg-[#161616]/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white/90 text-xs font-mono flex items-center gap-2">
                          <StageIcon className="w-3.5 h-3.5 text-[#B8892D]" />
                          <span>STAGE {stage.number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Text Column */}
                    <div
                      className={`stage-content lg:col-span-6 space-y-5 ${
                        isEven ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
                      }`}
                    >
                      {/* Giant Opacity Stage Number Backdrop */}
                      <div className="relative">
                        <span aria-hidden="true" className="absolute -top-10 -left-4 font-serif text-7xl md:text-9xl font-extralight text-[#B8892D]/15 select-none pointer-events-none">
                          {stage.number}
                        </span>

                        <div className="relative z-10 space-y-4">
                          <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#B8892D] uppercase block">
                            {stage.category}
                          </span>

                          <h3 className="font-serif text-3xl md:text-5xl font-light text-[#161616] leading-tight">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-base md:text-lg text-[#4A4A4A] font-light leading-relaxed">
                        {stage.story}
                      </p>

                      {/* Technical Specs Tags */}
                      <div className="pt-2 flex flex-wrap gap-2">
                        {stage.specs.map((spec, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/70 border border-[rgba(0,0,0,0.08)] text-xs text-[#333333] font-medium shadow-2xs"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B8892D]" />
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

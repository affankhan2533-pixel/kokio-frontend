'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rotate3d, Info, Award, ArrowRight, ShieldCheck, Sparkles, Sliders, Check } from 'lucide-react';
import { use3DStore } from '@store/use3DStore';
import { useCartStore } from '@store/useCartStore';
import { useGsapReveal } from '@hooks/useGsapReveal';

// Dynamically import 3D Canvas with ssr: false
const HeroLuggageCanvas = dynamic(
  () => import('@components/3d/HeroLuggageCanvas'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[500px] flex flex-col items-center justify-center bg-[#111111] rounded-[18px] border border-[rgba(255,255,255,0.08)]">
        <div className="w-12 h-12 border-2 border-[#B8892D]/30 border-t-[#B8892D] rounded-full animate-spin mb-3" />
        <span className="text-[10px] tracking-[0.3em] font-light text-[#EFEAE2]/60 uppercase">
          INITIALIZING MUSEUM 3D PBR STAGE
        </span>
      </div>
    )
  }
);

const COLOR_VARIANTS = [
  { id: 'onyx', label: 'Obsidian Black', hex: '#18181b', spec: 'Matte Powder Coating • Scratch-Resistant' },
  { id: 'titanium', label: 'Titanium Silver', hex: '#c0c0c0', spec: 'Aerospace 6061-T6 • Anodized 18µm' },
  { id: 'champagne', label: 'Desert Sand', hex: '#d4a74e', spec: 'PVD Titanium Plated Finish' },
  { id: 'emerald', label: 'Midnight Navy', hex: '#1b263b', spec: 'Limited Series Metallic Lacquer' },
];

const TECHNICAL_SPECS = [
  { label: 'NET WEIGHT', val: '4.2 kg (9.2 lbs)' },
  { label: 'VOLUME CAPACITY', val: '35 Liters (TSA Approved)' },
  { label: 'BODY FRAME', val: '6061-T6 Forged Aluminum' },
  { label: 'BEARING WHEELS', val: 'Japanese Whisper-Glide' },
  { label: 'VAULT LOCKS', val: 'Dual TSA Keyless Locks' },
  { label: 'WARRANTY', val: 'Unconditional Lifetime' },
];

export default function InteractiveProductExp() {
  const { activeVariant, setVariant, autoRotate, setAutoRotate } = use3DStore();
  const { addItem, toggleCart } = useCartStore();
  const selectedVariantInfo = COLOR_VARIANTS.find(v => v.id === activeVariant) || COLOR_VARIANTS[0];
  const containerRef = useGsapReveal({ childrenSelector: '.exp-reveal', y: 35, duration: 1, start: 'top 85%' });

  const handleAddToCart = () => {
    addItem({
      id: 'monolith-carryon',
      name: 'The Monolith Carry-On 35L',
      price: '₹1,09,999',
      image: '/images/monolith.png',
    });
    toggleCart();
  };

  return (
    <section 
      id="3d-experience" 
      ref={containerRef} 
      className="section-padding bg-[#111111] text-[#F8F6F2] border-t border-[rgba(255,255,255,0.08)] relative overflow-hidden"
    >
      {/* Museum Dark Stage Spotlight Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(184,137,45,0.12)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 40% / 60% Desktop Layout (Reversed on Mobile for Dedicated Mobile Order) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Mobile Display Order 1 / Desktop Right Column 60%: Interactive 3D Model Stage */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            
            <div className="exp-reveal relative flex flex-col items-center justify-center bg-[#161616]/90 border border-[rgba(255,255,255,0.08)] rounded-[18px] p-4 sm:p-8 shadow-2xl min-h-[420px] sm:min-h-[520px] group cursor-grab active:cursor-grabbing">
              
              {/* Top Stage Control Header */}
              <div className="w-full flex items-center justify-between px-2 mb-2 z-10">
                <span className="text-[10px] tracking-[0.25em] text-[#B8892D] uppercase font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
                  KEYNOTE 360° PBR STAGE
                </span>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className="px-3 py-1 bg-[#111111] border border-[rgba(255,255,255,0.12)] hover:border-[#B8892D] rounded-full text-[10px] tracking-widest text-[#F8F6F2] uppercase font-semibold transition-colors cursor-pointer"
                >
                  {autoRotate ? 'PAUSE ROTATION' : 'ENABLE AUTO-ROTATE'}
                </button>
              </div>

              {/* 3D Canvas Component */}
              <div className="w-full flex-1 relative">
                <HeroLuggageCanvas />
              </div>

              {/* Soft Stage Pedestal Shadow Indicator */}
              <div className="w-48 sm:w-72 h-4 bg-[#B8892D]/15 blur-md rounded-full mt-2" />

              <p className="text-[10px] tracking-[0.25em] text-[#666666] uppercase mt-3 flex items-center gap-1.5 font-medium z-10">
                <Rotate3d className="w-3.5 h-3.5 text-[#B8892D]" />
                DRAG 360° TO INSPECT METROLOGY REFLECTIONS
              </p>

            </div>

          </div>

          {/* Mobile Display Order 2 / Desktop Left Column 40%: Editorial & Specs Details */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-8">
            
            <div className="space-y-3 exp-reveal">
              <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase block">
                THE MONOLITH 360° EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F8F6F2] leading-[1.12]">
                The Monolith Carry-On 35L
              </h2>
              <p className="font-sans text-[16px] text-[#EFEAE2]/80 font-light leading-[1.8]">
                Forged from 6061-T6 aerospace aluminum and hand-stitched Florentine vachetta leather. Interactive museum-grade keyframe inspection.
              </p>
            </div>

            {/* Material Finish Swatches */}
            <div className="space-y-3 exp-reveal pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.22em] text-[#666666] uppercase font-semibold">
                  SELECT MATERIAL FINISH:
                </span>
                <span className="text-xs font-semibold text-[#B8892D] tracking-wider uppercase">
                  {selectedVariantInfo.label}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLOR_VARIANTS.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setVariant(variant.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-[12px] border transition-all duration-300 cursor-pointer ${
                      activeVariant === variant.id
                        ? 'border-[#B8892D] bg-[#B8892D]/15 text-[#F8F6F2] ring-1 ring-[#B8892D]'
                        : 'border-[rgba(255,255,255,0.08)] bg-[#161616] text-[#666666] hover:border-[#B8892D]/40'
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-inner flex items-center justify-center"
                      style={{ backgroundColor: variant.hex }}
                    >
                      {activeVariant === variant.id && <Check className="w-2.5 h-2.5 text-white" />}
                    </span>
                    <span className="text-[10px] tracking-wider uppercase font-semibold truncate">
                      {variant.label.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications Grid */}
            <div className="space-y-3 exp-reveal pt-2">
              <span className="text-xs tracking-[0.22em] text-[#666666] uppercase font-semibold block border-b border-[rgba(255,255,255,0.08)] pb-2">
                TECHNICAL SPECIFICATIONS
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {TECHNICAL_SPECS.map((spec, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 bg-[#161616] border border-[rgba(255,255,255,0.06)] rounded-[12px] space-y-0.5 hover:border-[#B8892D]/40 transition-colors"
                  >
                    <span className="text-[9px] tracking-widest text-[#666666] uppercase font-semibold block">
                      {spec.label}
                    </span>
                    <span className="text-xs text-[#F8F6F2] font-medium block">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Price Action Bar */}
            <div className="exp-reveal pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-widest text-[#666666] uppercase block">
                  PRICE INCL. TAXES
                </span>
                <span className="font-serif text-2xl text-[#F8F6F2] font-semibold">
                  ₹1,09,999
                </span>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary-luxury text-xs px-6 py-3.5"
              >
                <span>CUSTOMIZE & PURCHASE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


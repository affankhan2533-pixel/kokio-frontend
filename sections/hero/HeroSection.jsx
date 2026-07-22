'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rotate3d, CheckCircle2, Info, Award } from 'lucide-react';
import { use3DStore } from '@store/use3DStore';
import { useMagneticHover } from '@hooks/useMagneticHover';

// Dynamically import 3D Canvas with ssr: false
const HeroLuggageCanvas = dynamic(
  () => import('@components/3d/HeroLuggageCanvas'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[500px] md:h-[560px] lg:h-[650px] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-neutral-400 border-t-neutral-950 rounded-full animate-spin mb-3" />
        <span className="text-[10px] tracking-[0.3em] font-light text-neutral-500 uppercase">
          INITIALIZING PBR MODEL
        </span>
      </div>
    )
  }
);

const COLOR_VARIANTS = [
  { id: 'titanium', label: 'Titanium Silver', hex: '#d1d5db', spec: 'Aerospace 6061-T6 • Anodized 18µm' },
  { id: 'onyx', label: 'Obsidian Black', hex: '#18181b', spec: 'Matte Powder Coating • Scratch-Resistant' },
  { id: 'champagne', label: 'Champagne Gold', hex: '#c5a059', spec: 'PVD Titanium Plated Finish' },
  { id: 'emerald', label: 'Deep Emerald', hex: '#0d382c', spec: 'Limited Series Metallic Lacquer' },
];

const KEY_SPECS = [
  { title: 'AEROSPACE-GRADE ALUMINUM', desc: 'Custom 6061-T6 Alloy' },
  { title: 'DUAL TSA INTEGRATED LOCKS', desc: 'Flush Security Latches' },
  { title: 'WHISPER-GLIDE 360° WHEELS', desc: 'Dual Rubber Treads' },
  { title: 'UNCONDITIONAL LIFETIME WARRANTY', desc: 'Global Repair Service' },
];

export default function HeroSection() {
  const { activeVariant, setVariant, autoRotate, setAutoRotate } = use3DStore();
  const primaryMagnetic = useMagneticHover(0.3);
  const secondaryMagnetic = useMagneticHover(0.3);

  const selectedVariantInfo = COLOR_VARIANTS.find(v => v.id === activeVariant) || COLOR_VARIANTS[0];

  return (
    <section className="relative min-h-[calc(100vh-90px)] w-full flex flex-col justify-between overflow-hidden bg-[#fcfbf9] text-neutral-950">
      
      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-8 md:pt-14 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1">
        
        {/* Left Column: Editorial Headline & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start space-y-8"
        >
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#f2eee9] border border-neutral-300 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
            <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-semibold text-neutral-900">
              ISSUE 01 • THE ART OF TRANSCENDENCE
            </span>
          </div>

          {/* Large Editorial Headline */}
          <div className="space-y-2">
            <span className="text-xs md:text-sm tracking-[0.4em] font-light text-neutral-500 uppercase block">
              ENGINEERED FOR THE DISCERNING VOYAGER
            </span>
            <h1 className="font-serif tracking-tight text-5xl sm:text-7xl md:text-8xl lg:text-[6.4rem] font-light leading-[0.92] text-neutral-950">
              THE ART OF <br />
              <span className="font-serif italic font-normal text-bronze-gradient">
                MOTION
              </span>
            </h1>
          </div>

          {/* Subtitle Description */}
          <p className="text-sm md:text-base text-neutral-700 font-light max-w-xl leading-relaxed tracking-wide">
            Meticulously forged from aerospace-grade aluminum and full-grain Italian leather. 
            Engineered for effortless glide, flush security, and a lifetime of continental movement.
          </p>

          {/* Magnetic CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
            
            {/* Primary Button */}
            <motion.div
              style={{ x: primaryMagnetic.position.x, y: primaryMagnetic.position.y }}
              onMouseMove={primaryMagnetic.handleMouseMove}
              onMouseLeave={primaryMagnetic.handleMouseLeave}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-full sm:w-auto"
            >
              <a
                href="#collections"
                className="relative overflow-hidden inline-flex items-center justify-center gap-3 px-9 py-4.5 bg-neutral-950 text-white font-bold text-xs tracking-[0.22em] uppercase rounded-xs shadow-2xl hover:bg-neutral-800 transition-all duration-300 group cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </motion.div>

            {/* Secondary 3D Experience Button */}
            <motion.div
              style={{ x: secondaryMagnetic.position.x, y: secondaryMagnetic.position.y }}
              onMouseMove={secondaryMagnetic.handleMouseMove}
              onMouseLeave={secondaryMagnetic.handleMouseLeave}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-full sm:w-auto"
            >
              <a
                href="#3d-experience"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4.5 bg-[#f2eee9] hover:bg-neutral-200 text-neutral-950 border border-neutral-300 rounded-xs text-xs tracking-[0.2em] uppercase transition-all duration-300 group shadow-sm cursor-pointer font-semibold"
              >
                <Rotate3d className="w-4 h-4 text-neutral-800 group-hover:rotate-90 transition-transform duration-700" />
                <span>EXPERIENCE IN 3D</span>
              </a>
            </motion.div>

          </div>

          {/* Product Configurator Swatches */}
          <div className="pt-6 border-t border-neutral-300/80 w-full max-w-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] tracking-[0.2em] text-neutral-600 uppercase font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-neutral-950" />
                FINISH VARIANT: <span className="text-neutral-950 font-bold">{selectedVariantInfo.label}</span>
              </span>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="text-[10px] tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors uppercase underline cursor-pointer"
              >
                {autoRotate ? 'PAUSE ROTATION' : 'ENABLE ROTATION'}
              </button>
            </div>
            
            {/* Swatches */}
            <div className="flex items-center gap-3 mb-3">
              {COLOR_VARIANTS.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setVariant(variant.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-xs cursor-pointer ${
                    activeVariant === variant.id
                      ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-inner"
                    style={{ backgroundColor: variant.hex }}
                  />
                  <span className="text-[10px] tracking-wider uppercase font-semibold">
                    {variant.id}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Specification Bar */}
            <div className="bg-[#f2eee9] border border-neutral-300 rounded-md px-4 py-2.5 text-[11px] text-neutral-700 font-normal tracking-wider flex items-center justify-between">
              <span>{selectedVariantInfo.spec}</span>
              <Award className="w-3.5 h-3.5 text-neutral-950" />
            </div>

          </div>

        </motion.div>

        {/* Right Column: Dynamic Interactive 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[440px]"
        >
          <HeroLuggageCanvas />

          <p className="text-[10px] tracking-[0.25em] text-neutral-500 uppercase mt-2 text-center flex items-center gap-1.5 font-medium">
            <Rotate3d className="w-3.5 h-3.5 text-neutral-950" />
            DRAG TO ROTATE • 360° INTERACTIVE PBR PREVIEW
          </p>
        </motion.div>

      </div>

      {/* Bottom Key Specs Ticker */}
      <div className="relative z-10 bg-[#f2eee9] border-t border-neutral-300/80 py-4 px-4 overflow-hidden text-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {KEY_SPECS.map((spec, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-neutral-950 shrink-0" />
              <div>
                <h4 className="text-[11px] tracking-[0.18em] font-semibold uppercase text-neutral-950">
                  {spec.title}
                </h4>
                <p className="text-[10px] text-neutral-600 font-light tracking-wide">
                  {spec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

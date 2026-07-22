'use client';

import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

export default function FullWidthCampaign() {
  const containerRef = useGsapReveal({ childrenSelector: '.campaign-reveal', y: 35, duration: 1, start: 'top 85%' });

  return (
    <section 
      id="campaign"
      ref={containerRef} 
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#111111] text-[#F8F6F2] py-24 md:py-32 group"
    >
      {/* Full-Bleed Parallax Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ backgroundImage: `url('/images/iceland.png')` }}
      />

      {/* Luxury Vignette & Dark Overlay Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#111111] via-transparent to-[#111111]" />

      {/* Editorial Grid Content Alignment Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center space-y-10">
        
        {/* Editorial Badge */}
        <div className="campaign-reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111]/80 border border-[#B8892D]/40 rounded-full backdrop-blur-md shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
          <span className="text-[11px] md:text-[13px] tracking-[0.38em] uppercase font-semibold text-[#B8892D]">
            GLOBAL CAMPAIGN 2026
          </span>
        </div>

        {/* Campaign Title: Cormorant Garamond 72px Desktop / 42px Mobile */}
        <h2 className="campaign-reveal font-serif text-[42px] sm:text-[56px] lg:text-[72px] font-light tracking-tight text-[#F8F6F2] leading-[1.08] max-w-4xl">
          Beyond Every Journey
        </h2>

        {/* Editorial Quote: Plus Jakarta Sans 20px Desktop / 16px Mobile */}
        <p className="campaign-reveal font-sans text-[16px] sm:text-[20px] text-[#EFEAE2]/90 font-light leading-[1.7] tracking-wide max-w-2xl mx-auto">
          &ldquo;Luxury is not measured by distance. It is measured by how every journey is experienced.&rdquo;
        </p>

        {/* Primary Campaign CTA */}
        <div className="campaign-reveal pt-4">
          <a
            href="#journal"
            className="btn-secondary-luxury text-xs px-8 py-4 inline-flex items-center gap-3"
          >
            <span>DISCOVER THE STORY</span>
            <ArrowRight className="w-4 h-4 text-[#B8892D]" />
          </a>
        </div>

        {/* Minimal Sub-Tag */}
        <p className="campaign-reveal text-[10px] md:text-[11px] tracking-[0.35em] text-[#666666] uppercase font-light pt-4">
          THE ICELAND CONTINENTAL EXPEDITION • PHOTOGRAPHED BY ATELIER KOKIO
        </p>

      </div>

    </section>
  );
}




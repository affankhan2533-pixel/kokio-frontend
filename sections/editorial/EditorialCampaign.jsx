'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Compass, Quote } from 'lucide-react';

export default function EditorialCampaign() {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-neutral-950 text-white py-24">
      
      {/* Full-Bleed Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
        style={{ backgroundImage: `url('/images/iceland.png')` }}
      />

      {/* Luxury Vignette & Dark Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 text-center flex flex-col items-center space-y-8">
        
        {/* Campaign Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/15 rounded-full backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase font-medium text-amber-200">
            GLOBAL EDITORIAL CAMPAIGN • EDITION 01
          </span>
        </div>

        {/* Campaign Title */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-tight">
          BEYOND <br />
          <span className="italic font-normal text-gold-gradient">DESTINATIONS</span>
        </h2>

        {/* Editorial Quote */}
        <div className="relative max-w-2xl mx-auto pt-4 pb-2">
          <Quote className="w-8 h-8 text-amber-400/30 absolute -top-2 -left-6" />
          <p className="text-base md:text-lg text-neutral-300 font-light italic leading-relaxed tracking-wide">
            &ldquo;Travel is not merely about arriving. It is the sensory dialogue between the traveler, the element, and the instruments carried.&rdquo;
          </p>
        </div>

        <p className="text-xs tracking-[0.25em] text-neutral-400 font-light uppercase">
          THE ICELAND CONTINENTAL EXPEDITION
        </p>

        {/* CTA */}
        <a
          href="#journal"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xs backdrop-blur-md text-xs tracking-[0.22em] uppercase transition-all duration-300 group shadow-2xl"
        >
          <span>READ THE FULL CAMPAIGN STORY</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

      </div>

    </section>
  );
}

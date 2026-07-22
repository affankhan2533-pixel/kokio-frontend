'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState, useRef } from 'react';

export default function HeroVideoSection() {
  const [muted, setMuted] = useState(true);
  const sectionRef = useRef(null);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#111111] text-[#F8F6F2]"
    >
      
      {/* Cinematic Background & Parallax Scale Layer */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url('/images/hero_bg.png')` }}
      />

      {/* Lighting & Depth Vignette Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(184,137,45,0.18)_0%,transparent_65%)]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111111] via-[#111111]/35 to-[#111111]/70" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/80" />

      {/* Header Integration Spacer / Top Bar */}
      <div className="relative z-10 pt-28 md:pt-32 lg:pt-36 px-6 md:px-12 flex justify-between items-center text-[11px] tracking-[0.38em] text-[#EFEAE2]/80 uppercase">
        <motion.span 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111111]/70 backdrop-blur-md rounded-full border border-[#B8892D]/40 text-[#B8892D] font-semibold shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
          KOKIO ARCHIVE • MMXXVI
        </motion.span>

        <motion.button
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          onClick={() => setMuted(!muted)}
          aria-label={muted ? 'Enable sound' : 'Mute sound'}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111]/70 backdrop-blur-md rounded-full border border-[#B8892D]/40 hover:border-[#B8892D] text-[#F8F6F2] hover:text-[#B8892D] transition-all cursor-pointer shadow-lg"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#B8892D]" />}
          <span>{muted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </motion.button>
      </div>

      {/* Main Editorial Hero Content */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center space-y-6 md:space-y-8 my-auto py-6"
      >
        
        {/* Eyebrow Label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm tracking-[0.45em] text-[#B8892D] uppercase font-semibold block"
        >
          LES VOYAGES DE L&apos;ESPRIT
        </motion.span>

        {/* Headline: Cormorant Garamond 72px Desktop / 42px Mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[42px] sm:text-[56px] lg:text-[72px] font-light leading-[1.08] tracking-tight text-[#F8F6F2] max-w-4xl"
        >
          ENGINEERED FOR THE <br />
          <span className="italic font-normal text-champagne-gradient">DISCERNING VOYAGER</span>
        </motion.h1>

        {/* Supporting Text: Plus Jakarta Sans 18px */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="font-sans text-[15px] sm:text-[18px] text-[#EFEAE2]/90 font-light max-w-xl leading-[1.7] tracking-wide text-center"
        >
          Aerospace-grade 6061-T6 aluminum luggage and hand-stitched Florentine vachetta leather instruments built for a lifetime of movement.
        </motion.p>

        {/* Phase 2 CTA Pair: Primary (Champagne Gold) & Secondary (Glass Style) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: 'easeOut' }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <a
            href="#gallery"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#B8892D] hover:bg-[#111111] text-[#161616] hover:text-[#F8F6F2] rounded-[14px] text-[15px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_35px_rgba(184,137,45,0.3)] border border-[#B8892D] hover:border-[#B8892D] min-h-[52px] group"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>

          {/* Secondary CTA */}
          <a
            href="#manifesto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#F8F6F2]/10 hover:bg-[#B8892D]/20 text-[#F8F6F2] hover:text-[#B8892D] backdrop-blur-md border border-[#B8892D]/40 hover:border-[#B8892D] rounded-[14px] text-[15px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 min-h-[52px] shadow-md"
          >
            <span>OUR STORY</span>
          </a>
        </motion.div>

      </motion.div>

      {/* Floating Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="relative z-10 pb-8 md:pb-12 flex flex-col items-center space-y-2 text-[#EFEAE2]/70"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-light">SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#B8892D]" />
        </motion.div>
      </motion.div>

    </section>
  );
}





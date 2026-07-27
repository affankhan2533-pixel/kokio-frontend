'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function HeroVideoSection() {
  const [muted, setMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Handle Mute/Unmute video element
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted(!muted);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#111111] text-[#F8F6F2]"
      aria-label="Cinematic Hero"
    >
      
      {/* LAYER 1: Cinematic Video Background & Poster Fallback with Parallax Scale */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 will-change-transform bg-cover bg-[42%_center] sm:bg-center"
        style={{ backgroundImage: `url('/images/hero_bg.png')` }}
      >
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            autoPlay
            muted={muted}
            loop
            playsInline
            preload="metadata"
            poster="/images/hero_bg.png"
            onCanPlay={() => setVideoLoaded(true)}
            className={`w-full h-full object-cover object-[42%_center] sm:object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/videos/hero_cinematic.webm" type="video/webm" />
            <source src="/videos/hero_cinematic.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* LAYER 2: Dark Luxury Gradient Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#111111] via-[#111111]/45 to-[#111111]/75" />

      {/* LAYER 3: Very Subtle Golden Radial / Noise Texture Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(184,137,45,0.16)_0%,transparent_65%)]" />

      {/* LAYER 4: Soft Vignette Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/80" />

      {/* LAYER 5: Desktop Top Bar (Sound Control & Badge) */}
      <div className="relative z-10 pt-28 md:pt-32 lg:pt-36 px-6 md:px-12 hidden md:flex justify-between items-center text-[11px] tracking-[0.38em] text-[#EFEAE2]/80 uppercase">
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
          onClick={handleToggleMute}
          aria-label={muted ? 'Enable sound' : 'Mute sound'}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111]/70 backdrop-blur-md rounded-full border border-[#B8892D]/40 hover:border-[#B8892D] text-[#F8F6F2] hover:text-[#B8892D] transition-all cursor-pointer shadow-lg"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#B8892D]" />}
          <span>{muted ? 'SOUND OFF' : 'SOUND ON'}</span>
        </motion.button>
      </div>

      {/* LAYER 5: Refined Mobile & Desktop Hero Content Container */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 md:px-12 w-full text-center flex flex-col items-center justify-center space-y-3 sm:space-y-5 md:space-y-7 pt-[96px] sm:pt-[115px] md:pt-16 pb-8 my-auto"
      >
        
        {/* Eyebrow Label */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] sm:text-xs md:text-sm tracking-[0.4em] sm:tracking-[0.45em] text-[#B8892D] uppercase font-semibold block"
        >
          LES VOYAGES DE L&apos;ESPRIT
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[32px] xs:text-[35px] sm:text-[48px] md:text-[64px] lg:text-[78px] font-light leading-[1.12] tracking-tight text-[#F8F6F2] max-w-[90%] sm:max-w-4xl"
        >
          ENGINEERED FOR THE <br />
          <span className="italic font-normal text-champagne-gradient">DISCERNING VOYAGER</span>
        </motion.h1>

        {/* Antique Subtitle Line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: 'easeOut' }}
          className="font-serif italic text-xs sm:text-base md:text-xl text-[#EFEAE2]/90 font-light tracking-wide text-center pt-0.5 sm:pt-1"
        >
          Monolithic precision for a lifetime of movement.
        </motion.p>

        {/* Single Horizontal CTA Row (Identical Layout Preserved) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6, ease: 'easeOut' }}
          className="pt-4 sm:pt-6 flex flex-row items-center justify-center gap-3 w-full max-w-[340px] sm:max-w-none mx-auto whitespace-nowrap"
        >
          {/* Primary CTA */}
          <motion.a
            href="#catalog"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[60%] sm:w-auto inline-flex items-center justify-between sm:justify-center gap-2 px-3.5 sm:px-8 h-[48px] bg-[#B8892D] hover:bg-[#D4AF37] text-[#161616] rounded-[12px] text-[13px] xs:text-[14px] sm:text-[15px] font-medium tracking-[0.12em] uppercase transition-colors shadow-md border border-[#B8892D] group select-none shrink-0 cursor-pointer"
          >
            <span className="truncate">EXPLORE COLLECTION</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#manifesto"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[40%] sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 sm:px-7 h-[48px] bg-transparent hover:bg-[#B8892D]/15 text-[#F8F6F2] hover:text-[#B8892D] backdrop-blur-md border border-[#B8892D]/50 hover:border-[#B8892D] rounded-[12px] text-[13px] xs:text-[14px] sm:text-[15px] font-medium tracking-[0.12em] uppercase transition-colors shadow-xs select-none shrink-0 cursor-pointer"
          >
            <span className="truncate">OUR STORY</span>
          </motion.a>
        </motion.div>

      </motion.div>

      {/* Floating Bottom Scroll Indicator (Desktop Only) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 pb-8 md:pb-10 hidden md:flex flex-col items-center space-y-1.5 text-[#EFEAE2]/70"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase font-light">SCROLL TO DISCOVER</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-[#B8892D]" />
        </motion.div>
      </motion.div>

    </section>
  );
}

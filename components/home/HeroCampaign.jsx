'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function HeroCampaign() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  return (
    <section
      className="relative w-full h-[76vh] min-h-[520px] max-h-[720px] md:h-[82vh] md:min-h-[600px] md:max-h-[820px] overflow-hidden bg-[#0D0D0D] text-[#F8F6F2] flex items-center justify-center"
      aria-label="Hero Campaign"
    >
      {/* LAYER 1: Cinematic Video Background & Poster Fallback (Initial 1.00 -> 1.015 scale shift) */}
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: prefersReducedMotion ? 1.0 : 1.015 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero_bg.png')` }}
      >
        {!prefersReducedMotion && !videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero_bg.png"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source
              src="/video/Man_pulling_KOKIO_suitcase_airport_202607271511 (online-video-cutter.com).mp4"
              type="video/mp4"
            />
          </video>
        )}
      </motion.div>

      {/* LAYER 2: Dark Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-[#0D0D0D]/75" />

      {/* LAYER 3: Soft Radial Glow & Vignette */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(184,137,45,0.12)_0%,transparent_70%)]" />
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-[#0D0D0D]/70 via-transparent to-[#0D0D0D]/70" />

      {/* LAYER 4: Hero Content Container (Staggered 100ms timing, cubic-bezier(0.22, 1, 0.36, 1)) */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center space-y-4 md:space-y-6 pt-16 md:pt-20">
        
        {/* Eyebrow Label: fade + translateY(16px) */}
        <motion.span
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs tracking-[0.3em] text-[#B8892D] uppercase font-semibold font-sans"
        >
          LES VOYAGES DE L&apos;ESPRIT • MMXXVI
        </motion.span>

        {/* Main Headline: fade + translateY(20px) */}
        <motion.h1
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight text-[#F8F6F2] max-w-3xl"
        >
          ENGINEERED FOR THE <br className="hidden sm:inline" />
          <span className="italic font-normal text-champagne-gradient">DISCERNING VOYAGER</span>
        </motion.h1>

        {/* Short Description: fade + translateY(14px) */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs sm:text-base md:text-lg text-[#EFEAE2]/85 font-light leading-relaxed max-w-xl text-center"
        >
          Monolithic precision for a lifetime of movement. Hand-finished aerospace aluminum trunks and Italian vachetta leather goods.
        </motion.p>

        {/* Dual CTAs (Primary & Secondary CTA staggered 100ms, translateY(12px)) */}
        <div className="pt-2 sm:pt-4 flex flex-row items-center justify-center gap-3.5 w-full max-w-xs sm:max-w-none">
          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/collections/all"
              className="btn-primary-gold group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/collections/monolith"
              className="btn-secondary-dark"
            >
              <span>OUR STORY</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

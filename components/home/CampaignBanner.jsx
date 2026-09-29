'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function CampaignBanner() {
  return (
    <section
      aria-label="Campaign Spotlight"
      className="relative w-full h-[55vh] md:h-[62vh] min-h-[420px] max-h-[620px] overflow-hidden bg-[#0D0D0D] text-[#F8F6F2] border-y border-black/10 flex items-center"
    >
      {/* Background Campaign Photography */}
      <motion.div
        initial={{ scale: 1.0 }}
        whileInView={{ scale: 1.02 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 bg-cover bg-center"
      >
        <Image
          src="/images/lounge_bg.png"
          alt="The Monolith Series Campaign"
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading="lazy"
        />
      </motion.div>

      {/* Dark Subtle Overlay & Radial Glow */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/50 to-transparent" />
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-[#0D0D0D]/40" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
        <div className="max-w-xl space-y-3 sm:space-y-4">
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Editorial Label */}
            <span className="text-xs font-sans tracking-[0.3em] text-[#B8892D] uppercase font-semibold block">
              THE MONOLITH SERIES
            </span>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-[#F8F6F2] leading-[1.1] tracking-tight">
              ENGINEERED FOR <br />
              <span className="italic font-normal text-champagne-gradient">THE JOURNEY</span>
            </h2>

            {/* Supporting Text */}
            <p className="text-xs sm:text-sm md:text-base text-white/95 font-normal leading-relaxed max-w-md">
              Aerospace-grade 6061-T6 aluminum trunks built for long-distance continental transit.
            </p>
          </motion.div>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.38, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="pt-2"
          >
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 bg-[#B8892D] hover:bg-[#161616] hover:text-[#F8F6F2] text-[#111111] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-none group shrink-0 cursor-pointer border border-[#B8892D]"
            >
              <span>DISCOVER THE COLLECTION</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

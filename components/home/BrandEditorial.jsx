'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function BrandEditorial() {
  return (
    <section
      id="house"
      className="py-10 sm:py-14 md:py-20 bg-[#F8F6F2] text-[#161616] border-b border-black/8"
      aria-label="Brand Heritage"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Left Column: Atelier/Craftsmanship Image */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] md:aspect-[16/11] w-full rounded-xs overflow-hidden bg-[#EFEAE2] border border-black/8 shadow-none"
          >
            <Image
              src="/images/stage_1.png"
              alt="The House of KOKIO Metrology Atelier"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center scale-100 hover:scale-[1.02] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              loading="lazy"
            />
          </motion.div>

          {/* Right Column: Concise Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 md:space-y-6"
          >
            <span className="text-xs font-sans tracking-[0.35em] text-[#B8892D] uppercase font-semibold block">
              THE HOUSE OF KOKIO
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616] leading-tight">
              Engineered for <br />
              <span className="italic font-normal text-champagne-gradient">the Journey.</span>
            </h2>

            <p className="text-sm md:text-base text-[#383838] font-normal leading-relaxed max-w-lg">
              KOKIO merges aerospace-grade 6061-T6 aluminum metrology with Tuscan full-grain vachetta leather craftsmanship. Designed for travelers who view precision as the highest form of luxury, every creation is engineered for long-distance continental movement.
            </p>

            <div className="pt-2">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#161616] hover:bg-[#B8892D] text-[#F8F6F2] hover:text-[#111111] rounded-xs text-xs font-sans font-semibold tracking-[0.16em] uppercase transition-all duration-300 shadow-none group shrink-0 cursor-pointer border border-[#161616] hover:border-[#B8892D]"
              >
                <span>DISCOVER THE HOUSE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

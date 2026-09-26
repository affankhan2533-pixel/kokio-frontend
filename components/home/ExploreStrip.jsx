'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    number: '01',
    name: 'MONOLITH',
    desc: 'Aerospace 6061-T6 Aluminum',
    image: '/images/monolith.png',
    href: '/collections/monolith',
  },
  {
    number: '02',
    name: 'METROPOLITAN',
    desc: 'Urban Travel & Business Gear',
    image: '/images/executive_briefcase.png',
    href: '/collections/metropolitan',
  },
  {
    number: '03',
    name: 'EXPEDITION',
    desc: 'Sub-Zero Hydro-Seal Cases',
    image: '/images/iceland.png',
    href: '/collections/expedition',
  },
  {
    number: '04',
    name: 'ATELIER',
    desc: 'Tuscan Vachetta Masterpieces',
    image: '/images/duffel.png',
    href: '/collections/atelier',
  },
];

export default function ExploreStrip() {
  return (
    <section
      id="collections"
      className="py-14 md:py-20 bg-[#F8F6F2] text-[#161616] border-b border-black/8"
      aria-label="Explore Collections"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-6 md:space-y-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between border-b border-black/8 pb-4"
        >
          <div>
            <span className="text-xs font-sans tracking-[0.3em] font-semibold text-[#B8892D] uppercase block">
              CURATED EDITIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#161616]">
              Explore <span className="italic font-normal text-champagne-gradient">Collections</span>
            </h2>
          </div>
          <Link
            href="/collections/all"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-sans font-bold tracking-widest text-[#161616] hover:text-[#B8892D] uppercase transition-colors"
          >
            <span>VIEW ALL</span>
            <ArrowUpRight className="w-4 h-4 text-[#B8892D]" />
          </Link>
        </motion.div>

        {/* Desktop 4-Col Grid / Mobile Snap Carousel with Stagger */}
        <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {COLLECTIONS.map((col, idx) => (
            <motion.div
              key={col.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-w-[70vw] sm:min-w-[45vw] md:min-w-0 snap-center shrink-0"
            >
              <Link
                href={col.href}
                className="group relative h-60 sm:h-64 rounded-xl overflow-hidden bg-[#EFEAE2] border border-black/8 shadow-xs hover:border-[#B8892D]/40 transition-all duration-300 flex flex-col justify-between p-5 block"
              >
                {/* Background Photography */}
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 70vw, 25vw"
                  className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-300 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/20 to-transparent pointer-events-none" />

                {/* Top Meta Tag */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-sans text-[#B8892D] font-bold tracking-widest uppercase px-2.5 py-0.5 bg-[#111111]/80 rounded-md border border-white/10">
                    {col.number} • EDITION
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/90 text-[#161616] group-hover:bg-[#B8892D] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-0.5 text-white group-hover:-translate-y-0.5 transition-transform duration-300">
                  <h3 className="font-serif text-lg font-medium group-hover:text-[#D4AF37] transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-white/75 font-light truncate">
                    {col.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

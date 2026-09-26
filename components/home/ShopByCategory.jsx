'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'cabin',
    name: 'CABIN / CARRY-ON',
    subtitle: 'Overhead bin 35L trunks',
    image: '/images/monolith.png',
    href: '/collections/carry-on',
  },
  {
    id: 'trunks',
    name: 'EXTENDED TRUNKS',
    subtitle: 'Deep continental travel trunks',
    image: '/images/iceland.png',
    href: '/collections/trunks',
  },
  {
    id: 'duffels',
    name: 'LEATHER DUFFELS',
    subtitle: 'Tuscan vachetta weekenders',
    image: '/images/duffel.png',
    href: '/collections/bags',
  },
  {
    id: 'accessories',
    name: 'BESPOKE ACCESSORIES',
    subtitle: 'Passport folios & organizers',
    image: '/images/craftsmanship.png',
    href: '/collections/accessories',
  },
];

export default function ShopByCategory() {
  return (
    <section
      id="category"
      className="py-16 md:py-24 bg-[#F8F6F2] text-[#161616] border-b border-black/8"
      aria-label="Shop by Category"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 md:space-y-12">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/8 pb-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-sans tracking-[0.3em] font-semibold text-[#B8892D] uppercase block">
              TAXONOMY OF TRAVEL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616] leading-tight">
              SHOP BY <span className="italic font-normal text-champagne-gradient">CATEGORY</span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs text-[#666666] font-light max-w-xs"
          >
            Choose your companion for the journey.
          </motion.p>
        </motion.div>

        {/* Categories Grid (2-cols Mobile, 4-cols Desktop) with Stagger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={cat.href}
                className="group relative h-64 sm:h-72 md:h-80 rounded-xs overflow-hidden bg-[#EFEAE2] border border-black/8 shadow-none hover:border-[#B8892D]/40 transition-all duration-300 flex flex-col justify-between p-5 block"
              >
                {/* Product Background Photography */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  loading="lazy"
                />
                
                {/* Soft Dark Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/25 to-transparent pointer-events-none" />

                {/* Top Action Badge */}
                <div className="relative z-10 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-[#161616] group-hover:bg-[#B8892D] group-hover:text-white flex items-center justify-center transition-colors shadow-none">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom Content Info */}
                <div className="relative z-10 space-y-1 text-white group-hover:-translate-y-0.5 transition-transform duration-300">
                  <h3 className="font-serif text-lg sm:text-xl font-light group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 font-light truncate">
                    {cat.subtitle}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[11px] font-sans tracking-widest text-[#B8892D] uppercase font-semibold">
                    <span>SHOP</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

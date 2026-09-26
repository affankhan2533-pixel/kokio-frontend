'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { motion } from 'framer-motion';

const NEW_ARRIVALS_PRODUCTS = [
  {
    id: 'florentine-crossbody-sling',
    slug: 'florentine-crossbody-sling',
    tag: 'TUSCAN VACHETTA',
    name: 'Florentine Crossbody Sling',
    price: '₹34,999',
    image: '/images/crossbody_sling.png',
  },
  {
    id: 'tuscan-passport-folio',
    slug: 'tuscan-passport-folio',
    tag: 'BESPOKE ACCESSORIES',
    name: 'Tuscan Leather Passport Folio',
    price: '₹19,999',
    image: '/images/passport_folio.png',
  },
  {
    id: 'expedition-tourist-pack',
    slug: 'expedition-tourist-pack',
    tag: 'METROPOLITAN LINE',
    name: 'Expedition Tourist Pack',
    price: '₹64,999',
    image: '/images/tourist_bag.png',
  },
  {
    id: 'iceland-subzero-trunk',
    slug: 'iceland-subzero-trunk',
    tag: 'ARCTIC SPECIFICATION',
    name: 'Iceland Sub-Zero Trunk 110L',
    price: '₹1,89,999',
    image: '/images/iceland.png',
  },
];

export default function NewArrivals() {
  return (
    <section
      id="new-arrivals"
      className="py-16 md:py-24 bg-[#F8F6F2] text-[#161616] border-b border-black/8"
      aria-label="New Arrivals"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 md:space-y-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-black/8 pb-6"
        >
          <div className="space-y-1">
            <span className="text-xs font-sans tracking-[0.3em] font-semibold text-[#B8892D] uppercase block">
              NEW RELEASES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616] leading-tight">
              New <span className="italic font-normal text-champagne-gradient">Arrivals</span>
            </h2>
          </div>
          <p className="text-xs text-[#666666] font-light max-w-xs">
            The latest pieces from the KOKIO collection.
          </p>
        </motion.div>

        {/* Product Cards Container with Stagger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {NEW_ARRIVALS_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/products/${product.slug}`}
                className="group relative bg-white rounded-xs overflow-hidden border border-black/8 hover:border-[#B8892D]/40 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between h-full block"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFEAE2]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                    loading="lazy"
                  />

                  {/* Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md px-2.5 py-1 rounded-xs text-[9px] font-sans text-[#EFEAE2] tracking-wider uppercase border border-white/10">
                    {product.tag}
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <div className="space-y-1">
                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#161616] group-hover:text-[#B8892D] transition-colors leading-snug line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="font-sans text-sm font-semibold text-[#161616] block">
                      {product.price}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-black/6 flex items-center justify-between text-xs font-sans text-[#888888] group-hover:text-[#B8892D] transition-colors uppercase">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All New Arrivals Link */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/collections/all"
            className="inline-flex items-center justify-center gap-2 text-xs font-sans font-bold tracking-[0.2em] text-[#161616] hover:text-[#B8892D] uppercase transition-colors group cursor-pointer min-h-[44px]"
          >
            <span>VIEW ALL NEW ARRIVALS</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform text-[#B8892D]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

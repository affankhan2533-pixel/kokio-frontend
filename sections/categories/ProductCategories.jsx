'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'CABIN LUGGAGE',
    desc: 'Aerospace aluminum carry-on trunks engineered for international overhead bins.',
    count: '12 Models',
    image: '/images/monolith.png',
  },
  {
    name: 'EXTENDED TRUNKS',
    desc: 'Deep-capacity aluminum trunks built for multi-week continental journeys.',
    count: '8 Models',
    image: '/images/iceland.png',
  },
  {
    name: 'LEATHER DUFFELS',
    desc: 'Full-grain Italian leather weekender bags with carbon-reinforced handles.',
    count: '14 Models',
    image: '/images/duffel.png',
  },
  {
    name: 'BESPOKE ACCESSORIES',
    desc: 'Passport folios, leather luggage tags, and modular packing organizers.',
    count: '24 Items',
    image: '/images/craftsmanship.png',
  },
];

export default function ProductCategories() {
  return (
    <section id="luggage" className="py-28 bg-[#fcfbf9] text-neutral-950 border-t border-neutral-300 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs tracking-[0.35em] font-semibold text-neutral-950 uppercase block mb-2">
              TAXONOMY OF TRAVEL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-neutral-950">
              PRODUCT <span className="italic font-normal text-bronze-gradient">CATEGORIES</span>
            </h2>
          </div>
          <p className="text-xs tracking-[0.2em] text-neutral-600 uppercase font-medium">
            DISCOVER THE FULL ARCHITECTURE
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.a
              key={cat.name}
              href="#category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative h-96 rounded-2xl overflow-hidden border border-neutral-300 bg-neutral-100 flex flex-col justify-between p-6 hover:border-neutral-950 transition-all duration-500 shadow-sm"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent" />

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.25em] font-semibold text-neutral-950 uppercase px-3 py-1 bg-white rounded-full border border-neutral-300 shadow-sm">
                  {cat.count}
                </span>
                <div className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:bg-amber-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 space-y-1.5 text-white">
                <h3 className="font-serif text-2xl font-light group-hover:text-amber-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

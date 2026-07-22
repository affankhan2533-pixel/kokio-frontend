'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';

const ARTICLES = [
  {
    id: 'tokyo-guide',
    category: 'VOYAGER CHRONICLES',
    title: 'The Art of Packing for Tokyo: 7 Days in Ginza & Naoshima',
    date: 'OCTOBER 2026',
    image: '/images/iceland.png',
  },
  {
    id: 'durability-test',
    category: 'METROLOGY LAB',
    title: 'The 100,000 Mile Test: How We Stress-Test 6061-T6 Aluminum',
    date: 'SEPTEMBER 2026',
    image: '/images/craftsmanship.png',
  },
  {
    id: 'leather-care',
    category: 'CRAFTSMANSHIP',
    title: 'Preserving Tuscan Vachetta: Patina & Conditioning Essentials',
    date: 'AUGUST 2026',
    image: '/images/duffel.png',
  },
];

export default function TravelJournal() {
  return (
    <section id="journal" className="py-28 bg-[#fcfbf9] text-neutral-950 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs tracking-[0.35em] font-semibold text-neutral-950 uppercase flex items-center gap-2 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-neutral-950" />
              THE KOKIO JOURNAL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-neutral-950">
              EDITORIAL <span className="italic font-normal text-bronze-gradient">STORIES</span>
            </h2>
          </div>
          <a href="#journal" className="text-xs tracking-[0.2em] text-neutral-950 hover:text-amber-800 uppercase font-bold flex items-center gap-1.5 transition-colors">
            <span>EXPLORE ALL CHRONICLES</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art, idx) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group cursor-pointer space-y-4"
            >
              <div className="relative h-64 w-full rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute top-4 left-4 bg-neutral-950 text-white px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold shadow-md">
                  {art.category}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] tracking-widest text-neutral-500 font-medium uppercase">
                  {art.date}
                </span>
                <h3 className="font-serif text-xl text-neutral-950 font-light group-hover:text-amber-900 transition-colors leading-snug">
                  {art.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}

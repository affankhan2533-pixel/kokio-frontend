'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

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

export default function EditorialJournal() {
  const containerRef = useGsapReveal({ childrenSelector: '.journal-article', y: 35, stagger: 0.15 });

  return (
    <section id="journal" ref={containerRef} className="section-padding bg-[#EFEAE2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-3">
            <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B8892D]" />
              THE KOKIO JOURNAL
            </span>
            <h2 className="font-serif section-title-responsive font-light text-[#161616]">
              EDITORIAL <span className="italic font-normal text-champagne-gradient">STORIES</span>
            </h2>
          </div>
          <a href="#journal" className="text-xs tracking-[0.22em] text-[#161616] hover:text-[#B8892D] uppercase font-bold flex items-center gap-1.5 transition-colors group">
            <span>EXPLORE ALL CHRONICLES</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {ARTICLES.map((art) => (
            <article
              key={art.id}
              className="journal-article group cursor-pointer space-y-4"
            >
              <div className="relative h-64 sm:h-72 w-full rounded-[18px] overflow-hidden bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.09)] group-hover:border-[#B8892D]/40 group-hover:-translate-y-1.5 transition-all duration-500">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4 bg-[#111111]/90 backdrop-blur-md text-[#F8F6F2] px-3.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold shadow-md border border-white/10">
                  {art.category}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-[#666666] font-semibold uppercase">
                  {art.date}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#161616] font-light group-hover:text-[#B8892D] transition-colors leading-snug tracking-tight">
                  {art.title}
                </h3>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}



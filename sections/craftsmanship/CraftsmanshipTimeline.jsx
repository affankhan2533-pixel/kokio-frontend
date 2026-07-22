'use client';

import { motion } from 'framer-motion';
import { History, CheckCircle2 } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

const TIMELINE = [
  {
    year: '1926',
    title: 'The Original Aerospace Forging',
    desc: 'The house of Kokio introduces hydraulic pressure aluminum forming for aviation pioneers in Paris.',
  },
  {
    year: '1984',
    title: 'Tuscan Vachetta Handle Integration',
    desc: 'Hand-stitched full-grain Italian leather grips introduced for ergonomic continental carriage.',
  },
  {
    year: '2012',
    title: 'Whisper-Glide Bearing Revolution',
    desc: 'Japanese dual ball-bearing spinner wheels replace standard casters for silent airport transit.',
  },
  {
    year: '2026',
    title: 'The Monolith Series Launch',
    desc: 'Flush zinc-alloy TSA security latches and 18-micron anodized coating set a new global benchmark.',
  },
];

export default function CraftsmanshipTimeline() {
  const containerRef = useGsapReveal({ childrenSelector: '.timeline-item', y: 35, stagger: 0.15 });

  return (
    <section ref={containerRef} className="section-padding bg-[#EFEAE2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
          <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center justify-center gap-2">
            <History className="w-4 h-4 text-[#B8892D]" />
            CHRONOLOGY OF INNOVATION
          </span>
          <h2 className="font-serif section-title-responsive font-light text-[#161616]">
            CRAFTSMANSHIP <span className="italic font-normal text-champagne-gradient">TIMELINE</span>
          </h2>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-[#B8892D]/40 ml-4 md:ml-32 space-y-12 pl-8">
          {TIMELINE.map((item, idx) => (
            <div
              key={item.year}
              className="timeline-item relative group"
            >
              {/* Year Marker */}
              <div className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-[#111111] text-[#F8F6F2] font-serif text-xs flex items-center justify-center font-bold shadow-lg border border-[#B8892D]/40 group-hover:bg-[#B8892D] group-hover:text-[#161616] transition-colors">
                {idx + 1}
              </div>

              <div className="bg-[#F8F6F2] border border-[rgba(0,0,0,0.08)] p-8 rounded-[18px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.09)] hover:border-[#B8892D]/40 transition-all duration-500 hover:-translate-y-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.25em] font-bold text-[#B8892D] uppercase">
                    YEAR {item.year}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#B8892D]" />
                </div>
                <h3 className="font-serif text-2xl text-[#161616] font-light group-hover:text-[#B8892D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#666666] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



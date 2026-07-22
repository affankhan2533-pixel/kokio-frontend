'use client';

import { Star, Quote } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

const REVIEWS = [
  {
    quote: "The Monolith carry-on survived 45 long-haul flights across Asia and Europe this year without a single latch misalignment. Pure engineering brilliance.",
    author: "MARCUS VANE",
    title: "PRINCIPAL ARCHITECT • ZURICH",
  },
  {
    quote: "The anodized aluminum finish paired with Tuscan leather grips makes it look like an architectural sculpture. Easily outperforms my TUMI and Rimowa trunks.",
    author: "ELENA ROSTOVA",
    title: "CREATIVE DIRECTOR • PARIS",
  },
  {
    quote: "Quiet wheels are essential when walking into midnight hotel check-ins. The whisper-glide bearings are silent beyond belief.",
    author: "TAKASHI SATO",
    title: "VENTURE PARTNER • TOKYO",
  },
];

export default function CustomerStories() {
  const containerRef = useGsapReveal({ childrenSelector: '.review-card', y: 35, stagger: 0.15 });

  return (
    <section ref={containerRef} className="section-padding bg-[#F8F6F2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-20 space-y-3">
          <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase block">
            THE GLOBAL VOYAGERS
          </span>
          <h2 className="font-serif section-title-responsive font-light text-[#161616]">
            TESTIMONIALS OF <span className="italic font-normal text-champagne-gradient">TRANSIT</span>
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="review-card bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] p-8 rounded-[18px] flex flex-col justify-between relative space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-[#B8892D]/40 transition-all duration-500 hover:-translate-y-1.5"
            >
              <Quote className="w-10 h-10 text-[#B8892D]/20 absolute top-6 right-6" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#B8892D]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B8892D] text-[#B8892D]" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-[#161616] font-normal italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-[rgba(0,0,0,0.08)]">
                <h4 className="font-serif text-lg text-[#161616] font-bold">{rev.author}</h4>
                <p className="text-[10px] tracking-[0.2em] text-[#666666] uppercase font-semibold mt-0.5">{rev.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



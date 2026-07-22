'use client';

import { Star, Quote } from 'lucide-react';

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

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-[#f2eee9] text-neutral-950 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-xs tracking-[0.35em] font-semibold text-neutral-950 uppercase block">
            THE GLOBAL VOYAGERS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-neutral-950">
            TESTIMONIALS OF <span className="italic font-normal text-bronze-gradient">TRANSIT</span>
          </h2>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#fcfbf9] border border-neutral-300 p-8 rounded-2xl flex flex-col justify-between relative space-y-6 shadow-sm"
            >
              <Quote className="w-8 h-8 text-neutral-300 absolute top-6 right-6" />
              
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-neutral-800 font-normal italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <h4 className="font-serif text-lg text-neutral-950 font-bold">{rev.author}</h4>
                <p className="text-[10px] tracking-wider text-neutral-600 uppercase font-semibold">{rev.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

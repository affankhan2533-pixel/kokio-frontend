'use client';

import { Instagram } from 'lucide-react';

const IMAGES = [
  '/images/monolith.png',
  '/images/iceland.png',
  '/images/duffel.png',
  '/images/craftsmanship.png',
];

export default function InstagramGallery() {
  return (
    <section className="py-28 bg-[#fcfbf9] text-neutral-950 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs tracking-[0.35em] font-semibold text-neutral-950 uppercase flex items-center gap-2 mb-2">
              <Instagram className="w-3.5 h-3.5" />
              #KOKIOVOYAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-neutral-950">
              INSTAGRAM <span className="italic font-normal text-bronze-gradient">LOOKBOOK</span>
            </h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.2em] text-neutral-950 hover:text-amber-800 uppercase font-bold transition-colors">
            FOLLOW @KOKIOVOYAGE
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {IMAGES.map((img, i) => (
            <div key={i} className="group relative h-64 rounded-xl overflow-hidden bg-neutral-200 border border-neutral-300 shadow-sm">
              <img
                src={img}
                alt={`Kokio travel moment ${i + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

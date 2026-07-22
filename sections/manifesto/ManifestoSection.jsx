'use client';

import { motion } from 'framer-motion';
import { Compass, ShieldCheck, Sparkles, Award } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

const METROLOGY_SEALS = [
  {
    icon: Compass,
    title: 'DESIGNED IN INDIA',
    desc: 'Conceived in Bengaluru & New Delhi ateliers.',
  },
  {
    icon: Award,
    title: 'PRECISION ENGINEERED',
    desc: 'Hydraulic forged 6061-T6 aerospace aluminum.',
  },
  {
    icon: ShieldCheck,
    title: 'LIFETIME CRAFTSMANSHIP',
    desc: 'Guaranteed for every mile across the globe.',
  },
];

export default function ManifestoSection() {
  const containerRef = useGsapReveal({ childrenSelector: '.manifesto-reveal', y: 35, duration: 1, start: 'top 85%' });

  return (
    <section 
      id="manifesto" 
      ref={containerRef} 
      className="section-padding bg-[#F8F6F2] text-[#161616] border-t border-[rgba(0,0,0,0.08)] relative overflow-hidden"
    >
      {/* Subtle Paper-Grain Background Texture Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(184,137,45,0.06)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 40% / 60% Asymmetric Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: 40% (Editorial Details, Badges & Seals) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            
            {/* Small Label & Growing Vertical Gold Divider Line */}
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-[2px] h-28 bg-[#B8892D] origin-top shrink-0"
              />
              <div className="space-y-2">
                <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
                  THE HOUSE OF KOKIO
                </span>
                <p className="text-[11px] tracking-[0.25em] text-[#666666] uppercase font-light">
                  HAUT VOYAGE METROLOGY ATELIER
                </p>
              </div>
            </div>

            {/* Craftsmanship Statistics & Quality Seals */}
            <div className="space-y-6 pt-4 border-t border-[rgba(0,0,0,0.08)]">
              {METROLOGY_SEALS.map((seal, idx) => {
                const IconComponent = seal.icon;
                return (
                  <div key={idx} className="manifesto-reveal flex items-start gap-4 group">
                    <div className="p-3 bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] rounded-[14px] text-[#B8892D] group-hover:bg-[#111111] group-hover:text-[#F8F6F2] transition-colors duration-300">
                      <IconComponent className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs tracking-[0.22em] font-semibold text-[#161616] uppercase">
                        {seal.title}
                      </h4>
                      <p className="text-xs text-[#666666] font-light leading-relaxed">
                        {seal.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Minimal Luxury Quality Embossed Stamp */}
            <div className="manifesto-reveal pt-4 flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#666666] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#B8892D]" />
              <span>PASSPORT GUARANTEE • MMXXVI</span>
            </div>

          </div>

          {/* Right Column: 60% (Manifesto Story, Large Editorial Statement & Signature) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Large Editorial Statement: Cormorant Garamond 52px Desktop / 30px Mobile */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="manifesto-reveal font-serif text-[30px] sm:text-[42px] lg:text-[52px] font-light leading-[1.15] tracking-tight text-[#161616]"
            >
              &ldquo;We believe travel deserves objects crafted with the same care as the journeys they accompany.&rdquo;
            </motion.blockquote>

            {/* Supporting Body Paragraph: Plus Jakarta Sans 18px */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="manifesto-reveal font-sans text-[16px] sm:text-[18px] text-[#666666] font-light leading-[1.8] tracking-wide"
            >
              Every trunk, briefcase, and weekender in our atelier is forged using 6061-T6 aerospace aluminum and hand-stitched Florentine vachetta leather. We reject mass production in favor of unyielding engineering metrology, creating travel companions designed to outlast a hundred thousand miles of transit.
            </motion.p>

            {/* Additional Secondary Editorial Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="manifesto-reveal font-sans text-[15px] text-[#666666] font-light leading-[1.8] tracking-wide"
            >
              From custom dual TSA lock latches to Japanese whisper-glide spinner bearings, every instrument is benchmarked against extreme sub-zero conditions, ensuring quiet poise from hotel suites to international runways.
            </motion.p>

            {/* Founder Signature Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="manifesto-reveal pt-8 border-t border-[rgba(0,0,0,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="font-serif italic text-3xl text-[#161616] font-normal block">
                  H. Kokio
                </span>
                <p className="text-[10px] tracking-[0.25em] text-[#666666] uppercase font-semibold">
                  FOUNDER & CHIEF CREATIVE DIRECTOR
                </p>
              </div>

              <div className="px-4 py-2 bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] rounded-full text-[10px] tracking-[0.25em] text-[#B8892D] uppercase font-semibold w-fit">
                ATELIER KOKIO • PARIS & BENGALURU
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}




'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

const MATERIALS = [
  {
    id: 'aluminum',
    title: 'Aerospace-Grade 6061-T6 Aluminum',
    desc: 'Forged under 1,200 tons of hydraulic pressure. 18-micron anodized coating delivers ultra-scratch resistance and extreme structural rigidity.',
    icon: Layers,
    stats: '1,200 Tons Pressure • 18µ Anodized',
  },
  {
    id: 'leather',
    title: 'Full-Grain Italian Vachetta Leather',
    desc: 'Sourced from century-old tanneries in Tuscany. Hand-stitched with waxed linen thread for an organic patina that ages gracefully with travel.',
    icon: Hammer,
    stats: 'Tuscan Tannery • Hand-Stitched',
  },
  {
    id: 'wheels',
    title: 'Whisper-Glide 360° Wheel Assembly',
    desc: 'Dual-ring rubber treads with precision Japanese ball bearings. Engineered for silent 360-degree gliding across cobblestone and airport terminals.',
    icon: Cpu,
    stats: 'Japanese Bearings • Silent Tread',
  },
  {
    id: 'locks',
    title: 'Flush Integrated TSA Security Latches',
    desc: 'Custom zinc-alloy dual locks recessed flush into the aluminum frame to prevent luggage carousel snagging.',
    icon: ShieldCheck,
    stats: 'Flush Zinc-Alloy • Dual TSA Lock',
  },
];

export default function MaterialsShowcase() {
  const [activeMaterial, setActiveMaterial] = useState(MATERIALS[0]);
  const containerRef = useGsapReveal({ y: 35, duration: 1 });

  return (
    <section ref={containerRef} className="section-padding bg-[#EFEAE2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-3">
          <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
            <Hammer className="w-4 h-4 text-[#B8892D]" />
            UNCOMPROMISING METROLOGY
          </span>
          <h2 className="font-serif section-title-responsive font-light text-[#161616]">
            THE ANATOMY OF <br />
            <span className="italic font-normal text-champagne-gradient">EXCELLENCE</span>
          </h2>
        </div>

        {/* Asymmetric Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Material Hotspot Visual Banner */}
          <div className="lg:col-span-6 relative rounded-[18px] overflow-hidden border border-[rgba(0,0,0,0.08)] bg-[#EFEAE2] shadow-[0_20px_50px_rgba(0,0,0,0.05)] group">
            <img
              src="/images/craftsmanship.png"
              alt="Craftsmanship detail"
              className="w-full h-[480px] md:h-[520px] object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            {/* Inset Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#F8F6F2]/95 backdrop-blur-md p-6 border border-[rgba(0,0,0,0.08)] rounded-[14px] space-y-1 shadow-xl text-[#161616]">
              <span className="text-[10px] tracking-[0.25em] text-[#B8892D] font-bold uppercase">
                SELECTED SPECIFICATION
              </span>
              <h4 className="font-serif text-xl md:text-2xl text-[#161616] font-medium">
                {activeMaterial.title}
              </h4>
              <p className="text-xs text-[#666666] font-light">
                {activeMaterial.stats}
              </p>
            </div>
          </div>

          {/* Right: Interactive Material Selector List */}
          <div className="lg:col-span-6 space-y-4">
            {MATERIALS.map((material) => {
              const Icon = material.icon;
              const isSelected = activeMaterial.id === material.id;
              return (
                <div
                  key={material.id}
                  onClick={() => setActiveMaterial(material)}
                  className={`p-6 rounded-[18px] border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#F8F6F2] border-[#B8892D]/40 shadow-xl translate-x-1'
                      : 'bg-[#EFEAE2]/60 border-[rgba(0,0,0,0.08)] hover:bg-[#F8F6F2]/80 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3.5 rounded-[14px] border ${
                      isSelected ? 'bg-[#111111] text-[#F8F6F2] border-[#111111] shadow-md' : 'bg-[#F8F6F2] border-[rgba(0,0,0,0.08)] text-[#161616]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl font-medium text-[#161616]">
                          {material.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[9px] tracking-widest text-[#161616] uppercase px-3 py-0.5 bg-[#B8892D] rounded-full font-bold shadow-sm">
                            ACTIVE SPEC
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-[#666666] font-light leading-relaxed">
                        {material.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}



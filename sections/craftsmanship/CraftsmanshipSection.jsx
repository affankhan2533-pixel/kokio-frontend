'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Layers, ShieldCheck, Cpu } from 'lucide-react';

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

export default function CraftsmanshipSection() {
  const [activeMaterial, setActiveMaterial] = useState(MATERIALS[0]);

  return (
    <section id="craftsmanship" className="py-28 bg-[#e8decb] text-neutral-950 relative overflow-hidden border-t border-neutral-300">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs tracking-[0.35em] font-semibold text-neutral-900 uppercase flex items-center gap-2">
            <Hammer className="w-3.5 h-3.5" />
            UNCOMPROMISING METROLOGY
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-neutral-950 leading-tight">
            THE ANATOMY OF <br />
            <span className="italic font-normal text-bronze-gradient">EXCELLENCE</span>
          </h2>
          <p className="text-sm text-neutral-800 font-normal leading-relaxed tracking-wide pt-2">
            Every seam, rivet, and groove is calculated to a fraction of a millimeter. Designed to endure 100,000 miles of continental transit.
          </p>
        </div>

        {/* Asymmetric Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Material Hotspot Visual Banner */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-neutral-400/80 bg-neutral-200 shadow-xl group">
            <img
              src="/images/craftsmanship.png"
              alt="Craftsmanship detail"
              className="w-full h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />

            {/* Inset Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-[#fcfbf9]/95 backdrop-blur-md p-5 border border-neutral-300 rounded-xl space-y-1 shadow-lg text-neutral-950">
              <span className="text-[10px] tracking-[0.25em] text-neutral-950 font-bold uppercase">
                SELECTED SPECIFICATION
              </span>
              <h4 className="font-serif text-xl text-neutral-950 font-medium">
                {activeMaterial.title}
              </h4>
              <p className="text-xs text-neutral-600 font-light">
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
                  className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#fcfbf9] border-neutral-950 shadow-md'
                      : 'bg-[#ded2ba]/60 border-neutral-400/60 hover:bg-[#fcfbf9]/70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg border ${
                      isSelected ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white border-neutral-300 text-neutral-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif text-xl font-medium text-neutral-950">
                          {material.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[9px] tracking-widest text-white uppercase px-2.5 py-0.5 bg-neutral-950 rounded-full font-bold">
                            ACTIVE SPEC
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-700 font-light leading-relaxed">
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

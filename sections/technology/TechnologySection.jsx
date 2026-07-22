'use client';

import { Check, X } from 'lucide-react';

const COMPARISON = [
  { feature: 'Aerospace 6061-T6 Aluminum Shell', kokio: true, polycarbonate: false, standard: false },
  { feature: 'Dual Flush Zinc-Alloy TSA Locks', kokio: true, polycarbonate: true, standard: false },
  { feature: 'Hand-Stitched Tuscan Vachetta Leather', kokio: true, polycarbonate: false, standard: false },
  { feature: 'Whisper-Glide Japanese Ball Bearing Wheels', kokio: true, polycarbonate: false, standard: false },
  { feature: 'Unconditional Lifetime Warranty', kokio: true, polycarbonate: false, standard: false },
  { feature: '1,200 Ton Hydraulic Pressure Forging', kokio: true, polycarbonate: false, standard: false },
];

export default function TechnologySection() {
  return (
    <section className="py-28 bg-[#e8decb] text-neutral-950 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="text-xs tracking-[0.35em] font-semibold text-neutral-900 uppercase block">
            MATERIAL METROLOGY MATRIX
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-neutral-950">
            ENGINEERING <span className="italic font-normal text-bronze-gradient">COMPARISON</span>
          </h2>
          <p className="text-sm text-neutral-800 font-normal leading-relaxed">
            See how Kokio aerospace-grade aluminum trunks compare against traditional polycarbonate and standard travel luggage.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] bg-[#fcfbf9] border border-neutral-300 rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr className="border-b border-neutral-300 text-xs tracking-[0.2em] uppercase text-neutral-600 bg-neutral-100">
                <th className="py-4.5 px-6 font-semibold">SPECIFICATION / FEATURE</th>
                <th className="py-4.5 px-6 font-bold text-neutral-950 bg-[#e6e1d9]">KOKIO MONOLITH</th>
                <th className="py-4.5 px-6 font-semibold">POLYCARBONATE</th>
                <th className="py-4.5 px-6 font-semibold">STANDARD LUGGAGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-sm font-light text-neutral-900">
              {COMPARISON.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-100/60 transition-colors">
                  <td className="py-4 px-6 font-medium text-neutral-950">{row.feature}</td>
                  <td className="py-4 px-6 bg-[#f2eee9] text-neutral-950 font-bold">
                    <Check className="w-5 h-5 text-neutral-950" />
                  </td>
                  <td className="py-4 px-6 text-neutral-500">
                    {row.polycarbonate ? <Check className="w-4 h-4 text-neutral-600" /> : <X className="w-4 h-4 text-neutral-400" />}
                  </td>
                  <td className="py-4 px-6 text-neutral-500">
                    {row.standard ? <Check className="w-4 h-4 text-neutral-600" /> : <X className="w-4 h-4 text-neutral-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

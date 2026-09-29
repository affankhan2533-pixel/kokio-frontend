'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const STEP_DATA = {
  1: {
    question: 'WHAT ARE YOU PACKING FOR?',
    field: 'purpose',
    options: [
      {
        id: 'Weekend',
        label: 'Weekend',
        subtitle: 'Spontaneous escapes & short getaways',
        image: '/images/duffel.png',
      },
      {
        id: 'Business Trip',
        label: 'Business Trip',
        subtitle: 'Executive meetings & urban transit',
        image: '/images/executive_briefcase.png',
      },
      {
        id: 'Long Journey',
        label: 'Long Journey',
        subtitle: 'Extended continental voyaging',
        image: '/images/monolith.png',
      },
      {
        id: 'Expedition',
        label: 'Expedition',
        subtitle: 'Rugged exploration & sub-zero climates',
        image: '/images/iceland.png',
      },
    ],
  },
  2: {
    question: 'HOW LONG WILL YOU BE AWAY?',
    field: 'duration',
    options: [
      { id: '1–3 DAYS', label: '1–3 DAYS', subtitle: 'Overnight & weekend departures' },
      { id: '4–7 DAYS', label: '4–7 DAYS', subtitle: 'Medium continental stays' },
      { id: '8–14 DAYS', label: '8–14 DAYS', subtitle: 'Two-week international itineraries' },
      { id: '14+ DAYS', label: '14+ DAYS', subtitle: 'Multi-week expeditions' },
    ],
  },
  3: {
    question: 'WHERE ARE YOU GOING?',
    field: 'destination',
    options: [
      { id: 'CITY', label: 'CITY', subtitle: 'Metropolitan streets, hotels & business hubs' },
      { id: 'INTERNATIONAL', label: 'INTERNATIONAL', subtitle: 'Cross-border long-haul aviation' },
      { id: 'COLD CLIMATE', label: 'COLD CLIMATE', subtitle: 'Sub-zero temperatures, alpine & arctic' },
      { id: 'MIXED CLIMATE', label: 'MIXED CLIMATE', subtitle: 'Multi-city varied transit conditions' },
    ],
  },
  4: {
    question: 'WHAT DO YOU PREFER?',
    field: 'preference',
    options: [
      { id: 'LIGHTWEIGHT', label: 'LIGHTWEIGHT', subtitle: 'Agile transit & effortless mobility' },
      { id: 'MAXIMUM CAPACITY', label: 'MAXIMUM CAPACITY', subtitle: 'Deep volume & dual-chamber dividers' },
      { id: 'LEATHER', label: 'LEATHER', subtitle: 'Tuscan full-grain bespoke craftsmanship' },
      { id: 'HARD CASE', label: 'HARD CASE', subtitle: 'Aerospace aluminum or titanium armor' },
    ],
  },
};

export default function JourneyStep({ step, answers, onSelect }) {
  const currentStep = STEP_DATA[step];
  if (!currentStep) return null;

  const selectedValue = answers[currentStep.field];

  return (
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6 sm:space-y-8 max-w-3xl mx-auto w-full"
    >
      {/* Question Heading */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-sans tracking-[0.25em] text-[#B8892D] uppercase font-semibold">
          STEP 0{step} OF 04
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-[#161616]">
          {currentStep.question}
        </h2>
      </div>

      {/* Options Grid */}
      <div className={`grid gap-3 sm:gap-4 ${step === 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {currentStep.options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(currentStep.field, opt.id)}
              className={`p-4 sm:p-5 rounded-xs border text-left transition-all duration-200 flex items-center justify-between cursor-pointer min-h-[64px] group ${
                isSelected
                  ? 'bg-white border-[#B8892D] shadow-xs'
                  : 'bg-white/70 hover:bg-white border-black/10 hover:border-[#B8892D]/40'
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                {opt.image && (
                  <div className="relative w-14 h-14 rounded-xs overflow-hidden bg-[#EFEAE2] shrink-0 border border-black/8">
                    <Image
                      src={opt.image}
                      alt={opt.label}
                      fill
                      className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-300"
                      sizes="56px"
                    />
                  </div>
                )}
                <div className="min-w-0 space-y-0.5">
                  <h3 className={`font-serif text-base sm:text-lg font-light ${isSelected ? 'text-[#B8892D] font-medium' : 'text-[#161616]'}`}>
                    {opt.label}
                  </h3>
                  <p className="text-xs text-[#777777] font-light font-sans leading-snug truncate sm:whitespace-normal">
                    {opt.subtitle}
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                  isSelected
                    ? 'bg-[#B8892D] border-[#B8892D] text-[#111111]'
                    : 'border-black/20 group-hover:border-[#B8892D]/60'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

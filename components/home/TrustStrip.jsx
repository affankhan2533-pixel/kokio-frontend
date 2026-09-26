'use client';

import { ShieldCheck, Truck, Sparkles, Headset } from 'lucide-react';

const TRUST_ITEMS = [
  {
    id: 'warranty',
    title: 'KOKIO CARE',
    desc: 'Global maintenance and repair services',
    icon: ShieldCheck,
  },
  {
    id: 'shipping',
    title: 'SECURE DELIVERY',
    desc: 'Insured transit for all pieces',
    icon: Truck,
  },
  {
    id: 'personalization',
    title: 'BESPOKE MONOGRAMMING',
    desc: 'Digital preview and custom detailing',
    icon: Sparkles,
  },
  {
    id: 'concierge',
    title: 'CLIENT ADVISORS',
    desc: 'Assistance with curation and details',
    icon: Headset,
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Brand Service Guarantees"
      className="w-full bg-[#EFEAE2]/60 border-y border-black/8 py-6 md:py-8 text-[#161616]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-black/10 items-center">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-center gap-3.5 px-2 lg:px-6 first:pl-0 last:pr-0"
              >
                <div className="w-9 h-9 rounded-full bg-[#161616]/5 border border-black/8 flex items-center justify-center text-[#B8892D] shrink-0">
                  <Icon className="w-4 h-4 stroke-[1.75]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-sans tracking-[0.2em] font-semibold uppercase text-[#161616]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#555555] font-light leading-snug line-clamp-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

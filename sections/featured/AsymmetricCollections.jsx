'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import { useGsapReveal } from '@hooks/useGsapReveal';

const FEATURED_PRODUCTS = [
  {
    id: 'monolith-carryon',
    name: 'The Monolith Carry-On 35L',
    subtitle: 'Aerospace-Grade Aluminum • Dual TSA Lock',
    price: '₹1,09,999',
    tag: 'SIGNATURE DROP',
    image: '/images/monolith.png',
    specs: ['Weight: 4.2 kg', 'Capacity: 35 Liters', 'Dimensions: 55 x 40 x 20 cm'],
  },
  {
    id: 'horizon-duffel',
    name: 'The Horizon Leather Weekender',
    subtitle: 'Full-Grain Italian Vachetta • Carbon Trim',
    price: '₹79,999',
    tag: 'HAND-CRAFTED',
    image: '/images/duffel.png',
    specs: ['Weight: 2.1 kg', 'Capacity: 42 Liters', 'Hand-stitched in Florence'],
  },
];

export default function AsymmetricCollections() {
  const { addItem, openCart } = useCartStore();
  const containerRef = useGsapReveal({ childrenSelector: '.collection-card', y: 40, stagger: 0.2 });

  const handleQuickAdd = (product) => {
    addItem(product);
    openCart();
  };

  return (
    <section id="collections" ref={containerRef} className="section-padding bg-[#EFEAE2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B8892D]" />
              CURATED DROPS
            </span>
            <h2 className="font-serif section-title-responsive font-light text-[#161616]">
              FEATURED <br />
              <span className="italic font-normal text-champagne-gradient">COLLECTIONS</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#666666] font-light max-w-md leading-relaxed tracking-wide">
            Precision-engineered travel instruments designed for those who navigate the globe with purpose and uncompromised style.
          </p>
        </div>

        {/* Asymmetric Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {FEATURED_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="collection-card group bg-[#F8F6F2] border border-[rgba(0,0,0,0.08)] rounded-[18px] overflow-hidden hover:border-[#B8892D]/40 transition-all duration-500 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.09)] hover:-translate-y-2"
            >
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-[#EFEAE2]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute top-5 left-5">
                  <span className="text-[9px] tracking-[0.25em] font-semibold uppercase px-3.5 py-1 bg-[#111111] text-[#F8F6F2] rounded-full shadow-md">
                    {product.tag}
                  </span>
                </div>
                <div className="absolute bottom-5 right-5">
                  <span className="font-serif text-2xl text-[#161616] font-semibold px-4 py-1.5 bg-[#F8F6F2]/95 backdrop-blur-md border border-[rgba(0,0,0,0.08)] rounded-full shadow-lg">
                    {product.price}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#161616] font-light group-hover:text-[#B8892D] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs tracking-wider text-[#666666] font-medium uppercase">
                    {product.subtitle}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-[rgba(0,0,0,0.08)]">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-[#666666] font-light">
                      <Check className="w-4 h-4 text-[#B8892D]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 flex items-center justify-end">
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="btn-primary-luxury"
                  >
                    <span>ADD TO BAG</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}



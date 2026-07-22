'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import { useGsapReveal } from '@hooks/useGsapReveal';

const BESTSELLERS = [
  {
    id: 'monolith-carryon-titanium',
    name: 'The Monolith Carry-On',
    variant: 'Titanium Silver',
    price: '₹1,09,999',
    rating: 4.9,
    reviews: 128,
    image: '/images/monolith.png',
  },
  {
    id: 'horizon-duffel-cognac',
    name: 'The Horizon Weekender',
    variant: 'Cognac Leather',
    price: '₹79,999',
    rating: 5.0,
    reviews: 94,
    image: '/images/duffel.png',
  },
  {
    id: 'monolith-trunk-onyx',
    name: 'The Extended Trunk 88L',
    variant: 'Obsidian Black',
    price: '₹1,39,999',
    rating: 4.8,
    reviews: 62,
    image: '/images/craftsmanship.png',
  },
];

export default function BestSellersEditorial() {
  const { addItem, openCart } = useCartStore();
  const containerRef = useGsapReveal({ childrenSelector: '.bestseller-card', y: 35, stagger: 0.15 });

  const handleAdd = (item) => {
    addItem(item);
    openCart();
  };

  return (
    <section id="bags" ref={containerRef} className="section-padding bg-[#EFEAE2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-3">
            <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase block">
              GLOBAL VOYAGER FAVORITES
            </span>
            <h2 className="font-serif section-title-responsive font-light text-[#161616]">
              BEST <span className="italic font-normal text-champagne-gradient">SELLERS</span>
            </h2>
          </div>
          <p className="text-xs tracking-[0.25em] text-[#666666] uppercase font-semibold">
            TESTED ACROSS 100,000 MILES
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {BESTSELLERS.map((item) => (
            <div
              key={item.id}
              className="bestseller-card group bg-[#F8F6F2] border border-[rgba(0,0,0,0.08)] rounded-[18px] overflow-hidden hover:border-[#B8892D]/40 transition-all duration-500 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.09)] hover:-translate-y-2"
            >
              <div className="relative h-72 sm:h-80 w-full bg-[#EFEAE2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute top-4 right-4 bg-[#F8F6F2]/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-[rgba(0,0,0,0.08)] flex items-center gap-1.5 text-xs text-[#161616] shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#B8892D] text-[#B8892D]" />
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-[#666666] text-[10px]">({item.reviews})</span>
                </div>
              </div>

              <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-[#161616] font-light group-hover:text-[#B8892D] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#666666] font-medium tracking-wider uppercase">
                    {item.variant}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-[rgba(0,0,0,0.08)]">
                  <span className="font-serif text-2xl text-[#161616] font-semibold">
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="p-3.5 bg-[#111111] hover:bg-[#B8892D] hover:text-[#161616] text-[#F8F6F2] rounded-full transition-all duration-300 shadow-md cursor-pointer"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
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



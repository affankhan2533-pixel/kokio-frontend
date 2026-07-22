'use client';

import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

const BESTSELLERS = [
  {
    id: 'monolith-carryon-titanium',
    name: 'The Monolith Carry-On',
    variant: 'Titanium Silver',
    price: '$1,250',
    rating: 4.9,
    reviews: 128,
    image: '/images/monolith.png',
  },
  {
    id: 'horizon-duffel-cognac',
    name: 'The Horizon Weekender',
    variant: 'Cognac Leather',
    price: '$980',
    rating: 5.0,
    reviews: 94,
    image: '/images/duffel.png',
  },
  {
    id: 'monolith-trunk-onyx',
    name: 'The Extended Trunk 88L',
    variant: 'Obsidian Black',
    price: '$1,650',
    rating: 4.8,
    reviews: 62,
    image: '/images/craftsmanship.png',
  },
];

export default function BestSellers() {
  const { addItem, openCart } = useCartStore();

  const handleAdd = (item) => {
    addItem(item);
    openCart();
  };

  return (
    <section id="bags" className="py-28 bg-[#f2eee9] text-neutral-950 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs tracking-[0.35em] font-semibold text-neutral-950 uppercase block mb-2">
              GLOBAL VOYAGER FAVORITES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-neutral-950">
              BEST <span className="italic font-normal text-bronze-gradient">SELLERS</span>
            </h2>
          </div>
          <p className="text-xs tracking-[0.2em] text-neutral-600 uppercase font-medium">
            TESTED ACROSS 100,000 MILES
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BESTSELLERS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-[#fcfbf9] border border-neutral-300 rounded-xl overflow-hidden hover:border-neutral-950 transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              {/* Product Image */}
              <div className="relative h-72 w-full bg-neutral-200 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-300 flex items-center gap-1.5 text-xs text-neutral-900 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{item.rating}</span>
                  <span className="text-neutral-500 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-neutral-950 font-light group-hover:text-amber-900 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium tracking-wider uppercase">
                    {item.variant}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                  <span className="font-serif text-2xl text-neutral-950 font-normal">
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleAdd(item)}
                    className="p-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full transition-colors cursor-pointer shadow-md"
                    aria-label="Add to Bag"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

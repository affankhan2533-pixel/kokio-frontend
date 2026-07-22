'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Check } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';

const FEATURED_PRODUCTS = [
  {
    id: 'monolith-carryon',
    name: 'The Monolith Carry-On 35L',
    subtitle: 'Aerospace-Grade Aluminum • Dual TSA Lock',
    price: '$1,250',
    tag: 'SIGNATURE DROP',
    image: '/images/monolith.png',
    specs: ['Weight: 4.2 kg', 'Capacity: 35 Liters', 'Dimensions: 55 x 40 x 20 cm'],
    colors: ['#d1d5db', '#18181b', '#c5a059'],
  },
  {
    id: 'horizon-duffel',
    name: 'The Horizon Leather Weekender',
    subtitle: 'Full-Grain Italian Vachetta • Carbon Trim',
    price: '$980',
    tag: 'HAND-CRAFTED',
    image: '/images/duffel.png',
    specs: ['Weight: 2.1 kg', 'Capacity: 42 Liters', 'Hand-stitched in Florence'],
    colors: ['#3f2314', '#18181b'],
  },
];

export default function FeaturedCollection() {
  const { addItem, openCart } = useCartStore();

  const handleQuickAdd = (product) => {
    addItem(product);
    openCart();
  };

  return (
    <section id="collections" className="py-28 bg-[#f2eee9] text-neutral-950 relative overflow-hidden border-t border-neutral-300/80">
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs tracking-[0.35em] font-semibold text-neutral-950 uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              CURATED ESSENTIALS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 leading-tight">
              THE MONOLITH <br />
              <span className="italic text-bronze-gradient font-normal">SERIES</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-600 font-light max-w-md leading-relaxed tracking-wide">
            Precision-engineered travel instruments designed for those who navigate the globe with purpose and uncompromised style.
          </p>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="group bg-[#fcfbf9] border border-neutral-300 rounded-2xl overflow-hidden hover:border-neutral-950 transition-all duration-500 flex flex-col justify-between shadow-sm"
            >
              
              {/* Product Visual Container */}
              <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Badge */}
                <div className="absolute top-5 left-5">
                  <span className="text-[9px] tracking-[0.25em] font-semibold uppercase px-3.5 py-1 bg-neutral-950 text-white rounded-full">
                    {product.tag}
                  </span>
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-5 right-5">
                  <span className="font-serif text-2xl text-neutral-950 font-normal px-4 py-1.5 bg-white/90 backdrop-blur-md border border-neutral-300 rounded-full shadow-md">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Product Info Content */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-light group-hover:text-amber-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs tracking-wider text-neutral-500 font-medium uppercase">
                    {product.subtitle}
                  </p>
                </div>

                {/* Specs List */}
                <div className="space-y-2 pt-2 border-t border-neutral-200">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 font-light">
                      <Check className="w-3.5 h-3.5 text-neutral-950" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Quick Add Button */}
                <div className="pt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-inner"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xs text-xs tracking-[0.2em] font-bold uppercase transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <span>ADD TO BAG</span>
                    <ArrowUpRight className="w-4 h-4" />
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

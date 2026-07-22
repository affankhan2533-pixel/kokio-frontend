'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ShoppingBag, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';
import { useCartStore } from '@store/useCartStore';

const CATEGORIES = ['ALL VOYAGES', 'SCHOOL & TECH', 'COLLEGE & URBAN', 'TOURIST & EXPEDITION', 'BESPOKE & ACCESSORIES'];

const GALLERY_ITEMS = [
  {
    id: 'school-backpack-v2',
    category: 'SCHOOL & TECH',
    title: 'Executive School & Tech Backpack',
    subtitle: 'Water-resistant Italian Vachetta • TSA Laptop Vault',
    price: '₹18,999',
    tag: 'STUDENT & TECH',
    image: '/images/school_backpack.png',
    span: 'col-span-1 md:col-span-2 row-span-2 min-h-[420px]',
  },
  {
    id: 'college-commuter-bag',
    category: 'COLLEGE & URBAN',
    title: 'Urban College Messenger & Tote',
    subtitle: 'Full-Grain Tuscan Leather • Expandable 28L',
    price: '₹24,999',
    tag: 'CAMPUS CLASSIC',
    image: '/images/college_bag.png',
    span: 'col-span-1 row-span-1 min-h-[300px]',
  },
  {
    id: 'tourist-expedition-set',
    category: 'TOURIST & EXPEDITION',
    title: 'Grand Tourist Expedition Luggage Set',
    subtitle: 'Dual Spinner Wheels • Weatherproof Carbon Frame',
    price: '₹89,999',
    tag: 'VOYAGER FAVORITE',
    image: '/images/tourist_bag.png',
    span: 'col-span-1 row-span-1 min-h-[300px]',
  },
  {
    id: 'executive-briefcase-v1',
    category: 'COLLEGE & URBAN',
    title: 'Florentine Executive Leather Briefcase',
    subtitle: 'Polished Brass Hardware • Padded Laptop Core',
    price: '₹34,999',
    tag: 'EXECUTIVE',
    image: '/images/executive_briefcase.png',
    span: 'col-span-1 md:col-span-2 row-span-1 min-h-[300px]',
  },
  {
    id: 'titanium-spinner-trunk',
    category: 'TOURIST & EXPEDITION',
    title: 'The Apex Titanium Spinner Trunk 88L',
    subtitle: 'Brushed Titanium Finish • Flush Security Lock',
    price: '₹1,49,999',
    tag: 'FLAGSHIP TRUNK',
    image: '/images/titanium_trunk.png',
    span: 'col-span-1 row-span-1 min-h-[300px]',
  },
  {
    id: 'crossbody-sling-bag',
    category: 'SCHOOL & TECH',
    title: 'Apex Carbon Crossbody Sling Bag',
    subtitle: 'Carbon Fiber Trim • Weatherproof Zip',
    price: '₹14,999',
    tag: 'URBAN SLING',
    image: '/images/crossbody_sling.png',
    span: 'col-span-1 row-span-1 min-h-[300px]',
  },
  {
    id: 'monolith-carryon-gallery',
    category: 'TOURIST & EXPEDITION',
    title: 'The Monolith Carry-On 35L',
    subtitle: 'Aerospace 6061-T6 Aluminum Shell',
    price: '₹1,09,999',
    tag: 'SIGNATURE DROP',
    image: '/images/monolith.png',
    span: 'col-span-1 md:col-span-2 row-span-1 min-h-[300px]',
  },
  {
    id: 'passport-folio-v1',
    category: 'BESPOKE & ACCESSORIES',
    title: 'Bespoke Passport Folio & Travel Wallet',
    subtitle: 'Hand-stitched Tuscan Leather • Gold Monogram',
    price: '₹12,999',
    tag: 'BESPOKE',
    image: '/images/passport_folio.png',
    span: 'col-span-1 row-span-1 min-h-[300px]',
  },
  {
    id: 'horizon-duffel-gallery',
    category: 'COLLEGE & URBAN',
    title: 'The Horizon Vachetta Weekender',
    subtitle: 'Hand-stitched Florentine Leather',
    price: '₹79,999',
    tag: 'HAND-CRAFTED',
    image: '/images/duffel.png',
    span: 'col-span-1 row-span-1 min-h-[300px]',
  },
  {
    id: 'iceland-expedition-gallery',
    category: 'TOURIST & EXPEDITION',
    title: 'The Continental Reykjavik Trunk',
    subtitle: 'Tested at -40°C Sub-Zero Conditions',
    price: '₹1,39,999',
    tag: 'LIMITED EDITION',
    image: '/images/iceland.png',
    span: 'col-span-1 md:col-span-2 row-span-1 min-h-[300px]',
  },
];

export default function TravelLifestyleGallery() {
  const [activeCategory, setActiveCategory] = useState('ALL VOYAGES');
  const { addItem, openCart } = useCartStore();
  const containerRef = useGsapReveal({ childrenSelector: '.gallery-card', y: 35, stagger: 0.12 });

  const filteredItems = activeCategory === 'ALL VOYAGES' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleQuickAdd = (item) => {
    addItem({
      id: item.id,
      name: item.title,
      variant: item.subtitle,
      price: item.price,
      image: item.image,
    });
    openCart();
  };

  return (
    <section id="gallery" ref={containerRef} className="section-padding bg-[#F8F6F2] text-[#161616] border-t border-[rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            <span className="text-xs md:text-sm tracking-[0.38em] font-semibold text-[#B8892D] uppercase flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#B8892D]" />
              CURATED VOYAGE GALLERY & CATALOG
            </span>
            <h2 className="font-serif section-title-responsive font-light text-[#161616]">
              LUXURY BAGS & <span className="italic font-normal text-champagne-gradient">PRODUCT CATALOG</span>
            </h2>
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#EFEAE2] p-1.5 rounded-full border border-[rgba(0,0,0,0.08)]">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] md:text-xs tracking-wider font-semibold uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#111111] text-[#F8F6F2] shadow-md'
                    : 'text-[#666666] hover:text-[#161616] hover:bg-[#F8F6F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Category Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`gallery-card group relative rounded-[18px] overflow-hidden border border-[rgba(0,0,0,0.08)] bg-[#EFEAE2] shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.09)] hover:border-[#B8892D]/40 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${item.span}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                  <span className="text-[9px] tracking-[0.25em] font-semibold uppercase px-3 py-1 bg-[#111111]/80 backdrop-blur-md text-[#F8F6F2] rounded-full border border-white/20">
                    {item.tag}
                  </span>
                  <span className="font-serif text-lg text-[#161616] font-semibold px-3.5 py-1 bg-[#F8F6F2]/95 backdrop-blur-md border border-[rgba(0,0,0,0.08)] rounded-full shadow-md">
                    {item.price}
                  </span>
                </div>

                {/* Bottom Details & Quick Add */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-3 z-10">
                  <div>
                    <span className="text-[9px] tracking-[0.3em] font-semibold text-[#B8892D] uppercase">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-light leading-snug tracking-tight text-[#F8F6F2]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#EFEAE2]/80 font-light mt-0.5 opacity-90">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-end">
                    <button
                      onClick={() => handleQuickAdd(item)}
                      className="p-3 bg-[#F8F6F2] hover:bg-[#B8892D] text-[#161616] rounded-full transition-all duration-300 shadow-md hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                      aria-label="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#161616]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}





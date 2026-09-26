'use client';

import ProductCard from '@components/plp/ProductCard';

export default function RelatedProducts({ currentProductId, products }) {
  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section aria-label="Related Products" className="border-t border-black/8 py-16 md:py-24 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        
        {/* Header */}
        <div className="border-b border-black/8 pb-4">
          <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs tracking-[0.3em] font-semibold text-[#B8892D] uppercase block">
            CURATED SELECTION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#161616]">
            YOU MAY ALSO <span className="italic font-normal text-champagne-gradient">EXPLORE</span>
          </h3>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {related.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import ProductCard from '@components/plp/ProductCard';

export default function RelatedProducts({ currentProductId, products }) {
  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section aria-label="Related Products" className="border-t border-[#EAEAEA] py-8 sm:py-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        {/* Restrained Section Header */}
        <div className="space-y-1">
          <span className="text-[10px] font-sans tracking-[0.14em] text-[#777777] uppercase font-medium block">
            RECOMMENDED SELECTION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#161616]">
            You May Also Explore
          </h3>
        </div>

        {/* 4-Column Product Grid using identical PLP ProductCard */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {related.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}

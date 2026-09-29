'use client';

export default function ProductIntelligence({ product }) {
  if (!product) return null;

  // Extract verified data strictly from catalogData.js
  const volume = product.details?.volume || product.specs?.match(/(\d+L)/)?.[1] || null;
  const weight = product.details?.weight || product.specs?.match(/([\d\.]+\s*kg)/i)?.[1] || null;
  const dimensions = product.details?.dimensions
    ? product.details.dimensions.replace(/\s*\(.*?\)/, '')
    : null;
  const material = product.material || product.materialType?.toUpperCase() || null;

  const specItems = [
    volume && { title: 'CAPACITY', value: volume },
    weight && { title: 'WEIGHT', value: weight },
    dimensions && { title: 'DIMENSIONS', value: dimensions },
    material && { title: 'MATERIAL', value: material },
  ].filter(Boolean);

  if (specItems.length === 0) return null;

  return (
    <div className="pt-6 border-t border-[#EAEAEA] space-y-3">
      {/* Restrained Section Title */}
      <div className="space-y-0.5">
        <span className="text-[10px] font-sans tracking-[0.14em] text-[#777777] uppercase font-medium block">
          AT A GLANCE
        </span>
        <h3 className="font-serif text-lg font-light text-[#161616]">
          The Piece at a Glance
        </h3>
      </div>

      {/* Clean Specification Rows sitting naturally on white page */}
      <div className="divide-y divide-[#EAEAEA] border-y border-[#EAEAEA]">
        {specItems.map((item) => (
          <div
            key={item.title}
            className="py-2.5 flex items-center justify-between text-xs"
          >
            <span className="text-[11px] font-sans tracking-[0.12em] text-[#777777] uppercase font-medium">
              {item.title}
            </span>
            <span className="font-sans text-xs font-medium text-[#161616]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

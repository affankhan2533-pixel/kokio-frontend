'use client';

export default function ProductIntelligence({ product }) {
  if (!product) return null;

  // Extract verified data from catalogData.js
  const volumeMatch = product.details?.volume?.match(/(\d+)\s*Liters/i) || product.specs?.match(/(\d+)L/i);
  const capacityNumber = volumeMatch ? `${volumeMatch[1]}L` : product.details?.volume || 'BESPOKE';
  const capacityDetail = product.details?.volume ? `Verified ${product.details.volume} interior capacity` : product.specs || 'Bespoke volume';

  const weightMatch = product.details?.weight?.match(/([\d\.]+)\s*kg/i);
  const weightNumber = weightMatch ? `${weightMatch[1]} KG` : product.details?.weight || '—';
  const weightDetail = product.details?.weight ? `Engineered tare weight (${product.details.weight})` : 'Unladen weight';

  const dimensionsNumber = product.details?.dimensions
    ? product.details.dimensions.replace(/\s*\(.*?\)/, '')
    : '—';
  const dimensionsDetail = product.details?.dimensions?.includes('Overhead')
    ? 'Overhead Bin Compliant Standard'
    : product.details?.dimensions?.includes('Trunk')
    ? 'Deep Continental Trunk Architecture'
    : 'Exterior transit measurements';

  const materialNumber = product.materialType === 'aluminum'
    ? '6061-T6'
    : product.materialType === 'titanium'
    ? 'TITANIUM'
    : product.materialType === 'leather'
    ? 'VACHETTA'
    : product.materialType?.toUpperCase() || 'BESPOKE';
  const materialDetail = product.material || 'Engineered luxury material';

  // Derived travel type guidance based strictly on verified capacity / category
  let travelTypeNumber = 'CABIN FORMAT';
  let travelTypeDetail = 'Short journeys & international overhead bins';

  if (product.category === 'trunks') {
    travelTypeNumber = 'CONTINENTAL TRUNK';
    travelTypeDetail = 'Extended multi-week voyaging & high-volume cargo';
  } else if (product.category === 'luggage') {
    travelTypeNumber = 'CHECK-IN FORMAT';
    travelTypeDetail = '5–10 days of balanced continental transit';
  } else if (product.category === 'bags') {
    travelTypeNumber = 'WEEKENDER & COMMUTE';
    travelTypeDetail = '2–4 days departures, road journeys & urban movement';
  } else if (product.category === 'accessories') {
    travelTypeNumber = 'TRANSIT ESSENTIAL';
    travelTypeDetail = 'Airport navigation, travel documents & daily essentials';
  }

  const specRows = [
    {
      title: 'CAPACITY',
      value: capacityNumber,
      label: capacityDetail,
    },
    {
      title: 'WEIGHT',
      value: weightNumber,
      label: weightDetail,
    },
    {
      title: 'DIMENSIONS',
      value: dimensionsNumber,
      label: dimensionsDetail,
    },
    {
      title: 'MATERIAL',
      value: materialNumber,
      label: materialDetail,
    },
    {
      title: 'TRAVEL TYPE',
      value: travelTypeNumber,
      label: travelTypeDetail,
    },
  ];

  return (
    <div className="pt-8 border-t border-black/8 space-y-6">
      {/* Section Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs tracking-[0.3em] text-[#B8892D] uppercase font-bold block">
          METROLOGY & SPECIFICATIONS
        </span>
        <h3 className="font-serif text-2xl font-light text-[#161616]">
          THE PIECE <span className="italic font-normal text-champagne-gradient">AT A GLANCE</span>
        </h3>
      </div>

      {/* Elegant Horizontal Specification Rows */}
      <div className="divide-y divide-black/8 border-y border-black/8">
        {specRows.map((row) => (
          <div
            key={row.title}
            className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
          >
            <div className="w-32 shrink-0">
              <span className="text-[10px] font-sans tracking-[0.14em] uppercase text-xs tracking-widest text-[#777777] uppercase font-semibold">
                {row.title}
              </span>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="font-serif text-xl sm:text-2xl font-light text-[#161616] tracking-tight">
                {row.value}
              </span>
              <span className="text-xs font-sans text-[#666666] font-light">
                {row.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

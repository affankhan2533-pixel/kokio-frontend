'use client';

export default function VariantSelector({ colors, selectedColor, onSelectColor }) {
  if (!colors || colors.length === 0) return null;

  const getColorSwatchBg = (colorName, idx) => {
    const lower = colorName.toLowerCase();
    if (lower.includes('silver') || lower.includes('arctic') || lower.includes('white')) return '#E5E5E5';
    if (lower.includes('black') || lower.includes('onyx') || lower.includes('noir') || lower.includes('espresso')) return '#1A1A1A';
    if (lower.includes('gold') || lower.includes('champagne')) return '#D4AF37';
    if (lower.includes('titanium') || lower.includes('grey') || lower.includes('slate')) return '#7A7A7A';
    if (lower.includes('brown') || lower.includes('chestnut') || lower.includes('cognac') || lower.includes('tan')) return '#7B3F00';
    return idx === 0 ? '#C0C0C0' : idx === 1 ? '#111111' : '#B8892D';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[11px] font-sans tracking-[0.12em] uppercase">
        <span className="text-[#777777]">COLOUR:</span>
        <span className="text-[#161616] font-medium">{selectedColor}</span>
      </div>

      <div className="flex items-center gap-2.5">
        {colors.map((color, idx) => {
          const isSelected = selectedColor === color;
          const bgHex = getColorSwatchBg(color, idx);

          return (
            <button
              key={color}
              type="button"
              onClick={() => onSelectColor(color)}
              aria-label={`Select ${color} finish`}
              aria-pressed={isSelected}
              className={`w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-150 ${
                isSelected
                  ? 'border border-[#B8892D] ring-1 ring-[#B8892D]'
                  : 'border border-black/15 hover:border-black/40'
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                style={{ backgroundColor: bgHex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

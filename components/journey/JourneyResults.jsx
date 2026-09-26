'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, RotateCcw, Sparkles } from 'lucide-react';
import { PRODUCTS_CATALOG } from '@lib/catalogData';

export default function JourneyResults({ answers, onRestart, onClose }) {
  // Rule-based matching against actual catalogData.js
  const scoredProducts = PRODUCTS_CATALOG.map((product) => {
    let score = 0;
    let reasons = [];

    // Purpose matching
    if (answers.purpose === 'Weekend') {
      if (product.category === 'bags' || product.category === 'carry-on') {
        score += 4;
        reasons.push('Ideal proportions for brief weekend escapes');
      }
    } else if (answers.purpose === 'Business Trip') {
      if (product.id === 'florentine-executive-briefcase' || product.category === 'carry-on') {
        score += 5;
        reasons.push('Executive cabin architecture with TSA quick access');
      }
    } else if (answers.purpose === 'Long Journey') {
      if (product.category === 'trunks' || product.category === 'luggage') {
        score += 5;
        reasons.push('High-capacity continental volume for extended travel');
      }
    } else if (answers.purpose === 'Expedition') {
      if (product.collection === 'expedition' || product.materialType === 'titanium') {
        score += 5;
        reasons.push('Engineered for extreme transit and rugged destinations');
      }
    }

    // Duration matching
    if (answers.duration === '1–3 DAYS') {
      if (product.details?.volume === '35 Liters' || product.details?.volume === '16 Liters' || product.details?.volume === '45 Liters') {
        score += 3;
      }
    } else if (answers.duration === '4–7 DAYS') {
      if (product.details?.volume === '35 Liters' || product.details?.volume === '68 Liters' || product.details?.volume === '45 Liters') {
        score += 3;
      }
    } else if (answers.duration === '8–14 DAYS' || answers.duration === '14+ DAYS') {
      if (product.details?.volume === '88 Liters' || product.details?.volume === '110 Liters' || product.details?.volume === '68 Liters') {
        score += 4;
      }
    }

    // Destination matching
    if (answers.destination === 'COLD CLIMATE') {
      if (product.id === 'iceland-subzero-trunk') {
        score += 6;
        reasons.push('Sub-zero rubber hydro-seal tested to -40°C');
      }
    } else if (answers.destination === 'INTERNATIONAL') {
      if (product.id === 'monolith-carryon-35l') {
        score += 4;
        reasons.push('Complies with international overhead bin standards');
      }
    }

    // Preference matching
    if (answers.preference === 'LEATHER') {
      if (product.materialType === 'leather') {
        score += 5;
        reasons.push('Full-grain Tuscan vachetta leather patina');
      }
    } else if (answers.preference === 'HARD CASE') {
      if (product.materialType === 'aluminum' || product.materialType === 'titanium') {
        score += 5;
        reasons.push('Hardened aerospace alloy unibody shell');
      }
    } else if (answers.preference === 'MAXIMUM CAPACITY') {
      if (product.category === 'trunks') {
        score += 5;
        reasons.push('Deep trunk architecture with dual-chamber dividers');
      }
    } else if (answers.preference === 'LIGHTWEIGHT') {
      if (product.details?.weight && parseFloat(product.details.weight) <= 4.2) {
        score += 4;
        reasons.push(`Lightweight payload specification (${product.details.weight})`);
      }
    }

    const primaryReason = reasons[0] || product.specs || product.story;

    return { product, score, primaryReason };
  });

  // Sort descending and take top 3
  const topMatches = scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#B8892D]/15 text-[#B8892D] rounded-xs text-[10px] font-sans tracking-widest uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CURATED EDIT FOR YOUR TRIP</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161616]">
          YOUR <span className="italic font-normal text-champagne-gradient">JOURNEY EDIT</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] font-light max-w-md mx-auto font-sans">
          Tailored to: <span className="text-[#161616] font-medium">{answers.purpose} • {answers.duration} • {answers.destination} • {answers.preference}</span>
        </p>
      </div>

      {/* Matched Products Grid (Max 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {topMatches.map(({ product, primaryReason }) => (
          <div
            key={product.id}
            className="group bg-white rounded-xs border border-black/8 overflow-hidden flex flex-col justify-between hover:border-[#B8892D]/40 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] bg-[#F0ECE1] overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#161616]/85 backdrop-blur-xs text-[#F8F6F2] text-[9px] font-sans uppercase tracking-wider rounded-xs">
                {product.categoryLabel}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <span className="text-[9px] font-sans text-[#888888] uppercase tracking-widest font-semibold block">
                  {product.collectionLabel}
                </span>
                <h3 className="font-serif text-base text-[#161616] font-light leading-snug group-hover:text-[#B8892D] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[11px] text-[#555555] font-light leading-relaxed pt-1 border-t border-black/6 font-sans">
                  <strong className="text-[10px] text-[#B8892D] uppercase font-semibold block">REASON:</strong>
                  {primaryReason}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="pt-3 border-t border-black/6 flex items-center justify-between">
                <span className="font-sans text-sm font-semibold text-[#161616]">
                  {product.price}
                </span>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-xs font-sans font-semibold tracking-wider uppercase text-[#B8892D] hover:underline"
                >
                  <span>EXPLORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRestart}
          className="btn-secondary-luxury"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RETAKE JOURNEY QUIZ</span>
        </button>
        <Link
          href="/collections/all"
          onClick={onClose}
          className="btn-primary-gold"
        >
          <span>BROWSE ALL PIECES</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

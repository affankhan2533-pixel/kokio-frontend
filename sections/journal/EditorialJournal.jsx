'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { gsap } from '@lib/gsap';

const FEATURED_COVER_STORY = {
  id: 'future-of-precision-travel',
  category: 'ENGINEERING & INNOVATION',
  readTime: '08 MIN READ',
  date: 'JULY 2026',
  title: 'The Future of Precision Travel',
  quote: '“True luxury is measured not by distance traveled, but by how effortlessly every journey unfolds.”',
  excerpt: 'How 6061-T6 unibody aluminum metrology, acoustic dampening, and zero-tolerance latches are quietly redefining continental movement across international air terminals.',
  cta: 'Read Cover Story',
  image: '/images/hero_bg.png',
};

const SUPPORTING_STORIES = [
  {
    id: 'inside-the-atelier',
    category: 'CRAFTSMANSHIP DOCUMENTARY',
    readTime: '06 MIN READ',
    date: 'JUNE 2026',
    title: 'Inside the Atelier',
    excerpt: 'A rare look into our Zurich metrology lab and Tuscan leather workshops where master artisans hand-stitch every seam.',
    cta: 'Read Story',
    image: '/images/craftsmanship.png',
  },
  {
    id: 'packing-as-a-philosophy',
    category: 'LUXURY TRAVEL GUIDE',
    readTime: '05 MIN READ',
    date: 'MAY 2026',
    title: 'Packing as a Philosophy',
    excerpt: 'Eliminating excess to travel light, purposeful, and with uncompromised aesthetic clarity across global capitals.',
    cta: 'Read Story',
    image: '/images/duffel.png',
  },
  {
    id: 'destinations-slow-travel',
    category: 'EDITORIAL TRAVEL STORY',
    readTime: '10 MIN READ',
    date: 'APRIL 2026',
    title: 'Destinations That Reward Slow Travel',
    excerpt: 'From Kyoto’s quiet temple gardens to the glacial solitude of Iceland’s black sand coastlines and volcanic fjords.',
    cta: 'Read Story',
    image: '/images/iceland.png',
  },
];

export default function EditorialJournal() {
  const sectionRef = useRef(null);
  const articlesRef = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      articlesRef.current.forEach((el, idx) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: idx * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journal"
      className="relative bg-[#FCFCFA] text-[#161616] py-24 md:py-36 overflow-hidden border-t border-[rgba(0,0,0,0.08)]"
      aria-label="Editorial Journal"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 pb-8 border-b border-[rgba(0,0,0,0.08)]">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B8892D]/10 border border-[#B8892D]/30 text-[#B8892D]">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-[0.3em] uppercase">
                JOURNAL
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-[38px] md:text-[52px] font-light text-[#161616] leading-tight tracking-tight">
              PERSPECTIVES BEYOND <span className="italic font-normal text-champagne-gradient">THE JOURNEY</span>
            </h2>
          </div>

          <p className="text-base text-[#555555] font-light max-w-md leading-relaxed">
            Thoughtfully curated stories exploring craftsmanship, engineering, timeless travel, and the philosophy behind every meaningful journey.
          </p>
        </div>

        {/* DESKTOP 12-COLUMN PRINT MAGAZINE LAYOUT (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT 7 COLUMNS: Dominant Hero Cover Story (70% Visual Focus) */}
          <article
            ref={(el) => (articlesRef.current[0] = el)}
            className="col-span-7 group cursor-pointer space-y-6"
          >
            {/* Cinematic Photography Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)]">
              <Image
                src={FEATURED_COVER_STORY.image}
                alt={FEATURED_COVER_STORY.title}
                fill
                sizes="60vw"
                className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#161616]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[10px] font-mono text-[#F8F6F2] tracking-widest uppercase border border-white/10">
                COVER STORY
              </div>
            </div>

            {/* Clean Metadata Hierarchy (Requirement 3) */}
            <div className="space-y-1 font-mono text-xs">
              <span className="text-[#B8892D] font-bold tracking-[0.25em] uppercase block">
                {FEATURED_COVER_STORY.category}
              </span>
              <div className="flex items-center gap-3 text-[#777777] text-[11px] tracking-widest uppercase">
                <span>{FEATURED_COVER_STORY.readTime}</span>
                <span>•</span>
                <span>{FEATURED_COVER_STORY.date}</span>
              </div>
            </div>

            {/* Title with Gold Underline Animation on Hover */}
            <div className="space-y-3">
              <div className="relative inline-block">
                <h3 className="font-serif text-3xl lg:text-4xl font-light text-[#161616] group-hover:text-[#B8892D] transition-colors leading-snug transform group-hover:-translate-y-0.5 duration-300">
                  {FEATURED_COVER_STORY.title}
                </h3>
                <div className="w-0 h-[1.5px] bg-[#B8892D] group-hover:w-full transition-all duration-400 ease-out mt-1" />
              </div>

              {/* Editorial Quote Box (Requirement 5) */}
              <div className="pt-2">
                <p className="font-serif italic text-lg text-[#B8892D] font-light leading-relaxed border-l-2 border-[#B8892D]/40 pl-4 py-1">
                  {FEATURED_COVER_STORY.quote}
                </p>
              </div>

              {/* Excerpt */}
              <p className="text-base text-[#4A4A4A] font-light leading-relaxed">
                {FEATURED_COVER_STORY.excerpt}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-2 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-[#161616] group-hover:text-[#B8892D] uppercase transition-colors">
              <span>{FEATURED_COVER_STORY.cta}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </article>

          {/* RIGHT 5 COLUMNS: Supporting Articles Separated by Thin Editorial Rules (Requirement 2) */}
          <div className="col-span-5 space-y-10">
            {SUPPORTING_STORIES.map((story, idx) => (
              <article
                key={story.id}
                ref={(el) => (articlesRef.current[idx + 1] = el)}
                className="group cursor-pointer pb-10 border-b border-[rgba(0,0,0,0.08)] last:border-none last:pb-0 space-y-4"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="40vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Clean Metadata Hierarchy */}
                <div className="space-y-0.5 font-mono text-xs">
                  <span className="text-[#B8892D] font-bold tracking-[0.2em] uppercase block">
                    {story.category}
                  </span>
                  <div className="flex items-center gap-2 text-[#777777] text-[10px] tracking-widest uppercase">
                    <span>{story.readTime}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                  </div>
                </div>

                {/* Title */}
                <div className="relative">
                  <h3 className="font-serif text-2xl font-light text-[#161616] group-hover:text-[#B8892D] transition-colors leading-snug transform group-hover:-translate-y-0.5 duration-300">
                    {story.title}
                  </h3>
                  <div className="w-0 h-[1.5px] bg-[#B8892D] group-hover:w-full transition-all duration-400 ease-out mt-1" />
                </div>

                {/* Excerpt */}
                <p className="text-sm text-[#555555] font-light leading-relaxed line-clamp-2">
                  {story.excerpt}
                </p>

                {/* CTA */}
                <div className="pt-1 inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#161616] group-hover:text-[#B8892D] uppercase transition-colors">
                  <span>{story.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </article>
            ))}
          </div>

        </div>

        {/* MOBILE MAGAZINE READING STACK (Dedicated Mobile Layout) */}
        <div className="md:hidden space-y-12">
          
          {/* Cover Story First */}
          <article className="space-y-4">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#EFEAE2]">
              <Image
                src={FEATURED_COVER_STORY.image}
                alt={FEATURED_COVER_STORY.title}
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="absolute top-3 left-3 bg-[#161616]/80 backdrop-blur-md px-3 py-1 rounded-md text-[9px] font-mono text-[#F8F6F2] tracking-widest uppercase">
                COVER STORY
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#B8892D] tracking-widest uppercase block">
                {FEATURED_COVER_STORY.category}
              </span>
              <div className="text-[10px] font-mono text-[#777777] tracking-widest uppercase">
                {FEATURED_COVER_STORY.readTime} • {FEATURED_COVER_STORY.date}
              </div>

              <h3 className="font-serif text-2xl font-light text-[#161616] leading-snug">
                {FEATURED_COVER_STORY.title}
              </h3>

              <p className="font-serif italic text-sm text-[#B8892D] border-l-2 border-[#B8892D]/40 pl-3">
                {FEATURED_COVER_STORY.quote}
              </p>

              <p className="text-xs text-[#555555] font-light leading-relaxed">
                {FEATURED_COVER_STORY.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-mono font-bold text-[#B8892D] uppercase">
                <span>{FEATURED_COVER_STORY.cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </article>

          {/* Supporting Articles Stack Separated by Thin Rules */}
          <div className="space-y-8 pt-4 border-t border-[rgba(0,0,0,0.08)]">
            {SUPPORTING_STORIES.map((story) => (
              <article key={story.id} className="space-y-3 pb-8 border-b border-[rgba(0,0,0,0.08)] last:border-none last:pb-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#EFEAE2]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#B8892D] tracking-widest uppercase block">
                    {story.category}
                  </span>
                  <div className="text-[10px] font-mono text-[#777777] tracking-widest uppercase">
                    {story.readTime} • {story.date}
                  </div>

                  <h4 className="font-serif text-xl font-light text-[#161616]">
                    {story.title}
                  </h4>

                  <p className="text-xs text-[#555555] font-light leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>

                  <div className="pt-1 flex items-center gap-1 text-xs font-mono font-bold text-[#B8892D] uppercase">
                    <span>{story.cta}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

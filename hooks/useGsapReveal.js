'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@lib/gsap';

export function useGsapReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const {
      y = 50,
      scale = 0.95,
      opacity = 0,
      duration = 1.1,
      delay = 0,
      stagger = 0.18,
      childrenSelector = null,
      start = 'top 88%',
    } = options;

    const target = childrenSelector ? el.querySelectorAll(childrenSelector) : el;
    if (!target || (target.length === 0 && childrenSelector)) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { 
          opacity, 
          y,
          scale,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          stagger: childrenSelector ? stagger : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, elementRef);

    return () => ctx.revert();
  }, [options.y, options.scale, options.opacity, options.duration, options.delay, options.stagger, options.childrenSelector, options.start]);

  return elementRef;
}


'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGsapReveal } from '@hooks/useGsapReveal';

export default function BespokeNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useGsapReveal({ y: 35, duration: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section ref={containerRef} className="section-padding bg-[#111111] text-[#F8F6F2] border-t border-[rgba(255,255,255,0.08)] relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111] border border-[#B8892D]/40 rounded-full shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#B8892D]" />
          <span className="text-[10px] md:text-xs tracking-[0.38em] uppercase font-semibold text-[#B8892D]">
            PRIVATE SHOWROOM ACCESS
          </span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif section-title-responsive font-light text-[#F8F6F2]">
            JOIN THE <span className="italic font-normal text-champagne-gradient">VOYAGER CLUB</span>
          </h2>
          <p className="text-sm md:text-base text-[#EFEAE2]/80 font-light max-w-lg mx-auto leading-relaxed">
            Receive private notifications for limited edition drop releases, bespoke monogramming invitations, and VIP showroom previews.
          </p>
        </div>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#B8892D]/10 border border-[#B8892D]/40 rounded-[14px] text-[#B8892D] text-sm shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-[#B8892D]" />
            <span>Welcome to The Voyager Club. Check your inbox for your private concierge code.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL ADDRESS"
              className="w-full px-5 py-4 bg-[#111111] border border-[rgba(255,255,255,0.15)] rounded-[14px] text-xs text-[#F8F6F2] placeholder-[#666666] focus:outline-none focus:border-[#B8892D] transition-colors tracking-wider shadow-inner"
            />
            <button
              type="submit"
              className="btn-primary-luxury w-full sm:w-auto shrink-0 group"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
}



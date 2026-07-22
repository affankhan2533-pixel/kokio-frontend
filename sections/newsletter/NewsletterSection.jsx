'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-28 bg-[#1c1c1e] text-white border-t border-neutral-800 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold text-amber-200">
            PRIVATE SHOWROOM ACCESS
          </span>
        </div>

        <div className="space-y-3">
          <h2 className="font-serif text-4xl sm:text-6xl font-light tracking-tight text-white leading-tight">
            JOIN THE <span className="italic font-normal text-gold-gradient">VOYAGER CLUB</span>
          </h2>
          <p className="text-sm text-neutral-300 font-light max-w-lg mx-auto leading-relaxed">
            Receive private notifications for limited edition drop releases, bespoke monogramming invitations, and VIP showroom previews.
          </p>
        </div>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-sm">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
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
              className="w-full px-5 py-4 bg-neutral-900 border border-neutral-700 rounded-xs text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors tracking-wider"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs tracking-[0.2em] uppercase rounded-xs transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 shrink-0 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>SUBSCRIBE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
}

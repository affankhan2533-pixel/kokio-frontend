import Link from 'next/link';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-28 px-6 md:px-12 text-center animate-kokio-fade">
        <div className="max-w-md mx-auto space-y-6">
          <span className="text-[11px] font-sans tracking-[0.25em] text-[#B8892D] uppercase font-semibold block">
            404 — LOST IN TRANSIT
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#161616] leading-tight">
            DEPARTURE NOT FOUND
          </h1>
          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed font-sans max-w-sm mx-auto">
            The requested travel piece or page cannot be located in the KOKIO archives.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="btn-primary-gold"
            >
              <span>RETURN HOME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/collections/all"
              className="btn-secondary-luxury"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <MinimalLuxuryFooter />
    </div>
  );
}

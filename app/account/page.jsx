'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Headphones, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';
import Header from '@components/navigation/Header';
import MinimalLuxuryFooter from '@components/common/MinimalLuxuryFooter';
import LoginModal from '@components/account/LoginModal';

import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'orders', label: 'ORDERS', icon: Package },
  { id: 'wishlist', label: 'WISHLIST', icon: Heart },
  { id: 'details', label: 'PERSONAL DETAILS', icon: User },
  { id: 'addresses', label: 'DELIVERY ADDRESSES', icon: MapPin },
  { id: 'advisory', label: 'CLIENT ADVISORY', icon: Headphones },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#161616] flex flex-col font-sans selection:bg-[#B8892D]/30 selection:text-[#161616]">
      {/* Universal Header */}
      <Header />

      <main className="flex-1 w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-10">
          
          {/* Breadcrumb & Page Header */}
          <div className="space-y-3 border-b border-black/8 pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-sans tracking-widest text-[#777777] uppercase">
              <Link href="/" className="hover:text-[#B8892D] transition-colors">HOME</Link>
              <span>/</span>
              <span className="text-[#161616] font-semibold">YOUR KOKIO</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#161616]">
                  YOUR <span className="italic font-normal text-champagne-gradient">KOKIO</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#666666] font-light mt-1">
                  A private space for your journeys, orders and preferences.
                </p>
              </div>

              {/* Login Modal Action */}
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn-primary-luxury min-h-[44px]"
              >
                <Lock className="w-3.5 h-3.5 text-[#B8892D]" />
                <span>SIGN IN / REGISTER</span>
              </button>
            </div>
          </div>

          {/* Not Logged In Banner / Guest Mode state */}
          {!isGuestMode && (
            <div className="bg-white rounded-xs p-6 sm:p-8 border border-black/8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-xl">
                <span className="text-xs font-sans tracking-[0.25em] text-[#B8892D] uppercase font-semibold block">
                  WELCOME TO KOKIO
                </span>
                <h2 className="font-serif text-2xl font-light text-[#161616]">
                  Sign in to access your personal space.
                </h2>
                <p className="text-xs text-[#666666] font-sans leading-relaxed">
                  Register your aerospace aluminum luggage, track insured deliveries across India, and access dedicated care support.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn-primary-gold min-h-[44px]"
                >
                  <span>SIGN IN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsGuestMode(true)}
                  className="btn-secondary-luxury min-h-[44px]"
                >
                  <span>CONTINUE AS GUEST →</span>
                </button>
              </div>
            </div>
          )}

          {/* Account Sections Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Navigation List): 4 cols on md */}
            <nav className="md:col-span-4 bg-white rounded-xs p-2 sm:p-3 border border-black/8 shadow-xs space-y-1">
              {SECTIONS.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeTab === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveTab(sec.id)}
                    className={`w-full px-4 py-3.5 rounded-xs flex items-center justify-between text-left text-xs font-sans uppercase tracking-wider transition-all duration-200 cursor-pointer min-h-[48px] ${
                      isActive
                        ? 'bg-[#161616] text-[#F8F6F2] font-semibold'
                        : 'text-[#555555] hover:text-[#161616] hover:bg-[#F8F6F2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#B8892D]' : 'text-[#888888]'}`} />
                      <span>{sec.label}</span>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-[#B8892D]' : 'text-black/20'}`} />
                  </button>
                );
              })}
            </nav>

            {/* Right Column (Section Details Display): 8 cols on md */}
            <div className="md:col-span-8 bg-white rounded-xs p-6 sm:p-8 border border-black/8 shadow-xs min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {/* ORDERS TAB */}
                  {activeTab === 'orders' && (
                    <div className="space-y-6">
                      <div className="border-b border-black/8 pb-4">
                        <h3 className="font-serif text-2xl font-light text-[#161616]">YOUR ORDERS</h3>
                        <p className="text-xs text-[#777777] font-light mt-0.5">
                          Review previous purchases, tracking numbers, and serial certifications.
                        </p>
                      </div>

                      <div className="py-12 text-center space-y-3">
                        <Package className="w-8 h-8 text-[#B8892D] stroke-[1.5] mx-auto" />
                        <p className="font-serif text-lg text-[#161616] font-light">NO ARCHIVED ORDERS FOUND</p>
                        <p className="text-xs text-[#777777] font-sans max-w-sm mx-auto">
                          Completed journeys and baggage registrations will appear here once authenticated.
                        </p>
                        <div className="pt-3">
                          <Link
                            href="/collections/all"
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F8F6F2] hover:bg-[#EFEAE2] text-[#161616] border border-black/10 rounded-lg text-xs font-sans uppercase tracking-wider font-semibold transition-colors"
                          >
                            <span>START YOUR JOURNEY</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#B8892D]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* WISHLIST TAB */}
                  {activeTab === 'wishlist' && (
                    <div className="space-y-6">
                      <div className="border-b border-black/8 pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-serif text-2xl font-light text-[#161616]">CURATED WISHLIST</h3>
                          <p className="text-xs text-[#777777] font-light mt-0.5">
                            Pieces you have marked for upcoming departures.
                          </p>
                        </div>
                        <Link
                          href="/wishlist"
                          className="text-xs font-sans text-[#B8892D] hover:underline uppercase flex items-center gap-1 font-semibold"
                        >
                          <span>VIEW FULL WISHLIST</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      <div className="p-6 bg-[#F8F6F2] rounded-xl border border-black/8 space-y-3">
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-[#B8892D]" />
                          <h4 className="font-serif text-base text-[#161616]">Access Saved Pieces</h4>
                        </div>
                        <p className="text-xs text-[#666666] leading-relaxed">
                          Your wishlist is maintained in your active session. You can explore, remove, or transfer pieces to your bag anytime.
                        </p>
                        <div className="pt-2">
                          <Link
                            href="/wishlist"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#161616] text-[#F8F6F2] hover:bg-[#333333] rounded-lg text-xs font-sans uppercase font-bold tracking-wider transition-colors"
                          >
                            OPEN WISHLIST →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PERSONAL DETAILS TAB */}
                  {activeTab === 'details' && (
                    <div className="space-y-6">
                      <div className="border-b border-black/8 pb-4">
                        <h3 className="font-serif text-2xl font-light text-[#161616]">PERSONAL DETAILS</h3>
                        <p className="text-xs text-[#777777] font-light mt-0.5">
                          Contact credentials and bespoke monogramming records.
                        </p>
                      </div>

                      <div className="space-y-4 font-sans text-xs">
                        <div className="p-4 bg-[#F8F6F2] rounded-xl border border-black/8 space-y-2">
                          <div className="flex items-center justify-between text-[#777777]">
                            <span>MEMBERSHIP STATUS</span>
                            <span className="text-[#B8892D] font-bold">KOKIO PRIVATE GUEST</span>
                          </div>
                          <div className="flex items-center justify-between text-[#777777]">
                            <span>PREFERRED REGION</span>
                            <span className="text-[#161616] font-semibold">INDIA (INR ₹)</span>
                          </div>
                          <div className="flex items-center justify-between text-[#777777]">
                            <span>FLAGSHIP MAISON</span>
                            <span className="text-[#161616] font-semibold">MUMBAI / NEW DELHI</span>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsLoginModalOpen(true)}
                          className="text-xs font-sans text-[#B8892D] hover:underline uppercase block cursor-pointer"
                        >
                          SIGN IN TO EDIT CREDENTIALS →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DELIVERY ADDRESSES TAB */}
                  {activeTab === 'addresses' && (
                    <div className="space-y-6">
                      <div className="border-b border-black/8 pb-4">
                        <h3 className="font-serif text-2xl font-light text-[#161616]">DELIVERY ADDRESSES</h3>
                        <p className="text-xs text-[#777777] font-light mt-0.5">
                          Default residential and corporate shipping destinations.
                        </p>
                      </div>

                      <div className="p-6 bg-[#F8F6F2] rounded-xl border border-black/8 space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#B8892D]" />
                          <span className="font-serif text-base text-[#161616]">Insured India Delivery Active</span>
                        </div>
                        <p className="text-xs text-[#666666] leading-relaxed">
                          All luggage and leather goods ship via insured courier across all 6-digit Indian PIN codes.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => setIsLoginModalOpen(true)}
                            className="px-5 py-2.5 bg-[#161616] text-[#F8F6F2] hover:bg-[#333333] rounded-lg text-xs font-sans uppercase font-bold tracking-wider transition-colors cursor-pointer"
                          >
                            ADD SAVED ADDRESS →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CLIENT ADVISORY TAB */}
                  {activeTab === 'advisory' && (
                    <div className="space-y-6">
                      <div className="border-b border-black/8 pb-4">
                        <h3 className="font-serif text-2xl font-light text-[#161616]">CLIENT ADVISORY</h3>
                        <p className="text-xs text-[#777777] font-light mt-0.5">
                          Direct liaison with our master craftsmen and bespoke voyage advisors.
                        </p>
                      </div>

                      <div className="p-6 bg-[#161616] text-[#F8F6F2] rounded-xl space-y-4">
                        <div className="flex items-center gap-2 text-[#B8892D]">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs font-sans uppercase tracking-[0.25em] font-semibold">
                            KOKIO CLIENT ADVISORY
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p className="font-serif text-lg font-light text-white">
                            Dedicated Client Care & Bespoke Inquiries
                          </p>
                          <p className="text-xs text-[#A0A0A0] leading-relaxed">
                            For bespoke monogramming, care services, or private appointments at our Mumbai or Paris ateliers, contact our client liaison.
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                          <div>
                            <span className="text-[#777777] block text-[10px]">EMAIL ADVISOR</span>
                            <a href="mailto:care@kokio.com" className="text-[#B8892D] hover:underline">
                              care@kokio.com
                            </a>
                          </div>
                          <div>
                            <span className="text-[#777777] block text-[10px]">FLAGSHIP DIRECT</span>
                            <span className="text-white">+91 22 6900 1926</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Minimal Luxury Footer */}
      <MinimalLuxuryFooter />
    </div>
  );
}

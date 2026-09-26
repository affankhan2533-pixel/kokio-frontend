'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Menu, X, Compass } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import { useJourneyStore } from '@store/useJourneyStore';
import { useWishlistStore } from '@store/useWishlistStore';
import AnnouncementBar from '@components/common/AnnouncementBar';
import MegaMenu from '@components/navigation/MegaMenu';
import MobileMenu from '@components/navigation/MobileMenu';
import SearchOverlay from '@components/navigation/SearchOverlay';
import CartDrawer from '@components/cart/CartDrawer';
import JourneyFinder from '@components/journey/JourneyFinder';
import CompareBar from '@components/compare/CompareBar';
import CompareModal from '@components/compare/CompareModal';

const NAV_CATEGORIES = [
  { name: 'LUGGAGE', id: 'luggage', href: '/collections/luggage' },
  { name: 'BAGS & DUFFELS', id: 'bags', href: '/collections/bags' },
  { name: 'ACCESSORIES', id: 'accessories', href: '/collections/accessories' },
  { name: 'COLLECTIONS', id: 'collections', href: '/collections/all' },
  { name: 'THE HOUSE', id: 'house', href: '/collections/all' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartItemsCount, toggleCart } = useCartStore();
  const { openJourney } = useJourneyStore();
  const { wishlistIds } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterNav = (catId) => {
    setActiveCategory(catId);
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveNav = () => {
    setMegaMenuOpen(false);
    setActiveCategory(null);
  };

  return (
    <>
      <header
        onMouseLeave={handleMouseLeaveNav}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#F8F6F2]/95 backdrop-blur-2xl border-b border-black/8 shadow-sm text-[#161616]'
            : 'bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-transparent text-[#F8F6F2]'
        }`}
      >
        {/* Top Announcement Bar */}
        <AnnouncementBar scrolled={scrolled} />

        {/* Main Header Container */}
        <div
          className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'py-3' : 'py-4 md:py-5'
          }`}
        >
          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 -ml-2 rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
              scrolled ? 'text-[#161616] hover:text-[#B8892D]' : 'text-[#F8F6F2] hover:text-[#B8892D]'
            }`}
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>

          {/* Left / Brand Logotype */}
          <div className="flex flex-col items-start shrink-0 cursor-pointer group">
            <Link href="/" className="flex flex-col items-start shrink-0 select-none">
              <span
                className={`font-serif uppercase font-light leading-none transition-colors duration-300 ${
                  scrolled ? 'text-[#161616] group-hover:text-[#B8892D]' : 'text-[#F8F6F2] group-hover:text-[#B8892D]'
                }`}
                style={{
                  fontSize: 'clamp(1.15rem, 3.5vw, 1.75rem)',
                  letterSpacing: 'clamp(0.2em, 1vw, 0.32em)',
                }}
              >
                KOKIO
              </span>
              <span
                className={`font-light uppercase tracking-[0.32em] transition-colors mt-0.5 ${
                  scrolled ? 'text-[#666666] group-hover:text-[#B8892D]' : 'text-[#EFEAE2]/80 group-hover:text-[#B8892D]'
                }`}
                style={{
                  fontSize: 'clamp(0.45rem, 1.5vw, 0.525rem)',
                }}
              >
                HAUT VOYAGE • PARIS
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (Triggers Mega Menu + Navigates to PLP) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => handleMouseEnterNav(cat.id)}
                className="relative py-2"
              >
                <Link
                  href={cat.href}
                  className={`relative text-xs tracking-[0.22em] font-medium uppercase transition-colors duration-200 py-1 flex items-center gap-1 cursor-pointer ${
                    scrolled
                      ? megaMenuOpen && activeCategory === cat.id
                        ? 'text-[#B8892D]'
                        : 'text-[#161616] hover:text-[#B8892D]'
                      : megaMenuOpen && activeCategory === cat.id
                      ? 'text-[#B8892D]'
                      : 'text-[#F8F6F2] hover:text-[#B8892D]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#B8892D] transition-all duration-300 ease-out ${
                      megaMenuOpen && activeCategory === cat.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right: Actions (Journey, Search, Wishlist, Account, Cart) */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Journey Finder Discovery CTA */}
            <button
              onClick={openJourney}
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xs border transition-all duration-200 cursor-pointer text-[10px] font-sans tracking-[0.16em] uppercase font-semibold min-h-[36px] ${
                scrolled
                  ? 'border-[#B8892D]/40 text-[#161616] hover:bg-[#B8892D] hover:text-[#111111]'
                  : 'border-[#B8892D]/50 text-[#F8F6F2] hover:bg-[#B8892D] hover:text-[#111111]'
              }`}
              aria-label="Find Your Journey"
            >
              <Compass className="w-3.5 h-3.5 text-[#B8892D]" />
              <span>FIND YOUR JOURNEY</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2.5 rounded-full transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                scrolled
                  ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10'
                  : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="Open Search Panel"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Trigger */}
            <Link
              href="/wishlist"
              className={`hidden sm:flex relative p-2.5 rounded-full transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center ${
                scrolled
                  ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10'
                  : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {mounted && wishlistIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B8892D] text-[#111111] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistIds.length}
                </span>
              )}
            </Link>

            {/* Account Trigger */}
            <Link
              href="/account"
              className={`hidden md:flex p-2.5 rounded-full transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] items-center justify-center ${
                scrolled
                  ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10'
                  : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={toggleCart}
              className={`relative p-2.5 rounded-full transition-all duration-200 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                scrolled
                  ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10'
                  : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B8892D] text-[#111111] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <MegaMenu
          isOpen={megaMenuOpen}
          activeCategory={activeCategory}
          onClose={() => setMegaMenuOpen(false)}
        />
      </header>

      {/* Search Overlay Modal */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Signature Experience: Journey Finder Modal */}
      <JourneyFinder />

      {/* Signature Experience: Compare Floating Bar & Modal */}
      <CompareBar />
      <CompareModal />

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, ArrowUpRight, X } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import SearchOverlay from '@components/navigation/SearchOverlay';
import AnnouncementBar from '@components/common/AnnouncementBar';

const CENTER_NAV_LINKS = [
  { name: 'Collections', href: '#collections' },
  { name: 'Travel Gear', href: '#gallery' },
  { name: 'Craftsmanship', href: '#craftsmanship' },
  { name: 'Journal', href: '#journal' },
  { name: 'About', href: '#manifesto' },
];

const INITIAL_WISHLIST = [
  {
    id: 'monolith-carryon',
    name: 'The Monolith Carry-On 35L',
    price: '₹1,09,999',
    image: '/images/monolith.png',
  },
  {
    id: 'horizon-duffel',
    name: 'The Horizon Leather Weekender',
    price: '₹79,999',
    image: '/images/duffel.png',
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);
  const [mounted, setMounted] = useState(false);
  const { cartItemsCount, toggleCart, addItem } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRemoveWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleMoveToBag = (item) => {
    addItem(item);
    handleRemoveWishlist(item.id);
    toggleCart();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F6F2]/90 backdrop-blur-2xl border-b border-[rgba(0,0,0,0.08)] shadow-[0_12px_40px_rgba(0,0,0,0.06)] text-[#161616]'
            : 'bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-transparent text-[#F8F6F2]'
        }`}
      >
        <AnnouncementBar scrolled={scrolled} />

        <div className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4 md:py-5'
        }`}>
          
          {/* Left: KOKIO Wordmark */}
          <div className="flex flex-col items-start shrink-0 min-w-fit cursor-pointer group">
            <a href="#" className="flex flex-col items-start shrink-0 whitespace-nowrap select-none">
              <span
                className={`font-serif uppercase font-light leading-none whitespace-nowrap shrink-0 transition-colors duration-300 ${
                  scrolled ? 'text-[#161616] group-hover:text-[#B8892D]' : 'text-[#F8F6F2] group-hover:text-[#B8892D]'
                }`}
                style={{
                  fontSize: 'clamp(1.2rem, 4.5vw, 1.875rem)',
                  letterSpacing: 'clamp(0.22em, 1.2vw, 0.35em)',
                }}
              >
                KOKIO
              </span>
              <span
                className={`font-light uppercase tracking-[0.32em] sm:tracking-[0.45em] whitespace-nowrap shrink-0 transition-colors mt-0.5 ${
                  scrolled ? 'text-[#666666] group-hover:text-[#B8892D]' : 'text-[#EFEAE2]/80 group-hover:text-[#B8892D]'
                }`}
                style={{
                  fontSize: 'clamp(0.48rem, 1.8vw, 0.5625rem)',
                }}
              >
                HAUT VOYAGE • PARIS
              </span>
            </a>
          </div>

          {/* Center: Main Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {CENTER_NAV_LINKS.map((link) => (
              <div key={link.name} className="relative py-2">
                <a
                  href={link.href}
                  className={`relative text-xs tracking-[0.22em] font-medium uppercase transition-colors duration-300 group py-1 flex items-center gap-1.5 ${
                    scrolled ? 'text-[#161616] hover:text-[#B8892D]' : 'text-[#F8F6F2] hover:text-[#B8892D]'
                  }`}
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B8892D] group-hover:w-full transition-all duration-300 ease-out" />
                </a>
              </div>
            ))}
          </nav>

          {/* Right: Search, Wishlist, Account, Cart */}
          <div className="flex items-center space-x-3 md:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                scrolled ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10' : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="Open Search Panel"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setWishlistOpen(true)}
              className={`relative p-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                scrolled ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10' : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {mounted && wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#B8892D] text-[#161616] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Account Trigger */}
            <a
              href="#account"
              className={`hidden sm:flex p-2.5 rounded-full transition-all duration-300 ${
                scrolled ? 'text-[#161616] hover:text-[#B8892D] hover:bg-[#B8892D]/10' : 'text-[#F8F6F2] hover:text-[#B8892D] hover:bg-white/10'
              }`}
              aria-label="User Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 bg-[#B8892D] text-[#161616] hover:bg-[#111111] hover:text-[#F8F6F2] hover:scale-105 active:scale-95 rounded-full transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#111111] text-[#F8F6F2] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md border border-[#B8892D]">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Animated Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#161616] hover:text-[#B8892D] transition-colors focus:outline-none cursor-pointer ml-1"
              aria-label="Toggle Navigation Drawer"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-0.5 rounded-full origin-center block ${scrolled ? 'bg-[#161616]' : 'bg-[#F8F6F2]'}`}
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-full h-0.5 rounded-full block ${scrolled ? 'bg-[#161616]' : 'bg-[#F8F6F2]'}`}
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-0.5 rounded-full origin-center block ${scrolled ? 'bg-[#161616]' : 'bg-[#F8F6F2]'}`}
                />
              </div>
            </button>

          </div>

        </div>

        {/* Independent Full-Screen Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-0 bg-[#F8F6F2] text-[#161616] z-50 lg:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
            >
              {/* Top Mobile Bar */}
              <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] pb-4">
                <span className="font-serif tracking-[0.35em] text-2xl font-light text-[#161616] whitespace-nowrap shrink-0">
                  KOKIO
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#161616] hover:text-[#B8892D] rounded-full cursor-pointer"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Large Typography Navigation List */}
              <div className="py-8 space-y-6 flex-1">
                {CENTER_NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.07 }}
                    className="border-b border-[rgba(0,0,0,0.06)] pb-4"
                  >
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-2xl sm:text-3xl font-serif font-light text-[#161616] cursor-pointer hover:text-[#B8892D] transition-colors"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-[#B8892D]" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Sticky Bottom Actions Bar */}
              <div className="pt-6 border-t border-[rgba(0,0,0,0.08)] grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex flex-col items-center justify-center gap-1 p-3 bg-[#EFEAE2] rounded-[14px] text-xs font-semibold text-[#161616] cursor-pointer border border-[rgba(0,0,0,0.08)]"
                >
                  <Search className="w-4 h-4 text-[#B8892D]" />
                  <span>SEARCH</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setWishlistOpen(true);
                  }}
                  className="relative flex flex-col items-center justify-center gap-1 p-3 bg-[#EFEAE2] rounded-[14px] text-xs font-semibold text-[#161616] cursor-pointer border border-[rgba(0,0,0,0.08)]"
                >
                  <Heart className="w-4 h-4 text-[#B8892D]" />
                  <span>WISHLIST ({wishlistItems.length})</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    toggleCart();
                  }}
                  className="flex flex-col items-center justify-center gap-1 p-3 bg-[#111111] text-[#F8F6F2] rounded-[14px] text-xs font-semibold uppercase cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4 text-[#B8892D]" />
                  <span>CART ({cartItemsCount})</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Wishlist Drawer Overlay */}
        <AnimatePresence>
          {wishlistOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setWishlistOpen(false)}
                className="fixed inset-0 bg-[#111111]/70 backdrop-blur-md z-50"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#F8F6F2] text-[#161616] z-50 p-8 flex flex-col justify-between border-l border-[rgba(0,0,0,0.08)] shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[rgba(0,0,0,0.08)] pb-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-[#B8892D]" />
                      <h3 className="font-serif text-2xl text-[#161616] font-light">YOUR WISHLIST</h3>
                    </div>
                    <button
                      onClick={() => setWishlistOpen(false)}
                      className="p-2 text-[#666666] hover:text-[#161616] rounded-full cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {wishlistItems.length === 0 ? (
                    <div className="text-center py-16 space-y-3 text-[#666666]">
                      <Heart className="w-12 h-12 stroke-[1] text-[#B8892D] mx-auto opacity-50" />
                      <p className="text-sm font-light">Your wishlist is currently empty.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] rounded-[14px] shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                              <h4 className="font-serif text-base text-[#161616] font-light">{item.name}</h4>
                              <p className="text-xs text-[#B8892D] font-semibold mt-0.5">{item.price}</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleMoveToBag(item)}
                              className="px-3 py-1.5 bg-[#111111] text-[#F8F6F2] hover:bg-[#B8892D] hover:text-[#161616] rounded-full text-[10px] tracking-wider font-semibold uppercase transition-colors"
                            >
                              ADD TO BAG
                            </button>
                            <button
                              onClick={() => handleRemoveWishlist(item.id)}
                              className="text-[10px] text-[#666666] hover:text-red-600 tracking-wider uppercase font-semibold text-center"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {wishlistItems.length > 0 && (
                  <div className="pt-6 border-t border-[rgba(0,0,0,0.08)]">
                    <button
                      onClick={() => {
                        wishlistItems.forEach(item => addItem(item));
                        setWishlistItems([]);
                        setWishlistOpen(false);
                        toggleCart();
                      }}
                      className="btn-primary-luxury w-full"
                    >
                      <span>MOVE ALL TO BAG</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay Search Panel */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}




'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, ChevronRight, ChevronDown, Sparkles, ArrowUpRight, X } from 'lucide-react';
import { useCartStore } from '@store/useCartStore';
import SearchOverlay from '@components/navigation/SearchOverlay';
import AnnouncementBar from '@components/common/AnnouncementBar';

const CENTER_NAV_LINKS = [
  { name: 'Collections', href: '#collections', megaMenu: 'collections' },
  { name: 'Travel Gear', href: '#gallery', megaMenu: 'gear' },
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

const EDITORIAL_MEGA_MENU_DATA = {
  collections: {
    hero: {
      tag: 'CAMPAIGN MMXXVI',
      title: 'THE ICELAND EXPEDITION',
      desc: 'Tested at -40°C sub-zero extreme environments. Engineered aerospace-grade trunks.',
      image: '/images/iceland.png',
    },
    categories: [
      {
        title: 'SIGNATURE TRUNKS',
        items: [
          { name: 'The Monolith Carry-On 35L', desc: 'Aerospace aluminum, 35L capacity', tag: 'BESTSELLER' },
          { name: 'The Apex Titanium Spinner 88L', desc: 'Brushed titanium frame, 88L', tag: 'NEW' },
        ],
      },
      {
        title: 'LEATHER INSTRUMENTS',
        items: [
          { name: 'The Horizon Weekender Duffel', desc: 'Full-grain Vachetta Italian leather', tag: 'CRAFT' },
          { name: 'Florentine Executive Briefcase', desc: 'Water-resistant brass hardware', tag: 'NEW' },
        ],
      },
    ],
    featuredProduct: {
      name: 'The Monolith Carry-On 35L',
      price: '₹1,09,999',
      image: '/images/monolith.png',
      cta: 'DISCOVER MONOLITH',
    },
  },
  gear: {
    hero: {
      tag: 'METROLOGY LAB',
      title: 'PRECISION GEAR & ACCESSORIES',
      desc: 'Waterproof carbon fiber slings, leather passport folios, and TSA vault locks.',
      image: '/images/craftsmanship.png',
    },
    categories: [
      {
        title: 'URBAN COMMUTER',
        items: [
          { name: 'Executive School & Tech Backpack', desc: 'Italian Vachetta, TSA laptop core', tag: 'ESSENTIAL' },
          { name: 'Urban College Messenger & Tote', desc: 'Full-grain Tuscan leather, 28L', tag: 'POPULAR' },
        ],
      },
      {
        title: 'BESPOKE ACCESSORIES',
        items: [
          { name: 'Bespoke Passport Folio Wallet', desc: 'Hand-stitched leather, gold monogram', tag: 'BESPOKE' },
          { name: 'Apex Carbon Crossbody Sling Bag', desc: 'Weatherproof zips, carbon fiber', tag: 'NEW' },
        ],
      },
    ],
    featuredProduct: {
      name: 'Bespoke Passport Folio Wallet',
      price: '₹12,999',
      image: '/images/passport_folio.png',
      cta: 'EXPLORE BESPOKE',
    },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenuKey, setActiveMegaMenuKey] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);
  const [mobileAccordionKey, setMobileAccordionKey] = useState(null);
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

  const currentMegaMenu = activeMegaMenuKey ? EDITORIAL_MEGA_MENU_DATA[activeMegaMenuKey] : null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#F8F6F2]/90 backdrop-blur-2xl border-b border-[rgba(0,0,0,0.08)] shadow-[0_12px_40px_rgba(0,0,0,0.06)] text-[#161616]'
            : 'bg-gradient-to-b from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-transparent text-[#F8F6F2]'
        }`}
        onMouseLeave={() => setActiveMegaMenuKey(null)}
      >
        <AnnouncementBar scrolled={scrolled} />

        <div className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4 md:py-5'
        }`}>
          
          {/* Left: KOKIO Wordmark */}
          <div className="flex flex-col items-start cursor-pointer group">
            <a href="#" className="flex flex-col items-start">
              <span className={`font-serif tracking-[0.35em] text-2xl md:text-3xl font-light transition-colors duration-300 ${
                scrolled ? 'text-[#161616] group-hover:text-[#B8892D]' : 'text-[#F8F6F2] group-hover:text-[#B8892D]'
              }`}>
                K O K I O
              </span>
              <span className={`text-[8px] md:text-[9px] tracking-[0.45em] font-light uppercase -mt-0.5 transition-colors ${
                scrolled ? 'text-[#666666] group-hover:text-[#B8892D]' : 'text-[#EFEAE2]/80 group-hover:text-[#B8892D]'
              }`}>
                HAUT VOYAGE • PARIS
              </span>
            </a>
          </div>

          {/* Center: Main Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {CENTER_NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative py-2"
                onMouseEnter={() => link.megaMenu ? setActiveMegaMenuKey(link.megaMenu) : setActiveMegaMenuKey(null)}
              >
                <a
                  href={link.href}
                  className={`relative text-xs tracking-[0.22em] font-medium uppercase transition-colors duration-300 group py-1 flex items-center gap-1.5 ${
                    scrolled ? 'text-[#161616] hover:text-[#B8892D]' : 'text-[#F8F6F2] hover:text-[#B8892D]'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.megaMenu && <ChevronDown className="w-3 h-3 text-[#B8892D] group-hover:rotate-180 transition-transform duration-300" />}
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

        {/* Editorial Mega Menu Panel */}
        <AnimatePresence>
          {currentMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute left-0 right-0 top-full bg-[#F8F6F2]/98 backdrop-blur-3xl border-b border-[rgba(0,0,0,0.08)] shadow-2xl py-12 px-12 z-50 text-[#161616]"
              onMouseEnter={() => setActiveMegaMenuKey(activeMegaMenuKey)}
              onMouseLeave={() => setActiveMegaMenuKey(null)}
            >
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-10">
                
                {/* Left Column: Editorial Campaign Card */}
                <div className="col-span-4 bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] rounded-[18px] overflow-hidden flex flex-col justify-between relative group">
                  <div className="relative h-48 w-full overflow-hidden bg-[#111111]">
                    <img
                      src={currentMegaMenu.hero.image}
                      alt={currentMegaMenu.hero.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[9px] tracking-[0.25em] font-semibold text-[#F8F6F2] uppercase px-3 py-1 bg-[#111111]/80 backdrop-blur-md rounded-full border border-white/20">
                        {currentMegaMenu.hero.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-serif text-xl font-light text-[#161616] leading-snug">
                      {currentMegaMenu.hero.title}
                    </h3>
                    <p className="text-xs text-[#666666] font-light leading-relaxed">
                      {currentMegaMenu.hero.desc}
                    </p>
                  </div>
                </div>

                {/* Center Column: Categories */}
                <div className="col-span-5 grid grid-cols-2 gap-8">
                  {currentMegaMenu.categories.map((cat, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-[10px] tracking-[0.3em] font-semibold text-[#B8892D] uppercase border-b border-[rgba(0,0,0,0.08)] pb-2">
                        {cat.title}
                      </h4>
                      <div className="space-y-3">
                        {cat.items.map((item, i) => (
                          <a
                            key={i}
                            href="#gallery"
                            onClick={() => setActiveMegaMenuKey(null)}
                            className="group block space-y-1 p-2 rounded-[12px] hover:bg-[#EFEAE2] transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-[#161616] group-hover:text-[#B8892D] transition-colors">
                                {item.name}
                              </span>
                              {item.tag && (
                                <span className="text-[8px] tracking-widest px-1.5 py-0.5 bg-[#B8892D] text-[#161616] rounded-xs font-bold uppercase">
                                  {item.tag}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#666666] font-light">
                              {item.desc}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Featured Product Card */}
                <div className="col-span-3 bg-[#EFEAE2] border border-[rgba(0,0,0,0.08)] rounded-[18px] p-6 flex flex-col justify-between text-center relative group">
                  <div className="h-40 w-full overflow-hidden rounded-[12px] bg-[#F8F6F2] mb-3">
                    <img
                      src={currentMegaMenu.featuredProduct.image}
                      alt={currentMegaMenu.featuredProduct.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg text-[#161616] font-light">
                      {currentMegaMenu.featuredProduct.name}
                    </h4>
                    <p className="font-serif text-base text-[#161616] font-semibold">
                      {currentMegaMenu.featuredProduct.price}
                    </p>
                  </div>
                  <a
                    href="#gallery"
                    onClick={() => setActiveMegaMenuKey(null)}
                    className="btn-primary-luxury mt-4 text-[11px] py-3 w-full"
                  >
                    <span>{currentMegaMenu.featuredProduct.cta}</span>
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                <span className="font-serif tracking-[0.35em] text-2xl font-light text-[#161616]">
                  K O K I O
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#161616] hover:text-[#B8892D] rounded-full cursor-pointer"
                  aria-label="Close mobile menu"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Large Typography Navigation List with Accordions */}
              <div className="py-8 space-y-6 flex-1">
                {CENTER_NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.07 }}
                    className="border-b border-[rgba(0,0,0,0.06)] pb-4"
                  >
                    <div
                      onClick={() => {
                        if (link.megaMenu) {
                          setMobileAccordionKey(mobileAccordionKey === link.megaMenu ? null : link.megaMenu);
                        } else {
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="flex items-center justify-between text-2xl sm:text-3xl font-serif font-light text-[#161616] cursor-pointer hover:text-[#B8892D] transition-colors"
                    >
                      <span>{link.name}</span>
                      {link.megaMenu ? (
                        <ChevronDown className={`w-5 h-5 text-[#B8892D] transition-transform ${mobileAccordionKey === link.megaMenu ? 'rotate-180' : ''}`} />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-[#B8892D]" />
                      )}
                    </div>

                    {/* Expandable Accordion */}
                    {link.megaMenu && mobileAccordionKey === link.megaMenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 space-y-3 pl-4"
                      >
                        {EDITORIAL_MEGA_MENU_DATA[link.megaMenu].categories[0].items.map((sub, i) => (
                          <a
                            key={i}
                            href="#gallery"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm font-sans font-light text-[#666666] hover:text-[#B8892D]"
                          >
                            • {sub.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
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




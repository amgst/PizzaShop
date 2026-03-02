import React, { useRef, useEffect, useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, Search, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

export const Navbar = () => {
  const { totalItems, setIsCartOpen, customerUser, logoutCustomer } = useCart();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const prevTotalRef = useRef(totalItems);
  const [bump, setBump] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (totalItems > prevTotalRef.current) {
      setBump(true);
      setShowToast(true);
      const bumpTimer = setTimeout(() => setBump(false), 400);
      const toastTimer = setTimeout(() => setShowToast(false), 1800);
      prevTotalRef.current = totalItems;
      return () => { clearTimeout(bumpTimer); clearTimeout(toastTimer); };
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  const handleOrderNow = () => {
    const menuSection = document.getElementById('menu');
    menuSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsCartOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleMobileNav = (sectionId: 'menu' | 'about') => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-2xl px-6 py-3 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isSearchOpen ? (
            <motion.div
              key="nav-content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-display tracking-tighter text-brand-orange cursor-pointer"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  PIZZA<span className="text-brand-dark">SHOP</span>
                </motion.div>

                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <a href="#menu" className="hover:text-brand-orange transition-colors">Menu</a>
                  <a href="#about" className="hover:text-brand-orange transition-colors">About</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
                >
                  <Search size={20} />
                </button>
                <div className="relative">
                  <motion.button
                    onClick={() => setIsCartOpen(true)}
                    animate={bump ? { scale: [1, 1.35, 1], rotate: [0, -12, 12, 0] } : { scale: 1 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors relative"
                  >
                    <ShoppingBag size={20} />
                    <AnimatePresence>
                      {totalItems > 0 && (
                        <motion.span
                          key={totalItems}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                          className="absolute top-1 right-1 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full"
                        >
                          {totalItems}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Added toast */}
                  <AnimatePresence>
                    {showToast && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.85 }}
                        animate={{ opacity: 1, y: -8, scale: 1 }}
                        exit={{ opacity: 0, y: -16, scale: 0.85 }}
                        transition={{ duration: 0.25 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none"
                      >
                        +1 Added!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="md:hidden p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
                  aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                </button>
                <button
                  onClick={handleOrderNow}
                  className="hidden md:block bg-brand-dark text-white px-6 py-2 rounded-xl font-medium hover:bg-brand-orange transition-all active:scale-95"
                >
                  Order Now
                </button>
                <div className="hidden md:block relative">
                  {customerUser ? (
                    <>
                      <button
                        onClick={() => setIsUserMenuOpen((prev) => !prev)}
                        className="bg-brand-light text-brand-dark px-4 py-2 rounded-xl font-medium hover:bg-brand-dark hover:text-white transition-all flex items-center gap-2"
                      >
                        <User size={16} />
                        Account
                      </button>
                      <AnimatePresence>
                        {isUserMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            className="absolute right-0 mt-2 w-64 bg-white border border-brand-dark/10 rounded-2xl shadow-xl p-3 z-20"
                          >
                            <p className="text-xs text-brand-dark/50 mb-2">Signed in as</p>
                            <p className="text-sm font-bold text-brand-dark truncate mb-3">{customerUser.email}</p>
                            <button
                              onClick={async () => {
                                await logoutCustomer();
                                setIsUserMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-light text-sm font-medium"
                            >
                              Logout
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsCartOpen(true)}
                      className="bg-brand-light text-brand-dark px-4 py-2 rounded-xl font-medium hover:bg-brand-dark hover:text-white transition-all"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-bar"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center w-full gap-4"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/40" size={20} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pizza, burgers, pasta..."
                  className="w-full bg-brand-light border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-brand-orange transition-all font-medium"
                />
              </div>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-3 bg-brand-dark text-white rounded-xl hover:bg-brand-orange transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && !isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden max-w-7xl mx-auto mt-3 glass-card rounded-2xl p-4"
          >
            <div className="flex flex-col gap-2 text-sm font-medium">
              <button
                onClick={() => handleMobileNav('menu')}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-brand-dark/5 transition-colors"
              >
                Menu
              </button>
              <button
                onClick={() => handleMobileNav('about')}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-brand-dark/5 transition-colors"
              >
                About
              </button>
              <button
                onClick={handleOrderNow}
                className="w-full text-left px-4 py-3 rounded-xl bg-brand-dark text-white hover:bg-brand-orange transition-colors"
              >
                Order Now
              </button>
              {customerUser ? (
                <>
                  <div className="px-4 pt-2 text-xs text-brand-dark/50">Signed in as</div>
                  <div className="px-4 text-sm font-bold truncate">{customerUser.email}</div>
                  <button
                    onClick={async () => {
                      await logoutCustomer();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-brand-dark/5 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-brand-dark/5 transition-colors"
                >
                  Sign Up / Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

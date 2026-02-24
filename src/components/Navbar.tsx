import React, { useRef, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

export const Navbar = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

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
                  SECOND<span className="text-brand-dark">SLICE</span>
                </motion.div>
                
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <a href="#menu" className="hover:text-brand-orange transition-colors">Menu</a>
                  <a href="#about" className="hover:text-brand-orange transition-colors">About</a>
                  <a href="#locations" className="hover:text-brand-orange transition-colors">Locations</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
                >
                  <Search size={20} />
                </button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors relative"
                >
                  <ShoppingBag size={20} />
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-1 right-1 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <button className="md:hidden p-2 hover:bg-brand-dark/5 rounded-full transition-colors">
                  <MenuIcon size={20} />
                </button>
                <button className="hidden md:block bg-brand-dark text-white px-6 py-2 rounded-xl font-medium hover:bg-brand-orange transition-all active:scale-95">
                  Order Now
                </button>
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
    </nav>
  );
};

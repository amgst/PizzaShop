import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, MENU_ITEMS } from '../data/menu';
import { Plus, Minus, Star, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { ProductModal } from './ProductModal';
import { getProducts } from '../services/products';

const categories = [
  'Signature Pizzas',
  'Gourmet White Pies',
  'Spicy & Bold',
  'Plant-Based',
  'Calzones',
  'Wings',
  'Salads',
  'Sides',
  'Dips',
  'Desserts'
];

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { items, updateQuantity } = useCart();
  const { searchQuery } = useSearch();
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  };

  const scrollToSection = (category: string) => {
    const element = sectionRefs.current[category];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getProducts();
        // Merge DB items with static items to ensure full menu shows even if DB is partially seeded
        const existingNames = new Set(data.map(d => d.name.trim().toLowerCase()));
        const extras = MENU_ITEMS.filter(i => !existingNames.has(i.name.trim().toLowerCase()));
        setMenuItems([...data, ...extras]);
      } catch (error) {
        console.error("Failed to fetch menu:", error);
        setMenuItems(MENU_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    categories.forEach((cat) => {
      const element = sectionRefs.current[cat];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" className="bg-white">
      {/* Header Info */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <h2 className="text-5xl font-display mb-4">OUR <span className="text-brand-orange">MENU</span></h2>
        <p className="text-brand-dark/60 max-w-md italic font-serif">
          Crafted with passion, served with love. Every slice tells a story of flavor.
        </p>
      </div>

      {/* Sticky Category Scroller */}
      <div className="sticky top-[88px] z-30 bg-white/80 backdrop-blur-md border-y border-brand-dark/5 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-1 -mb-1">
            {categories.filter(cat =>
              !searchQuery || filteredItems.some(item => item.category === cat)
            ).map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToSection(cat)}
                className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap shrink-0 ${activeCategory === cat
                    ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30'
                    : 'bg-brand-dark/5 hover:bg-brand-dark/10 text-brand-dark'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {loading ? (
          <div className="flex justify-center flex-col items-center py-24 text-brand-dark/50 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
            <p className="font-medium animate-pulse">Loading amazing food...</p>
          </div>
        ) : (
          categories.map((category) => {
            const categoryItems = filteredItems.filter(item => item.category === category);
            if (categoryItems.length === 0 && searchQuery) return null;

            return (
              <div
                key={category}
                id={category}
                ref={(el) => { sectionRefs.current[category] = el; }}
                className="scroll-mt-48"
              >
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="text-4xl font-display uppercase tracking-tighter">{category}</h3>
                  <div className="h-px flex-1 bg-brand-dark/10" />
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryItems.map((item) => {
                    const quantity = getQuantity(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group bg-brand-light rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                        onClick={() => setSelectedProduct(item)}
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                          {item.popular && (
                            <div className="absolute top-4 left-4 bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                              <Star size={12} fill="currentColor" />
                              POPULAR
                            </div>
                          )}
                          <motion.div
                            key={`${item.id}-${quantity}`}
                            initial={{ scale: 1.1, color: '#F27D26' }}
                            animate={{ scale: 1, color: '#141414' }}
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1.5"
                          >
                            {quantity > 1 && (
                              <span className="text-[10px] bg-brand-orange text-white px-1.5 py-0.5 rounded-md leading-none">
                                {quantity}x
                              </span>
                            )}
                            <span>Rs. {(item.price * (quantity || 1)).toLocaleString()}</span>
                          </motion.div>
                        </div>

                        <div className="p-8">
                          <h3 className="text-2xl font-display mb-3">{item.name}</h3>
                          <p className="text-brand-dark/60 text-sm mb-6 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="h-14">
                            <AnimatePresence mode="wait">
                              {quantity === 0 ? (
                                <motion.button
                                  key="add-btn"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(item.id, 1);
                                  }}
                                  className="w-full h-full bg-white border border-brand-dark/10 rounded-2xl font-bold flex items-center justify-center gap-2 group-hover:bg-brand-dark group-hover:text-white transition-all"
                                >
                                  <Plus size={20} />
                                  Add to Order
                                </motion.button>
                              ) : (
                                <motion.div
                                  key="qty-selector"
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="w-full h-full bg-brand-dark text-white rounded-2xl flex items-center justify-between px-2 overflow-hidden"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateQuantity(item.id, -1);
                                    }}
                                    className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                                  >
                                    <Minus size={20} />
                                  </button>
                                  <span className="font-display text-xl">{quantity}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateQuantity(item.id, 1);
                                    }}
                                    className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                                  >
                                    <Plus size={20} />
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          }))}
        {searchQuery && filteredItems.length === 0 && (
          <div className="py-24 text-center">
            <div className="bg-brand-light w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-brand-dark/20" />
            </div>
            <h3 className="text-2xl font-display mb-2">NO RESULTS FOUND</h3>
            <p className="text-brand-dark/50">We couldn't find anything matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};

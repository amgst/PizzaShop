import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Star, Clock, Flame, Info } from 'lucide-react';
import { MenuItem, MENU_ITEMS } from '../data/menu';
import { useCart } from '../context/CartContext';
import { getProductImageUrl } from '../utils/image';

interface ProductModalProps {
  product: MenuItem | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { items, updateQuantity, setIsCartOpen } = useCart();

  if (!product) return null;

  const quantity = items.find(item => item.id === product.id)?.quantity || 0;
  const cartIds = new Set(items.map(item => item.id));
  const relatedCategories: Record<MenuItem['category'], MenuItem['category'][]> = {
    'Signature Pizzas': ['Dips', 'Sides', 'Desserts'],
    'Gourmet White Pies': ['Dips', 'Sides', 'Desserts'],
    'Spicy & Bold': ['Dips', 'Wings', 'Desserts'],
    'Plant-Based': ['Dips', 'Salads', 'Desserts'],
    'Calzones': ['Dips', 'Sides', 'Desserts'],
    'Wings': ['Dips', 'Sides', 'Desserts'],
    'Salads': ['Sides', 'Dips', 'Desserts'],
    'Sides': ['Dips', 'Desserts', 'Wings'],
    'Dips': ['Sides', 'Wings', 'Desserts'],
    'Desserts': ['Signature Pizzas', 'Dips', 'Sides']
  };
  const frequentPairings = useMemo(() => {
    const targetCategories = new Set(relatedCategories[product.category]);
    return MENU_ITEMS
      .filter(item => item.id !== product.id && targetCategories.has(item.category) && !cartIds.has(item.id))
      .sort((a, b) => Number(b.popular || false) - Number(a.popular || false))
      .slice(0, 3);
  }, [cartIds, product.category, product.id]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative">
              <img
                src={getProductImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.popular && (
                <div className="absolute top-6 left-6 bg-brand-yellow text-brand-dark px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg">
                  <Star size={14} fill="currentColor" />
                  POPULAR CHOICE
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-colors md:hidden"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="hidden md:flex justify-end mb-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">
                  {product.category}
                </div>
                <h2 className="text-4xl font-display mb-4 leading-tight">{product.name}</h2>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2 text-brand-dark/50">
                    <Clock size={18} />
                    <span className="text-sm font-bold">15-20 min</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-dark/50">
                    <Flame size={18} />
                    <span className="text-sm font-bold">450 kcal</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-dark/50">
                    <Star size={18} className="text-brand-yellow fill-brand-yellow" />
                    <span className="text-sm font-bold">4.8 (120+)</span>
                  </div>
                </div>

                <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="bg-brand-light p-6 rounded-3xl mb-8">
                  <div className="flex items-center gap-3 mb-4 text-brand-dark/40">
                    <Info size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">Key Ingredients & Highlights</span>
                  </div>
                  {product.ingredients ? (
                    <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {product.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-brand-dark/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-brand-dark/60">
                      Premium mozzarella, fresh dough, secret sauce, and locally sourced toppings. Hand-crafted with love.
                    </p>
                  )}
                </div>

                {frequentPairings.length > 0 && (
                  <div className="mb-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-3">Frequently Bought Together</div>
                    <div className="space-y-2">
                      {frequentPairings.map((item) => (
                        <div key={item.id} className="bg-brand-light rounded-2xl p-3 flex items-center gap-3">
                          <img
                            src={getProductImageUrl(item.image)}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">{item.name}</p>
                            <p className="text-xs text-brand-dark/50">Rs. {item.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => {
                              updateQuantity(item.id, 1, item);
                              setIsCartOpen(true);
                            }}
                            className="bg-white text-brand-dark px-3 py-2 rounded-xl text-xs font-bold hover:bg-brand-dark hover:text-white transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-6 pt-6 border-t border-brand-dark/5">
                <div>
                  <div className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest mb-1">Total Price</div>
                  <div className="text-3xl font-display text-brand-orange">
                    Rs. {(product.price * (quantity || 1)).toLocaleString()}
                  </div>
                </div>

                <div className="h-14 w-48">
                  <AnimatePresence mode="wait">
                    {quantity === 0 ? (
                      <motion.button
                        key="add-btn"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={() => {
                          updateQuantity(product.id, 1, product);
                          setIsCartOpen(true);
                        }}
                        className="w-full h-full bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-orange transition-all active:scale-95"
                      >
                        <Plus size={20} />
                        Add to Order
                      </motion.button>
                    ) : (
                      <motion.div
                        key="qty-selector"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full h-full bg-brand-orange text-white rounded-2xl flex items-center justify-between px-2"
                      >
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <Minus size={20} />
                        </button>
                        <span className="font-display text-2xl">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1, product)}
                          className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <Plus size={20} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

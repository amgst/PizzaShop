import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const { items, totalPrice, totalItems, updateQuantity, removeItem, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-dark/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-orange/10 p-2 rounded-xl text-brand-orange">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display">YOUR CART</h3>
                  <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">
                    {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-brand-light p-8 rounded-full">
                    <ShoppingBag size={48} className="text-brand-dark/20" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display">YOUR CART IS EMPTY</h4>
                    <p className="text-brand-dark/50 max-w-[200px] mx-auto">
                      Looks like you haven't added any cheesy goodness yet.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="bg-brand-orange text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all"
                  >
                    Start Ordering
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display text-lg leading-tight">{item.name}</h4>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-brand-dark/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="text-brand-orange font-bold text-sm mb-3">
                        Rs. {item.price.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-brand-light rounded-xl px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-display min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <div className="font-bold">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-dark/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-dark/50 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-display">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                <button className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-brand-orange/30 transition-all active:scale-95">
                  Checkout Now
                </button>
                <p className="text-center text-xs text-brand-dark/40 font-medium">
                  Taxes and delivery charges calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

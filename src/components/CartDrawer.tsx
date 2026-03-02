import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { getProductImageUrl } from '../utils/image';
import { MENU_ITEMS } from '../data/menu';
import { computeCartPricing, FREE_DELIVERY_THRESHOLD, FREE_DESSERT_THRESHOLD } from '../utils/pricing';

export const CartDrawer = () => {
  const { items, totalItems, updateQuantity, removeItem, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();
  const pricing = computeCartPricing(items);
  const progressToFreeDessert = Math.min((pricing.subtotal / FREE_DESSERT_THRESHOLD) * 100, 100);
  const cartIds = useMemo(() => new Set(items.map(i => i.id)), [items]);
  const quickAddOns = useMemo(
    () =>
      MENU_ITEMS
        .filter(item =>
          !cartIds.has(item.id) &&
          (item.category === 'Dips' || item.category === 'Sides' || item.category === 'Desserts')
        )
        .sort((a, b) => Number(b.popular || false) - Number(a.popular || false))
        .slice(0, 3),
    [cartIds]
  );

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
                <>
                  <div className="rounded-2xl bg-brand-light p-4 space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-dark/50">
                      <span>Value Rewards</span>
                      <span>{Math.round(progressToFreeDessert)}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white overflow-hidden">
                      <div className="h-full bg-brand-orange transition-all duration-500" style={{ width: `${progressToFreeDessert}%` }} />
                    </div>
                    {!pricing.freeDeliveryUnlocked ? (
                      <p className="text-xs text-brand-dark/60">
                        Add Rs. {pricing.missingForFreeDelivery.toLocaleString()} more for free delivery at Rs. {FREE_DELIVERY_THRESHOLD.toLocaleString()}.
                      </p>
                    ) : (
                      <p className="text-xs text-green-700 font-bold">Free delivery unlocked.</p>
                    )}
                    {!pricing.freeDessertUnlocked ? (
                      <p className="text-xs text-brand-dark/60">
                        Add Rs. {pricing.missingForFreeDessert.toLocaleString()} more to unlock free dessert.
                      </p>
                    ) : pricing.freeDessertApplied ? (
                      <p className="text-xs text-green-700 font-bold">Free dessert applied in your total.</p>
                    ) : (
                      <p className="text-xs text-brand-dark/70">Add any dessert now and the cheapest one becomes free.</p>
                    )}
                  </div>

                  {quickAddOns.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark/50">Quick Add-ons</h4>
                      {quickAddOns.map((addon) => (
                        <div key={addon.id} className="bg-brand-light rounded-2xl p-3 flex items-center gap-3">
                          <img
                            src={getProductImageUrl(addon.image)}
                            alt={addon.name}
                            className="w-12 h-12 rounded-xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">{addon.name}</p>
                            <p className="text-xs text-brand-dark/50">Rs. {addon.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => updateQuantity(addon.id, 1, addon)}
                            className="bg-white text-brand-dark px-3 py-2 rounded-xl font-bold text-xs hover:bg-brand-dark hover:text-white transition-colors"
                          >
                            + Add
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <img 
                        src={getProductImageUrl(item.image)} 
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover"
                        referrerPolicy="no-referrer"
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
                              onClick={() => updateQuantity(item.id, 1, item)}
                              className="p-1 hover:bg-white rounded-lg transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="font-bold">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                        {item.popular && item.quantity === 1 && (
                          <button
                            onClick={() => updateQuantity(item.id, 1, item)}
                            className="mt-2 text-xs font-bold text-brand-orange hover:text-orange-700"
                          >
                            Make it 2 for Rs. {item.price.toLocaleString()}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand-dark/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-dark/50 font-bold uppercase tracking-widest text-xs">Subtotal</span>
                  <span className="text-2xl font-display">Rs. {pricing.subtotal.toLocaleString()}</span>
                </div>
                {pricing.discounts.map((discount) => (
                  <div key={discount.id} className="flex justify-between items-center text-sm text-green-700">
                    <span>{discount.label}</span>
                    <span>- Rs. {discount.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-brand-dark/50 font-bold uppercase tracking-widest text-xs">Delivery</span>
                  <span>{pricing.deliveryFee === 0 ? 'FREE' : `Rs. ${pricing.deliveryFee.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between items-center border-t border-brand-dark/5 pt-3">
                  <span className="text-brand-dark/50 font-bold uppercase tracking-widest text-xs">Total</span>
                  <span className="text-2xl font-display">Rs. {pricing.total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-brand-orange/30 transition-all active:scale-95"
                >
                  Checkout Now - Rs. {pricing.total.toLocaleString()}
                </button>
                <p className="text-center text-xs text-brand-dark/40 font-medium">
                  Offers auto-applied at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

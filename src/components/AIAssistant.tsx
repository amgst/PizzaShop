import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Loader2, X } from 'lucide-react';
import { getRecommendation } from '../services/gemini';
import { MenuItem } from '../data/menu';
import { useCart } from '../context/CartContext';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{ item: MenuItem; reasoning: string } | null>(null);
  const { addItem, setIsCartOpen } = useCart();

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood.trim()) return;
    
    setLoading(true);
    try {
      const result = await getRecommendation(mood);
      setRecommendation({ item: result.recommendation, reasoning: result.reasoning });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToOrder = () => {
    if (recommendation) {
      addItem(recommendation.item);
      setRecommendation(null);
      setIsOpen(false);
      setIsCartOpen(true);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-brand-dark text-white p-4 rounded-full shadow-2xl flex items-center gap-3 group"
      >
        <div className="bg-brand-orange p-2 rounded-full">
          <Sparkles size={20} />
        </div>
        <span className="font-bold pr-2">Taste Assistant</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="bg-brand-dark p-8 text-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-orange p-2 rounded-xl">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display">TASTE ASSISTANT</h3>
                      <p className="text-xs opacity-60 font-bold tracking-widest uppercase">Powered by Gemini</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-lg font-serif italic opacity-90">
                  "Tell me how you're feeling, and I'll find the perfect slice for your mood."
                </p>
              </div>

              <div className="p-8">
                {!recommendation ? (
                  <form onSubmit={handleAsk} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-brand-dark/40 mb-3">
                        Describe your mood or craving
                      </label>
                      <textarea
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        placeholder="e.g. I'm feeling adventurous and want something spicy!"
                        className="w-full bg-brand-light border-none rounded-2xl p-4 min-h-[120px] focus:ring-2 focus:ring-brand-orange transition-all resize-none"
                      />
                    </div>
                    
                    <button
                      disabled={loading || !mood.trim()}
                      className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-orange/30 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <Send size={20} />
                          Get Recommendation
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex gap-4 bg-brand-light p-4 rounded-3xl">
                      <img 
                        src={recommendation.item.image} 
                        alt={recommendation.item.name}
                        className="w-24 h-24 rounded-2xl object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-brand-orange uppercase mb-1">{recommendation.item.category}</div>
                        <h4 className="text-xl font-display">{recommendation.item.name}</h4>
                        <div className="text-sm font-bold">Rs. {recommendation.item.price.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="bg-brand-orange/5 p-6 rounded-3xl border border-brand-orange/10">
                      <p className="text-brand-dark/80 leading-relaxed italic">
                        "{recommendation.reasoning}"
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setRecommendation(null)}
                        className="flex-1 bg-brand-light py-4 rounded-2xl font-bold hover:bg-brand-dark/5 transition-all"
                      >
                        Try Another
                      </button>
                      <button 
                        onClick={handleAddToOrder}
                        className="flex-[2] bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-orange transition-all"
                      >
                        Add to Order
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

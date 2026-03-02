import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-88px)] pt-[88px] pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-orange/5 -skew-x-12 transform translate-x-1/4 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Star size={16} fill="currentColor" />
            <span>VOTED BEST PIZZA IN LAHORE</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-display leading-[0.9] mb-8 tracking-tighter">
            STAY <span className="text-brand-orange">CHEESY</span><br />
            EVERY <span className="text-stroke text-brand-dark">BITE</span>
          </h1>
          
          <p className="text-lg text-brand-dark/70 max-w-md mb-10 leading-relaxed">
            From our signature Crown Crust to our juicy Monster Burgers, we bring you the ultimate comfort food experience in Lahore.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-brand-orange text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-brand-orange/30 transition-all flex items-center gap-2 group">
              Explore Menu
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white border-2 border-brand-dark/10 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-brand-dark hover:text-white transition-all">
              Our Story
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div>
              <div className="text-3xl font-display">15k+</div>
              <div className="text-sm text-brand-dark/50 uppercase tracking-widest font-bold">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-brand-dark/10" />
            <div>
              <div className="text-3xl font-display">4.9/5</div>
              <div className="text-sm text-brand-dark/50 uppercase tracking-widest font-bold">Google Rating</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80" 
              alt="Signature Pizza"
              className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block"
          >
            <div className="text-brand-orange font-display text-4xl leading-none">40%</div>
            <div className="text-xs font-bold uppercase tracking-tighter">OFF FIRST ORDER</div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-10 -left-10 bg-brand-dark text-white p-6 rounded-3xl shadow-xl z-20 hidden md:block"
          >
            <div className="font-display text-xl mb-1">CROWN CRUST</div>
            <div className="text-xs opacity-70">Our Best Seller</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

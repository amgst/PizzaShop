import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock3, Flame, Star } from 'lucide-react';

export const Hero = () => {
  const scrollToSection = (id: 'menu' | 'about') => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative min-h-[calc(100vh-88px)] pt-[104px] pb-20 overflow-hidden bg-brand-light">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_25%,rgba(242,125,38,0.16),transparent_44%),radial-gradient(circle_at_88%_12%,rgba(255,184,0,0.18),transparent_36%)]" />
      <div className="absolute -top-40 -right-24 w-[420px] h-[420px] rounded-full bg-brand-orange/10 blur-3xl -z-10" />
      <div className="absolute -bottom-44 -left-24 w-[340px] h-[340px] rounded-full bg-brand-dark/8 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white border border-brand-orange/20 text-brand-dark px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-6 shadow-sm">
            <Flame size={15} className="text-brand-orange" />
            <span>WOOD-FIRED DAILY IN LAHORE</span>
          </div>

          <h1 className="text-[3.2rem] sm:text-[4.2rem] md:text-[5.4rem] font-display leading-[0.88] mb-7 tracking-tight">
            BOLD CRUST.<br />
            <span className="text-brand-orange">MELTED CHEESE.</span><br />
            ZERO COMPROMISE.
          </h1>

          <p className="text-base md:text-lg text-brand-dark/75 max-w-xl mb-10 leading-relaxed">
            Signature pies, loaded sides, and oven-fresh flavor made for late-night cravings and weekend feasts.
            Fast prep, hot delivery, and a menu built for sharing.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('menu')}
              className="bg-brand-dark text-white px-7 py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-brand-orange transition-all flex items-center gap-2 group"
            >
              Start Your Order
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="bg-white border-2 border-brand-dark/10 px-7 py-4 rounded-2xl font-bold text-base md:text-lg hover:bg-brand-dark hover:text-white transition-all"
            >
              See Our Story
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
            <div className="bg-white/85 border border-brand-dark/10 rounded-2xl p-4">
              <div className="text-3xl font-display leading-none">15k+</div>
              <div className="text-[11px] mt-1 text-brand-dark/55 uppercase tracking-widest font-bold">Happy Customers</div>
            </div>
            <div className="bg-white/85 border border-brand-dark/10 rounded-2xl p-4">
              <div className="text-3xl font-display leading-none">25m</div>
              <div className="text-[11px] mt-1 text-brand-dark/55 uppercase tracking-widest font-bold">Average Delivery</div>
            </div>
            <div className="bg-white/85 border border-brand-dark/10 rounded-2xl p-4 col-span-2 sm:col-span-1">
              <div className="text-3xl font-display leading-none">4.9</div>
              <div className="text-[11px] mt-1 text-brand-dark/55 uppercase tracking-widest font-bold">Top Rated</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative lg:pl-8"
        >
          <div className="relative z-10">
            <img 
              src="/products/pizza17.jpg"
              alt="Loaded pizza fresh from the oven"
              className="w-full max-w-[620px] mx-auto rounded-[2.6rem] shadow-[0_30px_70px_rgba(20,20,20,0.22)] object-cover aspect-[4/5]"
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-5 -left-3 md:-left-8 bg-white rounded-2xl p-3 md:p-4 border border-brand-dark/10 shadow-xl"
            >
              <p className="text-[11px] uppercase tracking-wider text-brand-dark/45 font-bold">House Pick</p>
              <p className="font-display text-xl leading-none mt-1 text-brand-dark">Crown Crust</p>
              <p className="text-xs text-brand-dark/60 mt-1">Extra cheese edge + spicy dip</p>
            </motion.div>

            <div className="absolute -bottom-5 right-3 md:-right-5 bg-brand-dark text-white rounded-2xl p-4 md:p-5 shadow-xl min-w-[220px]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs uppercase tracking-widest text-white/60 font-bold">Live Kitchen</p>
                <Clock3 size={15} className="text-brand-orange" />
              </div>
              <p className="font-semibold text-sm">Fresh batch every 12 minutes</p>
              <p className="text-xs text-white/65 mt-1">Peak-time prep optimized for delivery.</p>
            </div>
          </div>

          <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white border border-brand-dark/10 rounded-2xl px-4 py-3 items-center gap-2 shadow-lg">
            <Star size={15} className="text-brand-yellow" fill="currentColor" />
            <p className="text-sm font-bold">4.9 Rated by 2k+ foodies</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

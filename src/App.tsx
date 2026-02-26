import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { CartDrawer } from './components/CartDrawer';

export default function App() {
  return (
    <SearchProvider>
      <CartProvider>
        <div className="min-h-screen selection:bg-brand-orange selection:text-white">
        <Navbar />
        <CartDrawer />
        <main>
          <Hero />
          <Menu />
          
          {/* About Section */}
          <section id="about" className="py-24 bg-brand-light">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80" 
                    alt="Kitchen"
                    className="rounded-[3rem] shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-brand-orange text-white p-8 rounded-[2.5rem] shadow-xl hidden md:block">
                    <div className="text-5xl font-display mb-1">10+</div>
                    <div className="text-sm font-bold uppercase tracking-widest">Years of Flavor</div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-5xl font-display mb-8">CRAFTING THE <span className="text-brand-orange">PERFECT SLICE</span> SINCE 2014</h2>
                  <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed">
                    Second Slice started with a simple mission: to bring the most authentic, cheesy, and delicious pizza to the streets of Lahore. Over the years, we've expanded our menu to include burgers, pasta, and more, but our commitment to quality has never wavered.
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="text-brand-orange font-display text-2xl">FRESH DOUGH</div>
                      <p className="text-sm text-brand-dark/60">Hand-kneaded daily for that perfect crunch.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-brand-orange font-display text-2xl">LOCAL INGREDIENTS</div>
                      <p className="text-sm text-brand-dark/60">Sourced from the finest local farms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  </SearchProvider>
  );
}

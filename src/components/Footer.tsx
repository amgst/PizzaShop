import React from 'react';
import { Instagram, Facebook, Twitter, Phone, MapPin, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="text-3xl font-display tracking-tighter text-brand-orange">
              PIZZA<span className="text-white">SHOP</span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Your favorite spot for cheesy pizzas, juicy burgers, and everything in between. Stay cheesy!
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-brand-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-brand-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:bg-brand-orange transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-display mb-8">QUICK LINKS</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Our Menu</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-display mb-8">LOCATIONS</h4>
            <ul className="space-y-6 text-white/60">
              <li className="flex gap-3">
                <MapPin className="text-brand-orange shrink-0" size={20} />
                <span>1234 Broadway Ave, New York, NY 10001, USA</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-display mb-8">CONTACT</h4>
            <ul className="space-y-6 text-white/60">
              <li className="flex gap-3">
                <Phone className="text-brand-orange shrink-0" size={20} />
                <span>+1 (212) 555-0147</span>
              </li>
              <li className="flex gap-3">
                <Clock className="text-brand-orange shrink-0" size={20} />
                <span>Mon - Sun: 12:00 PM - 03:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>&copy; 2024 Pizza Shop. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};



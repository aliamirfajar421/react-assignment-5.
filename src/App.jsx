import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Star, Plus, Heart, ArrowUp, PhoneCall, ShieldCheck } from 'lucide-react';
import { useFoodStore } from './store/useFoodStore';
import { CATEGORIES, MENU_ITEMS } from './data/menuData';

import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import FoodModal from './components/FoodModal';
import { CartDrawer, CheckoutModal } from './components/CartDrawer';
import SpinWheelModal from './components/SpinWheelModal';
import { OrderTracker } from './components/OrderTracker';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Modals Open/Close States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSpinOpen, setIsSpinOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { activeCategory, setCategory, searchQuery, favorites, toggleFavorite } = useFoodStore();

  // Scroll to Top visibility listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic Filtering Logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all'
        ? true
        : activeCategory === 'favorites'
          ? favorites.includes(item.id)
          : item.category === activeCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-300 font-sans relative`}>

      {/* Navbar with Modal Triggers */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSpin={() => setIsSpinOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Hero Section Carousel */}
        <HeroCarousel onOpenSpin={() => setIsSpinOpen(true)} />

        {/* Categories Bar */}
        <section className="mb-8 sticky top-20 z-30 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                      : darkMode ? 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  {cat.id === 'favorites' && favorites.length > 0 && (
                    <span className="bg-white text-red-600 rounded-full px-2 py-0.5 text-xs font-black">
                      {favorites.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Menu Cards Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isFav = favorites.includes(item.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  key={item.id}
                  className={`rounded-3xl p-4 border transition-all duration-300 flex flex-col justify-between group ${
                    darkMode ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:shadow-xl'
                  }`}
                >
                  <div>
                    <div className="relative overflow-hidden rounded-2xl h-48 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Bestseller Badge */}
                      {item.isBestseller && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                          Bestseller
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full text-white hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>

                      {/* Rating Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-black tracking-wide mb-1">{item.name}</h3>
                    <p className={`text-xs line-clamp-2 mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/20">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-red-500">${item.basePrice.toFixed(2)}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-red-600/20 active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Customize</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <span className="text-5xl">🔍</span>
              <h3 className="text-lg font-bold">No food items found</h3>
              <p className="text-xs text-slate-500">Try changing category or search keyword</p>
            </div>
          )}
        </section>
      </main>

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-red-600 text-white p-3 rounded-2xl shadow-2xl hover:bg-red-700 active:scale-95 transition-all cursor-pointer border border-red-400/30"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* VVIP Footer Component */}
      <footer className={`border-t ${darkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'} pt-12 pb-8`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-black text-red-600 tracking-wider mb-2">Snackify</h2>
            <p className="text-xs leading-relaxed">Delicious, fresh, and hot meals delivered right to your doorstep in 30 minutes.</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Quick Links</h4>
            <ul className="text-xs space-y-2">
              <li className="hover:text-red-500 cursor-pointer">Offers & Deals</li>
              <li className="hover:text-red-500 cursor-pointer">Popular Restaurants</li>
              <li className="hover:text-red-500 cursor-pointer">Become a Rider</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Support</h4>
            <ul className="text-xs space-y-2">
              <li className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-red-500" /> +1 (800) 123-4567</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Safe Payments</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-3">Follow Us</h4>
            <div className="flex gap-3 text-slate-300">
              <FaInstagram className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
              <FaFacebook className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
              <FaTwitter className="w-5 h-5 cursor-pointer hover:text-red-500 transition" />
            </div>
          </div>
        </div>
        <div className="text-center text-[11px] pt-6 border-t border-slate-800/60">
          © {new Date().getFullYear()} CRAVEX Inc. All rights reserved. Built for Food Lovers.
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AnimatePresence>
        {selectedItem && (
          <FoodModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onOpenCheckout={() => setIsCheckoutOpen(true)} 
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* Spin Wheel Modal */}
      <SpinWheelModal 
        isOpen={isSpinOpen} 
        onClose={() => setIsSpinOpen(false)} 
      />

      {/* Live Order Tracker */}
      <OrderTracker />
    </div>
  );
}
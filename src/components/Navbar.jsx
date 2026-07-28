import React from 'react';
import { Search, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore';

export default function Navbar({ darkMode, setDarkMode, onOpenCart, onOpenSpin }) {
  const store = useFoodStore();
  const cart = store?.cart || [];
  
  // Connect Search State with Zustand Store
  const searchQuery = store?.searchQuery || '';
  const setSearchQuery = store?.setSearchQuery || (() => {});

  // Cart Count Calculation
  const totalCartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30">
            ⚡
          </div>
          <span className="text-2xl font-black tracking-wider text-red-600">
            Snacki<span className={darkMode ? 'text-white' : 'text-slate-900'}>fy</span>
          </span>
        </div>

        {/* Controlled Search Bar */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search burgers, deals, drinks, desserts..."
            className={`w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${
              darkMode ? 'bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500' : 'bg-slate-100 border border-slate-200 text-slate-800'
            }`}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          {/* Spin & Win Button */}
          <button
            type="button"
            onClick={() => {
              if (onOpenSpin) onOpenSpin();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <span>✨</span>
            <span>Spin & Win</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
              darkMode ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => {
              if (onOpenCart) onOpenCart();
            }}
            className="relative p-2.5 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950">
                {totalCartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
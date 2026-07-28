import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, Check } from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore';

export default function FoodModal({ item, onClose }) {
  const addToCart = useFoodStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [selectedSpicy, setSelectedSpicy] = useState(item.options?.spicyLevel?.[0] || '');
  const [selectedDrink, setSelectedDrink] = useState(item.options?.drink?.[0] || '');
  const [selectedFries, setSelectedFries] = useState(item.options?.fries?.[0] || '');
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Calculate Extra Addons Total
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const unitPrice = item.basePrice + addonsTotal;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    const customizedItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      id: item.id,
      name: item.name,
      image: item.image,
      quantity,
      unitPrice,
      totalPrice: parseFloat(totalPrice),
      selectedOptions: {
        spicyLevel: selectedSpicy,
        drink: selectedDrink,
        fries: selectedFries,
        addons: selectedAddons.map((a) => a.name),
      },
    };

    addToCart(customizedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header Image */}
        <div className="relative h-56 shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full backdrop-blur-md hover:bg-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customization Details Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div>
            <h2 className="text-2xl font-black">{item.name}</h2>
            <p className="text-xs text-slate-400 mt-1">{item.description}</p>
          </div>

          {/* Spicy Level Choice */}
          {item.options?.spicyLevel && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Flavor / Spice</h4>
              <div className="grid grid-cols-3 gap-2">
                {item.options.spicyLevel.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedSpicy(lvl)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedSpicy === lvl 
                        ? 'border-red-500 bg-red-500/10 text-red-500' 
                        : 'border-slate-800 bg-slate-800/40 text-slate-400'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons Checklist */}
          {item.options?.addons && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Extra Add-ons</h4>
              <div className="space-y-2">
                {item.options.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.name === addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked ? 'border-amber-500 bg-amber-500/10' : 'border-slate-800 bg-slate-800/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-amber-500 border-amber-500' : 'border-slate-600'}`}>
                          {isChecked && <Check className="w-3 h-3 text-black font-bold" />}
                        </div>
                        <span className="text-xs font-bold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-mono text-amber-400">+${addon.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Real-Time Price Counter & Add Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-4">
          <div className="flex items-center bg-slate-800 rounded-2xl p-1 border border-slate-700">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-slate-300 hover:text-white"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-mono font-bold text-sm">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-slate-300 hover:text-white"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 font-bold text-sm text-white shadow-lg shadow-red-600/30 flex items-center justify-between hover:brightness-110 transition-all"
          >
            <span>Add to Order</span>
            <span className="font-mono text-base">${totalPrice}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, CheckCircle2, Clock, X, ChevronUp } from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore';

const STAGES = [
  { id: 'confirmed', title: 'Order Confirmed', desc: 'We have received your order', icon: '📝' },
  { id: 'preparing', title: 'Preparing Food', desc: 'Kitchen is cooking your delicious meal', icon: '👨‍🍳' },
  { id: 'on_the_way', title: 'Out for Delivery', desc: 'Rider is on the way to your location', icon: '🛵' },
  { id: 'delivered', title: 'Delivered', desc: 'Enjoy your food!', icon: '🎉' }
];

export const OrderTracker = () => {
  const store = useFoodStore();

  // Smart Variable Extraction
  const order = store.currentOrder || store.activeOrder;
  const rawStatus = store.orderStatus || order?.status || 'confirmed';
  
  // Visibility control with robust fallback
  const isVisible = store.activeOrderVisible !== undefined 
    ? store.activeOrderVisible 
    : (store.isOrderVisible !== undefined ? store.isOrderVisible : true);

  const setVisible = store.setActiveOrderVisible || store.setOrderVisible || (() => {});

  const [stageIndex, setStageIndex] = useState(0);

  // Dynamic Status & Auto-Simulation for Testing Demo
  useEffect(() => {
    const s = String(rawStatus).toLowerCase();
    if (s.includes('confirm') || s.includes('placed')) setStageIndex(0);
    else if (s.includes('prepar')) setStageIndex(1);
    else if (s.includes('way') || s.includes('out')) setStageIndex(2);
    else if (s.includes('deliver')) setStageIndex(3);

    // Auto Progress Simulation (ہر 7 سیکنڈ بعد اسٹیج خود اپڈیٹ ہوگا ڈیمو کے لیے)
    const interval = setInterval(() => {
      setStageIndex((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 7000);

    return () => clearInterval(interval);
  }, [rawStatus]);

  if (!order) return null;

  // Items Price safe calculation (NaN Fix)
  const itemsList = order.items || [];
  const calculatedTotal = itemsList.reduce((acc, item) => {
    const p = item.price || item.basePrice || 0;
    const q = item.quantity || 1;
    return acc + (p * q);
  }, 0);

  const displayTotal = order.totalAmount || calculatedTotal;

  // Bike Animation Progress
  const progressPercent = Math.min(100, Math.max(5, (stageIndex / (STAGES.length - 1)) * 100));

  return (
    <>
      {/* Mini Floating Widget for Dashboard */}
      {!isVisible && (
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setVisible(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-red-600 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-orange-400/30 backdrop-blur-md cursor-pointer"
        >
          <div className="relative">
            <Bike className="w-6 h-6 animate-bounce text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900 animate-ping" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[10px] font-bold text-orange-200 uppercase tracking-wider">
              Live Order #{order.id?.toString().slice(-6) || '202279'}
            </p>
            <p className="text-xs font-black">{STAGES[stageIndex].title}</p>
          </div>
          <ChevronUp className="w-5 h-5 ml-1 text-white/80" />
        </motion.button>
      )}

      {/* Full Responsive Modal Window */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 text-white w-full max-w-lg rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800 relative my-auto max-h-[85vh] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
                    Live Tracking
                  </span>
                  <h2 className="text-lg sm:text-2xl font-black mt-1 text-slate-100">
                    ORD-#{order.id?.toString().slice(-6) || '202279'}
                  </h2>
                </div>
                <div className="text-right flex items-center gap-2 sm:gap-3">
                  <div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Estimated Delivery</p>
                    <p className="text-sm sm:text-lg font-black text-emerald-400 flex items-center justify-end gap-1">
                      <Clock className="w-4 h-4" /> 25 Mins
                    </p>
                  </div>
                  <button
                    onClick={() => setVisible(false)}
                    className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Main Content */}
              <div className="overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                {/* Bike Banner */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-4 sm:p-5 rounded-2xl relative overflow-hidden shadow-lg border border-orange-400/20">
                  <h3 className="font-extrabold text-base sm:text-xl text-white">
                    {STAGES[stageIndex].title}...
                  </h3>
                  <p className="text-xs text-orange-100 mb-5 font-medium">
                    {STAGES[stageIndex].desc}
                  </p>

                  <div className="relative w-full h-8 flex items-center">
                    <div className="w-full border-b-2 border-dashed border-white/40 absolute top-1/2" />
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 -ml-3 text-2xl z-10"
                      animate={{ left: `${progressPercent}%` }}
                      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    >
                      🛵
                    </motion.div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xl z-0">
                      🏠
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-3 px-1">
                  {STAGES.map((stage, idx) => {
                    const isDone = idx <= stageIndex;
                    const isCurrent = idx === stageIndex;

                    return (
                      <div key={stage.id} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm sm:text-base transition-all ${
                            isDone
                              ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                              : 'bg-slate-800 border-2 border-slate-700 text-slate-500 opacity-60'
                          }`}
                        >
                          {stage.icon}
                        </div>

                        <div className="flex-1">
                          <p className={`font-bold text-xs sm:text-sm ${isCurrent ? 'text-orange-400' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                            {stage.title}
                          </p>
                          <p className="text-[10px] sm:text-xs text-slate-400">{stage.desc}</p>
                        </div>

                        {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Items Summary */}
                <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                    ORDERED ITEMS
                  </p>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {itemsList.map((item, index) => {
                      const itemPrice = item.price || item.basePrice || 0;
                      const qty = item.quantity || 1;
                      return (
                        <div key={index} className="flex justify-between text-xs text-slate-300">
                          <span>{qty}x {item.name}</span>
                          <span className="font-bold text-slate-100">
                            ${(itemPrice * qty).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-slate-700 pt-2 mt-2 flex justify-between text-xs font-black text-orange-400">
                    <span>Total Amount:</span>
                    <span>${Number(displayTotal).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setVisible(false)}
                className="w-full mt-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl transition active:scale-95 border border-slate-700/50 cursor-pointer"
              >
                Close / Minimize Window
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
import React, { useState } from 'react';
import { X, Trophy, Sparkles } from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore';

const OFFERS = [
  { code: 'SPIN20', label: '20% OFF', color: '#f97316' },
  { code: 'FREEDEL', label: 'Free Delivery', color: '#8b5cf6' },
  { code: 'FLAT5', label: '$5 FLAT OFF', color: '#ef4444' },
  { code: 'CHILLOUT', label: 'Free Drink', color: '#06b6d4' },
  { code: 'LUCKY10', label: '10% OFF', color: '#10b981' },
  { code: 'TRYAGAIN', label: 'Better Luck!', color: '#64748b' },
];

export const SpinWheelModal = ({ isOpen, onClose }) => {
  const store = useFoodStore();
  const [mustSpin, setMustSpin] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (mustSpin) return;
    setMustSpin(true);
    setWonPrize(null);

    // Random rotation (Between 4 to 6 full turns)
    const randomAngle = Math.floor(1440 + Math.random() * 720);
    const newRotation = rotation + randomAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setMustSpin(false);

      // Accurate Wheel Pointer Calculation
      const segmentSize = 360 / OFFERS.length;
      const actualDeg = (newRotation % 360 + 360) % 360;
      // Offset by 90deg because top pointer sits at 270deg relative to 0deg start
      const adjustedDeg = (360 - actualDeg + 270) % 360; 
      const prizeIndex = Math.floor(adjustedDeg / segmentSize) % OFFERS.length;
      const prize = OFFERS[prizeIndex];

      if (prize.code !== 'TRYAGAIN') {
        setWonPrize(prize);
        if (store.applyCoupon) store.applyCoupon(prize.code);
      } else {
        setWonPrize({ label: 'Better luck next time! 😅', code: null });
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center text-white overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold mb-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
           LUCKY WHEEL
        </div>
        <h3 className="text-2xl font-black mb-1">SPIN & WIN DISCOUNTS</h3>
        <p className="text-xs text-slate-400 mb-6">Spin the wheel to unlock exclusive vouchers!</p>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-lg" />

          {/* Center Wheel Cap / Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 border-4 border-amber-400 rounded-full z-20 flex items-center justify-center shadow-lg">
            <span className="text-xs">🎁</span>
          </div>

          {/* Rotating Wheel */}
          <div
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-2xl relative overflow-hidden transition-transform ease-out"
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: mustSpin ? '4000ms' : '0ms',
              background: `conic-gradient(
                #f97316 0deg 60deg,
                #8b5cf6 60deg 120deg,
                #ef4444 120deg 180deg,
                #06b6d4 180deg 240deg,
                #10b981 240deg 300deg,
                #64748b 300deg 360deg
              )`,
            }}
          >
            {OFFERS.map((offer, idx) => (
              <div
                key={idx}
                className="absolute w-full h-full text-center flex justify-center pt-3 font-extrabold text-[11px] text-white tracking-wider"
                style={{
                  transform: `rotate(${idx * 60 + 30}deg)`,
                  transformOrigin: '50% 50%',
                }}
              >
                <span>{offer.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spin Button / Result */}
        {wonPrize ? (
          <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 animate-fade-in mb-2 space-y-3">
            <Trophy className="w-8 h-8 text-amber-400 mx-auto" />
            <div>
              <h4 className="font-extrabold text-sm text-amber-300">
                {wonPrize.code ? `CONGRATS! YOU WON ${wonPrize.label}` : wonPrize.label}
              </h4>
              {wonPrize.code && (
                <p className="text-xs text-slate-300 mt-1">
                  Code <span className="font-mono font-bold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded">{wonPrize.code}</span> has been auto-applied!
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
            >
              ClaimSnackify & Start Shopping 🍔
            </button>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={mustSpin}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition cursor-pointer disabled:opacity-50"
          >
            {mustSpin ? 'SPINNING...' : 'SPIN NOW 🎡'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SpinWheelModal;
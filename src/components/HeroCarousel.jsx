import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Sparkles, Copy, Tag, ShoppingBag, CheckCircle2, Clock } from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore'; // Apne Store ka path confirm kar lein

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BANNER_SLIDES = [
  {
    id: 1,
    tag: "LIMITED TIME OFFER",
    title: "MIDNIGHT CRAVINGS",
    subtitle: "Free Delivery on all orders above $20 after 10 PM",
    promoCode: "FREEDEL",
    price: 18.99,
    bgGradient: "from-purple-700 via-indigo-800 to-purple-900",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-purple-500/30 text-purple-200 border-purple-400/30",
    promoColor: "bg-purple-950/60 border-purple-400/40 text-yellow-400",
    hasTimer: true
  },
  {
    id: 2,
    tag: "WEEKEND SPECIAL",
    title: "CRUNCHY BURGER BASH",
    subtitle: "Get flat 30% OFF on all gourmet burger deals today!",
    promoCode: "CRUNCH30",
    price: 14.50,
    bgGradient: "from-orange-600 via-red-600 to-amber-700",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-orange-500/30 text-orange-200 border-orange-400/30",
    promoColor: "bg-red-950/60 border-orange-400/40 text-yellow-300",
    hasTimer: false
  },
  {
    id: 3,
    tag: "SWEET DESSERT DEAL",
    title: "CHOCO HEAVEN DELIGHT",
    subtitle: "Buy 1 Get 1 Free on all Lava Cakes & Ice Cream Tubs",
    promoCode: "SPIN15",
    price: 9.99,
    bgGradient: "from-pink-600 via-rose-700 to-purple-900",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-pink-500/30 text-pink-200 border-pink-400/30",
    promoColor: "bg-pink-950/60 border-pink-400/40 text-yellow-300",
    hasTimer: false
  },
  {
    id: 4,
    tag: "REFRESHING DRINKS",
    title: "CHILL & CHIZZ FIZZ",
    subtitle: "Combo shakes & chilled sodas starting at just $2.99",
    promoCode: "CHILLOUT",
    price: 6.99,
    bgGradient: "from-teal-600 via-emerald-700 to-cyan-900",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop",
    badgeColor: "bg-teal-500/30 text-teal-200 border-teal-400/30",
    promoColor: "bg-teal-950/60 border-teal-400/40 text-emerald-300",
    hasTimer: false
  },
];

export const HeroCarousel = () => {
  const store = useFoodStore();
  const [toastMessage, setToastMessage] = useState(null);
  
  // Countdown Timer Logic (2 Ghante ka Timer)
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 7200));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Toast Notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Promo Code Auto Apply & Copy
  const handleApplyPromo = (code) => {
    if (store.setAppliedPromo || store.applyPromoCode) {
      const applyFunc = store.setAppliedPromo || store.applyPromoCode;
      applyFunc(code);
    }
    navigator.clipboard.writeText(code);
    showToast(`Promo Code "${code}" Auto-Applied & Copied! 🎉`);
  };

  // Direct Add Deal to Cart
  const handleClaimDeal = (slide) => {
    if (store.addToCart) {
      store.addToCart({
        id: `deal-${slide.id}`,
        name: slide.title,
        price: slide.price,
        quantity: 1,
        image: slide.image,
      });
      showToast(`"${slide.title}" Cart me Add ho gaya he! 🛒`);
    } else {
      showToast(`Deal Selected: ${slide.title}`);
    }
  };

  return (
    <div className="w-full my-4 px-2 sm:px-6 relative">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-bounce text-xs sm:text-sm font-bold">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper rounded-3xl overflow-hidden pb-8"
      >
        {BANNER_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative bg-gradient-to-r ${slide.bgGradient} rounded-3xl p-6 sm:p-8 min-h-[280px] sm:min-h-[310px] flex flex-col md:flex-row items-center justify-between shadow-2xl border border-white/10 overflow-hidden group`}
            >
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:bg-white/20 transition-all duration-500" />

              {/* Text Side */}
              <div className="z-10 flex-1 text-left w-full">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {/* Tag */}
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border backdrop-blur-md ${slide.badgeColor}`}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    {slide.tag}
                  </span>

                  {/* Countdown Timer Badge */}
                  {slide.hasTimer && (
                    <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-mono font-black bg-black/40 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30 backdrop-blur-md">
                      <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                      {formatTime(timeLeft)}
                    </span>
                  )}
                </div>

                {/* Main Title */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-wide uppercase drop-shadow-md leading-tight mb-1">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-100/90 font-medium max-w-md mb-4 leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* Promo Code & Claim Deal Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Promo Code Button */}
                  <button
                    onClick={() => handleApplyPromo(slide.promoCode)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border border-dashed backdrop-blur-md font-mono text-xs font-bold hover:scale-105 active:scale-95 transition ${slide.promoColor}`}
                    title="Click to Auto-Apply & Copy"
                  >
                    <Tag className="w-3.5 h-3.5 text-orange-400" />
                    <span>{slide.promoCode}</span>
                    <Copy className="w-3 h-3 opacity-70 ml-1" />
                  </button>

                  {/* Claim Deal Direct Button */}
                  <button
                    onClick={() => handleClaimDeal(slide)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs font-black shadow-lg hover:shadow-orange-500/30 active:scale-95 transition border border-orange-400/30 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>CLAIM DEAL (${slide.price})</span>
                  </button>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative z-10 mt-4 md:mt-0 flex-shrink-0 w-full md:w-44 lg:w-52 h-36 md:h-44 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
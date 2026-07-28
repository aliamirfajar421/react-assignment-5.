import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, CreditCard, Truck, Wallet } from 'lucide-react';
import { useFoodStore } from '../store/useFoodStore';

export const CartDrawer = ({ isOpen, onClose, onOpenCheckout }) => {
  const store = useFoodStore();
  const cartItems = store.cart || [];

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.price || item.basePrice || 0;
    return acc + itemPrice * (item.quantity || 1);
  }, 0);

  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const discount = store.appliedCoupon ? store.appliedCoupon.discount : 0;
  const discountAmount = typeof discount === 'number' ? subtotal * discount : 0;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-black tracking-wide">YOUR CART</h2>
              <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-slate-500 space-y-3">
                <ShoppingBag className="w-16 h-16 mx-auto opacity-30" />
                <p className="text-sm font-medium">Your cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const itemPrice = item.price || item.basePrice || 0;
                return (
                  <div
                    key={item.cartItemId || item.id || index}
                    className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-2xl border border-slate-700/50"
                  >
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-xs font-extrabold text-orange-400 mt-1">
                        ${(itemPrice * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Actions */}
                    <div className="flex items-center gap-2 bg-slate-900 px-2 py-1 rounded-xl border border-slate-700">
                      <button
                        onClick={() => store.updateQuantity && store.updateQuantity(item.cartItemId || item.id, -1)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => store.updateQuantity && store.updateQuantity(item.cartItemId || item.id, 1)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-slate-950/80 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount Applied</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-orange-500 text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 transition cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Checkout Modal Component
export const CheckoutModal = ({ isOpen, onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const store = useFoodStore();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (store.placeOrder) {
      store.placeOrder();
    }

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
        <button
          onClick={() => {
            setIsSuccess(false);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black">ORDER PLACED! 🎉</h3>
            <p className="text-xs text-slate-400">Your delicious food is being prepared and will arrive shortly.</p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-lg shadow-orange-500/20"
            >
              TRACK YOUR ORDER 🛵
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-black mb-1">CHECKOUT & DELIVERY</h3>
            <p className="text-xs text-slate-400 mb-5">Enter your details to confirm order</p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-bold block mb-1">FULL NAME</label>
                <input required type="text" placeholder="Ali Khan" className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-orange-500" />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">DELIVERY ADDRESS</label>
                <input required type="text" placeholder="House #, Street, City" className="w-full bg-slate-800 p-3 rounded-xl border border-slate-700 text-white focus:outline-none focus:border-orange-500" />
              </div>

              <div>
                <label className="text-slate-400 font-bold block mb-1">PAYMENT METHOD</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1 cursor-pointer ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-800/50 text-slate-400'}`}
                  >
                    <Truck className="w-4 h-4" /> COD
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1 cursor-pointer ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-800/50 text-slate-400'}`}
                  >
                    <CreditCard className="w-4 h-4" /> Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-2.5 rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1 cursor-pointer ${paymentMethod === 'wallet' ? 'border-orange-500 bg-orange-500/10 text-orange-400' : 'border-slate-800 bg-slate-800/50 text-slate-400'}`}
                  >
                    <Wallet className="w-4 h-4" /> Wallet
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 font-black text-xs uppercase tracking-wider rounded-xl mt-4 cursor-pointer shadow-lg shadow-orange-500/20 active:scale-95 transition"
              >
                CONFIRM ORDER
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
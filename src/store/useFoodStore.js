import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFoodStore = create(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [], // Saved favorite item IDs
      isCartOpen: false,
      isSpinOpen: false,
      activeCategory: 'all',
      searchQuery: '',
      appliedCoupon: null,
      activeOrder: null, // Stores currently tracked order
      isOrderVisible: true, // ٹریکر ونڈو کو اوپن/منیمائز رکھنے کی سٹیٹ

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleSpin: () => set((state) => ({ isSpinOpen: !state.isSpinOpen })),
      setCategory: (category) => set({ activeCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setOrderVisible: (visible) => set({ isOrderVisible: visible }), // ٹریکر کو منیمائز/اوپن کرنے کا فنکشن

      // --- FAVORITES LOGIC ---
      toggleFavorite: (itemId) => {
        set((state) => {
          const isFav = state.favorites.includes(itemId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== itemId)
              : [...state.favorites, itemId],
          };
        });
      },

      // --- CART LOGIC ---
      addToCart: (customizedItem) => {
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (i) => i.id === customizedItem.id && JSON.stringify(i.selectedOptions) === JSON.stringify(customizedItem.selectedOptions)
          );
          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += customizedItem.quantity;
            return { cart: newCart, isCartOpen: true };
          }
          return { cart: [...state.cart, customizedItem], isCartOpen: true };
        });
      },

      updateQuantity: (cartItemId, amount) => {
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.cartItemId === cartItemId || item.id === cartItemId) {
                const newQty = (item.quantity || 1) + amount;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean),
        }));
      },

      clearCart: () => set({ cart: [] }),

      // --- COUPON & ORDERS ---
      applyCoupon: (code) => {
        const validCodes = {
          'CRUNCH30': 0.30,
          'FREEDEL': 'FREE_DELIVERY',
          'SPIN15': 0.15,
        };
        if (validCodes[code]) {
          set({ appliedCoupon: { code, discount: validCodes[code] } });
          return true;
        }
        return false;
      },

      placeOrder: () => {
        const currentCart = get().cart;
        if (currentCart.length === 0) return;

        // Total Amount کا سیف کیلکولیشن
        const totalAmount = currentCart.reduce((sum, item) => {
          const itemPrice = item.price || item.basePrice || 0;
          const qty = item.quantity || 1;
          return sum + (itemPrice * qty);
        }, 0);

        const newOrder = {
          id: `ORD-#${Math.floor(100000 + Math.random() * 900000)}`,
          items: currentCart,
          totalAmount: totalAmount,
          status: 'PLACED', // PLACED -> PREPARING -> ON_WAY -> DELIVERED
          eta: 25,
          createdAt: new Date(),
        };

        set({ 
          activeOrder: newOrder, 
          cart: [], 
          isCartOpen: false,
          isOrderVisible: true 
        });
      },

      updateOrderStatus: (status) => {
        set((state) => ({
          activeOrder: state.activeOrder ? { ...state.activeOrder, status } : null,
        }));
      }
    }),
    {
      name: 'cravex-storage', // localStorage کی کی (Key) کا نام
    }
  )
);
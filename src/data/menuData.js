export const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🔥' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'deals', name: 'Value Deals', icon: '🍗' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'desserts', name: 'Desserts', icon: '🍦' },
  { id: 'favorites', name: 'Favorites', icon: '❤️' },
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: "CRUNCH OVERLOAD DEAL",
    subtitle: "2 Zinger Burgers + 2 Fries + 2 Drinks at 30% OFF",
    bgGradient: "from-red-600 to-orange-600",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000",
    code: "CRUNCH30"
  },
  {
    id: 2,
    title: "MIDNIGHT CRAVINGS",
    subtitle: "Free Delivery on all orders above $20 after 10 PM",
    bgGradient: "from-purple-800 to-indigo-900",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000",
    code: "FREEDEL"
  }
];

export const MENU_ITEMS = [
  // --- BURGERS ---
  {
    id: 'm1',
    name: 'Mighty Zinger Supreme',
    category: 'burgers',
    basePrice: 8.99,
    originalPrice: 10.99,
    rating: 4.9,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    description: 'Double crunchy chicken fillet, melted cheddar, jalapenos, and signature spicy mayo sauce.',
    options: {
      spicyLevel: ['Regular', 'Spicy', 'Extra Extra Hot'],
      addons: [
        { name: 'Extra Cheese Slice', price: 1.20 },
        { name: 'Crispy Bacon Bits', price: 1.80 },
        { name: 'Sautéed Mushrooms', price: 1.50 },
      ],
      drink: ['Cola Zero', 'Sprite', 'Fanta', 'Iced Tea'],
      fries: ['Regular Salted', 'Curly Fries (+ $1.00)', 'Peri Peri Fries (+ $1.50)']
    }
  },
  {
    id: 'm3',
    name: 'Double Cheeseburger Deluxe',
    category: 'burgers',
    basePrice: 7.49,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600',
    description: 'Two 100% pure beef patties paired with melted cheese, pickles, onions, and ketchup.',
    options: {
      spicyLevel: ['Mild', 'Spicy'],
      addons: [
        { name: 'Extra Beef Patty', price: 2.99 },
        { name: 'Extra Pickle', price: 0.50 }
      ],
      drink: ['Cola', 'Water'],
      fries: ['Regular Fries']
    }
  },

  // --- VALUE DEALS ---
  {
    id: 'm2',
    name: 'Mega Bucket Deal (10 Pcs)',
    category: 'deals',
    basePrice: 22.50,
    originalPrice: 28.00,
    rating: 4.8,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600',
    description: '10 Pieces of Hot & Crispy Fried Chicken + 2 Large Fries + 1.5L Drink + 2 Dips.',
    options: {
      spicyLevel: ['Mix (5 Hot / 5 Reg)', 'All Spicy', 'All Regular'],
      addons: [
        { name: 'Extra Garlic Dip', price: 0.80 },
        { name: 'Coleslaw Bucket', price: 2.50 },
      ],
      drink: ['1.5L Pepsi', '1.5L 7Up'],
      fries: ['Large Salted']
    }
  },

  // --- DRINKS ---
  {
    id: 'd1',
    name: 'Chilled Pepsi Zero (500ml)',
    category: 'drinks',
    basePrice: 1.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    description: 'Refreshing ice-cold zero sugar cola drink served chilled.',
    options: {
      addons: [{ name: 'Extra Ice Cube Cup', price: 0.30 }]
    }
  },
  {
    id: 'd2',
    name: 'Fresh Mango Mint Shake',
    category: 'drinks',
    basePrice: 3.49,
    rating: 4.9,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600',
    description: 'Thick creamy mango milkshake blended with fresh mint and whipped cream.',
    options: {
      addons: [{ name: 'Extra Whipped Cream', price: 0.80 }]
    }
  },
  {
    id: 'd3',
    name: 'Iced Spanish Latte',
    category: 'drinks',
    basePrice: 4.25,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    description: 'Rich espresso shot mixed with cold milk and sweet condensed milk over ice.',
    options: {
      addons: [{ name: 'Extra Shot Espresso', price: 1.00 }]
    }
  },

  // --- DESSERTS ---
  {
    id: 'm4',
    name: 'Choco Lava Cake',
    category: 'desserts',
    basePrice: 3.99,
    rating: 4.9,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    description: 'Warm chocolate cake with a molten chocolate center. Served hot.',
    options: {
      addons: [{ name: 'Vanilla Ice Cream Scoop', price: 1.50 }]
    }
  },
  {
    id: 'm5',
    name: 'New York Cheesecake',
    category: 'desserts',
    basePrice: 4.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
    description: 'Classic rich cream cheese slice topped with fresh strawberry sauce.',
    options: {
      addons: [{ name: 'Extra Strawberry Dip', price: 0.99 }]
    }
  }
];
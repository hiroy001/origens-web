import React, { createContext, useContext, useState } from 'react';

export type Category = 'Todos' | 'Salgados' | 'Doces' | 'Bebidas' | 'Outros';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isAvailable: boolean;
  rating?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  notes?: string;
};

export type OrderStatus = 'paid' | 'delivered';

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  qrCode: string;
  createdAt: Date;
  customerName: string;
};

type AppContextType = {
  role: 'student' | 'staff' | 'manager' | null;
  setRole: (role: 'student' | 'staff' | 'manager' | null) => void;
  products: Product[];
  toggleProductAvailability: (id: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, notes?: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: Order[];
  createOrder: () => string;
  markOrderDelivered: (orderId: string) => void;
};

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Coxinha de Frango',
    description: 'Massa de batata recheada com frango desfiado temperado.',
    price: 6.50,
    category: 'Salgados',
    image: 'https://images.unsplash.com/photo-1641848421532-b27f3819071c?w=400&q=80',
    isAvailable: true,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Pão de Queijo',
    description: 'Tradicional pão de queijo mineiro, quentinho.',
    price: 4.00,
    category: 'Salgados',
    image: 'https://images.unsplash.com/photo-1559141680-d0bd7bc5af84?w=400&q=80',
    isAvailable: true,
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Bolo de Chocolate',
    description: 'Fatia de bolo de chocolate com cobertura de brigadeiro.',
    price: 7.00,
    category: 'Doces',
    image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?w=400&q=80',
    isAvailable: true,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Brigadeiro',
    description: 'Doce tradicional brasileiro, feito com leite condensado e cacau.',
    price: 3.50,
    category: 'Doces',
    image: 'https://images.unsplash.com/photo-1560448075-3244c9fbefa8?w=400&q=80',
    isAvailable: true,
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Suco de Laranja',
    description: 'Suco natural feito na hora (400ml).',
    price: 5.50,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80',
    isAvailable: true,
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Refrigerante Lata',
    description: 'Lata 350ml gelada.',
    price: 5.00,
    category: 'Bebidas',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
    isAvailable: false,
    rating: 4.3,
  },
  {
    id: '7',
    name: 'Enroladinho Misto',
    description: 'Massa assada recheada com presunto e queijo.',
    price: 6.00,
    category: 'Salgados',
    image: 'https://images.unsplash.com/photo-1702742322469-36315505728f?w=400&q=80',
    isAvailable: true,
    rating: 4.7,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [role, setRole] = useState<'student' | 'staff' | 'manager' | null>(null);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
       id: 'ORD-1234',
       items: [{ product: defaultProducts[0], quantity: 1 }],
       total: 6.50,
       status: 'paid',
       qrCode: 'QR-1234',
       createdAt: new Date(Date.now() - 1000 * 60 * 10),
       customerName: 'João Silva',
    }
  ]);

  const toggleProductAvailability = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isAvailable: !p.isAvailable } : p));
  };

  const addToCart = (product: Product, quantity: number, notes?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity, notes } : item);
      }
      return [...prev, { product, quantity, notes }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const createOrder = () => {
    const newId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newId,
      items: [...cart],
      total: cartTotal,
      status: 'paid',
      qrCode: `QR-${newId}`,
      createdAt: new Date(),
      customerName: 'Aluno IFPI',
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newId;
  };

  const markOrderDelivered = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'delivered' } : o));
  };

  return (
    <AppContext.Provider value={{
      role, setRole,
      products, toggleProductAvailability,
      cart, addToCart, removeFromCart, clearCart, cartTotal,
      orders, createOrder, markOrderDelivered
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

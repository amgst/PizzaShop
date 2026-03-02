import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../data/menu';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number, item?: MenuItem) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ [key: string]: { item: MenuItem; quantity: number } }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const items = Object.values(cart).map(({ item, quantity }) => ({ ...item, quantity }));

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addItem = (item: MenuItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateQuantity = (id: string, delta: number, item?: MenuItem) => {
    setCart(prev => {
      const currentEntry = prev[id];
      const current = currentEntry?.quantity || 0;
      const next = current + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      if (!currentEntry && !item) return prev;
      return {
        ...prev,
        [id]: {
          item: currentEntry?.item || item!,
          quantity: next
        }
      };
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider value={{ 
      items, 
      totalItems, 
      totalPrice, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

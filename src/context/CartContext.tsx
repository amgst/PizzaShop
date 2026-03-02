import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MenuItem } from '../data/menu';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

interface CartItem extends MenuItem {
  quantity: number;
}

type CartRecord = { [key: string]: { item: MenuItem; quantity: number } };

interface CustomerUser {
  uid: string;
  email: string;
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
  customerUser: CustomerUser | null;
  customerLoading: boolean;
  registerCustomer: (email: string, password: string) => Promise<void>;
  loginCustomer: (email: string, password: string) => Promise<void>;
  logoutCustomer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_CART_KEY = 'guest_cart_v1';
const CARTS_COLLECTION = 'carts';

const loadLocalCart = (): CartRecord => {
  try {
    const raw = localStorage.getItem(LOCAL_CART_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CartRecord;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const persistLocalCart = (cart: CartRecord) => {
  try {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(cart));
  } catch {
    // Ignore localStorage write failures
  }
};

const mergeCarts = (base: CartRecord, incoming: CartRecord): CartRecord => {
  const merged: CartRecord = { ...base };
  Object.entries(incoming).forEach(([id, entry]) => {
    const existing = merged[id];
    if (!existing) {
      merged[id] = entry;
      return;
    }
    merged[id] = {
      item: existing.item || entry.item,
      quantity: existing.quantity + entry.quantity
    };
  });
  return merged;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartRecord>(() => loadLocalCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerUser, setCustomerUser] = useState<CustomerUser | null>(null);
  const [customerLoading, setCustomerLoading] = useState(true);

  const items = Object.values(cart).map(({ item, quantity }) => ({ ...item, quantity }));

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    persistLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user || !user.email) {
        setCustomerUser(null);
        setCustomerLoading(false);
        return;
      }

      setCustomerUser({ uid: user.uid, email: user.email });

      try {
        const ref = doc(db, CARTS_COLLECTION, user.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setCustomerLoading(false);
          return;
        }

        const data = snap.data() as { items?: CartItem[] };
        const remoteItems = data.items || [];
        const remoteCart = remoteItems.reduce((acc: CartRecord, item) => {
          if (!item?.id || !item.quantity || item.quantity <= 0) return acc;
          const { quantity, ...menuItem } = item;
          acc[item.id] = { item: menuItem as MenuItem, quantity };
          return acc;
        }, {});

        setCart((prev) => mergeCarts(remoteCart, prev));
      } catch (error) {
        console.error('Failed to load customer cart:', error);
      } finally {
        setCustomerLoading(false);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (!customerUser) return;

    const sync = async () => {
      try {
        await setDoc(doc(db, CARTS_COLLECTION, customerUser.uid), {
          userId: customerUser.uid,
          email: customerUser.email,
          items,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Failed to sync customer cart:', error);
      }
    };

    sync();
  }, [items, customerUser]);

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

  const registerCustomer = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginCustomer = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logoutCustomer = async () => {
    await signOut(auth);
  };

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
      setIsCartOpen,
      customerUser,
      customerLoading,
      registerCustomer,
      loginCustomer,
      logoutCustomer
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

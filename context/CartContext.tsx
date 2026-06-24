"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  increaseItem: (productId: string) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "city-memory-candles-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem(storageKey);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [isLoaded, items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      totalItems,
      totalAmount,
      addItem: (item, quantity = 1) => {
        setItems((current) => {
          const existing = current.find((cartItem) => cartItem.productId === item.productId);
          if (existing) {
            return current.map((cartItem) =>
              cartItem.productId === item.productId
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            );
          }
          return [...current, { ...item, quantity }];
        });
      },
      increaseItem: (productId) => {
        setItems((current) =>
          current.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      },
      decreaseItem: (productId) => {
        setItems((current) =>
          current
            .map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
        );
      },
      removeItem: (productId) => {
        setItems((current) => current.filter((item) => item.productId !== productId));
      },
      clearCart: () => setItems([])
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

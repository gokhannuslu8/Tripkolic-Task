'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TourType } from '@/types';
import toast from 'react-hot-toast';

interface CartContextType {
  cartItems: TourType[];
  addToCart: (tour: TourType) => void;
  removeFromCart: (tourId: string) => void;
  isInCart: (tourId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<TourType[]>([]);

  const addToCart = (tour: TourType) => {
    if (!isInCart(tour.id)) {
      setCartItems((prev) => [...prev, tour]);
      toast.success('Added to cart!');
    }
  };

  const removeFromCart = (tourId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== tourId));
    toast.success('Removed from cart!');
  };

  const isInCart = (tourId: string) => {
    return cartItems.some((item) => item.id === tourId);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
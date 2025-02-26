'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TourType } from '@/types';

interface FavoriteContextType {
  favorites: TourType[];
  addToFavorites: (tour: TourType) => void;
  removeFromFavorites: (tourId: string) => void;
  isFavorite: (tourId: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<TourType[]>([]);

  const addToFavorites = (tour: TourType) => {
    setFavorites((prev) => [...prev, tour]);
  };

  const removeFromFavorites = (tourId: string) => {
    setFavorites((prev) => prev.filter((tour) => tour.id !== tourId));
  };

  const isFavorite = (tourId: string) => {
    return favorites.some((tour) => tour.id === tourId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
}; 
'use client';

import React, { useState } from 'react';
import { TourType } from '@/types';
import { Heart, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useFavorites } from '@/context/FavoriteContext';
import { useCart } from '@/context/CartContext';

interface TourCardProps {
  tour: TourType;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isInFavorites = isFavorite(tour.id);
  const { addToCart } = useCart();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isInFavorites) {
      addToFavorites(tour);
      toast.success('Added to favorites!', {
        icon: '❤️',
      });
    } else {
      removeFromFavorites(tour.id);
      toast.success('Removed from favorites!', {
        icon: '💔',
      });
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md overflow-hidden w-full flex flex-col h-[420px]">
      <div className="relative h-52 w-full">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {tour.discount && (
          <div className="absolute top-3 left-3 bg-white rounded-md">
            <span className="text-orange-500 px-3 py-1 text-sm font-bold tracking-wider inline-block">
              {tour.discount}% OFF
            </span>
          </div>
        )}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-md bg-white shadow-md transition-colors duration-200"
        >
          <Heart 
            className={`w-5 h-5 ${
              isInFavorites ? 'text-orange-500 fill-orange-500' : 'text-gray-600'
            }`}
          />
        </button>
        <div className="absolute bottom-3 left-3 rounded-md px-3 py-1 bg-orange-500">
          <span className="text-sm font-medium capitalize text-white">
            {tour.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm font-medium">{tour.rating}</span>
            <span className="text-gray-500 text-sm">({tour.reviews})</span>
          </div>
          <span className="text-gray-500 text-sm">{tour.location}</span>
        </div>
        
        <h3 className="font-medium text-lg leading-tight mt-3 max-h-[3rem] overflow-hidden h-14">{tour.title}</h3>
        
        <div className="mt-auto space-y-3">
          {tour.originalPrice && (
            <div className="flex items-center gap-1">
              <span className="text-red-500 line-through text-sm">THB {tour.originalPrice.toLocaleString()}</span>
              <ChevronDown className="w-4 h-4 text-red-500" />
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">THB {tour.price.toLocaleString()}</span>
            <button 
              onClick={() => addToCart(tour)}
              className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
            >
              Book now
            </button>
          </div>

          <button className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center">
            Details <span className="ml-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard; 
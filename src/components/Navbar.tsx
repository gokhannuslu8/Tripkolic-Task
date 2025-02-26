'use client';

import { useState } from 'react';
import FilterPopup from './FilterPopup';
import { Heart, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import { useFavorites } from '@/context/FavoriteContext';
import TourCard from './TourCard';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onFiltersChange: (filters: any) => void;
}

const Navbar = ({ onFiltersChange }: NavbarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const { favorites } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState('Tours');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart } = useCart();
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="text-gray-700 hover:text-primary-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image 
              src="/images/logo.png"
              alt="Logo"
              width={100}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-primary-500 relative"
              onClick={() => setIsFavoritesOpen(true)}
            >
              <Heart className="w-6 h-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button 
              className="text-gray-700 hover:text-primary-500 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button className="text-gray-700 hover:text-primary-500">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {isFavoritesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Favorites</h2>
              <button 
                onClick={() => setIsFavoritesOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {favorites.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No favorites yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Your cart is empty</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-16 bg-gray-100 rounded">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded object-cover"
                          onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))}
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{item.title}</h3>
                        <p className="text-orange-500 font-bold mt-1">THB {item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total:</span>
                  <span className="text-lg font-bold">
                    THB {cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <FilterPopup 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onFiltersChange={onFiltersChange}
      />
    </nav>
  );
};

export default Navbar; 
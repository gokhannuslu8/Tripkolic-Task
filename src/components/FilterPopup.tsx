'use client';

import { useState, useMemo } from 'react';
import { mockFilters, mockTours } from '@/data/mockData';

interface FilterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onFiltersChange: (filters: FilterState) => void;
}

interface FilterState {
  location: string;
  theme: string[];
  activities: string[];
  price: number;
  startTime: string;
  groupSize: number;
  vehicle: string[];
  features: string[];
}

export default function FilterPopup({ isOpen, onClose, selectedCategory, onFiltersChange }: FilterPopupProps) {
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    theme: [],
    activities: [],
    price: 12500,
    startTime: '17:00',
    groupSize: 40,
    vehicle: [],
    features: []
  });

  const filterCounts = useMemo(() => {
    const counts = {
      themes: {} as Record<string, number>,
      activities: {} as Record<string, number>,
      vehicles: {} as Record<string, number>,
      features: {} as Record<string, number>
    };

    mockTours.forEach(tour => {
      // Theme sayıları
      tour.theme.forEach(theme => {
        counts.themes[theme] = (counts.themes[theme] || 0) + 1;
      });

      // Activity sayıları
      tour.activities.forEach(activity => {
        counts.activities[activity] = (counts.activities[activity] || 0) + 1;
      });
      // Vehicle sayıları
      tour.vehicle?.forEach(vehicle => {
        counts.vehicles[vehicle] = (counts.vehicles[vehicle] || 0) + 1;
      });

      // Feature sayıları
      tour.features.forEach(feature => {
        counts.features[feature] = (counts.features[feature] || 0) + 1;
      });
    });

    return counts;
  }, []);

  const handleSingleSelect = (category: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: Array.isArray(prev[category]) 
        ? (prev[category] as string[]).includes(value)
          ? (prev[category] as string[]).filter(item => item !== value)
          : [value]
        : [value]
    }));
  };

  const handleReset = () => {
    setFilters({
      location: '',
      theme: [],
      activities: [],
      price: 12500,
      startTime: '17:00',
      groupSize: 40,
      vehicle: [],
      features: []
    });
  };

  const handleSearch = () => {
    onFiltersChange(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 left-0 w-[400px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="h-full overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4 flex-1">
                <span className="bg-orange-500 text-white px-4 py-2 rounded-md">TOURS</span>
                <span className="text-gray-700 font-bold text-center flex-1">Filter</span>
              </div>
              <button onClick={onClose} className="text-gray-500">✕</button>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Location</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Where you wanna visit? (Phi Phi Island, Chalong temple...)"
                  className="w-full p-2 border rounded-md pr-10"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500">
                  🔍
                </button>
              </div>
            </div>

            {/* Theme */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Theme</h3>
              <div className="flex flex-wrap gap-2">
                {mockFilters.themes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleSingleSelect('theme', theme)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.theme.includes(theme)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {theme} ({filterCounts.themes[theme] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Activity <span className="text-xs text-gray-500">(multiple choices beyond certain condition)</span></h3>
              <div className="flex flex-wrap gap-2">
                {mockFilters.activities.map((activity) => (
                  <button
                    key={activity}
                    onClick={() => handleSingleSelect('activities', activity)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.activities.includes(activity)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {activity} ({filterCounts.activities[activity] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="12500"
                    value={filters.price}
                    onChange={(e) => setFilters(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
                <span className="min-w-[60px] text-right text-sm bg-white border rounded-md px-2 py-1">
                  {filters.price}
                </span>
              </div>
            </div>

            {/* Start Time */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Start time</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">00:00</span>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={parseInt(filters.startTime)}
                    onChange={(e) => setFilters(prev => ({ ...prev, startTime: `${e.target.value}:00` }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
                <span className="text-sm text-gray-600">23:59</span>
                <span className="min-w-[60px] text-right text-sm bg-white border rounded-md px-2 py-1">
                  {filters.startTime}
                </span>
              </div>
            </div>

            {/* Group Size */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Group size</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={filters.groupSize}
                    onChange={(e) => setFilters(prev => ({ ...prev, groupSize: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
                <span className="min-w-[40px] text-right text-sm bg-white border rounded-md px-2 py-1">
                  {filters.groupSize}
                </span>
              </div>
            </div>

            {/* Vehicle */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Vehicle</h3>
              <div className="flex flex-wrap gap-2">
                {mockFilters.vehicles.map((vehicle) => (
                  <button
                    key={vehicle}
                    onClick={() => handleSingleSelect('vehicle', vehicle)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.vehicle.includes(vehicle)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {vehicle} ({filterCounts.vehicles[vehicle] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {mockFilters.features.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => handleSingleSelect('features', feature)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filters.features.includes(feature)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {feature} ({filterCounts.features[feature] || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleReset}
                className="flex-1 py-2 border border-orange-500 text-orange-500 rounded-md"
              >
                RESET
              </button>
              <button
                onClick={handleSearch}
                className="flex-1 py-2 bg-orange-500 text-white rounded-md"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
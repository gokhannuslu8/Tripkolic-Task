'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TourCard from '@/components/TourCard';
import { mockTours } from '@/data/mockData';
import { TourType } from '@/types';

interface Filters {
  location: string;
  theme: string[];
  activities: string[];
  price: number;
  startTime: string;
  groupSize: number;
  vehicle: string[];
  features: string[];
}

export default function Home() {
  const [filteredTours, setFilteredTours] = useState<TourType[]>(mockTours);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    location: '',
    theme: [],
    activities: [],
    price: 12500,
    startTime: '17:00',
    groupSize: 40,
    vehicle: [],
    features: []
  });

  const applyFilters = (filters: Filters) => {
    let filtered = [...mockTours];

    if (filters.location) {
      filtered = filtered.filter(tour => 
        tour.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        tour.title.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.theme.length > 0) {
      filtered = filtered.filter(tour => 
        filters.theme.some(theme => tour.theme?.includes(theme))
      );
    }

    if (filters.activities.length > 0) {
      filtered = filtered.filter(tour => 
        filters.activities.some(activity => tour.activities?.includes(activity))
      );
    }

    if (filters.price) {
      filtered = filtered.filter(tour => tour.price <= filters.price);
    }

    if (filters.startTime) {
      const filterTime = parseInt(filters.startTime);
      filtered = filtered.filter(tour => {
        const tourTime = parseInt(tour.startTime.split(':')[0]);
        return tourTime <= filterTime;
      });
    }

    if (filters.groupSize) {
      filtered = filtered.filter(tour => tour.groupSize <= filters.groupSize);
    }

    if (filters.vehicle.length > 0) {
      filtered = filtered.filter(tour => 
        filters.vehicle.some(vehicle => tour.vehicle?.includes(vehicle))
      );
    }

    if (filters.features.length > 0) {
      filtered = filtered.filter(tour => 
        filters.features.every(feature => tour.features?.includes(feature))
      );
    }

    setFilteredTours(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <Navbar onFiltersChange={applyFilters} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-400 text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-medium text-gray-600 mb-2">No tours found</h3>
            <p className="text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </main>
  );
} 
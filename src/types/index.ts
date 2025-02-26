export interface TourType {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount?: number;
  image: string;
  category: 'Tours' | 'Tickets' | 'Rent' | 'Transfer';
  features: string[];
  activities: string[];
  theme: string[];
  vehicle?: string[];
  groupSize: number;
  startTime: string;
}

export interface FilterType {
  location: string;
  theme: string[];
  activities: string[];
  price: {
    min: number;
    max: number;
  };
  startTime: {
    start: string;
    end: string;
  };
  groupSize: number;
  vehicle: string[];
  features: string[];
} 

export type AppView = 'LOGIN' | 'HOME' | 'SEARCH_RESULTS' | 'CHECKOUT' | 'CONFIRMATION' | 'HELP' | 'ADMIN' | 'MY_BOOKINGS';

export interface Trip {
  id: string;
  type: 'bus' | 'train';
  operator: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: string;
  imageUrl: string;
}

export interface Seat {
  id: string;
  label: string;
  status: 'available' | 'selected' | 'taken';
  price: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

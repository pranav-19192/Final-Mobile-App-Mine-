
import { Trip, Seat } from '../types.ts';

// Simple "Local Database" using LocalStorage to persist across reloads
const DB_NAME = 'swift_transit_db';

interface DBStore {
  users: any[];
  bookings: any[];
  trips: Trip[];
}

const INITIAL_TRIPS: Trip[] = [
  { 
    id: 'trip-1', operator: 'National Express', type: 'bus', 
    departureTime: '08:00', arrivalTime: '10:30', price: 25.00, 
    stops: 'Direct', duration: '2h 30m', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150' 
  },
  { 
    id: 'trip-2', operator: 'Megabus', type: 'bus', 
    departureTime: '09:15', arrivalTime: '11:45', price: 18.50, 
    stops: '1 Stop', duration: '2h 30m', imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=150' 
  },
  { 
    id: 'trip-3', operator: 'Eurostar', type: 'train', 
    departureTime: '14:00', arrivalTime: '16:15', price: 85.00, 
    stops: 'Direct', duration: '2h 15m', imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=150' 
  }
];

const getDB = (): DBStore => {
  const data = localStorage.getItem(DB_NAME);
  if (!data) {
    const initial: DBStore = { users: [], bookings: [], trips: INITIAL_TRIPS };
    localStorage.setItem(DB_NAME, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(data);
};

const saveDB = (data: DBStore) => {
  localStorage.setItem(DB_NAME, JSON.stringify(data));
};

export const db = {
  users: {
    find: (email: string) => getDB().users.find(u => u.email === email),
    create: (user: any) => {
      const store = getDB();
      if (store.users.find(u => u.email === user.email)) return;
      store.users.push(user);
      saveDB(store);
    }
  },
  bookings: {
    getAll: (userEmail: string) => getDB().bookings.filter(b => b.userEmail === userEmail),
    getById: (id: string) => getDB().bookings.find(b => b.id === id),
    create: (booking: any) => {
      const store = getDB();
      const id = `BK-${Math.floor(Math.random() * 9000) + 1000}`;
      store.bookings.push({ ...booking, id });
      saveDB(store);
      return id;
    }
  },
  trips: {
    getAll: () => getDB().trips
  }
};

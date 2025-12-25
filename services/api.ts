
import { db } from './db.ts';
import { Trip } from '../types.ts';

export const api = {
  fetchTrips: async (): Promise<Trip[]> => {
    await new Promise(r => setTimeout(r, 800));
    return db.trips.getAll();
  },
  fetchMyBookings: async (email: string) => {
    await new Promise(r => setTimeout(r, 600));
    return db.bookings.getAll(email);
  },
  fetchBookingById: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    return db.bookings.getById(id);
  },
  createBooking: async (bookingData: any) => {
    await new Promise(r => setTimeout(r, 1500));
    const id = db.bookings.create(bookingData);
    return { success: true, bookingId: id };
  }
};

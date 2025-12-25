import { api } from '../services/api.ts';
import { googleAuth } from '../services/auth.ts';

export const integrationTests = [
  {
    id: 'i1',
    name: 'Auth -> User Persistence Flow',
    run: async () => {
      const user = await googleAuth.login();
      if (!user || user.name !== 'Pranav') {
        throw new Error(`Auth login failed to return expected mock user. Got: ${user?.name}`);
      }
      const current = googleAuth.getCurrentUser();
      if (!current || current.email !== user.email) {
        throw new Error('User was not persisted to local session');
      }
    }
  },
  {
    id: 'i2',
    name: 'Trip Selection -> Seat Booking Flow',
    run: async () => {
      const trips = await api.fetchTrips();
      if (trips.length === 0) throw new Error('API failed to fetch initial trips');
      
      const testBooking = {
        userEmail: 'pranav.travels@gmail.com',
        tripId: trips[0].id,
        route: 'Integration Test Route',
        type: 'bus',
        date: 'Oct 12, 2023',
        time: '10:00',
        seat: '1A',
        price: 25.0
      };
      
      const response = await api.createBooking(testBooking);
      if (!response.success || !response.bookingId) {
        throw new Error('Booking creation failed in API service');
      }
      
      const userBookings = await api.fetchMyBookings('pranav.travels@gmail.com');
      const found = userBookings.find(b => b.id === response.bookingId);
      if (!found) throw new Error('New booking was not found in user booking history');
    }
  }
];
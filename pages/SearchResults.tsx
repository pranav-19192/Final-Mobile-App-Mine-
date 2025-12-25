
import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';
import { Trip } from '../types.ts';

interface TripProps {
  onBack: () => void;
  onProceed: (trip: Trip, seats: string[]) => void;
}

const SearchResults: React.FC<TripProps> = ({ onBack, onProceed }) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTripId, setSelectedTripId] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(12);

  useEffect(() => {
    const loadTrips = async () => {
      const data = await api.fetchTrips();
      setTrips(data);
      if (data.length > 0) setSelectedTripId(data[0].id);
      setLoading(false);
    };
    loadTrips();
  }, []);

  const toggleSeat = (id: string) => {
    if (id === 'X') return;
    setSelectedSeats(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const currentTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-white space-y-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse">Searching best connections...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white pb-6">
      <div className="px-6 pt-6 flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
        <h2 className="text-xl font-bold">Select Trip</h2>
        <div className="w-6" />
      </div>

      <div className="px-6 flex items-center space-x-3 mb-6">
        <h3 className="text-3xl font-extrabold text-gray-900">London</h3>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        <h3 className="text-3xl font-extrabold text-gray-900">Manchester</h3>
      </div>

      <div className="px-6 flex space-x-4 overflow-x-auto no-scrollbar mb-8">
        {[11, 12, 13, 14, 15].map(day => (
          <button 
            key={day}
            onClick={() => setSelectedDate(day)}
            className={`flex flex-col items-center justify-center min-w-[65px] h-16 rounded-xl border-2 transition-all ${selectedDate === day ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-400'}`}
          >
            <span className="text-[10px] font-bold uppercase">Wed</span>
            <span className="text-xl font-bold">{day}</span>
          </button>
        ))}
      </div>

      <div className="px-6 mb-4">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Available Trips</h4>
        <div className="space-y-4">
          {trips.map(trip => (
            <div 
              key={trip.id}
              onClick={() => setSelectedTripId(trip.id)}
              className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedTripId === trip.id ? 'border-blue-500 bg-white' : 'border-gray-100'}`}
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden mr-4">
                <img src={trip.imageUrl} className="w-full h-full object-cover" alt={trip.operator} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center space-x-2">
                     <span className="text-xl font-bold text-gray-900">{trip.departureTime}</span>
                     <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     <span className="text-xl font-bold text-gray-900 text-opacity-40">{trip.arrivalTime}</span>
                   </div>
                   <span className="text-xl font-bold text-blue-600">${trip.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-xs font-semibold text-gray-400 space-x-2">
                  <span>{trip.operator}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{trip.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-8 pb-32">
         <h4 className="text-xl font-bold text-gray-900 mb-6">Select Seats</h4>
         <div className="bg-gray-50 rounded-2xl p-6">
            <div className="grid grid-cols-4 gap-4">
              {['1A', 'X', '1C', '1D', '2A', '2B', '2C', '2D'].map((seat, idx) => (
                <button
                  key={idx}
                  disabled={seat === 'X'}
                  onClick={() => toggleSeat(seat)}
                  className={`h-12 rounded-xl border flex items-center justify-center text-sm font-bold transition-all 
                    ${seat === 'X' ? 'bg-gray-200 border-gray-200 text-gray-400' : 
                      selectedSeats.includes(seat) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-200 text-gray-700'}`}
                >
                  {seat === 'X' ? '✕' : seat}
                </button>
              ))}
            </div>
         </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 p-6 rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
        <button 
          onClick={() => currentTrip && onProceed(currentTrip, selectedSeats)}
          disabled={selectedSeats.length === 0}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-100 active:scale-95 transition-all disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
        >
          <span>Confirm {selectedSeats.length} Seats • ${(selectedSeats.length * (currentTrip?.price || 0)).toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default SearchResults;

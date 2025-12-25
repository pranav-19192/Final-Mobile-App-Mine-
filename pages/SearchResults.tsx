
import React, { useState } from 'react';

interface TripProps {
  onBack: () => void;
  onProceed: (trip: any, seats: string[]) => void;
}

const SearchResults: React.FC<TripProps> = ({ onBack, onProceed }) => {
  const [selectedTripId, setSelectedTripId] = useState<string>('trip-1');
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['3C', '3D']);
  const [selectedDate, setSelectedDate] = useState(12);

  const trips = [
    { 
      id: 'trip-1', 
      operator: 'National Express', 
      type: 'bus',
      fromTime: '08:00', 
      toTime: '10:30', 
      price: 25.00, 
      stops: 'Direct', 
      duration: '2h 30m',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150' 
    },
    { 
      id: 'trip-2', 
      operator: 'Megabus', 
      type: 'bus',
      fromTime: '09:15', 
      toTime: '11:45', 
      price: 18.50, 
      stops: '1 Stop', 
      duration: '2h 30m',
      img: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=150' 
    }
  ];

  const toggleSeat = (id: string) => {
    if (id === 'X') return; // Taken seat
    setSelectedSeats(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const currentTrip = trips.find(t => t.id === selectedTripId) || trips[0];

  return (
    <div className="flex flex-col h-full bg-white pb-6">
      <div className="px-6 pt-6 flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
        <h2 className="text-xl font-bold">Select Trip</h2>
        <button className="p-2 -mr-2 text-gray-800"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg></button>
      </div>

      <div className="px-6 flex items-center space-x-3 mb-6">
        <h3 className="text-3xl font-extrabold text-gray-900">London</h3>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        <h3 className="text-3xl font-extrabold text-gray-900">Manchester</h3>
      </div>

      <div className="px-6 flex items-center space-x-6 text-gray-500 mb-6">
        <div className="flex items-center space-x-2">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           <span className="font-semibold">Oct 12, 2023</span>
        </div>
        <div className="flex items-center space-x-2">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
           <span className="font-semibold">2 Passengers</span>
        </div>
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
              {selectedTripId === trip.id && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Selected</div>
              )}
              <div className="w-20 h-20 rounded-xl overflow-hidden mr-4">
                <img src={trip.img} className="w-full h-full object-cover" alt={trip.operator} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center space-x-2">
                     <span className="text-xl font-bold text-gray-900">{trip.fromTime}</span>
                     <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     <span className="text-xl font-bold text-gray-900 text-opacity-40">{trip.toTime}</span>
                   </div>
                   <span className="text-xl font-bold text-blue-600">${trip.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center text-xs font-semibold text-gray-400 space-x-2">
                  <span>{trip.operator}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{trip.stops}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{trip.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-bold text-gray-900">Select Seats</h4>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full border border-gray-200"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Avail</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Selected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-[10px] font-bold text-gray-400 uppercase">Taken</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="w-full bg-white border border-gray-100 rounded-lg py-2 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">
            Front / Driver
          </div>
          <div className="grid grid-cols-4 gap-4">
            {['1A', 'X', '1C', '1D', '2A', '2B', '2C', '2D', 'X', '3B', '3C', '3D', '4A', '4B', '4C', '4D'].map((seat, idx) => (
              <button
                key={idx}
                disabled={seat === 'X'}
                onClick={() => toggleSeat(seat)}
                className={`h-12 rounded-xl border flex items-center justify-center text-sm font-bold relative transition-all 
                  ${seat === 'X' ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed' : 
                    selectedSeats.includes(seat) ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-400'}`}
              >
                {seat === 'X' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <>
                    {seat}
                    {selectedSeats.includes(seat) && (
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                         <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                       </div>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 p-6 rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-20">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-gray-400">Selected Seats: <span className="text-gray-900">{selectedSeats.join(', ')}</span></p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-gray-900">${(selectedSeats.length * currentTrip.price).toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through">${(selectedSeats.length * currentTrip.price * 1.2).toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={() => onProceed(currentTrip, selectedSeats)}
            className="flex-1 ml-6 bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-100 active:scale-95 transition-all"
          >
            <span>Proceed to Pay</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

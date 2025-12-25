
import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';

interface MyBookingsProps {
  userEmail: string;
  onBack: () => void;
  onViewTicket: (bookingId: string) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ userEmail, onBack, onViewTicket }) => {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      const data = await api.fetchMyBookings(userEmail);
      setBookings(data);
      setLoading(false);
    };
    loadBookings();
  }, [userEmail]);

  const filteredBookings = bookings.filter(b => 
    tab === 'upcoming' ? b.status === 'Confirmed' : b.status === 'Completed'
  );

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] animate-fadeIn">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400" onClick={onBack}>
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
        </div>

        <div className="bg-gray-100 p-1 rounded-2xl flex">
          <button 
            onClick={() => setTab('upcoming')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'upcoming' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setTab('completed')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${tab === 'completed' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
          >
            Past Trips
          </button>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
             <p className="mt-4 text-gray-400 text-sm">Fetching your tickets...</p>
          </div>
        ) : filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50 animate-fadeIn">
              <div className="p-5 flex items-center">
                <div className="w-16 h-16 rounded-2xl overflow-hidden mr-4 shadow-sm">
                  <img src={booking.img} className="w-full h-full object-cover" alt="Trip" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-widest">{booking.type}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${booking.status === 'Confirmed' ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>{booking.status}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{booking.route}</h3>
                  <div className="flex items-center text-xs text-gray-400 font-semibold mt-1">
                    {booking.date} • {booking.time}
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-gray-50 flex items-center justify-between border-t border-dashed border-gray-100">
                <div className="flex space-x-6">
                  <div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase">Seat</p>
                    <p className="text-xs font-bold text-gray-800">{booking.seat}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase">Platform</p>
                    <p className="text-xs font-bold text-gray-800">{booking.platform}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onViewTicket(booking.id)}
                  className="bg-white px-4 py-2 rounded-xl text-blue-600 text-xs font-bold shadow-sm hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                >
                  View Ticket
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <h3 className="text-lg font-bold text-gray-900">No {tab} bookings</h3>
             <p className="text-sm text-gray-400 mt-2">Your travel history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

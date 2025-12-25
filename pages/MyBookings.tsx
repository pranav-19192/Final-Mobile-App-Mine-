
import React, { useState } from 'react';

interface MyBookingsProps {
  onBack: () => void;
  onViewTicket: (bookingId: string) => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ onBack, onViewTicket }) => {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  const upcomingBookings = [
    {
      id: 'BK-7721',
      route: 'London → Manchester',
      type: 'Bus',
      date: 'Oct 12, 2023',
      time: '14:30',
      seat: '42A',
      platform: 'Gate 4',
      status: 'Confirmed',
      img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=150'
    },
    {
      id: 'BK-8812',
      route: 'London → Paris',
      type: 'Train',
      date: 'Oct 24, 2023',
      time: '09:15',
      seat: 'Coach C, 12',
      platform: 'Platform 11',
      status: 'Confirmed',
      img: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=150'
    }
  ];

  const pastBookings = [
    {
      id: 'BK-5520',
      route: 'Boston → New York',
      type: 'Bus',
      date: 'Sep 30, 2023',
      time: '10:00',
      seat: '12C',
      platform: 'Bay 2',
      status: 'Completed',
      img: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=150'
    }
  ];

  const bookings = tab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] animate-fadeIn">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 bg-white sticky top-0 z-20 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <button className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
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

      <div className="px-6 pt-6 space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
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
                  <h3 className="font-bold text-gray-900 text-lg">{booking.route}</h3>
                  <div className="flex items-center text-xs text-gray-400 font-semibold mt-1">
                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
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
                    <p className="text-[10px] font-bold text-gray-300 uppercase">Gate/Platform</p>
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
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">No trips found</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-[200px]">You haven't booked any trips in this category yet.</p>
            <button 
              onClick={onBack}
              className="mt-8 text-blue-600 font-bold hover:underline"
            >
              Start exploring trips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

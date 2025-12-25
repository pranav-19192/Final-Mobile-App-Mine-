
import React, { useState } from 'react';
import { api } from '../services/api.ts';

interface CheckoutProps {
  userEmail: string;
  trip: any;
  seats: string[];
  onBack: () => void;
  onConfirm: (bookingId: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ userEmail, trip, seats, onBack, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const totalPrice = trip ? trip.price * seats.length : 0;

  const handleConfirm = async () => {
    setLoading(true);
    const bookingData = {
      userEmail,
      tripId: trip.id,
      route: `${trip.operator} • London to Manchester`,
      type: trip.type,
      date: 'Oct 12, 2023',
      time: trip.departureTime,
      seat: seats.join(', '),
      platform: 'Gate 4',
      status: 'Confirmed',
      img: trip.imageUrl,
      price: totalPrice
    };

    try {
      const response = await api.createBooking(bookingData);
      onConfirm(response.bookingId);
    } catch (e) {
      alert("Booking failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-900 font-bold text-lg">Processing Order...</p>
          <p className="text-gray-400 text-sm mt-1">Securing your seats</p>
        </div>
      )}

      <div className="px-6 pt-6 flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full active:scale-90 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <h2 className="flex-1 text-center font-bold text-xl mr-6">Checkout</h2>
      </div>

      <div className="px-6 space-y-8 flex-1 overflow-y-auto no-scrollbar">
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Order Summary</h3>
          <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center">
            <img src={trip?.imageUrl} className="w-16 h-16 rounded-xl object-cover mr-4" alt="Route" />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-gray-900">{trip?.operator}</h4>
                <span className="font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">London to Manchester</p>
              <div className="flex items-center text-[10px] font-bold text-gray-400 mt-2 space-x-3">
                 <span>Seats: {seats.join(', ')}</span>
                 <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                 <span>12 Oct, {trip?.departureTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h3>
           <div className="bg-white p-5 rounded-2xl border-2 border-blue-500 ring-4 ring-blue-50">
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900">Swift Wallet</h4>
                    <p className="text-[10px] text-gray-400">Balance: $500.00</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-auto bg-white p-8 rounded-t-[40px] shadow-2xl">
        <button 
          onClick={handleConfirm}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-100 active:scale-[0.98] transition-all"
        >
          <span>Confirm Payment</span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;

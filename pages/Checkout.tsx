
import React, { useState } from 'react';

interface CheckoutProps {
  trip: any;
  seats: string[];
  onBack: () => void;
  onConfirm: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ trip, seats, onBack, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const totalPrice = trip ? trip.price * seats.length : 45.00;

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formatted.substring(0, 19));
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
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
            <img src={trip?.img || "https://images.unsplash.com/photo-1493397212122-2b85edf8106b?q=80&w=200"} className="w-16 h-16 rounded-xl object-cover mr-4" alt="Route" />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-gray-900">London to Manchester</h4>
                <span className="font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Express Bus 402</p>
              <div className="flex items-center text-[10px] font-bold text-gray-400 mt-2 space-x-3">
                 <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg> 12 Oct, 14:00</span>
                 <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                 <span>Seat {seats.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Payment Method</h3>
          <div className="space-y-4">
            {/* Card Option */}
            <div 
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-white ring-4 ring-blue-50' : 'border-gray-100 bg-white'}`} 
              onClick={() => setPaymentMethod('card')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Credit/Debit Card</h4>
                    <p className="text-[10px] text-gray-400">Visa, Mastercard, Amex</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-500' : 'border-gray-200'}`}>
                   {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Card Number</label>
                    <div className="mt-1 relative">
                       <input 
                        type="text" 
                        value={cardNumber}
                        onChange={handleCardInput}
                        placeholder="0000 0000 0000 0000" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100" 
                       />
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-1">
                          <div className="w-6 h-4 bg-gray-200 rounded"></div>
                       </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Expiry</label>
                      <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100 mt-1" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">CVV</label>
                      <div className="relative mt-1">
                        <input type="text" placeholder="123" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100" />
                        <svg className="w-4 h-4 text-gray-300 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* UPI Option */}
            <div 
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'upi' ? 'border-blue-500 bg-white shadow-lg shadow-blue-50' : 'border-gray-100 bg-white'}`} 
              onClick={() => setPaymentMethod('upi')}
            >
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">UPI / VPA</h4>
                    <p className="text-[10px] text-gray-400">Google Pay, PhonePe, Paytm</p>
                  </div>
               </div>
               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-blue-500 bg-blue-500' : 'border-gray-200'}`}>
                   {paymentMethod === 'upi' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
            </div>
            {paymentMethod === 'upi' && (
              <div className="animate-fadeIn px-1">
                <input 
                  type="text" 
                  placeholder="Enter UPI ID (e.g. user@bank)" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100" 
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-auto bg-white p-8 rounded-t-[40px] shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-400 font-semibold">Total Amount</span>
          <span className="text-2xl font-extrabold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
        <button 
          onClick={onConfirm}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-blue-100 active:scale-[0.98] transition-all"
        >
          <span>Confirm Payment</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </div>
  );
};

export default Checkout;

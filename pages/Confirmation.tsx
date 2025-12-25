
import React, { useState, useEffect } from 'react';
import { api } from '../services/api.ts';

interface ConfirmationProps {
  bookingId: string | null;
  onDone: () => void;
  onHelp: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ bookingId, onDone, onHelp }) => {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookingId) {
      api.fetchBookingById(bookingId).then(data => {
        setBooking(data);
        setLoading(false);
      });
    }
  }, [bookingId]);

  if (loading || !booking) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-white space-y-4">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold">Loading Ticket Details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      <div className="bg-blue-600 px-6 pt-12 pb-24 relative overflow-hidden flex flex-col items-center">
        <button onClick={onDone} className="absolute top-6 left-6 p-2 bg-white/20 rounded-full text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-white font-bold text-xl mb-10">Booking Confirmed</h2>
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl z-10 mb-6">
           <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-white text-3xl font-extrabold text-center z-10">Payment Successful!</h1>
        <p className="text-white/60 font-semibold mt-2 z-10">Transaction ID: #{booking.id}</p>
        <div className="absolute -bottom-1 left-0 w-full h-16 fill-current text-[#F8F9FA]">
          <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,208C840,213,960,203,1080,186.7C1200,171,1320,149,1380,138.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div>
      </div>

      <div className="px-6 -mt-16 z-20 pb-10">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-black/5">
          <div className="p-6 bg-white border-b-2 border-dashed border-gray-100">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-2 text-blue-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                 <span className="font-bold uppercase tracking-widest text-sm">{booking.type} Ticket</span>
               </div>
               <span className="bg-green-100 text-green-600 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">Confirmed</span>
             </div>
             <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">DEP</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{booking.time}</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-1">London St.</p>
                </div>
                <div className="flex-1 px-4 flex flex-col items-center">
                   <div className="w-full flex items-center">
                     <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                     <div className="flex-1 h-px bg-gray-200 border-dashed border-t"></div>
                     <div className="w-2 h-2 rounded-full border-2 border-blue-600"></div>
                   </div>
                   <p className="text-[10px] text-gray-400 font-bold mt-2">2h 30m</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">ARR</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 mt-1">--:--</h3>
                  <p className="text-xs font-semibold text-gray-400 mt-1">Manchester</p>
                </div>
             </div>
          </div>
          <div className="p-8 bg-gray-50 grid grid-cols-2 gap-y-6">
             <div>
               <p className="text-[10px] font-bold text-gray-300 uppercase">Passenger</p>
               <h4 className="font-bold text-gray-800 mt-1">Alex Sterling</h4>
             </div>
             <div className="text-right">
               <p className="text-[10px] font-bold text-gray-300 uppercase">Date</p>
               <h4 className="font-bold text-gray-800 mt-1">{booking.date}</h4>
             </div>
             <div>
               <p className="text-[10px] font-bold text-gray-300 uppercase">Seat</p>
               <h4 className="font-bold text-gray-800 mt-1">{booking.seat}</h4>
             </div>
             <div className="text-right">
               <p className="text-[10px] font-bold text-gray-300 uppercase">Platform</p>
               <h4 className="font-bold text-gray-800 mt-1">{booking.platform}</h4>
             </div>
          </div>
          <div className="p-8 flex flex-col items-center bg-white border-t border-gray-100">
             <div className="p-4 border-2 border-dashed border-gray-100 rounded-2xl">
               <div className="w-32 h-32 bg-[#2D4E4E] p-2 rounded-lg flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-white p-2 flex items-center justify-center">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.id}`} alt="QR Code" className="w-full h-full" />
                  </div>
               </div>
             </div>
             <p className="text-[10px] font-bold text-gray-400 text-center mt-4 max-w-[150px]">Scan this code at the terminal gate for entry.</p>
          </div>
        </div>
        <button 
          onClick={onHelp}
          className="w-full mt-6 py-4 flex items-center justify-center space-x-3 bg-white border border-gray-100 rounded-2xl text-blue-600 font-bold shadow-sm hover:bg-blue-50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          <span>Need help with this trip?</span>
        </button>
      </div>
    </div>
  );
};

export default Confirmation;

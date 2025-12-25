
import React, { useState } from 'react';

interface HomeProps {
  user: any;
  onSearch: () => void;
  onAdmin: () => void;
  onGoBookings: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onSearch, onAdmin, onGoBookings }) => {
  const [mode, setMode] = useState<'bus' | 'train'>('bus');
  const [origin, setOrigin] = useState('New York, NY');
  const [destination, setDestination] = useState('');

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] pb-10">
      {/* Header */}
      <div className="px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onAdmin}
            className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden active:scale-95 transition-transform"
          >
            <img src={user?.avatar || "https://picsum.photos/seed/guest/200"} alt="Avatar" />
          </button>
          <div>
            <p className="text-sm text-gray-500">Good morning,</p>
            <h2 className="text-xl font-bold text-gray-900">{user?.name?.split(' ')[0] || 'Guest'}</h2>
          </div>
        </div>
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm relative hover:bg-gray-50 active:scale-95 transition-all">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>

      {/* Search Form Card */}
      <div className="mx-6 mt-8 bg-white rounded-3xl p-6 shadow-sm">
        <div className="bg-gray-100 p-1 rounded-2xl flex">
          <button 
            onClick={() => setMode('bus')}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${mode === 'bus' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-500 font-medium'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            <span>Bus</span>
          </button>
          <button 
            onClick={() => setMode('train')}
            className={`flex-1 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all ${mode === 'train' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-gray-500 font-medium'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            <span>Train</span>
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="relative">
            <label className="text-xs font-semibold text-gray-400 absolute top-2 left-4">Origin</label>
            <div className="w-full bg-gray-50 pt-7 pb-3 px-4 rounded-xl flex items-center border border-transparent focus-within:border-blue-100 transition-all">
              <div className="w-4 h-4 rounded-full border-2 border-blue-500 mr-3"></div>
              <input 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                type="text" 
                placeholder="From"
                className="bg-transparent text-gray-800 font-semibold focus:outline-none w-full" 
              />
            </div>
          </div>

          <div className="relative -my-2 flex justify-end pr-8 z-10">
             <button 
              onClick={swapLocations}
              className="w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-md text-blue-500 active:rotate-180 transition-transform duration-300"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
             </button>
          </div>

          <div className="relative">
            <label className="text-xs font-semibold text-gray-400 absolute top-2 left-4">Destination</label>
            <div className="w-full bg-gray-50 pt-7 pb-3 px-4 rounded-xl flex items-center border border-transparent focus-within:border-blue-100 transition-all">
              <svg className="w-5 h-5 text-gray-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <input 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                type="text" 
                placeholder="To" 
                className="bg-transparent text-gray-800 font-semibold focus:outline-none w-full placeholder-gray-300" 
              />
            </div>
          </div>

          <button 
            onClick={onSearch}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center space-x-2 active:scale-[0.98] transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span>Search connection</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

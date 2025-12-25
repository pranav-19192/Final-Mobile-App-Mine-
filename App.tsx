
import React, { useState } from 'react';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import SearchResults from './pages/SearchResults.tsx';
import Checkout from './pages/Checkout.tsx';
import Confirmation from './pages/Confirmation.tsx';
import HelpCenter from './pages/HelpCenter.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import MyBookings from './pages/MyBookings.tsx';
import { AppView } from './types.ts';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('LOGIN');
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const navigateTo = (newView: AppView) => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    switch (view) {
      case 'LOGIN':
        return <Login onLogin={() => navigateTo('HOME')} />;
      case 'HOME':
        return (
          <Home 
            onSearch={() => navigateTo('SEARCH_RESULTS')} 
            onAdmin={() => navigateTo('ADMIN')} 
            onGoBookings={() => navigateTo('MY_BOOKINGS')}
          />
        );
      case 'MY_BOOKINGS':
        return (
          <MyBookings 
            onBack={() => navigateTo('HOME')} 
            onViewTicket={() => navigateTo('CONFIRMATION')}
          />
        );
      case 'SEARCH_RESULTS':
        return (
          <SearchResults 
            onBack={() => navigateTo('HOME')} 
            onProceed={(trip, seats) => {
              setSelectedTrip(trip);
              setSelectedSeats(seats);
              navigateTo('CHECKOUT');
            }} 
          />
        );
      case 'CHECKOUT':
        return (
          <Checkout 
            trip={selectedTrip} 
            seats={selectedSeats}
            onBack={() => navigateTo('SEARCH_RESULTS')} 
            onConfirm={() => navigateTo('CONFIRMATION')} 
          />
        );
      case 'CONFIRMATION':
        return <Confirmation onDone={() => navigateTo('HOME')} onHelp={() => navigateTo('HELP')} />;
      case 'HELP':
        return <HelpCenter onBack={() => navigateTo('HOME')} />;
      case 'ADMIN':
        return <AdminDashboard onBack={() => navigateTo('HOME')} />;
      default:
        return <Login onLogin={() => navigateTo('HOME')} />;
    }
  };

  const showNav = view === 'HOME' || view === 'MY_BOOKINGS';

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white shadow-2xl relative flex flex-col min-h-screen overflow-x-hidden no-scrollbar">
        <div className="flex-1 pb-20">
          {renderView()}
        </div>
        
        {showNav && (
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex items-center justify-around py-3 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
            <button 
              onClick={() => navigateTo('HOME')}
              className={`flex flex-col items-center space-y-1 transition-colors ${view === 'HOME' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6" fill={view === 'HOME' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-[10px] font-bold">Explore</span>
            </button>
            <button 
              onClick={() => navigateTo('MY_BOOKINGS')}
              className={`flex flex-col items-center space-y-1 transition-colors ${view === 'MY_BOOKINGS' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6" fill={view === 'MY_BOOKINGS' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-[10px] font-bold">Bookings</span>
            </button>
            <button 
              onClick={() => navigateTo('HELP')}
              className={`flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-600 transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-[10px] font-bold">Help</span>
            </button>
            <button 
              onClick={() => navigateTo('ADMIN')}
              className={`flex flex-col items-center space-y-1 text-gray-400 hover:text-blue-600 transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[10px] font-bold">Profile</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

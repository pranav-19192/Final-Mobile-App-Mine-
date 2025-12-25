
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', value: 300 },
  { name: 'Tue', value: 450 },
  { name: 'Wed', value: 320 },
  { name: 'Thu', value: 500 },
  { name: 'Fri', value: 480 },
  { name: 'Sat', value: 700 },
  { name: 'Sun', value: 550 },
];

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [services, setServices] = useState([
    { id: 1, name: 'Express 404', route: 'NYC → DC', seats: '45/50', status: 'ON TIME', color: 'green' },
    { id: 2, name: 'Local 202', route: 'Boston → NYC', seats: '32/40', status: 'DELAYED', color: 'amber' },
    { id: 3, name: 'Night 55', route: 'Chicago → Detroit', seats: '0/50', status: 'SCHEDULED', color: 'blue' },
  ]);

  const deleteService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addService = () => {
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    setServices([{
      id: newId,
      name: `New Route ${newId}`,
      route: 'Origin → Dest',
      seats: '0/40',
      status: 'SCHEDULED',
      color: 'blue'
    }, ...services]);
  };

  const editService = (name: string) => {
    alert(`Editing details for: ${name}`);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] pb-24">
      <div className="px-6 pt-8 flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Good Morning,</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Admin Dashboard</h1>
        </div>
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
             <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl shadow-sm">
           <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
           </div>
           <p className="text-xs font-bold text-gray-400 uppercase">Bookings</p>
           <h3 className="text-2xl font-extrabold text-gray-900 mt-1">1,240</h3>
           <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center">
             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
             +12% <span className="text-gray-300 ml-1">vs last week</span>
           </p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm">
           <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <p className="text-xs font-bold text-gray-400 uppercase">Revenue</p>
           <h3 className="text-2xl font-extrabold text-gray-900 mt-1">$15.4k</h3>
           <p className="text-[10px] text-green-500 font-bold mt-2 flex items-center">
             <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
             +5% <span className="text-gray-300 ml-1">vs last week</span>
           </p>
        </div>
      </div>

      <div className="mx-6 bg-white rounded-3xl p-6 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-8">
           <h4 className="font-bold text-gray-900">Weekly Trends</h4>
           <div className="bg-gray-50 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-[10px] font-bold text-gray-500">
             <span>Last 7 Days</span>
             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
           </div>
        </div>
        <div className="h-40 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={chartData}>
               <defs>
                 <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
               <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9CA3AF', fontWeight: 'bold'}} />
               <Tooltip />
               <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-xl font-bold text-gray-900">Active Services</h3>
           <button 
            onClick={addService}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-100 active:scale-95 transition-all"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
             <span>Add Service</span>
           </button>
        </div>

        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-transparent hover:border-blue-100 transition-all animate-fadeIn">
               <div className="flex items-center">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-${service.color}-500 bg-${service.color}-50 mr-4`}>
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{service.route}</p>
                    <div className="flex items-center text-[10px] text-gray-500 font-bold mt-2">
                       <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2"/></svg>
                       {service.seats} Seats
                    </div>
                 </div>
               </div>
               <div className="flex flex-col items-end space-y-3">
                 <span className={`text-[8px] font-extrabold px-2 py-1 rounded-md bg-${service.color}-50 text-${service.color}-600 uppercase tracking-tighter`}>{service.status}</span>
                 <div className="flex space-x-2">
                    <button 
                      onClick={() => editService(service.name)}
                      className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-all active:scale-90"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeWidth="2"/></svg>
                    </button>
                    <button 
                      onClick={() => deleteService(service.id)}
                      className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/></svg>
                    </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex items-center justify-around py-4 z-50">
        <button onClick={onBack} className="flex flex-col items-center space-y-1 text-blue-600 active:scale-90 transition-transform">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
           <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => alert('Opening Fleet Management')} className="flex flex-col items-center space-y-1 text-gray-400 active:scale-90 transition-transform">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
           <span className="text-[10px] font-bold">Fleet</span>
        </button>
        <button onClick={() => alert('Opening User Management')} className="flex flex-col items-center space-y-1 text-gray-400 active:scale-90 transition-transform">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
           <span className="text-[10px] font-bold">Users</span>
        </button>
        <button onClick={() => alert('Opening Settings')} className="flex flex-col items-center space-y-1 text-gray-400 active:scale-90 transition-transform">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
           <span className="text-[10px] font-bold">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

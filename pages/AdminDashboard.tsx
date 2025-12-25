
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

const AdminDashboard: React.FC<{ onBack: () => void, onLogout: () => void }> = ({ onBack, onLogout }) => {
  const [services, setServices] = useState([
    { id: 1, name: 'Express 404', route: 'NYC → DC', seats: '45/50', status: 'ON TIME', color: 'green' },
    { id: 2, name: 'Local 202', route: 'Boston → NYC', seats: '32/40', status: 'DELAYED', color: 'amber' },
  ]);

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] pb-24">
      <div className="px-6 pt-8 flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">System Admin</p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Dashboard</h1>
        </div>
        <button 
          onClick={onLogout}
          className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span>Logout</span>
        </button>
      </div>

      <div className="mx-6 bg-white rounded-3xl p-6 shadow-sm mb-8">
        <h4 className="font-bold text-gray-900 mb-6">Traffic Trends</h4>
        <div className="h-40 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
               <XAxis dataKey="name" hide />
               <Tooltip />
               <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="#3b82f6" fillOpacity={0.1} />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>

      <div className="px-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Network Status</h3>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
               <div className="flex items-center">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" strokeWidth="2"/></svg>
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900">{service.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{service.route}</p>
                 </div>
               </div>
               <span className={`text-[8px] font-extrabold px-2 py-1 rounded bg-${service.color}-50 text-${service.color}-600 uppercase`}>{service.status}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex items-center justify-around py-4 z-50">
        <button onClick={onBack} className="text-blue-600 font-bold text-xs">Back to Home</button>
      </div>
    </div>
  );
};

export default AdminDashboard;

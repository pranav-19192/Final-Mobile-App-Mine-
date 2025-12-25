
import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [tab, setTab] = useState<'email' | 'mobile'>('email');

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="relative h-64">
        <img 
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
          alt="Train" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 rounded-full p-4 shadow-lg ring-4 ring-white">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>

      <div className="mt-12 px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-500 mt-2">Start your journey with us</p>
      </div>

      <div className="px-8 mt-8">
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setTab('email')}
            className={`flex-1 pb-4 text-sm font-semibold transition-colors ${tab === 'email' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
          >
            Email
          </button>
          <button 
            onClick={() => setTab('mobile')}
            className={`flex-1 pb-4 text-sm font-semibold transition-colors ${tab === 'mobile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
          >
            Mobile Number
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <div className="animate-fadeIn" key={tab}>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {tab === 'email' ? 'Email Address' : 'Mobile Number'}
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                {tab === 'email' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                )}
              </span>
              <input 
                type={tab === 'email' ? 'email' : 'tel'} 
                placeholder={tab === 'email' ? 'name@example.com' : '+1 000 000 0000'} 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <div className="text-right mt-2">
              <button 
                onClick={() => alert('Reset link sent to your ' + (tab === 'email' ? 'email' : 'mobile'))}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full mt-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          Log In
        </button>

        <div className="mt-8 flex items-center">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="px-4 text-sm text-gray-400 font-medium uppercase tracking-widest text-[10px]">Or continue with</span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full mt-6 py-4 flex items-center justify-center space-x-3 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6" alt="Google" />
          <span>Continue with Google</span>
        </button>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <button onClick={() => alert('Registration logic goes here')} className="text-blue-600 font-bold ml-1 hover:underline">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;

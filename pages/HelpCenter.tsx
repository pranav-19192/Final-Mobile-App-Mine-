
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const HelpCenter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! You are connected with Alex. How can we help with your journey to London today?", timestamp: '10:30 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      text: inputText, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Previous messages: ${messages.map(m => `${m.role}: ${m.text}`).join('\n')}\nUser: ${inputText}`,
        config: {
          systemInstruction: 'You are Alex, a friendly travel specialist for SwiftTransit. You help users with their bus and train bookings, refunds, and trip changes. Keep responses brief, empathetic, and professional. Current trip details: London #AB123 leaving today at 14:30, Seat 4B.',
        }
      });

      const modelText = response.text || "I'm sorry, I'm having trouble connecting right now. Can I help with anything else?";
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: modelText, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Sorry, I encountered an error. Please try again later.", 
        timestamp: 'Now' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA]">
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 mr-4 text-gray-800 focus:outline-none"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg></button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/seed/alex-support/200" alt="Agent" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-3">
             <h3 className="font-bold text-gray-900 leading-none">Alex • Travel Specialist</h3>
             <p className="text-[10px] text-gray-400 font-semibold mt-1">Typically replies in 2 min</p>
          </div>
        </div>
        <button className="p-2 text-gray-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6" ref={scrollRef}>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex items-center animate-fadeIn">
           <img src="https://images.unsplash.com/photo-1493397212122-2b85edf8106b?q=80&w=100" className="w-16 h-16 rounded-2xl object-cover mr-4" alt="Trip" />
           <div className="flex-1">
              <h4 className="font-bold text-gray-900">Trip to London #AB123</h4>
              <p className="text-[10px] text-gray-400 font-bold mt-1">Today, 14:30 • Seat 4B</p>
              <button className="text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg mt-2">View Ticket</button>
           </div>
        </div>

        <div className="flex justify-center">
           <span className="text-[10px] font-bold text-gray-300 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">Chat started today at 10:30 AM</span>
        </div>

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
               {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 shrink-0 mb-1">
                    <img src="https://picsum.photos/seed/alex-support/200" alt="Agent" />
                  </div>
               )}
               <div className="flex flex-col">
                 <div className={`px-5 py-3 rounded-3xl text-sm font-medium shadow-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-700 rounded-bl-none'}`}>
                   {msg.text}
                 </div>
                 <span className={`text-[10px] text-gray-400 font-bold mt-1 ${msg.role === 'user' ? 'text-right mr-2' : 'ml-2'}`}>{msg.timestamp}</span>
               </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
             <div className="flex items-end space-x-3">
               <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <img src="https://picsum.photos/seed/alex-support/200" alt="Agent" />
               </div>
               <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex space-x-1">
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
             </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white rounded-t-[40px] shadow-2xl space-y-4">
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
           {["Where is my ticket?", "Refund Policy", "Baggage Limit", "Contact Support"].map(tag => (
             <button key={tag} className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
               {tag}
             </button>
           ))}
        </div>

        <div className="flex items-center space-x-3">
           <button className="w-10 h-10 flex items-center justify-center text-blue-600">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
           </button>
           <div className="flex-1 relative">
             <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              type="text" 
              placeholder="Type a message..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-4 pr-12 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-100" 
             />
             <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </button>
           </div>
           <button 
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${inputText.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-300'}`}
           >
             <svg className="w-6 h-6 rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
           </button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

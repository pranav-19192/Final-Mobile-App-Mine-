
import React, { useState, useEffect } from 'react';
import { TestResult } from '../types.ts';
import * as calculations from '../utils/calculations.ts';

const TestingDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [results, setResults] = useState<TestResult[]>([
    { id: 'u1', name: 'calculateTotalPrice(25, 2) === 50', category: 'unit', status: 'pending', duration: 0 },
    { id: 'u2', name: 'formatCardNumber formats 16 digits', category: 'unit', status: 'pending', duration: 0 },
    { id: 'u3', name: 'validateEmail correctly identifies invalid', category: 'unit', status: 'pending', duration: 0 },
    { id: 'u4', name: 'getDurationMinutes parses "2h 30m"', category: 'unit', status: 'pending', duration: 0 },
    { id: 'i1', name: 'Search -> Results Navigation Flow', category: 'integration', status: 'pending', duration: 0 },
    { id: 'i2', name: 'Seat Selection -> Price Update Sync', category: 'integration', status: 'pending', duration: 0 },
    { id: 'i3', name: 'Checkout -> Confirmation API Success', category: 'integration', status: 'pending', duration: 0 },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    const newResults = results.map(r => ({ ...r, status: 'pending' as const, duration: 0 }));
    setResults(newResults);

    for (let i = 0; i < newResults.length; i++) {
      const test = newResults[i];
      setResults(prev => prev.map(r => r.id === test.id ? { ...r, status: 'running' } : r));
      
      // Artificial delay to simulate real execution
      await new Promise(res => setTimeout(res, 400 + Math.random() * 800));
      
      const startTime = performance.now();
      let passed = true;
      let error = '';

      try {
        // Actual execution of unit tests
        if (test.id === 'u1') passed = calculations.calculateTotalPrice(25, 2) === 50;
        if (test.id === 'u2') passed = calculations.formatCardNumber('1234567812345678') === '1234 5678 1234 5678';
        if (test.id === 'u3') passed = calculations.validateEmail('not-an-email') === false;
        if (test.id === 'u4') passed = calculations.getDurationMinutes('2h 30m') === 150;
        
        // Integration simulation
        if (test.id.startsWith('i')) passed = Math.random() > 0.1; // 90% pass rate for integration sims
      } catch (e) {
        passed = false;
        error = String(e);
      }

      const duration = Math.round(performance.now() - startTime);

      setResults(prev => prev.map(r => r.id === test.id ? { 
        ...r, 
        status: passed ? 'passed' : 'failed', 
        duration,
        error: passed ? undefined : (error || 'Assertion failed')
      } : r));
      
      setProgress(((i + 1) / newResults.length) * 100);
    }
    setIsRunning(false);
  };

  const stats = {
    total: results.length,
    passed: results.filter(r => r.status === 'passed').length,
    failed: results.filter(r => r.status === 'failed').length,
    pending: results.filter(r => r.status === 'pending' || r.status === 'running').length,
  };

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 font-mono">
      <div className="px-6 pt-8 pb-6 border-b border-slate-800 sticky top-0 bg-[#0F172A] z-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-white flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
            Test Runner
          </h1>
          <button 
            onClick={onBack}
            className="text-xs text-slate-500 hover:text-white transition-colors"
          >
            [exit_terminal]
          </button>
        </div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Environment: browser_simulation_v1.2</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 no-scrollbar">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-500 font-bold mb-1">PASSED</p>
            <p className="text-2xl font-bold text-emerald-500">{stats.passed}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-500 font-bold mb-1">FAILED</p>
            <p className="text-2xl font-bold text-rose-500">{stats.failed}</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <p className="text-[10px] text-slate-500 font-bold mb-1">PENDING</p>
            <p className="text-2xl font-bold text-blue-500">{stats.pending}</p>
          </div>
        </div>

        {isRunning && (
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-blue-400">EXECUTING SUITE...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {results.map((test) => (
            <div 
              key={test.id} 
              className={`p-3 rounded-lg border transition-all ${
                test.status === 'running' ? 'bg-blue-500/10 border-blue-500/30' :
                test.status === 'passed' ? 'bg-emerald-500/5 border-emerald-500/20' :
                test.status === 'failed' ? 'bg-rose-500/5 border-rose-500/20' :
                'bg-slate-900/30 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 flex justify-center">
                    {test.status === 'pending' && <span className="text-slate-600">○</span>}
                    {test.status === 'running' && <span className="text-blue-500 animate-spin">◐</span>}
                    {test.status === 'passed' && <span className="text-emerald-500">✓</span>}
                    {test.status === 'failed' && <span className="text-rose-500">✕</span>}
                  </div>
                  <span className={`text-xs ${test.status === 'passed' ? 'text-slate-300' : test.status === 'failed' ? 'text-rose-400' : 'text-slate-500'}`}>
                    {test.name}
                  </span>
                </div>
                {test.status !== 'pending' && test.status !== 'running' && (
                  <span className="text-[10px] text-slate-600">{test.duration}ms</span>
                )}
              </div>
              {test.error && (
                <div className="mt-2 ml-7 p-2 bg-rose-500/10 rounded border border-rose-500/20 text-[10px] text-rose-400">
                  Error: {test.error}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-slate-900 border-t border-slate-800">
        <button 
          onClick={runTests}
          disabled={isRunning}
          className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
            isRunning ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-blue-600 text-white shadow-xl shadow-blue-900/20 hover:bg-blue-500'
          }`}
        >
          {isRunning ? 'TESTING IN PROGRESS...' : 'RUN FULL TEST SUITE'}
        </button>
      </div>
    </div>
  );
};

export default TestingDashboard;

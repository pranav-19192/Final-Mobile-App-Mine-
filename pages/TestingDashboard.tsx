
import React, { useState } from 'react';
import { TestResult } from '../types.ts';
import { allTests } from '../tests/suite.ts';

const TestingDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [results, setResults] = useState<TestResult[]>(
    allTests.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category,
      status: 'pending',
      duration: 0
    }))
  );

  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    
    // Reset results
    setResults(prev => prev.map(r => ({ ...r, status: 'pending', duration: 0, error: undefined })));

    for (let i = 0; i < allTests.length; i++) {
      const testCase = allTests[i];
      
      setResults(prev => prev.map(r => r.id === testCase.id ? { ...r, status: 'running' } : r));
      
      const startTime = performance.now();
      let passed = true;
      let errorMsg = '';

      try {
        await testCase.run();
      } catch (e: any) {
        passed = false;
        errorMsg = e.message || String(e);
      }

      const duration = Math.round(performance.now() - startTime);

      setResults(prev => prev.map(r => r.id === testCase.id ? { 
        ...r, 
        status: passed ? 'passed' : 'failed', 
        duration,
        error: passed ? undefined : errorMsg
      } : r));
      
      setProgress(((i + 1) / allTests.length) * 100);
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
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Interactive CI/CD Environment</p>
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
            <p className="text-[10px] text-slate-500 font-bold mb-1">TOTAL</p>
            <p className="text-2xl font-bold text-blue-500">{stats.total}</p>
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
                    {test.status === 'running' && <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                    {test.status === 'passed' && <span className="text-emerald-500">✓</span>}
                    {test.status === 'failed' && <span className="text-rose-500">✕</span>}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs ${test.status === 'passed' ? 'text-slate-300' : test.status === 'failed' ? 'text-rose-400' : 'text-slate-500'}`}>
                      {test.name}
                    </span>
                    <span className="text-[8px] text-slate-600 font-bold uppercase mt-0.5">{test.category}</span>
                  </div>
                </div>
                {test.status !== 'pending' && test.status !== 'running' && (
                  <span className="text-[10px] text-slate-600">{test.duration}ms</span>
                )}
              </div>
              {test.error && (
                <div className="mt-2 ml-7 p-2 bg-rose-500/10 rounded border border-rose-500/20 text-[10px] text-rose-400 break-words">
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
          {isRunning ? 'RUNNING REAL-TIME TESTS...' : 'EXECUTE REAL TEST SUITE'}
        </button>
      </div>
    </div>
  );
};

export default TestingDashboard;

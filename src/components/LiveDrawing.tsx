import React, { useEffect, useState } from 'react';

export const LiveDrawing: React.FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(28);
  const [seconds, setSeconds] = useState(4);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        // Reset timer when it reaches zero
        setHours(0);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);
  
  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Next Drawing</h3>
            <p className="text-center text-gray-600 mb-4">Thu, Jun 5, 2025</p>
            
            <div className="flex justify-center gap-2 mb-4">
              <div className="bg-gray-800 rounded-md px-3 py-2">
                <span className="text-2xl font-bold text-white">{formatTime(hours)}</span>
              </div>
              <div className="text-gray-800 text-2xl font-bold">:</div>
              <div className="bg-gray-800 rounded-md px-3 py-2">
                <span className="text-2xl font-bold text-white">{formatTime(minutes)}</span>
              </div>
              <div className="text-gray-800 text-2xl font-bold">:</div>
              <div className="bg-gray-800 rounded-md px-3 py-2">
                <span className="text-2xl font-bold text-white">{formatTime(seconds)}</span>
              </div>
            </div>
            
            <p className="text-center text-gray-600 text-sm">Results announced shortly after drawing</p>
          </div>
          
          <div className="bg-red-600 rounded-xl shadow-lg p-6 col-span-1 md:col-span-1 text-center">
            <h3 className="text-xl font-bold text-white mb-2 text-center">ESTIMATED JACKPOT</h3>
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">$1,039.93 USD</div>
            <div className="text-xl font-medium text-white/90 mb-2">CASH VALUE</div>
            <div className="text-3xl font-bold text-white">6.82 SOL</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Last 3 Winners</h3>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">6/5/2025 at 11:00:45 AM</div>
                    <div className="text-sm font-medium text-gray-800 truncate max-w-[120px]">F5MwsvBw33gs9Fn6yeLDoxNxg8...</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">$3,041</div>
                    <div className="text-sm text-gray-600">19.94 SOL</div>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">6/5/2025 at 10:00:08 AM</div>
                    <div className="text-sm font-medium text-gray-800 truncate max-w-[120px]">EEcYgxgENgdRaYmFSkcDBig7JSC...</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">$2,504</div>
                    <div className="text-sm text-gray-600">16.42 SOL</div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">6/5/2025 at 9:00:27 AM</div>
                    <div className="text-sm font-medium text-gray-800 truncate max-w-[120px]">DMY9RYkjE2ZBYWmqZZ4ihZEQ3i...</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">$2,695</div>
                    <div className="text-sm text-gray-600">17.67 SOL</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <a href="#winners" className="text-red-600 hover:text-red-800 font-medium text-sm">
                View All Winners →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
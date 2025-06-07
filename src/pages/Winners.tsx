import React from 'react';
import { useEffect } from 'react';
import { WinnersTable } from '../components/WinnersTable';
import { ShieldCheck } from 'lucide-react';
import { useWinners } from '../hooks/useApi';

export const Winners: React.FC = () => {
  const { data: winners, loading } = useWinners(true, 10000); // Auto-refresh every 10 seconds
  const totalWinnings = winners.reduce((sum, winner) => sum + winner.distributed, 0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Total Draws</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {loading && winners.length === 0 ? '...' : winners.length}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Hourly drawings</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Total Distributed</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {loading && winners.length === 0 ? '...' : `${totalWinnings.toFixed(2)} SOL`}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {loading && winners.length === 0 ? '...' : `$${(totalWinnings * 152.45).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Verification</h3>
            <div className="flex justify-center items-center">
              <ShieldCheck size={36} className="text-red-600" />
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 ml-2">100%</p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">On-chain verified</p>
          </div>
        </div>
      </div>
      <WinnersTable winners={winners} loading={loading} />
    </div>
  );
};
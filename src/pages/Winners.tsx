import React from 'react';
import { useEffect } from 'react';
import { WinnersTable } from '../components/WinnersTable';
import { ShieldCheck } from 'lucide-react';
import { getAllWinners } from '../utils/winners';

export const Winners: React.FC = () => {
  const winners = getAllWinners();
  const totalWinnings = winners.reduce((sum, winner) => sum + winner.distributed, 0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Draws</h3>
            <p className="text-4xl font-bold text-gray-900">{winners.length}</p>
            <p className="text-sm text-gray-500 mt-2">Hourly drawings</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Distributed</h3>
            <p className="text-4xl font-bold text-gray-900">{totalWinnings.toFixed(2)} SOL</p>
            <p className="text-sm text-gray-500 mt-2">${(totalWinnings * 152.45).toFixed(2)} USD</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Verification</h3>
            <div className="flex justify-center items-center">
              <ShieldCheck size={36} className="text-red-600" />
              <p className="text-4xl font-bold text-gray-900 ml-2">100%</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">On-chain verified</p>
          </div>
        </div>
      </div>
      <WinnersTable winners={winners} />
    </div>
  );
};
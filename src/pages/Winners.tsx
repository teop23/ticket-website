import React from 'react';
import { WinnersTable } from '../components/WinnersTable';
import { getAllWinners } from '../utils/winners';
import { Link } from 'react-router-dom';

export const Winners: React.FC = () => {
  const winners = getAllWinners();
  
  return (
    <div className="pt-16 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-red-600 hover:text-red-800 font-medium inline-flex items-center">
          ← Back to Home
        </Link>
      </div>
      <WinnersTable winners={winners} />
    </div>
  );
};
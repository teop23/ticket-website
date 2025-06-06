import React from 'react';
import { WinnersTable } from '../components/WinnersTable';
import { getAllWinners } from '../utils/winners';

export const Winners: React.FC = () => {
  const winners = getAllWinners();
  
  return (
    <div className="pt-16 bg-gray-50">
      <WinnersTable winners={winners} />
    </div>
  );
};
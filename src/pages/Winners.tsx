import React from 'react';
import { WinnersTable } from '../components/WinnersTable';
import { getAllWinners } from '../utils/winners';

export const Winners: React.FC = () => {
  const winners = getAllWinners();
  
  return <WinnersTable winners={winners} />;
};
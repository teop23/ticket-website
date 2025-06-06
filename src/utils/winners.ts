import distributionsData from '../data/distros.json';

export interface Winner {
  id: number;
  token_id: number;
  eligible: number;
  distributed: number;
  date_added: string;
  data: string;
}

export const getRecentWinners = (count: number = 3): Winner[] => {
  return distributionsData
    .sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime())
    .slice(0, count);
};

export const getAllWinners = (): Winner[] => {
  return distributionsData
    .sort((a, b) => new Date(b.date_added).getTime() - new Date(a.date_added).getTime());
};
import { useEffect, useState } from 'react';
import { api } from '../api';
import { PotData, Winner } from '../api/types';

/**
 * Hook for fetching pot data
 */
export const usePot = (autoRefresh: boolean = false, interval: number = 20000) => {
  const [data, setData] = useState<PotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPot = async () => {
    if (!data) setLoading(true);
    setError(null);
    
    const response = await api.getPot();
    
    setData(response.data);
    if (!response.success) {
      setError(response.error || 'Failed to fetch pot data');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPot();
    
    if (autoRefresh) {
      const intervalId = setInterval(fetchPot, interval);
      return () => clearInterval(intervalId);
    }
  }, [autoRefresh, interval]);

  return { data, loading, error, refetch: fetchPot };
};

/**
 * Calculate time until next hour mark based on last distribution
 */
const calculateTimeToNextDistribution = (winners: Winner[]): number => {
  if (winners.length === 0) {
    // If no winners yet, assume next distribution is at the next hour mark
    const now = new Date();
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    return nextHour.getTime() - now.getTime();
  }

  // Get the most recent distribution
  const lastDistribution = winners[0];
  const lastDistroTime = new Date(lastDistribution.date_added);
  const now = new Date();

  // Calculate next distribution time (1 hour after last distribution)
  const nextDistroTime = new Date(lastDistroTime.getTime() + 60 * 60 * 1000);
  
  // If next distribution time has passed, it should be at the next hour mark
  if (nextDistroTime.getTime() <= now.getTime()) {
    const nextHour = new Date(now);
    nextHour.setHours(now.getHours() + 1, 0, 0, 0);
    return nextHour.getTime() - now.getTime();
  }

  return nextDistroTime.getTime() - now.getTime();
};
/**
 * Hook for fetching winners data
 */
export const useWinners = (autoRefresh: boolean = false) => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchWinners = async () => {
    if (data.length === 0) setLoading(true);
    setError(null);
    
    const response = await api.getWinners();
    
    setData(response.data);
    if (!response.success) {
      setError(response.error || 'Failed to fetch winners data');
    }
    
    setLoading(false);
    return response.data;
  };

  useEffect(() => {
    setupDistributionSync();
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh]);

  return { data, loading, error, refetch: fetchWinners };
};

/**
 * Hook for fetching recent winners
 */
export const useRecentWinners = (count: number = 3, autoRefresh: boolean = false) => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchRecentWinners = async () => {
    if (data.length === 0) setLoading(true);
    setError(null);
    
    const response = await api.getRecentWinners(count);
    
    setData(response.data);
    if (!response.success) {
      setError(response.error || 'Failed to fetch recent winners');
    }
    
    setLoading(false);
    return response.data;
  };

  const setupDistributionSync = async () => {
    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Fetch initial data
    const winners = await fetchRecentWinners();
    
    if (autoRefresh) {
      // Calculate time to next distribution
      const timeToNext = calculateTimeToNextDistribution(winners);
      
      // Set up the synced interval
      const syncedIntervalId = setTimeout(() => {
        // Fetch immediately when the hour hits
        fetchRecentWinners();
        
        // Then set up regular hourly intervals
        const hourlyIntervalId = setInterval(fetchRecentWinners, 60 * 60 * 1000); // 1 hour
        setIntervalId(hourlyIntervalId);
      }, timeToNext);
      
      setIntervalId(syncedIntervalId);
    }
  };
  useEffect(() => {
    setupDistributionSync();
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [count, autoRefresh]);

  return { data, loading, error, refetch: fetchRecentWinners };
};
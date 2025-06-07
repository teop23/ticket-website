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
 * Hook for fetching winners data
 */
export const useWinners = (autoRefresh: boolean = false, interval: number = 10000) => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWinners = async () => {
    if (data.length === 0) setLoading(true);
    setError(null);
    
    const response = await api.getWinners();
    
    setData(response.data);
    if (!response.success) {
      setError(response.error || 'Failed to fetch winners data');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchWinners();
    
    if (autoRefresh) {
      const intervalId = setInterval(fetchWinners, interval);
      return () => clearInterval(intervalId);
    }
  }, [autoRefresh, interval]);

  return { data, loading, error, refetch: fetchWinners };
};

/**
 * Hook for fetching recent winners
 */
export const useRecentWinners = (count: number = 3, autoRefresh: boolean = false, interval: number = 10000) => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentWinners = async () => {
    if (data.length === 0) setLoading(true);
    setError(null);
    
    const response = await api.getRecentWinners(count);
    
    setData(response.data);
    if (!response.success) {
      setError(response.error || 'Failed to fetch recent winners');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchRecentWinners();
    
    if (autoRefresh) {
      const intervalId = setInterval(fetchRecentWinners, interval);
      return () => clearInterval(intervalId);
    }
  }, [count, autoRefresh, interval]);

  return { data, loading, error, refetch: fetchRecentWinners };
};
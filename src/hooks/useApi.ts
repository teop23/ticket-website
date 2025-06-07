import { useState, useEffect } from 'react';
import { api } from '../api';
import { Winner, PotData } from '../api/types';

/**
 * Hook for fetching pot data
 */
export const usePot = (autoRefresh: boolean = false, interval: number = 10000) => {
  const [data, setData] = useState<PotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPot = async () => {
    if (!data) setLoading(true); // Only show loading on initial fetch
    setError(null);
    
    const response = await api.getPot();
    
    if (response.success) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch pot data');
      setData(response.data); // Still set fallback data
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
    if (data.length === 0) setLoading(true); // Only show loading on initial fetch
    setError(null);
    
    const response = await api.getWinners();
    
    if (response.success) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch winners data');
      setData(response.data); // Still set fallback data
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
    if (data.length === 0) setLoading(true); // Only show loading on initial fetch
    setError(null);
    
    const response = await api.getRecentWinners(count);
    
    if (response.success) {
      setData(response.data);
    } else {
      setError(response.error || 'Failed to fetch recent winners');
      setData(response.data); // Still set fallback data
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
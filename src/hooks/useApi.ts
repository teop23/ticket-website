import { useState, useEffect } from 'react';
import { api } from '../api';
import { Winner, PotData } from '../api/types';

/**
 * Hook for fetching pot data
 */
export const usePot = () => {
  const [data, setData] = useState<PotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPot = async () => {
    setLoading(true);
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
  }, []);

  return { data, loading, error, refetch: fetchPot };
};

/**
 * Hook for fetching winners data
 */
export const useWinners = () => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWinners = async () => {
    setLoading(true);
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
  }, []);

  return { data, loading, error, refetch: fetchWinners };
};

/**
 * Hook for fetching recent winners
 */
export const useRecentWinners = (count: number = 3) => {
  const [data, setData] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentWinners = async () => {
    setLoading(true);
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
  }, [count]);

  return { data, loading, error, refetch: fetchRecentWinners };
};
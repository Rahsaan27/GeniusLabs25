import { useState, useEffect } from 'react';
import { Achievement } from '@/types/profile';
import { useAuth } from './useAuth';

interface UseAchievementsReturn {
  achievements: (Achievement & { unlocked: boolean; unlockedAt?: string })[];
  loading: boolean;
  error: string | null;
  checkAchievements: () => Promise<void>;
  refetchAchievements: () => Promise<void>;
}

export function useAchievements(): UseAchievementsReturn {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<(Achievement & { unlocked: boolean; unlockedAt?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAchievements = async () => {
    if (!user?.email) {
      setAchievements([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/achievements?email=${encodeURIComponent(user.email)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch achievements');
      }

      const data = await response.json();
      setAchievements(data.achievements);
    } catch (err) {
      console.error('Error fetching achievements:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [user?.email]);

  const checkAchievements = async () => {
    if (!user?.email) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/achievements', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to check achievements');
      }

      const data = await response.json();

      // Refetch to get updated list
      await fetchAchievements();

      return data;
    } catch (err) {
      console.error('Error checking achievements:', err);
      throw err;
    }
  };

  const refetchAchievements = fetchAchievements;

  return {
    achievements,
    loading,
    error,
    checkAchievements,
    refetchAchievements,
  };
}

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/profile';
import { useAuth } from './useAuth';

interface UseProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateSettings: (settings: {
    emailNotifications?: boolean;
    dailyReminders?: boolean;
  }) => Promise<void>;
  refetchProfile: () => Promise<void>;
}

export function useProfile(): UseProfileReturn {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user?.email) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/profile?email=${encodeURIComponent(user.email)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.email]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user?.email) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          ...updates,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateSettings = async (settings: {
    emailNotifications?: boolean;
    dailyReminders?: boolean;
  }) => {
    if (!user?.email) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          ...settings,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const data = await response.json();
      setProfile(data.profile);
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  const refetchProfile = fetchProfile;

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateSettings,
    refetchProfile,
  };
}

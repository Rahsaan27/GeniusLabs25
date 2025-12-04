'use client';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function CallbackPage() {
  const auth = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('Completing sign in...');

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!auth.isAuthenticated && !auth.isLoading && !auth.error) {
        router.push('/login');
      }
    }, 5000);

    if (auth.isAuthenticated) {
      clearTimeout(timeout);
      setMessage('Success! Taking you to your modules...');
      // Small delay to show success message
      setTimeout(() => {
        router.push('/modules');
      }, 800);
    } else if (auth.error) {
      clearTimeout(timeout);
      setMessage('Authentication failed. Redirecting...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [auth.isAuthenticated, auth.error, auth.isLoading, router]);

  return <LoadingScreen message={message} />;
}
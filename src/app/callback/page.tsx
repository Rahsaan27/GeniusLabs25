'use client';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  console.log('CallbackPage component loaded');
  
  const auth = useAuth();
  const router = useRouter();

  console.log('CallbackPage - Hooks initialized');

  useEffect(() => {
    console.log('CallbackPage - useEffect triggered');
    console.log('CallbackPage - Auth state:', {
      isLoading: auth.isLoading,
      isAuthenticated: auth.isAuthenticated,
      error: auth.error,
      user: auth.user
    });

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      console.log('Auth timeout reached');
      if (!auth.isAuthenticated && !auth.isLoading && !auth.error) {
        console.log('Auth timeout, redirecting to login');
        router.push('/login');
      }
    }, 5000); // Reduced to 5 seconds

    if (auth.isAuthenticated) {
      clearTimeout(timeout);
      console.log('Auth successful, redirecting to home');
      router.push('/');
    } else if (auth.error) {
      clearTimeout(timeout);
      console.error('Authentication error:', auth.error);
      router.push('/login');
    }

    return () => clearTimeout(timeout);
  }, [auth.isAuthenticated, auth.error, auth.isLoading, router]);

  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Completing Sign In...
          </h2>
          <p className="text-gray-300">
            Please wait while we process your authentication.
          </p>
        </div>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">
            Authentication Error
          </h2>
          <p className="text-gray-300 mb-4">
            There was an error during the sign in process.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleManualReset = () => {
    console.log('Manual reset triggered');
    auth.removeUser();
    localStorage.clear();
    sessionStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Redirecting...
        </h2>
        <p className="text-gray-300 mb-4">
          You will be redirected shortly.
        </p>
        <button
          onClick={handleManualReset}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Reset Auth State
        </button>
      </div>
    </div>
  );
}
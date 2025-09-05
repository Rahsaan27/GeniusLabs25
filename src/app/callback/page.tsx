'use client';

import { useAuth } from 'react-oidc-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      // Redirect to home page after successful authentication
      router.push('/');
    } else if (auth.error) {
      console.error('Authentication error:', auth.error);
      // Redirect to login page on error
      router.push('/login');
    }
  }, [auth.isAuthenticated, auth.error, router]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Redirecting...
        </h2>
        <p className="text-gray-300">
          You will be redirected shortly.
        </p>
      </div>
    </div>
  );
}
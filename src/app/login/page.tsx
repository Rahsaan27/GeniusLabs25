'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login();
    
    if (!result.success) {
      setError(result.error || 'Login failed');
      setLoading(false);
    }
    // Note: If successful, user will be redirected to Cognito hosted UI
    // and then back to the callback URL, so no need to handle success here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-300">
            Sign in to continue your learning journey
          </p>
          <p className="mt-4 text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-medium text-green-400 hover:text-green-300 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <p className="text-gray-300 text-center">
            Click the button below to sign in using our secure authentication system.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
          >
            {loading ? 'Redirecting...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
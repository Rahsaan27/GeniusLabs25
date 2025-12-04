'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import HiddenGeniusProject from '@/assets/Hidden Genius Project Image.jpeg';
import LoadingScreen from '@/components/LoadingScreen';

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

  // Show loading screen while authenticating
  if (loading) {
    return <LoadingScreen message="Signing you in..." />;
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-black/40 z-10"></div>
        <Image
          src={HiddenGeniusProject}
          alt="Hidden Genius Project - Empowering the next generation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-24 left-8 z-20 text-white">
          <h3 className="text-2xl font-bold mb-2">Empowering Young Minds</h3>
          <p className="text-lg opacity-90">Join the Hidden Genius Project community</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Image */}
          <div className="lg:hidden mb-8 relative h-48 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-black/40 z-10"></div>
            <Image
              src={HiddenGeniusProject}
              alt="Hidden Genius Project"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 z-20 text-white">
              <h3 className="text-lg font-bold">Empowering Young Minds</h3>
            </div>
          </div>

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
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <p className="text-gray-300 text-center mb-6">
                Click the button below to sign in using our secure authentication system.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-400/25 transform hover:scale-105 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                    Redirecting...
                  </div>
                ) : (
                  'Sign In to GeniusLabs'
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Powered by Hidden Genius Project & GeniusLabs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
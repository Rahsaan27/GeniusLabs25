'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import HiddenGeniusInstagram from '@/assets/Hidden Genius Instagram.jpg';
import LoadingScreen from '@/components/LoadingScreen';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register();
    
    if (!result.success) {
      setError(result.error || 'Registration failed');
      setLoading(false);
    }
    // Note: If successful, user will be redirected to Cognito hosted UI
    // and then back to the callback URL, so no need to handle success here
  };

  // Show loading screen while creating account
  if (loading) {
    return <LoadingScreen message="Creating your account..." />;
  }

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Mobile Image */}
          <div className="lg:hidden mb-8 relative h-48 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-black/40 z-10"></div>
            <Image
              src={HiddenGeniusInstagram}
              alt="Hidden Genius Project Community"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-24 left-4 z-20 text-white">
              <h3 className="text-lg font-bold">Join the Movement</h3>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join GeniusLabs
            </h2>
            <p className="text-gray-300">
              Start your coding journey today
            </p>
            <p className="mt-4 text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-green-400 hover:text-green-300 transition-colors"
              >
                Sign in here
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
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Create Your Account</h3>
                <p className="text-gray-300 text-sm">
                  Join thousands of students learning to code with Hidden Genius Project
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-400/25 transform hover:scale-105 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Your GeniusLabs Account'
                )}
              </button>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our terms and privacy policy
                </p>
              </div>
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Powered by Hidden Genius Project & GeniusLabs
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-bl from-green-400/20 to-black/40 z-10"></div>
        <Image
          src={HiddenGeniusInstagram}
          alt="Hidden Genius Project - Building the future"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-24 right-8 z-20 text-white text-right">
          <h3 className="text-2xl font-bold mb-2">Join the Movement</h3>
          <p className="text-lg opacity-90">Building the next generation of tech leaders</p>
        </div>
      </div>
    </div>
  );
}
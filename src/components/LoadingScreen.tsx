'use client';

import Image from 'next/image';
import GeniusLabsLogo from '@/assets/Genius-Lab-Logo-Main-Green-600.png';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="relative">
        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full animate-pulse"></div>

        {/* Logo with pulse animation */}
        <div className="relative animate-pulse">
          <Image
            src={GeniusLabsLogo}
            alt="GeniusLabs"
            width={200}
            height={200}
            priority
            className="drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Loading spinner */}
      <div className="mt-8 relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-green-400 rounded-full animate-spin"></div>
      </div>

      {/* Message */}
      <p className="mt-6 text-gray-400 text-lg animate-pulse">{message}</p>

      {/* Dots animation */}
      <div className="flex gap-2 mt-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

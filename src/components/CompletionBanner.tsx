import React, { useState, useEffect } from 'react';
import { Module } from '@/types/lesson';

interface CompletionBannerProps {
  module: Module;
  isVisible: boolean;
  onClose: () => void;
}

export default function CompletionBanner({ module, isVisible, onClose }: CompletionBannerProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-8 mx-4 max-w-md w-full text-center shadow-2xl animate-bounce">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700 transition-colors"
        >
          <span className="text-2xl">×</span>
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-pulse">🎉</div>
          <h2 className="text-3xl font-bold text-black mb-2">
            Congratulations!
          </h2>
          <p className="text-black/80 mb-4">
            You've completed the
          </p>
          <p className="text-xl font-semibold text-black mb-4">
            {module.title}
          </p>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-black/20 px-4 py-2 rounded-full">
              <span className="text-black font-medium">
                {module.lessons.length} lessons completed
              </span>
            </div>
            <div className="bg-black/20 px-4 py-2 rounded-full">
              <span className="text-black font-medium">
                {module.estimatedTime} minutes
              </span>
            </div>
          </div>
          <div className="text-4xl mb-4">🏆</div>
          <p className="text-black/80 text-sm">
            Keep up the great work on your coding journey!
          </p>
        </div>
      </div>
    </div>
  );
}
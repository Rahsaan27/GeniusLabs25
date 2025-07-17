import React from 'react';
import Image from 'next/image';

interface LanguageMasteryProps {
  language: string;
  logo?: any;
  completedLessons: number;
  totalLessons: number;
  className?: string;
}

export default function LanguageMastery({ 
  language, 
  logo, 
  completedLessons, 
  totalLessons, 
  className = '' 
}: LanguageMasteryProps) {
  const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  
  const getMasteryLevel = (percentage: number) => {
    if (percentage >= 100) return { emoji: '🏆', level: 'Master', color: 'text-yellow-400' };
    if (percentage >= 80) return { emoji: '🥇', level: 'Expert', color: 'text-yellow-300' };
    if (percentage >= 60) return { emoji: '🥈', level: 'Advanced', color: 'text-gray-300' };
    if (percentage >= 40) return { emoji: '🥉', level: 'Intermediate', color: 'text-orange-400' };
    if (percentage >= 20) return { emoji: '📚', level: 'Beginner', color: 'text-blue-400' };
    if (percentage > 0) return { emoji: '🌱', level: 'Novice', color: 'text-green-400' };
    return { emoji: '⭐', level: 'Not Started', color: 'text-gray-400' };
  };

  const mastery = getMasteryLevel(percentage);

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {logo && (
            <Image
              src={logo}
              alt={`${language} logo`}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          )}
          <h3 className="text-lg font-semibold text-white">{language}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{mastery.emoji}</span>
          <span className={`text-sm font-medium ${mastery.color}`}>
            {mastery.level}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-300 mb-1">
          <span>Progress</span>
          <span>{completedLessons}/{totalLessons} lessons</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
      
      <div className="text-center">
        <span className="text-2xl font-bold text-green-400">{Math.round(percentage)}%</span>
        <span className="text-sm text-gray-400 ml-1">Complete</span>
      </div>
    </div>
  );
}
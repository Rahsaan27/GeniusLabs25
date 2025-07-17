import React from 'react';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ProgressBar({ percentage, showLabel = true, size = 'md', className = '' }: ProgressBarProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const circleSize = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const circlePositions = [0, 20, 40, 60, 80, 100];

  return (
    <div className={`relative ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      
      <div className="relative">
        {/* Background bar */}
        <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
          {/* Progress fill */}
          <div
            className={`bg-green-500 ${sizeClasses[size]} rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        
        {/* Progress circles */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center">
          {circlePositions.map((position) => (
            <div
              key={position}
              className={`absolute ${circleSize[size]} -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-300 ${
                percentage >= position
                  ? 'bg-green-500 border-green-500'
                  : 'bg-white border-gray-300'
              }`}
              style={{ left: `${position}%`, top: '50%' }}
            >
              {percentage >= position && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`${size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-white rounded-full`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
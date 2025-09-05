'use client';

import React, { useState } from 'react';
import { Play, Volume2, Settings, Maximize2, Minimize2, Pause } from 'lucide-react';

interface VideoPlaceholderProps {
  title?: string;
  duration?: string;
  description?: string;
  thumbnail?: string;
  className?: string;
}

export default function VideoPlaceholder({ 
  title = "Lesson Video",
  duration = "5:42",
  description = "Watch this video to learn the concept",
  thumbnail,
  className = ''
}: VideoPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl ${className} ${
      isFullscreen ? 'fixed inset-4 z-50' : ''
    }`}>
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group cursor-pointer"
           onClick={togglePlay}>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        {/* Thumbnail or Video Icon */}
        {thumbnail ? (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-400/20 rounded-full flex items-center justify-center">
              <div className="text-3xl">🎥</div>
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-16 h-16 bg-green-400 hover:bg-green-300 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-200 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-black ml-0" />
            ) : (
              <Play className="w-6 h-6 text-black ml-1" />
            )}
          </button>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {duration}
        </div>
        
        {/* Playing Indicator */}
        {isPlaying && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>LIVE</span>
          </div>
        )}
      </div>
      
      {/* Video Controls */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pause' : 'Play'} Video</span>
            </button>
            
            <div className="text-xs text-gray-400">
              Duration: {duration}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-all">
              <Volume2 size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-all">
              <Settings size={16} />
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-700 rounded transition-all"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className={`bg-green-400 h-1 rounded-full transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
              style={{ width: isPlaying ? '45%' : '0%' }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="p-4 bg-gray-800/50">
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
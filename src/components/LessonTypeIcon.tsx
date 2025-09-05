'use client';

import React from 'react';
import { Code, FileText, Play, HelpCircle, BookOpen, Zap, Trophy, Target } from 'lucide-react';

export type LessonType = 'coding' | 'theory' | 'video' | 'quiz' | 'reading' | 'practice' | 'challenge' | 'project';

interface LessonTypeIconProps {
  type: LessonType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const iconConfig = {
  coding: {
    icon: Code,
    label: 'Coding Exercise',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20'
  },
  theory: {
    icon: FileText,
    label: 'Theory',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20'
  },
  video: {
    icon: Play,
    label: 'Video Lesson',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20'
  },
  quiz: {
    icon: HelpCircle,
    label: 'Quiz',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20'
  },
  reading: {
    icon: BookOpen,
    label: 'Reading',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    borderColor: 'border-green-400/20'
  },
  practice: {
    icon: Zap,
    label: 'Practice',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20'
  },
  challenge: {
    icon: Trophy,
    label: 'Challenge',
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
    borderColor: 'border-pink-400/20'
  },
  project: {
    icon: Target,
    label: 'Project',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/20'
  }
};

const sizeConfig = {
  sm: { iconSize: 14, containerSize: 'w-6 h-6', textSize: 'text-xs' },
  md: { iconSize: 16, containerSize: 'w-8 h-8', textSize: 'text-sm' },
  lg: { iconSize: 20, containerSize: 'w-10 h-10', textSize: 'text-base' }
};

export default function LessonTypeIcon({ 
  type, 
  size = 'md', 
  showLabel = false,
  className = '' 
}: LessonTypeIconProps) {
  const config = iconConfig[type];
  const sizeConf = sizeConfig[size];
  const IconComponent = config.icon;

  if (showLabel) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className={`${sizeConf.containerSize} ${config.bgColor} ${config.borderColor} border rounded-lg flex items-center justify-center`}>
          <IconComponent size={sizeConf.iconSize} className={config.color} />
        </div>
        <span className={`${config.color} font-medium ${sizeConf.textSize}`}>
          {config.label}
        </span>
      </div>
    );
  }

  return (
    <div 
      className={`${sizeConf.containerSize} ${config.bgColor} ${config.borderColor} border rounded-lg flex items-center justify-center ${className}`}
      title={config.label}
    >
      <IconComponent size={sizeConf.iconSize} className={config.color} />
    </div>
  );
}
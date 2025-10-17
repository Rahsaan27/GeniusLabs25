'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { modules } from '@/data/lessons';
import { getModuleProgress } from '@/utils/progress';
import jsLogo from '@/assets/javascript.png';
import pythonLogo from '@/assets/python.png';
import cppLogo from '@/assets/c++.png';

export default function ModulesPage() {
  const [moduleProgress, setModuleProgress] = useState<{[key: string]: {completed: number, total: number, percentage: number}}>({});

  useEffect(() => {
    const progress: {[key: string]: {completed: number, total: number, percentage: number}} = {};
    modules.forEach(module => {
      const lessonIds = module.lessons.map(lesson => lesson.id);
      progress[module.id] = getModuleProgress(module.id, lessonIds);
    });
    setModuleProgress(progress);
  }, []);

  const getModuleColor = (category: string) => {
    switch (category) {
      case 'technology': return 'from-blue-500/20 to-blue-600/10 border-blue-400/30';
      case 'entrepreneurship': return 'from-purple-500/20 to-purple-600/10 border-purple-400/30';
      case 'leadership': return 'from-yellow-500/20 to-yellow-600/10 border-yellow-400/30';
      default: return 'from-gray-500/20 to-gray-600/10 border-gray-400/30';
    }
  };

  const getLanguageLogo = (language: string) => {
    switch(language) {
      case 'javascript': return jsLogo;
      case 'python': return pythonLogo;
      case 'cpp': return cppLogo;
      default: return null;
    }
  };

  const getBadges = (progress: any, difficulty: string) => {
    const badges = [];
    if (progress.percentage === 100) badges.push({ icon: '🏆', label: 'Completed', color: 'text-yellow-400' });
    if (progress.percentage >= 50 && progress.percentage < 100) badges.push({ icon: '🔥', label: 'In Progress', color: 'text-orange-400' });
    if (difficulty === 'advanced') badges.push({ icon: '⭐', label: 'Advanced', color: 'text-purple-400' });
    return badges;
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500">
            Learning Modules
          </h1>
          <p className="text-xl text-gray-400 mt-4">
            Choose a module to start your learning journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const progress = moduleProgress[module.id] || { completed: 0, total: module.lessons.length, percentage: 0 };
            const badges = getBadges(progress, module.difficulty);
            const logo = getLanguageLogo(module.language);

            return (
              <Link
                key={module.id}
                href={`/modules/${module.id}`}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${getModuleColor(module.category)} border rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 min-h-[280px] flex flex-col`}>
                  {/* Logo */}
                  <div className="absolute top-6 right-6">
                    {logo && (
                      <Image
                        src={logo}
                        alt={module.language}
                        width={48}
                        height={48}
                        className="w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </div>

                  {/* Module Title */}
                  <h2 className="text-2xl font-bold text-white mb-3 pr-16 group-hover:text-green-400 transition-colors">
                    {module.title}
                  </h2>

                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {badges.map((badge, idx) => (
                        <span key={idx} className={`text-xl ${badge.color}`} title={badge.label}>
                          {badge.icon}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Progress Circle */}
                  <div className="mt-auto pt-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-sm text-gray-400 mb-1">{module.lessons.length} lessons</div>
                        <div className="text-sm text-gray-500">{module.estimatedTime} min</div>
                      </div>
                      <div className="relative">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            className="text-gray-700"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="32"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 32}`}
                            strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress.percentage / 100)}`}
                            className="text-green-400 transition-all duration-500"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold text-white">{progress.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
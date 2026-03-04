'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { modules } from '@/data/lessons';
import { getModuleProgress } from '@/utils/progress';
import { useAuth } from '@/hooks/useAuth';
import jsLogo from '@/assets/javascript.png';
import pythonLogo from '@/assets/python.png';
import cppLogo from '@/assets/c++.png';

export default function ModulesPage() {
  const { user, isAuthenticated } = useAuth();
  const [moduleProgress, setModuleProgress] = useState<{[key: string]: {completed: number, total: number, percentage: number}}>({});

  useEffect(() => {
    const loadProgress = async () => {
      const progress: {[key: string]: {completed: number, total: number, percentage: number}} = {};

      // If authenticated, load progress from DynamoDB
      if (isAuthenticated && user?.email) {
        try {
          const response = await fetch(`/api/user-progress?userId=${user.email}`);
          if (response.ok) {
            const data = await response.json();

            // Convert DB progress to module progress format
            data.progress.forEach((dbProgress: { moduleId: string; lessonsCompleted?: string[] }) => {
              const currentModule = modules.find(m => m.id === dbProgress.moduleId);
              if (currentModule) {
                const completed = dbProgress.lessonsCompleted?.length || 0;
                const total = currentModule.lessons.length;
                progress[currentModule.id] = {
                  completed,
                  total,
                  percentage: Math.round((completed / total) * 100)
                };
              }
            });
          }
        } catch (error) {
          // Error loading progress from DB - using fallback
        }
      }

      // Fill in any modules not in DB with localStorage progress
      // Skip disabled modules (comingSoon)
      modules.forEach(currentModule => {
        if (!progress[currentModule.id] && !currentModule.comingSoon) {
          const lessonIds = currentModule.lessons.map(lesson => lesson.id);
          progress[currentModule.id] = getModuleProgress(currentModule.id, lessonIds);
        }
      });

      setModuleProgress(progress);
    };

    loadProgress();
  }, [isAuthenticated, user?.email]);

  const getModuleColor = (category: string) => {
    switch (category) {
      case 'technology': return 'from-[#0a0a0a] to-[#141414] border-[#2a2a2a]';
      case 'entrepreneurship': return 'from-[#0a0a0a] to-[#141414] border-[#2a2a2a]';
      case 'leadership': return 'from-[#0a0a0a] to-[#141414] border-[#2a2a2a]';
      default: return 'from-[#0a0a0a] to-[#141414] border-[#2a2a2a]';
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

  const getBadges = (progress: { percentage: number }, difficulty: string) => {
    const badges = [];
    if (progress.percentage === 100) badges.push({ icon: '🏆', label: 'Completed', color: '#FFDE21' });
    if (progress.percentage >= 50 && progress.percentage < 100) badges.push({ icon: '🔥', label: 'In Progress', color: 'text-orange-400' });
    if (difficulty === 'advanced') badges.push({ icon: '⭐', label: 'Advanced', color: 'text-purple-400' });
    return badges;
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #FFDE21, #FFDE21, #FFDE21)' }}>
            Learning Modules
          </h1>
          <p className="text-xl text-gray-400 mt-4">
            Choose a module to start your learning journey
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((currentModule) => {
            const progress = moduleProgress[currentModule.id] || { completed: 0, total: currentModule.lessons.length, percentage: 0 };
            const badges = getBadges(progress, currentModule.difficulty);
            const logo = getLanguageLogo(currentModule.language);

            const cardContent = (
                <div className={`relative bg-gradient-to-br ${getModuleColor(currentModule.category)} border rounded-lg p-6 transition-all duration-200 ${currentModule.comingSoon ? 'opacity-60' : ''} min-h-[280px] flex flex-col`}>
                  {/* Logo */}
                  <div className="absolute top-6 right-6">
                    {logo && (
                      <Image
                        src={logo}
                        alt={currentModule.language}
                        width={48}
                        height={48}
                        className="w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </div>

                  {/* Module Title */}
                  <h2 className="text-2xl font-bold text-white mb-3 pr-16 transition-colors">
                    {currentModule.title}
                  </h2>

                  {/* Coming Soon Badge */}
                  {currentModule.comingSoon && (
                    <div className="border px-3 py-1 rounded-full text-xs font-bold w-fit mb-3" style={{ backgroundColor: 'rgba(255, 222, 33, 0.2)', borderColor: 'rgba(255, 222, 33, 0.4)', color: '#FFDE21' }}>
                      🚧 COMING SOON
                    </div>
                  )}

                  {/* Badges */}
                  {badges.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {badges.map((badge, idx) => (
                        <span key={idx} className={`text-xl ${typeof badge.color === 'string' && badge.color.startsWith('text-') ? badge.color : ''}`} style={typeof badge.color === 'string' && badge.color.startsWith('#') ? { color: badge.color } : {}} title={badge.label}>
                          {badge.icon}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Progress Circle - Only show for active modules */}
                  {!currentModule.comingSoon && (
                    <div className="mt-auto pt-6">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">{currentModule.lessons.length} lessons</div>
                          <div className="text-sm text-gray-500">{currentModule.estimatedTime} min</div>
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
                              stroke="#FFDE21"
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 32}`}
                              strokeDashoffset={`${2 * Math.PI * 32 * (1 - progress.percentage / 100)}`}
                              className="transition-all duration-500"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-white">{progress.percentage}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info for disabled modules */}
                  {currentModule.comingSoon && (
                    <div className="mt-auto pt-6">
                      <div className="text-sm text-gray-500">
                        This module will be available soon
                      </div>
                    </div>
                  )}
                </div>
            );

            return currentModule.comingSoon ? (
              <div key={currentModule.id} className="group cursor-not-allowed">
                {cardContent}
              </div>
            ) : (
              <Link key={currentModule.id} href={`/modules/${currentModule.id}`} className="group cursor-pointer">
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
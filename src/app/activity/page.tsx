'use client'

import { useState, useEffect } from 'react';
import { lessons, modules } from '@/data/lessons';
import { getProgressData, getOverallProgress } from '@/utils/progress';
import { UserProgress } from '@/types/lesson';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import jsLogo from '@/assets/javascript.png';
import pythonLogo from '@/assets/python.png';

export default function ActivityPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [progressData, setProgressData] = useState<UserProgress[]>([]);
  const [overallProgress, setOverallProgress] = useState({ completed: 0, total: 0, percentage: 0 });
  const [allCompletedLessons, setAllCompletedLessons] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      let completedLessonIds: string[] = [];

      // If authenticated, load progress from DynamoDB
      if (isAuthenticated && user?.email) {
        try {
          const response = await fetch(`/api/user-progress?userId=${user.email}`);
          if (response.ok) {
            const data = await response.json();

            // Collect all completed lessons from all modules
            data.progress.forEach((moduleProgress: any) => {
              if (moduleProgress.lessonsCompleted) {
                completedLessonIds = [...completedLessonIds, ...moduleProgress.lessonsCompleted];
              }
            });

            setAllCompletedLessons(completedLessonIds);
            setCompletedLessons(completedLessonIds.length);
          }
        } catch (error) {
          console.error('Error loading progress from DB:', error);
        }
      }

      // Fallback to localStorage if not authenticated or no DB data
      const localProgress = getProgressData();
      setProgressData(localProgress);

      // If no DB data, use localStorage
      if (!isAuthenticated || completedLessonIds.length === 0) {
        const completed = localProgress.filter(p => p.status === 'completed').length;
        setCompletedLessons(completed);
        setTotalScore(localProgress.reduce((sum, p) => sum + (p.score || 0), 0));
      }

      // Calculate overall progress
      const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
      const completed = isAuthenticated && completedLessonIds.length > 0
        ? completedLessonIds.length
        : localProgress.filter(p => p.status === 'completed').length;

      setOverallProgress({
        completed,
        total: totalLessons,
        percentage: Math.round((completed / totalLessons) * 100)
      });
    };

    loadProgress();
  }, [isAuthenticated, user?.email]);

  const filteredLessons = lessons.filter(lesson => {
    return (selectedLanguage === 'All' || lesson.language === selectedLanguage) &&
           (selectedDifficulty === 'All' || lesson.difficulty === selectedDifficulty);
  });

  const getLessonProgress = (lessonId: string) => {
    // Check DB progress first
    if (allCompletedLessons.includes(lessonId)) {
      return { lessonId, status: 'completed', score: 0 } as UserProgress;
    }
    // Fallback to localStorage
    return progressData.find(p => p.lessonId === lessonId);
  };

  const getLanguageLogo = (language: string) => {
    switch(language) {
      case 'javascript': return jsLogo;
      case 'python': return pythonLogo;
      case 'html': return null; // Can add HTML logo later
      default: return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-400/20 text-green-400 border-green-400/40';
      case 'intermediate': return 'bg-orange-400/20 text-orange-400 border-orange-400/40';
      case 'advanced': return 'bg-red-400/20 text-red-400 border-red-400/40';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/40';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Learning Progress</h1>
          <p className="text-xl mb-6 text-gray-300">
            Track your coding journey and see your achievements
          </p>
          <div className="flex gap-4 justify-center p-8 -mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-full h-24 w-24 flex justify-center items-center p-15">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{completedLessons}</div>
                <div className="text-sm opacity-80">Completed</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full h-24 w-24 flex justify-center items-center p-15">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{lessons.length}</div>
                <div className="text-sm opacity-80">Lessons</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full h-24 w-24 flex justify-center items-center p-15">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{overallProgress.percentage}%</div>
                <div className="text-sm opacity-80">Progress</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full h-24 w-24 flex justify-center items-center p-15">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{totalScore}</div>
                <div className="text-sm opacity-80">Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20">
              <h3 className="text-lg font-semibold mb-4 text-white">Filters</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700 text-white"
                >
                  <option value="All">All Languages</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-500 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-700 text-white"
                >
                  <option value="All">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid gap-4">
              {filteredLessons.map((lesson) => {
                const progress = getLessonProgress(lesson.id);
                const status = progress?.status || 'not_started';
                const isCompleted = status === 'completed';
                
                return (
                  <div
                    key={lesson.id}
                    className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 ${
                      isCompleted ? 'border-green-400/40 bg-green-400/10' : 'border-green-400/20 hover:border-green-400/40'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          {getLanguageLogo(lesson.language) && (
                            <Image
                              src={getLanguageLogo(lesson.language)!}
                              alt={`${lesson.language} logo`}
                              width={24}
                              height={24}
                              className="w-6 h-6 mr-3"
                            />
                          )}
                          <h3 className="text-xl font-semibold text-white mr-3">
                            {lesson.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lesson.difficulty)}`}>
                            {lesson.difficulty}
                          </span>
                          {isCompleted && (
                            <span className="ml-2 text-green-400 text-sm flex items-center">
                              <span className="mr-1">✓</span>
                              Completed
                            </span>
                          )}
                          {status === 'in_progress' && (
                            <span className="ml-2 text-orange-400 text-sm flex items-center">
                              <span className="mr-1">⏱️</span>
                              In Progress
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{lesson.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <span className="mr-1">💻</span>
                            {lesson.language}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">⏰</span>
                            {lesson.estimatedTime} min
                          </span>
                          {progress?.score && (
                            <span className="flex items-center">
                              <span className="mr-1">⭐</span>
                              {progress.score}% score
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6">
                        <Link
                          href={`/lesson/${lesson.id}`}
                          className={`inline-block px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                            isCompleted
                              ? 'bg-green-400 text-black hover:bg-green-300'
                              : status === 'in_progress'
                              ? 'bg-orange-400 text-black hover:bg-orange-300'
                              : 'bg-green-400 text-black hover:bg-green-300 shadow-lg hover:shadow-xl transform hover:scale-105'
                          }`}
                        >
                          {isCompleted ? 'Review' : status === 'in_progress' ? 'Continue' : 'Start Lesson'}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
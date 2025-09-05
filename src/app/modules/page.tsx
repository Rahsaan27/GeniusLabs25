'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { modules } from '@/data/lessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
import ProgressBar from '@/components/ProgressBar';
import jsLogo from '@/assets/javascript.png';
import pythonLogo from '@/assets/python.png';
import cppLogo from '@/assets/c++.png';

export default function ModulesPage() {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [moduleProgress, setModuleProgress] = useState<{[key: string]: {completed: number, total: number, percentage: number}}>({});
  const [showProgressModal, setShowProgressModal] = useState(false);

  useEffect(() => {
    const progress: {[key: string]: {completed: number, total: number, percentage: number}} = {};
    modules.forEach(module => {
      const lessonIds = module.lessons.map(lesson => lesson.id);
      progress[module.id] = getModuleProgress(module.id, lessonIds);
    });
    setModuleProgress(progress);
  }, []);

  const filteredModules = modules.filter(module => {
    const levelMatch = selectedLevel === 'All' || module.difficulty === selectedLevel.toLowerCase();
    const categoryMatch = selectedCategory === 'All' || module.category === selectedCategory.toLowerCase();
    return levelMatch && categoryMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-400/20 text-green-400 border-green-400/40';
      case 'intermediate': return 'bg-orange-400/20 text-orange-400 border-orange-400/40';
      case 'advanced': return 'bg-red-400/20 text-red-400 border-red-400/40';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/40';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technology': return '💻';
      case 'entrepreneurship': return '🚀';
      case 'leadership': return '👑';
      default: return '📚';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technology': return 'bg-blue-400/20 text-blue-400 border-blue-400/40';
      case 'entrepreneurship': return 'bg-purple-400/20 text-purple-400 border-purple-400/40';
      case 'leadership': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/40';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/40';
    }
  };

  function showProgress(){ 
    setShowProgressModal(true);
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col">
              <div>
                <h1 className="text-4xl font-bold mb-4">Learning Modules</h1>
                <p className="text-xl text-gray-300">
                  Master programming and social entrepreneurship skills
                </p>
              </div>
            
            </div>
            
          

            {/* Progress Button */}
            <div className="mt-6 lg:mt-0">
              <button 
                onClick={showProgress} 
                className="border border-green-400/40 bg-green-400/10 hover:bg-green-400/20 rounded-lg px-6 py-3 text-lg font-bold text-green-400 transition-all duration-200 hover:border-green-400/60"
              >
                Your Progress
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 space-y-6">
            {/* Category Filter */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20">
              <h3 className="text-lg font-semibold mb-4 text-white">Filter by Category</h3>
              <div className="space-y-2">
                {["All", "Technology", "Entrepreneurship"].map((category) => (
                  <label key={category} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="rounded border-gray-500 text-green-400 focus:ring-green-500 bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-green-400/20">
              <h3 className="text-lg font-semibold mb-4 text-white">Filter by Level</h3>
              <div className="space-y-2">
                {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                  <label key={level} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={selectedLevel === level}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="rounded border-gray-500 text-green-400 focus:ring-green-500 bg-gray-700"
                    />
                    <span className="ml-2 text-sm text-gray-300">{level}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredModules.map((module) => {
                const progress = moduleProgress[module.id] || { completed: 0, total: module.lessons.length, percentage: 0 };
                const getLanguageLogo = (language: string) => {
                  switch(language) {
                    case 'javascript': return jsLogo;
                    case 'python': return pythonLogo;
                    case 'cpp': return cppLogo;
                    default: return null;
                  }
                };
                
                return (
                  <div
                    key={module.id}
                    className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-400/20 hover:shadow-xl hover:border-green-400/40 transition-all duration-300 transform hover:-translate-y-1 h-fit"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start mb-4">
                          {getLanguageLogo(module.language) ? (
                            <Image
                              src={getLanguageLogo(module.language)!}
                              alt={`${module.language} logo`}
                              width={32}
                              height={32}
                              className="w-8 h-8 mr-3 mt-1 flex-shrink-0"
                            />
                          ) : (
                            <div className="w-8 h-8 mr-3 mt-1 text-2xl flex items-center justify-center flex-shrink-0">
                              {getCategoryIcon(module.category)}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                              {module.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(module.category)}`}>
                                {module.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}>
                                {module.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed text-sm">{module.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <ProgressBar 
                            percentage={progress.percentage} 
                            showLabel={false}
                            size="sm"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Progress</span>
                            <span>{progress.completed}/{progress.total} lessons</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 text-xs text-gray-400 mb-4">
                          <span className="flex items-center">
                            <span className="mr-1">⏱️</span>
                            {module.estimatedTime} min
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">📖</span>
                            {module.lessons.length} lessons
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">💻</span>
                            {module.language}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 mt-auto">
                        <Link
                          href={`/activity`}
                          className="inline-block bg-green-400 text-black px-4 py-2.5 rounded-lg hover:bg-green-300 transition-all duration-200 text-center font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          {progress.percentage > 0 ? 'Continue Module' : 'Start Module'}
                        </Link>
                        {progress.percentage > 0 && (
                          <div className="text-center text-xs text-gray-400">
                            {progress.percentage}% Complete
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-green-400/20 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Your Progress</h2>
              <button 
                onClick={() => setShowProgressModal(false)}
                className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="space-y-4">
                {modules.map((module) => {
                  const progress = moduleProgress[module.id] || { completed: 0, total: module.lessons.length, percentage: 0 };
                  const isCompleted = progress.percentage === 100;
                  const isInProgress = progress.percentage > 0 && progress.percentage < 100;
                  
                  return (
                    <div key={module.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="mr-3 text-lg">{getCategoryIcon(module.category)}</span>
                          <h3 className="text-white font-semibold">{module.title}</h3>
                        </div>
                        <span className="text-sm text-gray-400">{progress.completed}/{progress.total}</span>
                      </div>
                      
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : isInProgress ? 'bg-orange-500' : 'bg-gray-600'
                          }`}
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-400 mb-3">
                        <span>{progress.percentage}% Complete</span>
                        <span className={`font-medium ${
                          isCompleted ? 'text-green-400' : isInProgress ? 'text-orange-400' : 'text-gray-400'
                        }`}>
                          {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      
                      {/* Detailed lesson indicators */}
                      <div className="grid grid-cols-8 gap-2">
                        {module.lessons.map((lesson, index) => {
                          const lessonProgress = getUserProgress(lesson.id);
                          const lessonCompleted = lessonProgress?.status === 'completed';
                          const lessonInProgress = lessonProgress?.status === 'in_progress';
                          
                          return (
                            <div
                              key={lesson.id}
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                lessonCompleted 
                                  ? 'bg-green-500 text-white' 
                                  : lessonInProgress 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-gray-600 text-gray-300'
                              }`}
                              title={lesson.title}
                            >
                              {index + 1}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
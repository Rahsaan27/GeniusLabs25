'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { modules } from '@/data/lessons';
import { shortFormModules } from '@/data/shortFormLessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Pill Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-400 mr-2">Category:</span>
              {["All", "Technology", "Entrepreneurship", "Leadership"].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-green-400 text-black shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-green-400/40 hover:text-green-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Level Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-400 mr-2">Level:</span>
              {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedLevel === level
                      ? 'bg-green-400 text-black shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700 hover:border-green-400/40 hover:text-green-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Tracking Bar */}
          <div className="mt-6 bg-gray-800/30 rounded-full p-1">
            <div className="flex items-center justify-between text-xs text-gray-400 px-4 py-2">
              <span>Overall Progress</span>
              <span>{Math.round(modules.reduce((acc, mod) => {
                const progress = moduleProgress[mod.id] || { percentage: 0 };
                return acc + progress.percentage;
              }, 0) / modules.length)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div 
                className="h-1 rounded-full bg-green-400 transition-all duration-300"
                style={{ width: `${Math.round(modules.reduce((acc, mod) => {
                  const progress = moduleProgress[mod.id] || { percentage: 0 };
                  return acc + progress.percentage;
                }, 0) / modules.length)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Module Sections */}
        <div className="space-y-12">

          {/* Group modules by category */}
          {['Technology', 'Entrepreneurship', 'Leadership'].map((categoryName) => {
            const categoryModules = filteredModules.filter(module => 
              selectedCategory === 'All' || module.category === categoryName.toLowerCase()
            ).filter(module => module.category === categoryName.toLowerCase());
            
            if (categoryModules.length === 0) return null;
            
            return (
              <div key={categoryName} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">{categoryName}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-400/20 to-transparent"></div>
                  <span className="text-sm text-gray-400">{categoryModules.length} modules</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {categoryModules.map((module) => {
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
                        className="group bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-green-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-400/10 hover:-translate-y-2 overflow-hidden"
                      >
                        {/* Card Header */}
                        <div className="p-6 pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              {getLanguageLogo(module.language) ? (
                                <Image
                                  src={getLanguageLogo(module.language)!}
                                  alt={`${module.language} logo`}
                                  width={28}
                                  height={28}
                                  className="w-7 h-7 mr-3 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                              ) : (
                                <div className="w-7 h-7 mr-3 text-xl flex items-center justify-center flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                                  {getCategoryIcon(module.category)}
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                                  {module.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(module.category)}`}>
                              {module.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(module.difficulty)}`}>
                              {module.difficulty}
                            </span>
                          </div>
                        </div>
                        
                        {/* Progress Section */}
                        <div className="px-6 pb-4">
                          <div className="bg-gray-800/30 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-gray-400 font-medium">Progress</span>
                              <span className="text-xs font-bold text-green-400">{progress.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="h-1.5 rounded-full bg-green-400 transition-all duration-500"
                                style={{ width: `${progress.percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {progress.completed}/{progress.total} lessons • {module.estimatedTime}min
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Button */}
                        <div className="px-6 pb-6">
                          <Link
                            href={shortFormModules.find(sfm => sfm.id === module.id) ? `/short-form/${module.id}` : `/activity`}
                            className="w-full bg-green-400 text-black px-4 py-3 rounded-xl hover:bg-green-300 transition-all duration-200 text-center font-bold text-sm shadow-lg hover:shadow-xl group-hover:scale-105 transform inline-block"
                          >
                            {progress.percentage > 0 ? 'Continue Learning' : 'Start Module'}
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Modal */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-green-400/20 shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Learning Progress & Achievements</h2>
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
              {/* Metrics Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                  <div className="text-2xl font-bold text-green-400">{modules.reduce((acc, mod) => acc + (moduleProgress[mod.id]?.completed || 0), 0)}</div>
                  <div className="text-xs text-gray-400 mt-1">Lessons Completed</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                  <div className="text-2xl font-bold text-blue-400">{modules.reduce((acc, mod) => acc + mod.lessons.length, 0)}</div>
                  <div className="text-xs text-gray-400 mt-1">Total Lessons</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                  <div className="text-2xl font-bold text-purple-400">{Math.round(modules.reduce((acc, mod) => {
                    const progress = moduleProgress[mod.id] || { percentage: 0 };
                    return acc + progress.percentage;
                  }, 0) / modules.length)}%</div>
                  <div className="text-xs text-gray-400 mt-1">Overall Progress</div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center border border-gray-700/50">
                  <div className="text-2xl font-bold text-yellow-400">{modules.filter(mod => (moduleProgress[mod.id]?.percentage || 0) === 100).length}</div>
                  <div className="text-xs text-gray-400 mt-1">Modules Mastered</div>
                </div>
              </div>
              
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
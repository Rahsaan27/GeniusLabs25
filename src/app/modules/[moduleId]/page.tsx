'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { modules } from '@/data/lessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
import { ArrowLeft, Play, Clock, Star, CheckCircle, Circle, Zap, BookOpen, Trophy, Award } from 'lucide-react';
import jsLogo from '@/assets/javascript.png';
import pythonLogo from '@/assets/python.png';

export default function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const [module, setModule] = useState<any>(null);
  const [moduleProgress, setModuleProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModule = async () => {
      const resolvedParams = await params;
      const foundModule = modules.find(m => m.id === resolvedParams.moduleId);
      if (foundModule) {
        setModule(foundModule);
        const progress = getModuleProgress(foundModule.id, foundModule.lessons.map(l => l.id));
        setModuleProgress(progress);
      }
      setLoading(false);
    };
    loadModule();
  }, [params]);

  const getLessonProgress = (lessonId: string) => {
    const progress = getUserProgress(lessonId);
    return progress?.status || 'not_started';
  };

  const getLessonType = (lesson: any) => {
    if (lesson.estimatedTime <= 2) return 'short-form';
    if (lesson.difficulty === 'advanced') return 'advanced';
    return 'standard';
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'short-form': return <Zap size={16} className="text-yellow-400" />;
      case 'advanced': return <Star size={16} className="text-purple-400" />;
      default: return <Play size={16} className="text-blue-400" />;
    }
  };

  const getLessonTypeLabel = (type: string) => {
    switch (type) {
      case 'short-form': return 'Quick Lesson';
      case 'advanced': return 'Advanced';
      default: return 'Standard';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} className="text-green-400" />;
      case 'in_progress': return <Circle size={20} className="text-yellow-400 animate-pulse" />;
      default: return <Circle size={20} className="text-gray-500" />;
    }
  };

  const getLessonUrl = (lesson: any) => {
    const type = getLessonType(lesson);
    if (type === 'short-form') {
      // Find which short form module this lesson belongs to by checking if current module has short-form in its ID
      if (module.id.includes('javascript-mastery') || module.id.includes('python-patterns') || module.id.includes('computer-science')) {
        return `/short-form/${module.id}`;
      }
    }
    return `/lesson/${lesson.id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p>Loading module...</p>
        </div>
      </div>
    );
  }

  const getLanguageLogo = (language: string) => {
    switch(language) {
      case 'javascript': return jsLogo;
      case 'python': return pythonLogo;
      default: return null;
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

  if (!module) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
          <Link href="/modules" className="text-green-400 hover:text-green-300">
            ← Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center mb-4">
            <Link 
              href="/modules" 
              className="mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center flex-1">
              {getLanguageLogo(module.language) ? (
                <Image
                  src={getLanguageLogo(module.language)!}
                  alt={`${module.language} logo`}
                  width={40}
                  height={40}
                  className="w-10 h-10 mr-4"
                />
              ) : (
                <div className="w-10 h-10 mr-4 text-3xl flex items-center justify-center">
                  {getCategoryIcon(module.category)}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold">{module.title}</h1>
                <p className="text-gray-400 text-lg">{module.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Khan Academy Style Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex min-h-[calc(100vh-200px)]">
        {/* Left Sidebar - Lessons List (25%) */}
        <div className="w-1/4 pr-6 py-6 border-r border-gray-800">
          <div className="sticky top-6">
            <h2 className="text-lg font-bold mb-4 text-green-400">Learning Path</h2>
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin">
              {module.lessons.map((lesson: any, index: number) => {
                const lessonType = getLessonType(lesson);
                const status = getLessonProgress(lesson.id);
                const isCompleted = status === 'completed';
                const isInProgress = status === 'in_progress';
                
                return (
                  <Link key={lesson.id} href={getLessonUrl(lesson)} className="block group">
                    <div className={`p-4 rounded-xl border transition-all duration-200 hover:border-green-400/40 ${
                      isCompleted ? 'bg-green-400/10 border-green-400/40' : 
                      isInProgress ? 'bg-yellow-400/10 border-yellow-400/40' : 
                      'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
                    }`}>
                      <div className="flex items-center mb-2">
                        <div className="mr-3">
                          {getStatusIcon(status)}
                        </div>
                        <div className="text-xs font-bold text-gray-400 bg-gray-700 px-2 py-1 rounded">
                          {index + 1}
                        </div>
                        {lessonType === 'short-form' && (
                          <div className="ml-2">
                            <Zap size={14} className="text-yellow-400" />
                          </div>
                        )}
                        {lessonType === 'advanced' && (
                          <div className="ml-2">
                            <Star size={14} className="text-purple-400" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2 group-hover:text-green-400">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {lesson.estimatedTime} min
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area (75%) */}
        <div className="flex-1 pl-6 py-6">
          {/* Progress Overview */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Your Progress</h3>
                <p className="text-gray-400">
                  {moduleProgress?.completed || 0} of {moduleProgress?.total || 0} lessons completed
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-400">
                    {moduleProgress?.percentage || 0}%
                  </div>
                  <div className="text-sm text-gray-400">Complete</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mb-6">
              <div 
                className="h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${moduleProgress?.percentage || 0}%` }}
              />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-blue-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="text-blue-400" size={16} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {module.lessons.filter((l: any) => getLessonType(l) === 'standard').length}
                </div>
                <div className="text-xs text-gray-400">Standard Lessons</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="text-yellow-400" size={16} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {module.lessons.filter((l: any) => getLessonType(l) === 'short-form').length}
                </div>
                <div className="text-xs text-gray-400">Quick Lessons</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Star className="text-purple-400" size={16} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {module.lessons.filter((l: any) => getLessonType(l) === 'advanced').length}
                </div>
                <div className="text-xs text-gray-400">Advanced</div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="text-green-400" size={16} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{module.estimatedTime}</div>
                <div className="text-xs text-gray-400">Total Minutes</div>
              </div>
            </div>
          </div>

          {/* Module Info */}
          {/* <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-6">
            <h3 className="text-xl font-bold mb-4 text-white">About This Module</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {module.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm font-medium">
                {module.category}
              </span>
              <span className="px-3 py-1 bg-green-400/20 text-green-400 rounded-full text-sm font-medium">
                {module.difficulty}
              </span>
              <span className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-sm font-medium">
                {module.language}
              </span>
            </div>
          </div> */}

          {/* Next Steps */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4 text-white">Ready to Learn?</h3>
            <p className="text-gray-400 mb-6">
              {moduleProgress?.percentage === 0 ? 
                'Start your learning journey with the first lesson, or jump to any lesson that interests you.' :
                'Continue from where you left off, or explore any lesson in the module.'
              }
            </p>
            <div className="flex flex-wrap gap-3">
              {moduleProgress?.percentage === 0 ? (
                <Link
                  href={getLessonUrl(module.lessons[0])}
                  className="inline-flex items-center px-6 py-3 bg-green-400 hover:bg-green-300 text-black font-bold rounded-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Play size={18} className="mr-2" />
                  Start First Lesson
                </Link>
              ) : (
                // Find next incomplete lesson
                (() => {
                  const nextLesson = module.lessons.find((lesson: any) => {
                    const status = getLessonProgress(lesson.id);
                    return status === 'in_progress' || status === 'not_started';
                  });
                  return nextLesson ? (
                    <Link
                      href={getLessonUrl(nextLesson)}
                      className="inline-flex items-center px-6 py-3 bg-green-400 hover:bg-green-300 text-black font-bold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Play size={18} className="mr-2" />
                      Continue Learning
                    </Link>
                  ) : (
                    <Link
                      href={getLessonUrl(module.lessons[0])}
                      className="inline-flex items-center px-6 py-3 bg-blue-400 hover:bg-blue-300 text-black font-bold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Trophy size={18} className="mr-2" />
                      Review Module
                    </Link>
                  );
                })()
              )}
              <Link
                href="/modules"
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" />
                All Modules
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
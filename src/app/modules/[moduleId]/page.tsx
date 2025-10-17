'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { modules } from '@/data/lessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
import { InteractiveIDE } from '@/components/IDE';

export default function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const [module, setModule] = useState<any>(null);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [moduleProgress, setModuleProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'videos' | 'docs' | 'code' | 'quiz'>('code');
  const [userCode, setUserCode] = useState('');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  useEffect(() => {
    const loadModule = async () => {
      const resolvedParams = await params;
      const foundModule = modules.find(m => m.id === resolvedParams.moduleId);
      if (foundModule) {
        setModule(foundModule);
        const progress = getModuleProgress(foundModule.id, foundModule.lessons.map(l => l.id));
        setModuleProgress(progress);

        // Don't auto-select a lesson - show list view
        setSelectedLesson(null);
      }
      setLoading(false);
    };
    loadModule();
  }, [params]);

  // Update when lesson changes
  useEffect(() => {
    if (selectedLesson) {
      // Set first activity as active
      if (selectedLesson.activities && selectedLesson.activities.length > 0) {
        setActiveTab(selectedLesson.activities[0]);
      }

      // Load completed activities
      const saved = localStorage.getItem(`lesson-${selectedLesson.id}-completed`);
      if (saved) {
        setCompletedActivities(JSON.parse(saved));
      } else {
        setCompletedActivities([]);
      }
    }
  }, [selectedLesson]);

  const isActivityUnlocked = (activityType: string) => {
    if (!selectedLesson?.activities) return false;
    const activityIndex = selectedLesson.activities.indexOf(activityType);
    if (activityIndex === 0) return true; // First activity always unlocked

    // Check if previous activity is completed
    const previousActivity = selectedLesson.activities[activityIndex - 1];
    return completedActivities.includes(previousActivity);
  };

  const markActivityComplete = (activityType: string) => {
    // Mark as complete if not already
    if (!completedActivities.includes(activityType)) {
      const updated = [...completedActivities, activityType];
      setCompletedActivities(updated);
      localStorage.setItem(`lesson-${selectedLesson.id}-completed`, JSON.stringify(updated));
    }

    // Always move to next activity if available (even if already completed)
    const currentIndex = selectedLesson.activities.indexOf(activityType);
    if (currentIndex < selectedLesson.activities.length - 1) {
      setActiveTab(selectedLesson.activities[currentIndex + 1]);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'videos':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />;
      case 'docs':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
      case 'code':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />;
      case 'quiz':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />;
      default:
        return null;
    }
  };

  const getLessonProgress = (lessonId: string) => {
    const progress = getUserProgress(lessonId);
    return progress?.status || 'not_started';
  };

  const getLessonIcon = (lesson: any) => {
    // You can customize this based on lesson type
    if (lesson.type === 'video') return '🎥';
    if (lesson.type === 'quiz') return '📝';
    if (lesson.type === 'reading') return '📖';
    return '💡';
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
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-2">
        <Link href="/modules" className="text-green-400 hover:text-green-300 text-sm inline-block">
          ← All Modules
        </Link>
      </div>

      {/* Main Lesson Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedLesson ? (
          <>
            {/* Lesson Header with Activity Tabs */}
            <div className="border-b border-gray-800 px-6 py-3 bg-gradient-to-r from-black to-gray-900 flex-shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">
                    <button onClick={() => setSelectedLesson(null)} className="text-green-400 hover:text-green-300 transition-colors">
                      {module.title}
                    </button>
                    <span className="text-gray-600 mx-2">/</span>
                    <span>{selectedLesson.title}</span>
                  </h2>
                  <p className="text-gray-400 text-sm">{selectedLesson.description || 'Interactive coding lesson'}</p>
                </div>

                {/* Activity Navigation */}
                <div className="flex items-center gap-1 flex-shrink-0 border border-gray-700 rounded-lg p-1 bg-gray-900/50">
                  {selectedLesson.activities?.map((activityType: string) => {
                    const isUnlocked = isActivityUnlocked(activityType);
                    const isCompleted = completedActivities.includes(activityType);
                    const isActive = activeTab === activityType;

                    return (
                      <button
                        key={activityType}
                        onClick={() => isUnlocked && setActiveTab(activityType as any)}
                        disabled={!isUnlocked}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                          isActive
                            ? 'bg-green-500/10 border border-green-500/30'
                            : isUnlocked
                            ? 'hover:bg-gray-800'
                            : 'opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <svg className={`w-4 h-4 ${isActive ? 'text-green-400' : isUnlocked ? 'text-gray-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getActivityIcon(activityType)}
                        </svg>
                        <span className={`text-xs capitalize ${isActive ? 'text-green-400 font-medium' : isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {activityType}
                        </span>
                        {isCompleted && (
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                        {!isUnlocked && (
                          <svg className="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
                </div>
              </div>

              {/* Activity Content */}
              <div className="flex-1 flex flex-col min-h-0">
                {activeTab === 'videos' && (
                  <div className="flex-1 flex flex-col items-center justify-center bg-black p-8">
                    <div className="text-center max-w-2xl">
                      <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-xl font-bold text-white mb-2">Video Lessons</h3>
                      <p className="text-gray-400 mb-6">Video content for this lesson will appear here</p>
                      <button
                        onClick={() => markActivityComplete('videos')}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Continue to Next Section →
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'docs' && (
                  <div className="flex-1 overflow-y-auto bg-black p-8">
                    <div className="max-w-3xl mx-auto">
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-white mb-4">📚 Documentation</h3>
                        <div className="prose prose-invert">
                          <p className="text-gray-300 leading-relaxed mb-6">
                            Documentation and reading materials for <strong>{selectedLesson.title}</strong> will appear here.
                            This section will include detailed explanations, examples, and references.
                          </p>
                        </div>
                        <button
                          onClick={() => markActivityComplete('docs')}
                          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                        >
                          Continue to Next Section →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="flex-1 flex flex-col lg:flex-row min-h-0">
                    {/* Instructions Sidebar */}
                    <div className="lg:w-80 border-r border-gray-800 overflow-y-auto bg-gray-900/50 p-4 space-y-4 flex-shrink-0">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <h3 className="text-sm font-semibold text-blue-400 mb-2">💡 Key Concepts</h3>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          <strong>Variables</strong> store information.<br/>
                          <strong>print()</strong> displays text on screen.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-white mb-2">🎯 Try This</h3>
                        <div className="bg-gray-800/50 rounded-lg p-3 space-y-2 text-xs">
                          <div className="text-gray-300">
                            <span className="text-yellow-400 font-bold">1.</span> Click "Run Code" to see the output
                          </div>
                          <div className="text-gray-300">
                            <span className="text-yellow-400 font-bold">2.</span> Change the name to yours
                          </div>
                          <div className="text-gray-300">
                            <span className="text-yellow-400 font-bold">3.</span> Add a new variable
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* IDE */}
                    <div className="flex-1 min-h-0 flex flex-col">
                      <InteractiveIDE
                        language="python"
                        initialCode={`# Try modifying this code and clicking "Run Code"\nname = "Student"\nage = 16\n\nprint("Hello, my name is", name)\nprint("I am", age, "years old")`}
                        onCodeChange={setUserCode}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="flex-1 flex flex-col items-center justify-center bg-black p-8">
                    <div className="text-center max-w-2xl">
                      <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <h3 className="text-xl font-bold text-white mb-2">Quiz</h3>
                      <p className="text-gray-400 mb-6">Quiz questions for this lesson will appear here</p>
                      <button
                        onClick={() => markActivityComplete('quiz')}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Complete Lesson →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto bg-black p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-2">
                  {module.language === 'python' && (
                    <svg className="w-12 h-12" viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet">
                      <defs>
                        <linearGradient x1="12.959%" y1="12.039%" x2="79.639%" y2="78.201%" id="a">
                          <stop stopColor="#387EB8" offset="0%"/>
                          <stop stopColor="#366994" offset="100%"/>
                        </linearGradient>
                        <linearGradient x1="19.128%" y1="20.579%" x2="90.742%" y2="88.429%" id="b">
                          <stop stopColor="#FFE052" offset="0%"/>
                          <stop stopColor="#FFC331" offset="100%"/>
                        </linearGradient>
                      </defs>
                      <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#a)"/>
                      <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#b)"/>
                    </svg>
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-white">{module.title}</h2>
                    <p className="text-gray-400 mt-1">{module.description}</p>
                  </div>
                </div>
                <div className="mb-8"></div>

                {/* Progress Overview */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">Your Progress</h3>
                    <span className="text-green-400 font-bold">{moduleProgress?.percentage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                    <div
                      className="h-3 bg-green-400 rounded-full transition-all duration-500"
                      style={{ width: `${moduleProgress?.percentage || 0}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {moduleProgress?.completed || 0} of {moduleProgress?.total || 0} lessons completed
                  </p>
                </div>

                {/* Lessons List */}
                <h3 className="text-xl font-bold text-white mb-4">Lessons</h3>
                <div className="space-y-3">
                  {module.lessons.map((lesson: any, index: number) => {
                    const status = getLessonProgress(lesson.id);
                    const isCompleted = status === 'completed';
                    const isInProgress = status === 'in_progress';

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className="w-full text-left bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-gray-700 rounded-lg p-5 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          {/* Status indicator */}
                          <div className="mt-1 flex-shrink-0">
                            {isCompleted ? (
                              <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center">
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : isInProgress ? (
                              <div className="w-8 h-8 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin" />
                            ) : (
                              <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center">
                                <span className="text-sm text-gray-500 font-medium">{index + 1}</span>
                              </div>
                            )}
                          </div>

                          {/* Lesson info */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-lg font-semibold mb-1 ${module.language === 'python' ? 'text-green-400' : 'text-white'}`}>{lesson.title}</h4>
                            <p className="text-sm text-gray-400 mb-2">{lesson.description}</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {lesson.estimatedTime} min
                              </span>
                              <span className="px-2 py-1 bg-gray-800 rounded text-xs capitalize">
                                {lesson.difficulty}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex-shrink-0 mt-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
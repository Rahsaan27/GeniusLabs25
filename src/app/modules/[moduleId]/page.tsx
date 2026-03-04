'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { modules } from '@/data/lessons';
import { getModuleProgress, getUserProgress } from '@/utils/progress';
import { InteractiveIDE } from '@/components/IDE';
import { useAuth } from '@/hooks/useAuth';
import { Module, Lesson } from '@/types/lesson';
import { parseMarkdown } from '@/utils/markdownParser';
import { validateCode } from '@/utils/codeValidator';
import QuizComponent from '@/components/QuizComponent';

interface ModuleProgress {
  moduleId: string;
  lessonsCompleted: string[];
  isCompleted: boolean;
  lastAccessedAt?: Date;
}

export default function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { user, isAuthenticated } = useAuth();
  const [module, setModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [moduleProgress, setModuleProgress] = useState<{ completed: number; total: number; percentage: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'videos' | 'docs' | 'code' | 'quiz'>('code');
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [moduleId, setModuleId] = useState<string>('');
  const [dbProgress, setDbProgress] = useState<ModuleProgress | null>(null);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string; hints?: string[] } | null>(null);

  useEffect(() => {
    const loadModule = async () => {
      const resolvedParams = await params;
      const moduleIdValue = resolvedParams.moduleId;
      setModuleId(moduleIdValue);
      const foundModule = modules.find(m => m.id === moduleIdValue);
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

  // Separate effect for loading progress - only runs once when auth state is available
  useEffect(() => {
    const loadProgress = async () => {
      if (isAuthenticated && user?.email && moduleId && !progressLoaded) {
        setProgressLoaded(true);
        try {
          const response = await fetch(`/api/user-progress/${moduleId}?userId=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setDbProgress(data.progress);
          } else if (response.status === 404) {
            // Progress record doesn't exist yet - that's okay
            setDbProgress(null);
          }
        } catch (error) {
          // Error loading progress - using fallback
          setDbProgress(null);
        }
      }
    };
    loadProgress();
  }, [isAuthenticated, user?.email, moduleId, progressLoaded]);

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

      // Reset validation state
      setValidationResult(null);
      setUserCode('');
      setCodeOutput('');
    }
  }, [selectedLesson]);


  const isActivityUnlocked = (activityType: string) => {
    if (!selectedLesson?.activities) return false;
    const activityIndex = selectedLesson.activities.indexOf(activityType as any);
    if (activityIndex === 0) return true; // First activity always unlocked

    // Check if previous activity is completed
    const previousActivity = selectedLesson.activities[activityIndex - 1];
    return completedActivities.includes(previousActivity);
  };

  const markActivityComplete = async (activityType: string) => {
    if (!selectedLesson || !module) return;

    // Mark as complete if not already
    if (!completedActivities.includes(activityType)) {
      const updated = [...completedActivities, activityType];
      setCompletedActivities(updated);
      localStorage.setItem(`lesson-${selectedLesson.id}-completed`, JSON.stringify(updated));
    }

    // Check if this is the last activity
    const currentIndex = selectedLesson.activities.indexOf(activityType as any);
    const isLastActivity = currentIndex === selectedLesson.activities.length - 1;

    if (isLastActivity) {
      // Save to DynamoDB
      if (isAuthenticated && user?.email) {
        try {
          const userId = user.email;

          // First, ensure progress record exists
          const checkResponse = await fetch(`/api/user-progress/${moduleId}?userId=${userId}`);
          if (!checkResponse.ok) {
            // Create progress record if it doesn't exist
            await fetch('/api/user-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, moduleId })
            });
          }

          // Then mark lesson as completed
          const lessonResponse = await fetch(`/api/user-progress/${moduleId}/lesson`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, lessonId: selectedLesson.id })
          });

          if (lessonResponse.ok) {
            const data = await lessonResponse.json();
            setDbProgress(data.progress);
          }
        } catch (error) {
          // Error saving progress - continuing without save
        }
      }

      // Auto-advance to next lesson
      const currentLessonIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
      if (currentLessonIndex >= 0 && currentLessonIndex < module.lessons.length - 1) {
        // Move to next lesson
        const nextLesson = module.lessons[currentLessonIndex + 1];
        setSelectedLesson(nextLesson);
      } else {
        // Last lesson in module - go back to lesson list
        setSelectedLesson(null);
      }
    } else {
      // Move to next activity
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
    // Check DB progress first if available
    if (dbProgress && dbProgress.lessonsCompleted) {
      const isCompleted = dbProgress.lessonsCompleted.includes(lessonId);
      if (isCompleted) return 'completed';
    }

    // Fallback to localStorage
    const progress = getUserProgress(lessonId);
    return progress?.status || 'not_started';
  };

  const getLessonIcon = (lesson: Lesson) => {
    // You can customize this based on lesson type
    const lessonWithType = lesson as Lesson & { type?: string };
    if (lessonWithType.type === 'video') return '🎥';
    if (lessonWithType.type === 'quiz') return '📝';
    if (lessonWithType.type === 'reading') return '📖';
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
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden overscroll-none">
      {/* Main Lesson Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden overscroll-none">
        {selectedLesson ? (
          <>
            {/* Lesson Header with Activity Tabs - FIXED */}
            <div className="fixed top-16 left-0 right-0 z-40 border-b border-gray-800 px-6 py-3 bg-gradient-to-r from-black to-gray-900">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-white">
                    <span onClick={() => setSelectedLesson(null)} className="hover:opacity-80 transition-opacity cursor-pointer" style={{ color: '#FFDE21' }}>
                      {module.title}
                    </span>
                    <span className="text-gray-600 mx-2">/</span>
                    <span>{selectedLesson.title}</span>
                  </h2>
                  <p className="text-gray-400 text-sm">{selectedLesson.description || 'Interactive coding lesson'}</p>
                </div>

                {/* Activity Navigation */}
                <div className="flex items-center gap-1 flex-shrink-0 p-1">
                  {selectedLesson.activities?.map((activityType: string) => {
                    const isUnlocked = isActivityUnlocked(activityType);
                    const isCompleted = completedActivities.includes(activityType);
                    const isActive = activeTab === activityType;

                    return (
                      <button
                        key={activityType}
                        onClick={() => isUnlocked && setActiveTab(activityType as any)}
                        disabled={!isUnlocked}
                        style={isActive ? { backgroundColor: '#FFDE211A' } : undefined}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                          isActive
                            ? 'border border-[#E5C71D]/30'
                            : isUnlocked
                            ? 'hover:bg-gray-800 border border-gray-700/20'
                            : 'opacity-50 cursor-not-allowed border border-gray-700/20'
                        }`}
                      >
                        <svg className={`w-4 h-4 ${isActive ? '' : isUnlocked ? 'text-gray-400' : 'text-gray-600'}`} style={isActive ? { color: '#FFDE21' } : undefined} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getActivityIcon(activityType)}
                        </svg>
                        <span className={`text-xs capitalize ${isActive ? 'font-medium' : isUnlocked ? 'text-gray-400' : 'text-gray-600'}`} style={isActive ? { color: '#FFDE21' } : undefined}>
                          {activityType}
                        </span>
                        {isCompleted && (
                          <svg className="w-3 h-3" style={{ color: '#FFDE21' }} fill="currentColor" viewBox="0 0 20 20">
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
              <div className="flex-1 flex flex-col overflow-auto overscroll-none">
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
                        className="px-6 py-3 hover:opacity-80 text-black font-bold rounded-lg border-2 transition-all duration-200"
                        style={{ backgroundColor: '#FFDE21', borderColor: '#E5C71D' }}
                      >
                        Continue to Next Section →
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'docs' && (
                  <div className="flex-1 overflow-y-auto overscroll-none scrollbar-hide bg-black px-8 pt-30 pb-8 mb-15">
                    <div className="max-w-4xl mx-auto">
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        {selectedLesson.content?.theory ? (
                          <div className="prose prose-invert max-w-none">
                            <div
                              className="text-gray-200 leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: parseMarkdown(selectedLesson.content.theory)
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-4">📚 Documentation</h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                              Documentation for this lesson is being prepared.
                            </p>
                          </div>
                        )}
                        <div className="mt-8 pt-6 border-t border-gray-700">
                          <button
                            onClick={() => markActivityComplete('docs')}
                            className="w-full px-6 py-3 hover:opacity-80 text-black font-bold rounded-lg border-2 transition-all duration-200"
                            style={{ backgroundColor: '#FFDE21', borderColor: '#E5C71D' }}
                          >
                            Continue to Coding Section →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden prevent-overscroll pt-18">
                    {/* Instructions Sidebar */}
                    <div className="lg:w-80 border-r border-gray-800 overflow-y-auto prevent-overscroll bg-black p-4 space-y-4 flex-shrink-0 max-h-full">
                      {selectedLesson.content?.instructions && (
                        <div className="prose prose-invert max-w-none">
                          <div
                            className="text-gray-200 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: parseMarkdown(selectedLesson.content.instructions)
                            }}
                          />
                        </div>
                      )}

                      {/* Validation Feedback */}
                      {validationResult && (
                        <div className={`rounded-lg p-3 border ${
                          validationResult.isValid
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-red-500/10 border-red-500/30'
                        }`}>
                          <h3 className={`text-lg font-bold mb-2 ${
                            validationResult.isValid ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {validationResult.isValid ? '✅ Great job!' : '❌ Not quite right'}
                          </h3>
                          <p className="text-md text-gray-300 leading-relaxed font-semibold mb-2">
                            {validationResult.message}
                          </p>
                          {validationResult.hints && validationResult.hints.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <p className="text-sm text-gray-400 font-semibold">💡 Hints:</p>
                              {validationResult.hints.map((hint, index) => (
                                <p key={index} className="text-sm text-gray-400 ml-2">• {hint}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Complete Section Button */}
                      <button
                        onClick={() => markActivityComplete('code')}
                        disabled={!validationResult?.isValid}
                        style={validationResult?.isValid ? { backgroundColor: '#FFDE21', borderColor: '#E5C71D' } : undefined}
                        className={`w-full px-4 py-3 font-bold rounded-lg transition-all duration-200 border-2 ${
                          validationResult?.isValid
                            ? 'hover:opacity-80 text-black'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed border-gray-700'
                        }`}
                      >
                        {validationResult?.isValid ? 'Complete Section →' : 'Complete the task to continue'}
                      </button>
                    </div>

                    {/* IDE */}
                    <div className="flex-1 min-h-0 flex flex-col overflow-hidde">
                      <InteractiveIDE
                        language={module.language as 'python' | 'javascript' | 'html'}
                        initialCode={selectedLesson.content?.starterCode ||
                          (module.language === 'html'
                            ? `<!DOCTYPE html>\n<html>\n<head>\n    <title>My First Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Try modifying this HTML and clicking "Run Code"!</p>\n</body>\n</html>`
                            : module.language === 'javascript'
                            ? `// Try modifying this code and clicking "Run Code"\nconst name = "Student";\nconst age = 16;\n\nconsole.log("Hello, my name is", name);\nconsole.log("I am", age, "years old");`
                            : `# Try modifying this code and clicking "Run Code"\nname = "Student"\nage = 16\n\nprint("Hello, my name is", name)\nprint("I am", age, "years old")`
                          )
                        }
                        onCodeChange={(code) => setUserCode(code)}
                        onRunComplete={(code, output) => {
                          setUserCode(code);
                          setCodeOutput(output);
                          const result = validateCode(selectedLesson.id, code, output);
                          setValidationResult(result);
                        }}
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'quiz' && (
                  <div className="flex-1 overflow-y-auto bg-black p-8">
                    {selectedLesson.quiz ? (
                      <QuizComponent
                        quiz={selectedLesson.quiz}
                        onComplete={(passed, score) => {
                          if (passed) {
                            markActivityComplete('quiz');
                          }
                        }}
                      />
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="text-center max-w-2xl">
                          <svg className="w-20 h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          <h3 className="text-xl font-bold text-white mb-2">Quiz</h3>
                          <p className="text-gray-400 mb-6">Quiz questions for this lesson will appear here</p>
                          <button
                            onClick={() => markActivityComplete('quiz')}
                            className="px-6 py-3 hover:opacity-80 text-black font-bold rounded-lg border-2 transition-all duration-200"
                            style={{ backgroundColor: '#FFDE21', borderColor: '#E5C71D' }}
                          >
                            Complete Lesson →
                          </button>
                        </div>
                      </div>
                    )}
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
                    <div>
                      <h3 className="text-lg font-semibold text-white">Your Progress</h3>
                      {isAuthenticated && user?.email ? (
                        <p className="text-xs mt-1" style={{ color: '#FFDE21' }}>✓ Logged in as {user.email}</p>
                      ) : (
                        <p className="text-xs mt-1" style={{ color: '#FFDE21' }}>⚠ Not logged in - progress won't be saved</p>
                      )}
                    </div>
                    <span className="font-bold" style={{ color: '#FFDE21' }}>
                      {dbProgress && dbProgress.lessonsCompleted
                        ? Math.round((dbProgress.lessonsCompleted.length / module.lessons.length) * 100)
                        : moduleProgress?.percentage || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: '#FFDE21',
                        width: `${dbProgress && dbProgress.lessonsCompleted
                          ? Math.round((dbProgress.lessonsCompleted.length / module.lessons.length) * 100)
                          : moduleProgress?.percentage || 0}%`
                      }}
                    />
                  </div>
                  <p className="text-gray-500 text-sm">
                    {dbProgress && dbProgress.lessonsCompleted
                      ? dbProgress.lessonsCompleted.length
                      : moduleProgress?.completed || 0} of {module.lessons.length} lessons completed
                  </p>
                </div>

                {/* Lessons List */}
                <h3 className="text-xl font-bold text-white mb-4">Lessons</h3>
                <div className="space-y-3">
                  {module.lessons.map((lesson: Lesson, index: number) => {
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
                              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFDE21' }}>
                                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : isInProgress ? (
                              <div className="w-8 h-8 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: '#FFDE21', borderTopColor: 'transparent' }} />
                            ) : (
                              <div className="w-8 h-8 rounded-full border-2 border-gray-600 flex items-center justify-center">
                                <span className="text-sm text-gray-500 font-medium">{index + 1}</span>
                              </div>
                            )}
                          </div>

                          {/* Lesson info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold mb-1" style={module.language === 'python' ? { color: '#FFDE21' } : { color: 'white' }}>{lesson.title}</h4>
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
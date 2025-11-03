'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { lessons, modules } from '@/data/lessons';
import { InteractiveIDE } from '@/components/IDE';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const [userCode, setUserCode] = useState('');

  const lesson = lessons.find(l => l.id === lessonId);

  // Find the module this lesson belongs to
  const module = lesson ? modules.find(m => m.lessons.some(l => l.id === lesson.id)) : null;

  // Redirect to IDE test lesson if it's the special IDE lesson
  useEffect(() => {
    if (lessonId === 'python-ide-test') {
      router.push('/lesson/ide-test');
    }
  }, [lessonId, router]);

  if (lessonId === 'python-ide-test') {
    return null;
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-gray-400 mb-4">The lesson you're looking for doesn't exist.</p>
          <Link
            href="/modules"
            className="inline-block bg-green-400 text-black px-6 py-3 rounded-lg hover:bg-green-300 transition-colors font-bold"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  // If this is an HTML lesson, show the HTML IDE
  if (lesson.language === 'html') {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-800 px-6 py-2 bg-gradient-to-r from-black to-gray-900">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <Link
                href={module ? `/modules/${module.id}` : '/modules'}
                className="text-green-400 hover:text-green-300 text-xs mb-1 inline-block"
              >
                ← Back to {module ? module.title : 'Modules'}
              </Link>
              <h1 className="text-xl font-bold text-white">{lesson.title}</h1>
              <p className="text-gray-400 text-sm">{lesson.description}</p>
            </div>

            {/* Activity Navigation */}
            <div className="flex items-center gap-1 flex-shrink-0 border border-gray-700 rounded-lg p-1 bg-gray-900/50">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-green-500/10 border border-green-500/30">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span className="text-xs text-green-400 font-medium">Code</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side: Instructions */}
          <div className="lg:w-80 border-r border-gray-800 overflow-y-auto bg-gray-900/50">
            <div className="p-4 space-y-4">
              {/* Theory Section */}
              {lesson.content.theory && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 max-h-96 overflow-y-auto">
                  <h3 className="text-sm font-semibold text-blue-400 mb-2">📚 Learn</h3>
                  <div className="text-xs text-gray-300 leading-relaxed">
                    <p>{lesson.content.theory.substring(0, 500)}...</p>
                  </div>
                </div>
              )}

              {/* Instructions Section */}
              {lesson.content.instructions && (
                <div>
                  <h3 className="text-sm font-bold text-white mb-2">🎯 Your Challenge</h3>
                  <div className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-300">
                    <p>{lesson.content.instructions}</p>
                  </div>
                </div>
              )}

              {/* Pro Tips */}
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h3 className="text-sm font-semibold text-purple-400 mb-2">💡 Tips</h3>
                <ul className="text-xs text-gray-300 space-y-1 leading-relaxed">
                  <li>• Click "Run Code" to see your changes</li>
                  <li>• The browser preview shows how it looks</li>
                  <li>• Experiment and have fun!</li>
                  <li>• Don't worry about mistakes - just try again!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive IDE */}
          <div className="flex-1 flex flex-col">
            <InteractiveIDE
              language="html"
              initialCode={lesson.content.starterCode || '<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <p>Start coding here!</p>\n</body>\n</html>'}
              onCodeChange={setUserCode}
              className="h-full"
            />
          </div>
        </div>

        {/* Footer with Next Steps */}
        <div className="border-t border-gray-800 bg-gray-900/50 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-sm text-gray-400">
              <span className="text-green-400 font-semibold">Tip:</span> Your changes appear instantly in the browser preview!
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={module ? `/modules/${module.id}` : '/modules'}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
              >
                Back to Module
              </Link>
              <button
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors"
              >
                Complete Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default "coming soon" page for non-HTML lessons
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link
              href={module ? `/modules/${module.id}` : '/modules'}
              className="text-green-400 hover:text-green-300 text-xs mb-1 inline-block"
            >
              ← Back to {module ? module.title : 'Modules'}
            </Link>
            <h1 className="text-2xl font-bold text-white truncate">{lesson.title}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{lesson.description}</p>
          </div>
          <div className="flex items-center gap-2 text-xs flex-shrink-0">
            <span className="px-2.5 py-1 bg-gray-800 rounded-full">{lesson.estimatedTime} min</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded-full capitalize">{lesson.difficulty}</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded-full capitalize">{lesson.language}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-12">
        <div className="bg-gray-900/50 rounded-2xl p-16 border border-gray-800 min-h-[500px] flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <div className="text-7xl mb-8">📚</div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Lesson Content Coming Soon
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              This lesson is currently being developed. Soon you'll be able to learn through interactive
              exercises, videos, documentation, quizzes, and hands-on coding challenges.
            </p>
            <Link
              href={module ? `/modules/${module.id}` : '/modules'}
              className="inline-block px-8 py-4 bg-green-400 hover:bg-green-300 text-black font-bold rounded-xl transition-all transform hover:scale-105"
            >
              Back to Module
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

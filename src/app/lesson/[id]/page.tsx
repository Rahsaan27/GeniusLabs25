'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { lessons, modules } from '@/data/lessons';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;

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
'use client';

import { useParams, useRouter } from 'next/navigation';
import { lessons } from '@/data/lessons';
import LessonView from '@/components/LessonView';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  
  const lesson = lessons.find(l => l.id === lessonId);
  
  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Lesson Not Found</h1>
          <p className="text-red-600 mb-4">The lesson you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/modules')}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }
  
  const handleComplete = () => {
    router.push('/modules');
  };
  
  return <LessonView lesson={lesson} onComplete={handleComplete} />;
}
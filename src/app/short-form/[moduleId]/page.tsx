'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { shortFormModules, shortFormLessons } from '@/data/shortFormLessons';
import ShortFormLesson from '@/components/ShortFormLesson';
import { Lesson } from '@/types/lesson';

export default function ModuleLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [moduleLessons, setModuleLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const moduleId = params.moduleId as string;
    const foundModule = shortFormModules.find(m => m.id === moduleId);
    
    if (foundModule) {
      setModuleLessons(foundModule.lessons);
    } else {
      // Fallback to all lessons if module not found
      setModuleLessons(shortFormLessons);
    }
  }, [params.moduleId]);

  const currentLesson = moduleLessons[currentLessonIndex];

  const handleLessonComplete = () => {
    if (currentLessonIndex < moduleLessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    } else {
      // All lessons completed, return to modules
      router.push('/modules');
    }
  };

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-2xl font-bold mb-2">Loading lessons...</h2>
          <p className="text-gray-400">Preparing your learning experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <ShortFormLesson 
        lesson={currentLesson} 
        onComplete={handleLessonComplete}
      />
    </div>
  );
}
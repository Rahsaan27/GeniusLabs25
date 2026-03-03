import { Lesson, QuizQuestion } from '@/types/lesson';
import { lessonConfigs, generateLessonFromConfig } from '@/utils/lessonTemplates';

// Advanced technical lessons designed for the short-form format
const advancedLessons: Lesson[] = [];

// Generate new lessons from templates
const generatedLessons: Lesson[] = lessonConfigs.map(generateLessonFromConfig);

// Combine all short form lessons
export const shortFormLessons: Lesson[] = [
  ...advancedLessons,
  ...generatedLessons
];

export const shortFormModules = [
  {
    id: 'advanced-javascript-mastery',
    title: 'Advanced JavaScript Mastery',
    description: 'Master advanced JavaScript concepts in bite-sized, interactive lessons',
    language: 'javascript',
    category: 'technology' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 5,
    lessons: shortFormLessons.filter(lesson => lesson.language === 'javascript')
  },
  {
    id: 'python-advanced-patterns',
    title: 'Advanced Python Patterns',
    description: 'Learn advanced Python programming patterns and best practices',
    language: 'python',
    category: 'technology' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 1,
    lessons: shortFormLessons.filter(lesson => lesson.language === 'python')
  },
  {
    id: 'computer-science-fundamentals',
    title: 'CS Fundamentals Express',
    description: 'Essential computer science concepts in rapid-fire format',
    language: 'theory',
    category: 'technology' as const,
    difficulty: 'advanced' as const,
    estimatedTime: 1,
    lessons: shortFormLessons.filter(lesson => lesson.language === 'theory')
  }
];

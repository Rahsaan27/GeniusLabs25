import { Lesson } from '@/types/lesson';

/**
 * Converts an educator-created JSON template into a Lesson object
 *
 * This function takes the simplified JSON template format that educators use
 * and transforms it into the full Lesson type required by the application.
 *
 * @param template - The educator's JSON lesson template
 * @returns A properly formatted Lesson object
 *
 * @example
 * ```typescript
 * import educatorLesson from './intro-js-lessons/variables.json';
 * const lesson = generateLessonFromTemplate(educatorLesson);
 * ```
 */
export function generateLessonFromTemplate(template: any): Lesson {
  return {
    id: template.lessonInfo.id,
    title: template.lessonInfo.title,
    description: template.lessonInfo.description,
    difficulty: template.lessonInfo.difficulty,
    language: template.lessonInfo.language,
    estimatedTime: template.lessonInfo.estimatedTime,
    activities: template.activities,
    content: {
      theory: template.content?.theory || '',
      instructions: template.content?.instructions || '',
      starterCode: template.content?.starterCode || '',
      solution: template.content?.solution || '',
      videos: template.content?.videos || [],
      documentation: template.content?.documentation || '',
      testCases: template.testCases || []
    },
    quiz: template.quiz
  };
}

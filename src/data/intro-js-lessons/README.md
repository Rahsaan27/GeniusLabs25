# Intro to JavaScript Lessons

This directory contains educator-created JavaScript lessons in JSON format.

## Adding New Lessons

When educators submit lesson JSON files, place them here and follow these steps:

### 1. Save the lesson file
```
intro-js-lessons/
├── variables.json
├── functions.json
├── arrays.json
└── [your-new-lesson].json
```

### 2. Import in modernCurriculum.ts

```typescript
import { generateLessonFromTemplate } from '@/utils/lessonTemplate';

// Import educator lessons
import variablesLesson from './intro-js-lessons/variables.json';
import functionsLesson from './intro-js-lessons/functions.json';

// Add to the lessons array
export const modernJavascriptLessons: Lesson[] = [
  // ... existing lessons
  generateLessonFromTemplate(variablesLesson),
  generateLessonFromTemplate(functionsLesson),
];
```

### 3. Verify

- Restart dev server: `npm run dev`
- Navigate to: http://localhost:3000/modules/javascript-basics
- Test the new lesson thoroughly

## File Format

See `curriculum-templates/lesson-template.json` for the expected structure.

## Educator Guide

Full documentation for educators: `curriculum-templates/EDUCATOR_GUIDE.md`

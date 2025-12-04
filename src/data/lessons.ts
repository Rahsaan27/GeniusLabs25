import { Lesson, Module } from '@/types/lesson';
import { modernJavascriptLessons, modernPythonLessons } from './modernCurriculum';
import { shortFormLessons, shortFormModules } from './shortFormLessons';
import { htmlLessons } from './htmlLessons';

// Python Fundamentals Lessons
const pythonFundamentalsLessons: Lesson[] = [
  {
    id: 'python-variables-print',
    title: 'Python Basics: Variables & Print',
    description: 'Learn how to store data in variables and display output',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 15,
    activities: ['videos', 'docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about variables and print statements',
      instructions: 'Complete the coding exercises',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-if-statements',
    title: 'Conditional Statements',
    description: 'Learn how to make decisions in your code using if statements',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 20,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about if, elif, and else statements',
      instructions: 'Practice writing conditional logic',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-loops',
    title: 'Loops: For and While',
    description: 'Master repetition in Python with for and while loops',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 25,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about loop structures',
      instructions: 'Practice writing loops',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-lists',
    title: 'Working with Lists',
    description: 'Learn to store and manipulate collections of data',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 20,
    activities: ['videos', 'code', 'quiz'],
    content: {
      theory: 'Learn about Python lists',
      instructions: 'Practice list operations',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-dictionaries',
    title: 'Dictionaries and Key-Value Pairs',
    description: 'Store and access data using dictionaries',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 20,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about Python dictionaries',
      instructions: 'Practice dictionary operations',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-functions',
    title: 'Functions and Code Reusability',
    description: 'Create reusable blocks of code with functions',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 25,
    activities: ['videos', 'docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about defining and calling functions',
      instructions: 'Practice writing functions',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-strings',
    title: 'String Manipulation',
    description: 'Work with text data and string methods',
    difficulty: 'beginner',
    language: 'python',
    estimatedTime: 20,
    activities: ['code', 'quiz'],
    content: {
      theory: 'Learn about string operations',
      instructions: 'Practice string manipulation',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-file-handling',
    title: 'Reading and Writing Files',
    description: 'Learn to work with files in Python',
    difficulty: 'intermediate',
    language: 'python',
    estimatedTime: 25,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about file operations',
      instructions: 'Practice reading and writing files',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-error-handling',
    title: 'Exception Handling',
    description: 'Handle errors gracefully with try-except blocks',
    difficulty: 'intermediate',
    language: 'python',
    estimatedTime: 20,
    activities: ['docs', 'code', 'quiz'],
    content: {
      theory: 'Learn about exception handling',
      instructions: 'Practice error handling',
      starterCode: '',
      solution: '',
      testCases: []
    }
  },
  {
    id: 'python-modules',
    title: 'Modules and Imports',
    description: 'Organize code and use external libraries',
    difficulty: 'intermediate',
    language: 'python',
    estimatedTime: 20,
    activities: ['docs', 'code'],
    content: {
      theory: 'Learn about importing and using modules',
      instructions: 'Practice working with modules',
      starterCode: '',
      solution: '',
      testCases: []
    }
  }
];

export const lessons: Lesson[] = [
  ...pythonFundamentalsLessons,
  ...shortFormLessons,
  ...modernJavascriptLessons,
  ...modernPythonLessons,
  ...htmlLessons
];

export const modules: Module[] = [
  // JavaScript - ACTIVE MODULE
  {
    id: 'javascript-basics',
    title: 'Intro to JavaScript',
    description: 'Learn the fundamentals of JavaScript programming',
    language: 'javascript',
    category: 'technology',
    difficulty: 'beginner',
    estimatedTime: 60,
    lessons: lessons.filter(lesson => lesson.language === 'javascript'),
    comingSoon: false
  },

  // COMING SOON MODULES
  {
    id: 'python-basics',
    title: 'Python Fundamentals',
    description: 'Learn the basics of Python programming',
    language: 'python',
    category: 'technology',
    difficulty: 'beginner',
    estimatedTime: 195,
    lessons: [],
    comingSoon: true
  },

  {
    id: 'html-css-basics',
    title: 'HTML & CSS Fundamentals',
    description: 'Learn the basics of web development with HTML and CSS',
    language: 'html',
    category: 'technology',
    difficulty: 'beginner',
    estimatedTime: 105,
    lessons: [],
    comingSoon: true
  },

  {
    id: 'social-entrepreneurship',
    title: 'Radical Social Entrepreneurship',
    description: 'Create ventures that address pressing social issues',
    language: 'theory',
    category: 'entrepreneurship',
    difficulty: 'beginner',
    estimatedTime: 90,
    lessons: [],
    comingSoon: true
  }
];
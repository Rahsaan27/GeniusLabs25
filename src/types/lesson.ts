export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  emoji?: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timePerQuestion: number; // in seconds
  passingScore: number; // percentage needed to pass
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  estimatedTime: number; // in minutes
  content: {
    theory: string;
    instructions: string;
    starterCode: string;
    solution: string;
    testCases: TestCase[];
  };
  quiz?: Quiz;
  prerequisites?: string[]; // lesson IDs
  shortFormConfig?: any; // For storing short-form specific data
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: Date;
  attempts: number;
  timeSpent: number; // in minutes
  currentCode?: string;
  score?: number; // 0-100
}

export interface Module {
  id: string;
  title: string;
  description: string;
  language: string;
  category: 'technology' | 'entrepreneurship' | 'leadership';
  lessons: Lesson[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
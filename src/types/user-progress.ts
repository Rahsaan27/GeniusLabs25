export interface UserProgress {
  userId: string; // Partition key - user's email or unique ID
  moduleId: string; // Sort key - identifies which module this progress is for

  // Progress tracking
  lessonsCompleted: string[]; // Array of lesson IDs completed
  currentLesson?: string; // Current lesson they're on

  // Module completion
  moduleProgress: number; // Percentage (0-100)
  isCompleted: boolean;
  completedAt?: string; // ISO timestamp

  // Scores and attempts
  quizScores?: Record<string, number>; // Map of quizId -> score
  exercisesCompleted?: Record<string, boolean>; // Map of exerciseId -> completed

  // Timestamps
  startedAt: string; // ISO timestamp
  lastAccessedAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp

  // Optional metadata
  timeSpent?: number; // Total time spent in minutes
  notes?: string; // User's personal notes
}

export interface CreateUserProgressInput {
  userId: string;
  moduleId: string;
  currentLesson?: string;
}

export interface UpdateUserProgressInput {
  userId: string;
  moduleId: string;
  lessonsCompleted?: string[];
  currentLesson?: string;
  moduleProgress?: number;
  isCompleted?: boolean;
  quizScores?: Record<string, number>;
  exercisesCompleted?: Record<string, boolean>;
  timeSpent?: number;
  notes?: string;
}

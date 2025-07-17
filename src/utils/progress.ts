import { UserProgress } from '@/types/lesson';

// Mock user ID for demo purposes
const DEMO_USER_ID = 'demo-user';

// In a real app, this would be stored in a database
let progressData: UserProgress[] = [];

export const getProgressData = (): UserProgress[] => {
  // Load from localStorage if available
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('user-progress');
    if (stored) {
      progressData = JSON.parse(stored);
    }
  }
  return progressData;
};

export const saveProgressData = (progress: UserProgress[]): void => {
  progressData = progress;
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('user-progress', JSON.stringify(progress));
  }
};

export const getUserProgress = (lessonId: string): UserProgress | null => {
  const progress = getProgressData();
  return progress.find(p => p.userId === DEMO_USER_ID && p.lessonId === lessonId) || null;
};

export const updateUserProgress = (lessonId: string, updates: Partial<UserProgress>): void => {
  const progress = getProgressData();
  const existingIndex = progress.findIndex(p => p.userId === DEMO_USER_ID && p.lessonId === lessonId);
  
  if (existingIndex >= 0) {
    // Update existing progress
    progress[existingIndex] = { ...progress[existingIndex], ...updates };
  } else {
    // Create new progress entry
    progress.push({
      userId: DEMO_USER_ID,
      lessonId,
      status: 'not_started',
      attempts: 0,
      timeSpent: 0,
      ...updates
    });
  }
  
  saveProgressData(progress);
};

export const markLessonComplete = (lessonId: string, score: number = 100): void => {
  updateUserProgress(lessonId, {
    status: 'completed',
    completedAt: new Date(),
    score
  });
};

export const startLesson = (lessonId: string): void => {
  updateUserProgress(lessonId, {
    status: 'in_progress'
  });
};

export const saveCurrentCode = (lessonId: string, code: string): void => {
  updateUserProgress(lessonId, {
    currentCode: code
  });
};

export const getOverallProgress = (): { completed: number; total: number; percentage: number } => {
  const progress = getProgressData();
  const userProgress = progress.filter(p => p.userId === DEMO_USER_ID);
  const completed = userProgress.filter(p => p.status === 'completed').length;
  const total = userProgress.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

export const getModuleProgress = (moduleId: string, lessonIds: string[]): { completed: number; total: number; percentage: number } => {
  const progress = getProgressData();
  const userProgress = progress.filter(p => p.userId === DEMO_USER_ID && lessonIds.includes(p.lessonId));
  const completed = userProgress.filter(p => p.status === 'completed').length;
  const total = lessonIds.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};
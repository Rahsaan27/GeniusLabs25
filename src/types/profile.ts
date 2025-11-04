export interface UserProfile {
  email: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;

  // Learning stats
  totalLessonsCompleted: number;
  totalModulesCompleted: number;
  totalTimeSpent: number; // in minutes
  totalScore: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate?: string;

  // Settings/Preferences
  emailNotifications: boolean;
  dailyReminders: boolean;
  preferredLanguage?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'lessons' | 'modules' | 'score' | 'streak' | 'special';
  requirement: {
    type: 'lessons_completed' | 'modules_completed' | 'score' | 'streak' | 'custom';
    value: number;
  };
  unlockedAt?: string;
}

export interface UserAchievement {
  email: string;
  achievementId: string;
  unlockedAt: string;
  progress?: number; // For tracking progress towards achievement
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Completed your first 5 lessons',
    icon: '🎯',
    category: 'lessons',
    requirement: { type: 'lessons_completed', value: 5 }
  },
  {
    id: 'learning-momentum',
    name: 'Learning Momentum',
    description: 'Completed 15 lessons',
    icon: '⚡',
    category: 'lessons',
    requirement: { type: 'lessons_completed', value: 15 }
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 30 lessons',
    icon: '📚',
    category: 'lessons',
    requirement: { type: 'lessons_completed', value: 30 }
  },
  {
    id: 'module-master',
    name: 'Module Master',
    description: 'Completed your first module',
    icon: '🏆',
    category: 'modules',
    requirement: { type: 'modules_completed', value: 1 }
  },
  {
    id: 'multi-skilled',
    name: 'Multi-Skilled',
    description: 'Completed 3 modules',
    icon: '🌟',
    category: 'modules',
    requirement: { type: 'modules_completed', value: 3 }
  },
  {
    id: 'high-achiever',
    name: 'High Achiever',
    description: 'Earned 1000+ total points',
    icon: '👑',
    category: 'score',
    requirement: { type: 'score', value: 1000 }
  },
  {
    id: 'streak-warrior',
    name: 'Streak Warrior',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥',
    category: 'streak',
    requirement: { type: 'streak', value: 7 }
  },
];

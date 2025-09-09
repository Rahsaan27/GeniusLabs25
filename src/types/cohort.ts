export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  cohortId: string;
  type: 'message' | 'announcement' | 'assignment';
  isAdminMessage?: boolean;
  assignmentData?: Assignment;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  lessonIds: string[];
  dueDate?: Date;
  createdAt: Date;
  completedBy: string[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  createdBy: string;
  cohortId: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Cohort {
  id: string;
  name: string;
  location: string;
  number: number;
  members: string[];
  createdAt: Date;
  isActive: boolean;
  password: string;
}

export interface CohortLocation {
  id: string;
  name: string;
  fullName: string;
  cohortCount: number;
  cohorts: Cohort[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  cohortId?: string;
  joinedAt: Date;
  isAdmin?: boolean;
}

export interface CohortUser {
  id: string;
  name: string;
  email?: string;
  isAdmin: boolean;
  joinedAt: Date;
}
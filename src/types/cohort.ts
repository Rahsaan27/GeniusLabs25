export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  cohortId: string;
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
}
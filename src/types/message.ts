export interface Message {
  id: string;
  cohortId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: number;
  createdAt: string;
  updatedAt?: string;
  type?: 'message' | 'announcement' | 'assignment';
  isAdminMessage?: boolean;
}

export interface CreateMessageInput {
  cohortId: string;
  userId: string;
  userName: string;
  content: string;
  type?: 'message' | 'announcement' | 'assignment';
  isAdminMessage?: boolean;
}
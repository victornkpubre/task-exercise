export type TaskStatus = 'pending' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  extras: {
    tags?: string[];
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface TaskFilters {
  status?: TaskStatus | 'all';
  search?: string;
}
import { Task, User } from '@/models/types';

const USERS_KEY = 'taskmanager_users';
const TASKS_KEY = 'taskmanager_tasks';
const CURRENT_USER_KEY = 'taskmanager_current_user';

// User Storage
export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  
  const users = getUsers();
  return users.find(u => u.id === userId) || null;
};

export const setCurrentUser = (userId: string | null): void => {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(u => u.email === email) || null;
};

// Task Storage
export const getTasks = (userId?: string): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  const allTasks: Task[] = tasks ? JSON.parse(tasks) : [];
  
  if (userId) {
    return allTasks.filter(task => task.userId === userId);
  }
  
  return allTasks;
};

export const saveTask = (task: Task): void => {
  const tasks = getTasks();
  const existingIndex = tasks.findIndex(t => t.id === task.id);
  
  if (existingIndex >= 0) {
    tasks[existingIndex] = task;
  } else {
    tasks.push(task);
  }
  
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(t => t.id !== taskId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(filteredTasks));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
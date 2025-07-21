import { Task, User } from '@/core/models';

const USERS_KEY = 'taskmanager_users';
const CURRENT_USER_KEY = 'taskmanager_current_user';
const TOKEN = 'taskmanager_token';


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
  
  const usersJson = localStorage.getItem(USERS_KEY);
  const users = usersJson? JSON.parse(usersJson) : [];
  return users.find(u => u.id === userId) || null;
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN);
};

export const setToken = (token: string | null): void => {
    if (token) {
      localStorage.setItem(TOKEN, token);
    } else {
      localStorage.removeItem(TOKEN);
    }
};

export const setCurrentUser = (userId: string | null): void => {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const clearUserCache = async (): Promise<void> => {
  setToken(null);
  setCurrentUser(null);
};

export const findUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(u => u.email === email) || null;
};

import { User } from '@/models/types';
import { 
  getUsers, 
  saveUser, 
  getCurrentUser, 
  setCurrentUser, 
  findUserByEmail, 
  generateId 
} from '@/services/cache';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const login = (email: string, password: string): AuthResult => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return { success: false, error: 'User not found' };
  }
  
  // In a real app, you'd verify the password hash
  // For this demo, we'll use a simple check
  if (password.length < 6) {
    return { success: false, error: 'Invalid password' };
  }
  
  setCurrentUser(user.id);
  return { success: true, user };
};

export const signup = (email: string, password: string, name: string): AuthResult => {
  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required' };
  }
  
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }
  
  if (findUserByEmail(email)) {
    return { success: false, error: 'User already exists' };
  }
  
  const user: User = {
    id: generateId(),
    email,
    name,
    createdAt: new Date().toISOString(),
  };
  
  saveUser(user);
  setCurrentUser(user.id);
  
  return { success: true, user };
};

export const logout = (): void => {
  setCurrentUser(null);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const getAuthenticatedUser = (): User | null => {
  return getCurrentUser();
};
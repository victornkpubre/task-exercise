import { User } from '@/core/models';
import { clearUserCache, getCurrentUser, getToken, saveUser, setCurrentUser, setToken } from '../util/cache';
import { registerUser, loginUser, logoutUser } from '@/util/datasource';

interface AuthResponse {
  success: string;
  error: string;
}

export const signup = async (
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> => {
  try {
    const result = await registerUser(email, name, password);

    // Save user & token to local cache
    saveUser(result.user);
    setToken(result.token);
    setCurrentUser(result.user.id);

    return {
      success: "Account created successfully.",
      error: "",
    };
  } catch (err: unknown) {
    let message = "Something went wrong.";
    if (err instanceof Error) {
      message = err.message;
    }

    return {
      success: "",
      error: message,
    };
  }
};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const result = await loginUser(email, password);

    if (!result) {
      return {
        success: "",
        error: "Invalid email or password.",
      };
    }

    // Save token and user to cache
    saveUser(result.user);
    setToken(result.token);
    setCurrentUser(result.user.id);

    return {
      success: "Logged in successfully.",
      error: "",
    };
  } catch (err: unknown) {
    let message = "Login failed.";
    if (err instanceof Error) {
      message = err.message;
    }

    return {
      success: "",
      error: message,
    };
  }
};


export const logout = async (): Promise<boolean> => { 
  const token = getToken();
  const result = await logoutUser(token);
  if (result) {
    clearUserCache();
  }

  return result;
}


export const getAuthenticatedUser = (): User | null => {
  return getCurrentUser();
};

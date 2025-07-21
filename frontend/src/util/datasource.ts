import { Task, User } from "@/core/models";
import { ApiAdapter } from "../adapters/api";
import { clearUserCache } from "./cache";

const baseUrl = import.meta.env.VITE_BASE_URL;

const authHeader = (token?: string) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------- User ----------
export const getUser = async (id: string, token?: string): Promise<User> => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    headers: { ...authHeader(token) },
  });
  const data = await res.json();
  return ApiAdapter.toUser(data);
};

export const registerUser = async (
  email: string,
  name: string, 
  password: string 
): Promise<{ token: string; user: User }> => {
  const res = await fetch(`${baseUrl}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password, name: name}),
    credentials: 'include'
  });

  if (res.status === 400) {
    throw new Error('Email already in use')
  }

  if (!res.ok) throw new Error("Signup failed");

  const { token, user: userData } = await res.json();
  return {
    token,
    user: ApiAdapter.toUser(userData),
  };
};

export const updateUser = async (
  user: User,
  token?: string
): Promise<void> => {
  const res = await fetch(`${baseUrl}/api/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify({ email: user.email }),
  });

  if (!res.ok) throw new Error("Update failed");
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: User } | null> => {
  const res = await fetch(`${baseUrl}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });

  if (res.status === 400 || res.status === 401) return null;

  const { token, user } = await res.json();
  return {
    token,
    user: ApiAdapter.toUser(user),
  };
};

export const logoutUser = async (
  token: string,
): Promise<boolean> => {
  const res = await fetch(`${baseUrl}/api/signout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
  });

  if (res.status === 400 || res.status === 401) return false;

  return true;
};

// ---------- Tasks ----------
export const getUsersTasks = async (token?: string): Promise<Task[]> => {
  const res = await fetch(`${baseUrl}/api/tasks`, {
    headers: { ...authHeader(token) },
  });

  if (res.status === 401) {
    clearUserCache();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }


  const data = await res.json();
  return data.map(ApiAdapter.toTask);
};

export const createTask = async (task: Task, token?: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(task),
  });

  if (res.status === 401) {
    clearUserCache();
    throw new Error("Unauthorized");
  }


  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create task: ${err}`);
  }
};

export const updateTask = async (task: Task, token?: string): Promise<void> => {
  if (!task.id) throw new Error("Cannot update task without an ID");

  const res = await fetch(`${baseUrl}/api/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(token),
    },
    body: JSON.stringify(task),
  });

  if (res.status === 401) {
    clearUserCache();
    throw new Error("Unauthorized");
  }


  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to update task: ${err}`);
  }
};


export const deleteUserTaskById = async (
  taskId: string,
  token?: string
): Promise<void> => {
  const res = await fetch(`${baseUrl}/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: { ...authHeader(token) },
  });

  if (res.status === 401) {
    clearUserCache();
    throw new Error("Unauthorized");
  }

  if (!res.ok) throw new Error("Failed to delete task");
};

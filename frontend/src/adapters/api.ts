import { Task, TaskStatus, User } from "@/core/models";

type ApiUser = {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
};

type ApiTask = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  extras?: {
    tags?: string[];
    dueDate?: string;
    priority?: "low" | "medium" | "high";
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
};

const mapStatus = (status: 'pending' | 'in-progress' | 'done'): TaskStatus => {
  switch (status) {
    case "pending":
      return "pending";
    case "in-progress":
      return "in-progress";
    case "done":
      return "done";
  }
};

export class ApiAdapter {
  static toUser(data: ApiUser): User {
    return {
      id: data.id,
      email: data.email,
      name: data.name ?? "",
      createdAt: data.createdAt ? (new Date(data.createdAt)).toISOString() : new Date().toISOString(),
    };
  }

  static toTask(data: ApiTask): Task {
    return {
      id: data.id,
      title: data.title,
      description: data.description ?? "",
      status: mapStatus(data.status),
      extras: data.extras ?? {},
      createdAt: new Date(data.createdAt).toISOString(),
      updatedAt: new Date(data.updatedAt).toISOString(),
      userId: data.userId,
    };
  }

}

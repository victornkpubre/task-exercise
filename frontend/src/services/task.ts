import { createTask, deleteUserTaskById, getUsersTasks, updateTask } from "@/util/datasource";
import { Task } from "@/core/models";
import { getToken } from "@/util/cache";


export const getTasks = async (): Promise<Task[]> => {
    try {
      const token = getToken();
      const tasks = await getUsersTasks(token);
      return tasks;
    } catch (err) {
      console.error("Failed to get tasks", err);
      return [];
    }
  };
  

  export const deleteTask = async (id?: string): Promise<boolean> => {
    if (!id) return false;
  
    try {
      const token = getToken();
      await deleteUserTaskById(id, token);
      return true;
    } catch (err) {
      console.error("Failed to delete task", err);
      return false;
    }
  };
  

  export const saveTask = async (task: Task, id?: string): Promise<boolean> => {
    const taskData = { ...task };
    const token = getToken();
  
    try {
      if (id) {
        taskData.id = id;
        await updateTask(taskData, token);
      } else {
        await createTask(taskData, token);
      }
      return true;
    } catch (err) {
      console.error("Failed to save task:", err);
      return false;
    }
  };

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
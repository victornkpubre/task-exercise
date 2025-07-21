// src/controllers/task/createTask.ts
import { Request, Response } from 'express';
import { Task } from '../../models/Task';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, extras } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const task = await Task.create({ title, description, status, extras, userId });
    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

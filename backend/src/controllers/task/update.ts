import { Request, Response } from 'express';
import { Task } from '../../models/Task';

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, status, extras } = req.body;
    await task.update({ title, description, status, extras });

    res.json(task);
  } catch (err) {
    console.error('Update task error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

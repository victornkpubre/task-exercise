import { Request, Response } from 'express';
import { Task } from '../../models/Task';

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.status(204).send();
  } catch (err) {
    console.error('Delete task error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

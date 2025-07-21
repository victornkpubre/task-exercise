import { Request, Response } from 'express';
import { Task } from '../../models/Task';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const tasks = await Task.findAll({ where: { userId } });

    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

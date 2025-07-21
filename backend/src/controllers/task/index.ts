import express from 'express';
import { createTask } from './create';
import { getTasks } from './show';
import { updateTask } from './update';
import { deleteTask } from './delete';
import { requireAuth } from '../../middleware/require-auth';

const router = express.Router();

router.use(requireAuth);

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export { router as taskRouter };

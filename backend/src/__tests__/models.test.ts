  import { connectTestDB } from '../config/test-db';
  import { User, Task} from '../models/index'

  beforeAll(async () => {
    await connectTestDB();
  });

  describe('User & Task Models', () => {
    it('creates a user and a task', async () => {
      const user = await User.create({ email: 'a@test.com', name: 'Alice' });
      expect(user.id).toBeDefined();

      const task = await Task.create({
        title: 'Task 1',
        status: 'todo',
        userId: user.id,
      });

      expect(task.userId).toBe(user.id);
    });
  });

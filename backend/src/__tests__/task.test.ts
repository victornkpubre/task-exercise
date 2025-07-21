import request from 'supertest';
import { app } from '../app';
import { Task } from '../models/Task';
import { connectTestDB } from '../config/test-db';

const signupAndGetToken = async () => {
    const response = await request(app)
    .post('/api/signup')
    .send({
      email: 'test@example.com',
      password: 'password123',
      name: "user name"
    })
  
    return response.body.token;
};


beforeAll(async () => {
  await connectTestDB();
});

describe('Task Routes', () => {
  let token: string;

  beforeAll(async () => {
    token = await signupAndGetToken();
  });

  let taskId: string;

  it('creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'Test Description',
        status: 'todo',
        extras: { tags: ['test'], priority: 'medium' },
      })
      .expect(201);

    expect(res.body.title).toBe('Test Task');
    expect(res.body.status).toBe('todo');
    taskId = res.body.id;
  });

  it('gets all tasks for the user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].title).toBe('Test Task');
  });

  it('updates a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task Title',
        status: 'in_progress',
      })
      .expect(200);

    expect(res.body.title).toBe('Updated Task Title');
    expect(res.body.status).toBe('in_progress');
  });

  it('deletes a task', async () => {
    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const found = await Task.findByPk(taskId);
    expect(found).toBeNull();
  });
});

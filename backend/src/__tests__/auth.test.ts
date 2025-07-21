// test/auth.test.ts
import request from 'supertest';
import { connectTestDB } from '../config/test-db';

import { User} from '../models/index'
import { app } from '../app';

beforeAll(async () => {
  await connectTestDB();
});

describe('Auth Routes', () => {
  describe('POST /api/signup', () => {
    it('creates a user and returns a JWT', async () => {
      const res = await request(app)
        .post('/api/signup')
        .send({
          email: 'test@example.com',
          password: 'password123',
          name: "user name"
        })
        .expect(201);

      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('test@example.com');

      const user = await User.findOne({ where: { email: 'test@example.com' } });
      expect(user).not.toBeNull();
    });

    it('rejects duplicate emails', async () => {
      await request(app).post('/api/signup').send({
        email: 'test2@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/api/signup').send({
        email: 'test2@example.com',
        password: 'anotherpass',
      });

      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/signin', () => {
    beforeEach(async () => {
      await request(app).post('/api/signup').send({
        email: 'login@test.com',
        password: 'validpass',
        name: "user name"
      });
    });

    it('signs in a user with correct credentials', async () => {
      const res = await request(app)
        .post('/api/signin')
        .send({
          email: 'login@test.com',
          password: 'validpass',
        })
        .expect(200);

      expect(res.body.token).toBeDefined();
      expect(res.body.user.email).toBe('login@test.com');
    });

    it('rejects invalid credentials', async () => {
      await request(app)
        .post('/api/signin')
        .send({ email: 'login@test.com', password: 'wrongpass' })
        .expect(400);
    });
  });

  describe('POST /api/signout', () => {
    it('signs out user (noop if using JWT)', async () => {
      await request(app).post('/api/signout').expect(200);
    });
  });
});

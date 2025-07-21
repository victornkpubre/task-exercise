import express from 'express';
import { signupRouter, signinRouter, signoutRouter, taskRouter } from './controllers';
import { loadEnv } from './config/env';
import cors from 'cors';

loadEnv();

const app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'http://frontend:8080'],
    credentials: true
  }));
app.use(express.json());

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use('/api', taskRouter);

export { app };

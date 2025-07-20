import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

import express, { Request, Response } from 'express';
import { authRouter } from './controllers/auth';
import { connectDB } from './config/db';


const app = express();
app.use(express.json());


app.use('/auth', authRouter);

connectDB().then(() => {
  app.listen(4000, () => {
    console.log(`Listening on port ${4000}`);
  });
}).catch(err => {
    console.error('Failed to start server:', err);
});

export default app;
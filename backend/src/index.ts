// src/index.ts
import './config/env'; // Load dotenv first
import { app } from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 4000;

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'test') {
  connectDB() 
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error('Failed to start server:', err);
    });
}

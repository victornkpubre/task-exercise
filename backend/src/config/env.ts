import dotenv from 'dotenv';
import path from 'path';

export function loadEnv(): void {
  const envFile =
    process.env.NODE_ENV === 'test'
      ? '.env.test'
      : process.env.NODE_ENV === 'production'
        ? '.env.production'
        : '.env.development';

  const envPath = path.resolve(process.cwd(), envFile);
  dotenv.config({ path: envPath });

  console.log(`Loaded environment variables from ${envFile}`);
}
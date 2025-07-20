import { Sequelize } from 'sequelize';
import { initModels } from '../models';

if (!process.env.SUPABASE_DB_URL) {
  throw new Error('SUPABASE_DB_URL is not set in the environment');
}

export const sequelize = new Sequelize(process.env.SUPABASE_DB_URL, {
  dialect: 'postgres',
  logging: false,
});

export async function connectDB() {
  try {

    await sequelize.authenticate();
    console.log('Database connection established.');
    
    initModels(sequelize)

    await sequelize.sync({ alter: true });
    console.log('Tables synced with DB.');
    
  } catch (error) {
    console.error('Unable to connect or sync with DB:', error);
    process.exit(1);
  }
}

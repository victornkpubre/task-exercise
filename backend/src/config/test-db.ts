import { Sequelize } from 'sequelize';
import { initModels } from '../models';

const databaseUrl = process.env.DATABASE_URL;

export const sequelizeTest = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    })
  : new Sequelize('sqlite::memory:', {
    dialect: 'sqlite',
    logging: false,
  });


export const connectTestDB = async () => {
  try {
      await sequelizeTest.authenticate();
      console.log('Connection established successfully.');

      console.log('init models')
      console.log(`databae: ${databaseUrl}`)
      initModels(sequelizeTest)
  
      await sequelizeTest.sync({ alter: true }); 
      console.log('Tables created successfully.');

    } catch (error) {
      console.error('Unable to connect or sync:', error);
    }
}

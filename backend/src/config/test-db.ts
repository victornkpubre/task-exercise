import { Sequelize } from 'sequelize';
import { initModels } from '../models';

export const sequelizeTest = new Sequelize('sqlite::memory:', {
  dialect: 'sqlite',
  logging: false,
});

export const connectTestDB = async () => {
  initModels(sequelizeTest)

  await sequelizeTest.sync({ force: true });
};

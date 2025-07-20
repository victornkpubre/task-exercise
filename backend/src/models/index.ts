import { Sequelize } from 'sequelize';
import { initUserModel, User } from './User';
import { initTaskModel, associateTaskModel, Task } from './Task';

export const initModels = (sequelize: Sequelize) => {
  initUserModel(sequelize);
  initTaskModel(sequelize);
  associateTaskModel();
};

export { User, Task };
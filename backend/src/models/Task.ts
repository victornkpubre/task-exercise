// src/models/Task.ts
import { Model, DataTypes, Sequelize } from 'sequelize';
import { User } from './User';

export type TaskStatus = 'pending' | 'in-progress' | 'done';

export class Task extends Model {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: TaskStatus;
  public extras?: {
    tags?: string[];
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
  };
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public userId!: string;
}

export const initTaskModel = (sequelize: Sequelize) => {
  Task.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'done'),
      allowNull: false,
    },
    extras: {
      type: DataTypes.JSONB,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'tasks',
    timestamps: false, // set to true if you want auto timestamps
  });
};

export const associateTaskModel = () => {
  User.hasMany(Task, { foreignKey: 'userId' });
  Task.belongsTo(User, { foreignKey: 'userId' });
};

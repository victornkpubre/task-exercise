// src/models/User.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: string;
  public email!: string;
  public name!: string;
  public readonly createdAt!: Date;
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false, // change to true if you want Sequelize to manage timestamps
  });
};

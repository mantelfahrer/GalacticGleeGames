import dotenv from "dotenv";
import { DataTypes, Sequelize } from "sequelize";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "database",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

export const User = sequelize.define("User", {
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.sync();

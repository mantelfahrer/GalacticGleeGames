import { DataTypes, Sequelize } from "sequelize";

export const createModelThread = (sequelize: Sequelize) => {
  return sequelize.define("Thread", {
    threadID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: "userID",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

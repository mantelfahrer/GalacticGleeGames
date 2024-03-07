import { DataTypes, Sequelize } from "sequelize";

export const createModelQuest = (sequelize: Sequelize) => {
  return sequelize.define("Quest", {
    questID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

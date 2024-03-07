import { DataTypes, Sequelize } from "sequelize";

export const createModelUserQuest = (sequelize: Sequelize) => {
  return sequelize.define("UserQuest", {
    userQuestID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "userID",
      },
    },
    questID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Quests",
        key: "questID",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

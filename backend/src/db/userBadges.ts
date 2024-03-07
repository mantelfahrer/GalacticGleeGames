import { DataTypes, Sequelize } from "sequelize";

export const createModelUserBadge = (sequelize: Sequelize) => {
  return sequelize.define("UserBadge", {
    userBadgeID: {
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
    badgeID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Badges",
        key: "badgeID",
      },
    },
  });
};

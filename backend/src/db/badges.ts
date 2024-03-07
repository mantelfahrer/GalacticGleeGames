import { DataTypes, Sequelize } from "sequelize";

export const createModelBadge = (sequelize: Sequelize) => {
  return sequelize.define("Badge", {
    badgeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    questID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Quests',
        key: "questID",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

import { DataTypes, Sequelize } from "sequelize";

export const createModelPost = (sequelize: Sequelize) => {
  return sequelize.define("Post", {
    postID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    threadID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Threads",
        key: "threadID",
      },
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Users",
        key: "userID",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

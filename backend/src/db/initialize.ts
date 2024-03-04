import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { createModelUser } from "./users";
import { createModelThread } from "./threads";
import { createModelPost } from "./posts";
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

// create models
export const User = createModelUser(sequelize);
export const Thread = createModelThread(sequelize);
export const Post = createModelPost(sequelize);

// ASSOCIATIONS
// user 1:n thread
User.hasMany(Thread, {
  foreignKey: "userID",
});
Thread.belongsTo(User, {
  foreignKey: "userID",
});

// user 1:n post
User.hasMany(Post, {
  foreignKey: "userID",
});
Post.belongsTo(User, {
  foreignKey: "userID",
});

// thread 1:n post
Thread.hasMany(Post, {
  foreignKey: "threadID",
});
Post.belongsTo(User, {
  foreignKey: "threadID",
});

// sync
async function sync(): Promise<void> {
  await sequelize.sync();
}
sync().catch(console.error);

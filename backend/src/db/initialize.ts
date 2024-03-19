import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { createModelPost } from "./posts";
import { createModelQuest } from "./quests";
import { createModelThread } from "./threads";
import { createModelUserQuest } from "./userQuests";
import { createModelUser } from "./users";
import { createFixtures } from "./fixtures";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || "database",
  process.env.MYSQL_USER || "root",
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// create models
export const User = createModelUser(sequelize);
export const Thread = createModelThread(sequelize);
export const Post = createModelPost(sequelize);
export const Quest = createModelQuest(sequelize);
export const UserQuest = createModelUserQuest(sequelize);

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

// user n:m quest through userQuests
User.belongsToMany(Quest, {
  through: UserQuest,
  uniqueKey: "userQuestID",
  foreignKey: "userID",
  otherKey: "questID",
});
Quest.belongsToMany(User, {
  through: UserQuest,
  uniqueKey: "userQuestID",
  foreignKey: "questID",
  otherKey: "userID",
});

// initialize database
async function sync(): Promise<void> {
  await sequelize.sync();
  await createFixtures();
}
sync().catch(console.error);

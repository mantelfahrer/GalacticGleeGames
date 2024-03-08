import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { createModelBadge } from "./badges";
import { createModelPost } from "./posts";
import { createModelQuest } from "./quests";
import { createModelThread } from "./threads";
import { createModelUserBadge } from "./userBadges";
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
export const Badge = createModelBadge(sequelize);
export const UserQuest = createModelUserQuest(sequelize);
export const UserBadge = createModelUserBadge(sequelize);

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

// quest 1:1 badges
Quest.hasOne(Badge, {
  foreignKey: "questID",
});
Badge.belongsTo(Quest, {
  foreignKey: "questID",
});

// user n:m quest through userQuests
User.belongsToMany(Quest, { through: UserQuest, uniqueKey: "userQuestID" });
Quest.belongsToMany(User, { through: UserQuest, uniqueKey: "userQuestID" });

// user n:m badge through userBadges
User.belongsToMany(Badge, { through: UserBadge, uniqueKey: "userBadgeID" });
Badge.belongsToMany(User, { through: UserBadge, uniqueKey: "userBadgeID" });

// initialize database
async function sync(): Promise<void> {
  await sequelize.sync();
  await createFixtures();
}
sync().catch(console.error);

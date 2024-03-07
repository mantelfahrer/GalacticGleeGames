import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import { Op } from "sequelize";
import { User } from "./initialize";
dotenv.config();

export const createFixtures = async () => {
  // add admin account
  if (
    process.env.ADMIN_ACCOUNT_NAME &&
    process.env.ADMIN_ACCOUNT_EMAIL &&
    process.env.ADMIN_ACCOUNT_PASSWORD
  ) {
    const encryptedPassword = await bcrypt.hash(
      process.env.ADMIN_ACCOUNT_PASSWORD,
      10
    );
    const uuid = crypto.randomUUID();
    const [user, created] = await User.findOrCreate({
      where: {
        [Op.or]: [
          { username: process.env.ADMIN_ACCOUNT_NAME },
          { emailAddress: process.env.ADMIN_ACCOUNT_EMAIL },
        ],
      },
      defaults: {
        userID: uuid,
        username: process.env.ADMIN_ACCOUNT_NAME,
        name: process.env.ADMIN_ACCOUNT_NAME,
        emailAddress: process.env.ADMIN_ACCOUNT_EMAIL,
        password: encryptedPassword,
        role: "ADMIN",
      },
    });
    console.log("ADMIN ACCOUNT CREATED: " + created);
  }
};

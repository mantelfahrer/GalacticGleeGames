import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../db/initialize";
import { generateAccessToken } from "../middleware/authentication";
dotenv.config();

/**
 *  @description Register user
 *  @route POST /users/signup
 */
export const registerUser = async (req: Request, res: Response) => {
  const { username, name, emailAddress, password } = req.body;

  if (!username || !name || !emailAddress || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const uuid = crypto.randomUUID();

  // check if username or email address is already taken
  const [user, created] = await User.findOrCreate({
    where: {
      [Op.or]: [{ username: username }, { emailAddress: emailAddress }],
    },
    defaults: {
      userID: uuid,
      username: username,
      name: name,
      emailAddress: emailAddress,
      password: encryptedPassword,
      role: "USER",
    },
  });
  console.log("User created: " + created);
  if (!created) {
    return res
      .status(401)
      .json({ message: "Username or email address already taken" });
  }

  return res.status(201).json({ message: "User has been registered" });
};

/**
 * @description Get all users
 * @route GET /users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    attributes: ["userID", "username"],
  });

  return res.status(200).json(users);
};

/**
 * @description Get single user
 * @route GET /users/:userID
 */
export const getSingleUser = async (req: Request, res: Response) => {
  const { userID } = req.params;

  const user = await User.findOne({
    where: {
      userID: userID,
    },
    attributes: { exclude: ["password", "emailAddress"] },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

/**
 * @description Login user
 * @route POST /users/login
 */
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // let result: User;

  if (!username || !password) {
    res.status(400).json({
      message: "Username and password must be provided",
    });
  }

  const user: any = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const comparison = await bcrypt.compare(password, user.password);

  if (comparison) {
    res.status(200).json({
      message: "Login successful",
      token: generateAccessToken(user),
    });
  } else {
    res.status(401).json({ message: "Username and password did not match" });
  }
};

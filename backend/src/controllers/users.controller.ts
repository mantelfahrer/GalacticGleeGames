import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { Quest, User } from "../db/initialize";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../middleware/authentication";
import { createUserQuest } from "./userQuests.controller";
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
  if (!created) {
    return res
      .status(401)
      .json({ message: "Username or email address already taken" });
  }

  // get all recent quests
  const allQuests: any[] = await Quest.findAll();
  if (!allQuests) {
    return res
      .status(500)
      .json({ message: "Quests for user could not be created." });
  }

  // create userQuests
  allQuests.forEach(async (quest) => {
    await createUserQuest(uuid, quest.questID);
  });

  const createdUser = await User.findByPk(uuid, {
    attributes: { exclude: ["password", "emailAddress", "role"] },
    include: Quest,
  });

  return res.status(201).json({
    message: "User has been registered",
    user: createdUser,
  });
};

/**
 * @description Get all users
 * @route GET /users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  if (req.body.user.role !== "ADMIN") {
    return res.sendStatus(401);
  }

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

  const user = await User.findByPk(userID, {
    attributes: { exclude: ["password", "emailAddress", "role"] },
    include: Quest,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  console.log("user: " + JSON.stringify(user, null, 2));

  return res.status(200).json(user);
};

/**
 * @description Login user
 * @route POST /users/login
 */
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

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
    // generate refresh token and save iat value in database
    const refreshToken = generateRefreshToken(user);
    const decoded: any = jwt.decode(refreshToken);
    user.lastIssuedTokenAt = decoded.iat;
    user.save();

    // remove sensitive data from user to be able to return it
    const userWithoutSensitiveData = JSON.parse(
      JSON.stringify({
        userID: user.userID,
        username: user.username,
        name: user.name,
        emailAddress: user.emailAddress,
        role: user.role,
      })
    );
    // set refresh token as cookie in request
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 8,
      httpOnly: true,
    });
    res.status(200).json({
      message: "Login successful",
      user: userWithoutSensitiveData,
      token: generateAccessToken(user),
    });
  } else {
    res.status(401).json({ message: "Username and password did not match" });
  }
};

/**
 * @description Refresh token
 * @route POST /users/refresh
 */
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401).json({
      message: "Refresh token must be provided",
    });
  }

  const result: any = verifyToken(refreshToken);

  if (!result.success) {
    return res.status(401).json({ error: result.error });
  }

  const user: any = await User.findOne({
    where: {
      userID: result.data.userID,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  // read lastIssuedTokenAt from database entry and compare with iat from decoded token
  if (result.data.iat < user.lastIssuedTokenAt) {
    user.lastIssuedTokenAt = Date.now();
    user.save();
    return res.status(401).json({
      message: "Refresh token expired, please log in",
    });
  }

  // generate refresh token and save iat value in database
  const newRefreshToken = generateRefreshToken(user);
  const decoded: any = jwt.decode(newRefreshToken);
  user.lastIssuedTokenAt = decoded.iat;
  user.save();

  // set refresh token as cookie in request
  res.cookie("refreshToken", newRefreshToken, {
    maxAge: 1000 * 60 * 60 * 8,
    httpOnly: true,
  });
  res.status(200).json({
    message: "Refresh successful",
    token: generateAccessToken(user),
  });
};

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { pool } from "../db/connect";
import { generateAccessToken } from "../middleware/authentication";
import { User } from "../models/User";
import crypto from 'crypto';

const saltRounds = 9;

/**
 *  @description Register user
 *  @route POST /users/signup
 */
export const registerUser = async (req: Request, res: Response) => {
  const { username, name, emailAddress, password } = req.body;

  if (!username || !name || !emailAddress || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }

  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const uuid = crypto.randomUUID();

  // check if username is already taken
  let sqlCheckUsername = "SELECT username FROM users WHERE username = ?";
  const [rowsCheckUsername] = await pool.query(sqlCheckUsername, [username]);
  if (Array.isArray(rowsCheckUsername) && rowsCheckUsername.length) {
    return res.status(401).json({ message: "Username already taken" });
  }

  // check if email address is already taken
  let sqlCheckEmail = "SELECT emailAddress FROM users WHERE emailAddress = ?";
  const [rowsCheckEmail] = await pool.query(sqlCheckEmail, [emailAddress]);
  if (Array.isArray(rowsCheckEmail) && rowsCheckEmail.length) {
    return res
      .status(401)
      .json({ message: "Email address already has an account" });
  }

  let sql =
    "INSERT INTO users (userID, username, name, emailAddress, password) VALUES (?, ?, ?, ?, ?)";
  await pool.query(sql, [uuid, username, name, emailAddress, encryptedPassword]);

  return res.status(201).json({ message: "User has been registered" });
};

/**
 * @description Get all users
 * @route GET /users
 */
export const getAllUsers = async (req: Request, res: Response) => {
  let sql = "SELECT userID, username FROM users";
  const [rows] = await pool.query(sql);
  if (Array.isArray(rows) && !rows.length) {
    return res.status(204).json({ message: "Empty list" });
  }

  return res.status(200).json({ users: rows });
};

/**
 * @returns user
 */
async function getUser(userID: string) {
  let sql =
    "SELECT userID, username, name, emailAddress FROM users WHERE userID = ?";
  const [rows] = await pool.query(sql, [userID]);
  if (Array.isArray(rows)) {
    return rows[0];
  }
}

/**
 * @description Get single user
 * @route GET /users/:userID
 */
export const getSingleUser = async (req: Request, res: Response) => {
  const { userID } = req.params;

  const user = await getUser(userID);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  return res.status(200).json(user);
};

/**
 * @description Login user
 * @route POST /users/login
 */
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let result: User;

  if (!username || !password) {
    res.status(401).json({
      message: "Username and password must be provided",
    });
  }

  let sql = "SELECT * FROM users WHERE username = ?";
  const [rows] = await pool.query(sql, [username]);
  if (Array.isArray(rows) && rows.length) {
    result = rows[0] as User;

    const comparison = await bcrypt.compare(password, result.password);

    if (comparison) {
      res.status(200).json({
        message: "Login successful",
        token: generateAccessToken(result),
      });
    } else {
      res.status(401).json({ message: "Username and password did not match" });
    }
  } else {
    res.status(401).json({
      message: "User not found",
    });
  }
};

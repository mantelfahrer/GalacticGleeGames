import { Request, Response } from "express";
import { pool } from "../db/connect";
import bcrypt from "bcrypt";
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

  // check if username is already taken
  let sqlCheckUsername = "SELECT username FROM users WHERE username = ?";
  const [rowsCheckUsername] = await pool.query(sqlCheckUsername, [username]);
  if (Array.isArray(rowsCheckUsername) && rowsCheckUsername.length) {
    return res.status(401).json({ message: "username already taken" });
  }

  // check if email address is already taken
  let sqlCheckEmail = "SELECT emailAddress FROM users WHERE emailAddress = ?";
  const [rowsCheckEmail] = await pool.query(sqlCheckEmail, [emailAddress]);
  if (Array.isArray(rowsCheckEmail) && rowsCheckEmail.length) {
    return res
      .status(401)
      .json({ message: "email address already has an account" });
  }

  let sql =
    "INSERT INTO users (username, name, emailAddress, password) VALUES (?, ?, ?, ?)";
  await pool.query(sql, [username, name, emailAddress, encryptedPassword]);

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
    return res.status(204).json({ message: "empty list" });
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

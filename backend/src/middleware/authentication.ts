import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export function generateAccessToken(user: User) {
  const payload = {
    userID: user.userID,
    username: user.username,
  };

  const secret = process.env.JWT_SECRET_KEY || "secret-key";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}

export function verifyAccessToken(token: string) {
  const secret = process.env.JWT_SECRET_KEY || "secret-key";
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded,
    };
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }
    return {
      success: false,
      error: message,
    };
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  next();
}

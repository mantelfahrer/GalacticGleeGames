import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/IUser";

export function generateAccessToken(user: IUser) {
  const payload = {
    userID: user.userID,
    username: user.username,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET_KEY || "secret-key";
  const options = { expiresIn: "10s" };

  return jwt.sign(payload, secret, options);
}

export function generateRefreshToken(user: IUser) {
  const payload = {
    userID: user.userID,
  };

  const secret = process.env.JWT_SECRET_KEY || "secret-key";
  const options = { expiresIn: "8h" };

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string) {
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
    return res.status(401).json({ message: "Not logged in" });
  }

  const result = verifyToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.body.user = result.data;

  next();
}

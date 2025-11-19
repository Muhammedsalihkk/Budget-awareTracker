import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";
import { AuthRequest } from "../types";
import { logger } from "../utils/logger";


export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;


  if (!token) {
    res
      .status(401)
      .json({ message: "Access denied. Authentication token missing" });
    return;
  }
  try {
    const secret = JWT_SECRET || "";
    const decoded = jwt.verify(token, secret) as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Invalid or expired authentication token." });
  }
};

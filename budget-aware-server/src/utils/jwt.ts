import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv";

export const generateToken = (id: string): string => {
  const secret = JWT_SECRET || "";
  const expiresIn =  "7d"; 

  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

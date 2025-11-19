import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { sendError } from "../utils/response";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next:NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
sendError(res, message, status)
};

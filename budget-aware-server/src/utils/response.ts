import { Response } from "express";

export const sendSuccess = (
  res: Response,
  message: string,
  data: any = null,
  statusCode = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 400,
  error: any = {}
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

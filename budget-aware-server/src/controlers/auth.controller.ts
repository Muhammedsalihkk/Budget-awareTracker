
import { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendSuccess, sendError } from "../utils/response";
import tryCatch from "../utils/trycatch"; 
import { AuthRequest } from "../types";
import { logger } from "../utils/logger";

const authController = {
  register: tryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;
   
    const user = await authService.registerUserService( email, password);
    sendSuccess(res, "User registered successfully", user.email, 201);
  }),

  login: tryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUserService(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    sendSuccess(res, "Logged in successfully",  user.email, 200);
  }),
  logout: tryCatch(async (req: Request, res: Response) => {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
    });
    sendSuccess(res, "Logged out successfully");
  }),
    getProfile: tryCatch(async (req: AuthRequest, res: Response) => {
     
    const userId = req.user.id;

    const user = await authService.getProfileService(userId);
      
    sendSuccess(res, "Profile fetched successfully", user, 200);
  }),
};
export default authController;
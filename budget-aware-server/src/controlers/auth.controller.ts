import { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendSuccess } from "../utils/response";
import tryCatch from "../utils/trycatch";
import { AuthRequest } from "../types";

const authController = {
  register: tryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authService.registerUserService(email, password);

    if (!user) {
      throw new Error("User registration failed");
    }

    sendSuccess(res, "User registered successfully", user.email, 201);
  }),

  login: tryCatch(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUserService(email, password);

    if (!user || !token) {
      throw new Error("Login failed");
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    sendSuccess(res, "Logged in successfully", user.email, 200);
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

    if (!user) {
      throw new Error("User profile not found");
    }

    sendSuccess(res, "Profile fetched successfully", user, 200);
  }),
};

export default authController;

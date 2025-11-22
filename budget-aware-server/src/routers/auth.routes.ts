import { Router } from "express";
import authController from "../controlers/auth.controller";
import { validateJoi } from "../middlewares/validate.joi";
import { validations } from "../validations";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.post("/register",validateJoi(validations.auth.register),authController.register);
router.post("/login",validateJoi(validations.auth.login),authController.login);
router.get("/profile",authMiddleware,authController.getProfile);
router.post("/logout",authMiddleware,authController.logout);

export default router;

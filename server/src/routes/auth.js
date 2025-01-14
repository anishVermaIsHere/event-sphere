import Router from "express";
import authController from "../controllers/auth/index.js";


const authRouter = Router();

authRouter.post("/", authController.login);
authRouter.post("/refresh", authController.refreshToken);

export default authRouter
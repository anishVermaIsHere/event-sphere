import Router from "express";
import authController from "../controllers/auth/index.js";


const authRouter = Router();

authRouter.post("/", authController.login);

export default authRouter
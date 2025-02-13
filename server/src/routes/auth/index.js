import Router from "express";
import authController from "../../controllers/auth/index.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";


const authRouter = Router();

authRouter.post("/", authController.login);
authRouter.post("/refresh", authController.refreshToken);
authRouter.post("/logout", authTokenVerify, authController.logOut);


export default authRouter
import { Router } from "express";
import userController from "../controllers/user/index.js";
import { authTokenVerify } from "../middlewares/token-verify.js";

const userRouter = Router();

userRouter.get("/", authTokenVerify, userController.find);
userRouter.post("/", userController.register);
userRouter.get("/guests", authTokenVerify, userController.findGuests);
userRouter.get("/speakers", authTokenVerify, userController.findSpeakers);


export default userRouter;
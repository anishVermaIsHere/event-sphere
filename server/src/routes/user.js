import { Router } from "express";
import userController from "../controllers/user/index.js";
import { tokenVerify } from "../middlewares/token-verify.js";

const userRouter = Router();

userRouter.get("/", tokenVerify, userController.find);
userRouter.get("/guests", tokenVerify, userController.findGuests);
userRouter.get("/speakers", tokenVerify, userController.findSpeakers);


export default userRouter;
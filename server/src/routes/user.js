import { Router } from "express";
import userController from "../controllers/user/index.js";


const userRouter = Router();

userRouter.get("/guests", userController.findGuests);
userRouter.get("/speakers", userController.findSpeakers);


export default userRouter;
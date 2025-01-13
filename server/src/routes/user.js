import { Router } from "express";
import userController from "../controllers/user/index.js";


const userRouter = Router();

userRouter.get("/guests", userController.findGuests);

export default userRouter;
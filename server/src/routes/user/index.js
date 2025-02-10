import { Router } from "express";
import userController from "../../controllers/user/index.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";
import { validator } from "../../middlewares/validator.js";

const userRouter = Router();
const { registerUser } = validator;


userRouter.get("/", authTokenVerify, userController.find);
userRouter.post("/", registerUser, userController.register);
userRouter.get("/guests", authTokenVerify, userController.findGuests);
userRouter.get("/speakers", authTokenVerify, userController.findSpeakers);




export default userRouter;
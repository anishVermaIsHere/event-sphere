import { Router } from "express";
import inviteeController from "../../controllers/invitee/index.js";
import { validator } from "../../middlewares/validator.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";

const inviteeRouter = Router();
const { sendInvitation, deleteInvitation, verifyInvitation } = validator;

inviteeRouter.get("/", authTokenVerify, inviteeController.find);
inviteeRouter.post("/", authTokenVerify, sendInvitation, inviteeController.create);
inviteeRouter.post("/:token", verifyInvitation, inviteeController.verify);
inviteeRouter.delete("/:id", authTokenVerify, deleteInvitation, inviteeController.delete);



export default inviteeRouter;
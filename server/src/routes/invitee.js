import { Router } from "express";
import inviteeController from "../controllers/invitee/index.js";
import { sendInvitationValidator } from "../middlewares/validator.js";
import { tokenVerify } from "../middlewares/token-verify.js";

const inviteeRouter = Router();

inviteeRouter.get("/", tokenVerify, inviteeController.find);
inviteeRouter.post("/", tokenVerify, sendInvitationValidator, inviteeController.create);
inviteeRouter.delete("/:id", tokenVerify, sendInvitationValidator, inviteeController.delete);



export default inviteeRouter;
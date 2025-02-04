import { Router } from "express";
import inviteeController from "../controllers/invitee/index.js";
import { validator } from "../middlewares/validator.js";
import { tokenVerify } from "../middlewares/token-verify.js";
import { inviteeSchema } from "../validation/schema.js";

const inviteeRouter = Router();

inviteeRouter.get("/", tokenVerify, inviteeController.find);
inviteeRouter.post("/", ()=>validator(inviteeSchema), inviteeController.create);


export default inviteeRouter;
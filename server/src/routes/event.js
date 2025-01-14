import { Router } from "express";
import eventController from "../controllers/event/index.js";
import { tokenVerify } from "../middlewares/token-verify.js";



const eventRouter = Router();

eventRouter.get("/", tokenVerify, eventController.find);
eventRouter.post("/", tokenVerify, eventController.create);
eventRouter.delete("/:id", tokenVerify);


export default eventRouter;
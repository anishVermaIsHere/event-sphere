import { Router } from "express";
import eventController from "../controllers/event/index.js";
import { tokenVerify } from "../middlewares/token-verify.js";



const eventRouter = Router();

eventRouter.get("/", tokenVerify, eventController.findByFilter);
eventRouter.get("/:id", tokenVerify, eventController.findById);
eventRouter.post("/", tokenVerify, eventController.create);
eventRouter.delete("/:id", tokenVerify, eventController.delete);
eventRouter.delete("/", tokenVerify, eventController.deleteAll);
eventRouter.put("/:id", tokenVerify, eventController.update);



export default eventRouter;
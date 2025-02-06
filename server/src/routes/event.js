import { Router } from "express";
import eventController from "../controllers/event/index.js";
import { authTokenVerify } from "../middlewares/token-verify.js";



const eventRouter = Router();

eventRouter.get("/", authTokenVerify, eventController.findByFilter);
eventRouter.get("/:id", authTokenVerify, eventController.findById);
eventRouter.post("/", authTokenVerify, eventController.create);
eventRouter.delete("/:id", authTokenVerify, eventController.delete);
eventRouter.delete("/", authTokenVerify, eventController.deleteAll);
eventRouter.put("/:id", authTokenVerify, eventController.update);



export default eventRouter;
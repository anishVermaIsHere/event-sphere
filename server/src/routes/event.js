import { Router } from "express";
import eventController from "../controllers/event";

const eventRouter = Router();

eventRouter.get("/", eventController.find);
eventRouter.post("/", eventController.create);
eventRotuer.delete("/");

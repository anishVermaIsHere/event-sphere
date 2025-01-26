import { Router } from "express";
import { tokenVerify } from "../middlewares/token-verify.js";
import ticketController from "../controllers/ticket/index.js";

const ticketRouter = Router();

ticketRouter.get("/", tokenVerify, ticketController.find);
ticketRouter.get("/:id", tokenVerify, ticketController.findById);
ticketRouter.get("/users/:id", tokenVerify, ticketController.findByUser);


export default ticketRouter;
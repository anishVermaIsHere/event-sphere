import { Router } from "express";
import { authTokenVerify } from "../middlewares/token-verify.js";
import ticketController from "../controllers/ticket/index.js";

const ticketRouter = Router();

ticketRouter.get("/", authTokenVerify, ticketController.find);
ticketRouter.get("/:id", authTokenVerify, ticketController.findById);
ticketRouter.get("/users/:id", authTokenVerify, ticketController.findByUser);


export default ticketRouter;
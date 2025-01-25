import { Router } from "express";
import { tokenVerify } from "../middlewares/token-verify.js";
import ticketController from "../controllers/ticket/index.js";

const ticketRouter = Router();

ticketRouter.get("/", tokenVerify, ticketController.find);


export default ticketRouter;
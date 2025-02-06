import { Router } from "express";
import locationController from "../controllers/location/index.js";
import { authTokenVerify } from "../middlewares/token-verify.js";

const locationRouter = Router();

locationRouter.get("/", authTokenVerify, locationController.find);

export default locationRouter;
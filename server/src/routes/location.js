import { Router } from "express";
import locationController from "../controllers/location/index.js";

const locationRouter = Router();

locationRouter.get("/", locationController.find);

export default locationRouter;
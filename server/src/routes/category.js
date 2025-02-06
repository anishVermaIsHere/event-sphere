import { Router } from "express";
import categoryController from "../controllers/category/index.js"
import { authTokenVerify } from "../middlewares/token-verify.js";

const categoryRouter = Router();

categoryRouter.get("/", authTokenVerify, categoryController.find);

export default categoryRouter;
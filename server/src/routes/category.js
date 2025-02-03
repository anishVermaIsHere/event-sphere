import { Router } from "express";
import categoryController from "../controllers/category/index.js"

const categoryRouter = Router();

categoryRouter.get("/", categoryController.find);

export default categoryRouter;
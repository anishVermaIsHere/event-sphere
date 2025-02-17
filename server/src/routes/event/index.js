import { Router } from "express";
import eventController from "../../controllers/event/index.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";
import { validator } from "../../middlewares/validator.js";

const { requestParams, requestSlugParams } = validator;


const eventRouter = Router();

eventRouter.get("/", authTokenVerify, eventController.findByFilter);
eventRouter.get("/:id", authTokenVerify, requestParams, eventController.findById);
eventRouter.get("/:slug", authTokenVerify, requestSlugParams, eventController.findById);
eventRouter.post("/", authTokenVerify, eventController.create);
eventRouter.delete("/:id", authTokenVerify, requestParams, eventController.delete);
eventRouter.delete("/", authTokenVerify, eventController.deleteAll);
eventRouter.put("/:id", authTokenVerify, requestParams, eventController.update);



export default eventRouter;
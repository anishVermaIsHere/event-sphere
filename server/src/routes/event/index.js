import { Router } from "express";
import eventController from "../../controllers/event/index.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";
import { validator } from "../../middlewares/validator.js";
import eventApplyController from "../../controllers/register/index.js";

const { requestParams, requestSlugParams } = validator;


const eventRouter = Router();

eventRouter.get("/", authTokenVerify, eventController.findByFilter);
eventRouter.get("/applied", authTokenVerify, eventApplyController.find);
eventRouter.put("/applied/:id", authTokenVerify, requestParams, eventApplyController.approve);
eventRouter.get("/:id", authTokenVerify, requestParams, eventController.findById);
eventRouter.post("/", authTokenVerify, eventController.create);
eventRouter.delete("/:id", authTokenVerify, requestParams, eventController.delete);
eventRouter.delete("/", authTokenVerify, eventController.deleteAll);
eventRouter.put("/:id", authTokenVerify, requestParams, eventController.update);



export default eventRouter;
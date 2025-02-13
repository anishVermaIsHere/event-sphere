import { Router } from "express";
import { eventController } from "../../controllers/speaker/event/index.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";
import { validator } from "../../middlewares/validator.js";
import { attendeeController } from "../../controllers/speaker/attendee/index.js";


const speakerRouter = Router();

speakerRouter.get("/events", authTokenVerify, eventController.findByFilter);
speakerRouter.get("/attendees", authTokenVerify, attendeeController.find);

export default speakerRouter;

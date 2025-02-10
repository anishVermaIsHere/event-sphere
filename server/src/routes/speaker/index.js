import { Router } from "express";
import userController from "../../controllers/user/index.js";
import { authTokenVerify } from "../../middlewares/token-verify.js";
import { validator } from "../../middlewares/validator.js";


const speakerRouter = Router();

speakerRouter.post("/speakers/events", authTokenVerify, ()=>{});
speakerRouter.post("/speakers/attendees", authTokenVerify, ()=>{});

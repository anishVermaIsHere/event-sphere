import { inviteeSchema, registerSchema, requestParamsSchema } from "../validation/schema.js";
import { HTTP_CODES } from "../utils/constants.js";

const { BAD_REQUEST } = HTTP_CODES;

const requestValidator = (schema, value) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req[value]);
            if(error){
                return res.status(BAD_REQUEST).json({ error: error.details[0].message });
            } 
            next();
        } catch (error) {
            return res.status(BAD_REQUEST).json({ error: error.message });
        }
    }
};

export const validator = {
    sendInvitation: requestValidator(inviteeSchema, "body"),
    deleteInvitation: requestValidator(requestParamsSchema("id"), "params"),
    verifyInvitation: requestValidator(requestParamsSchema("token"), "params"),
    registerUser: requestValidator(registerSchema, "body")
}



import { inviteeSchema } from "../validation/schema.js";
import { HTTP_CODES } from "../utils/constants.js";

const { BAD_REQUEST } = HTTP_CODES;

const validator = (schema, value) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body);
            if(error){
                return res.status(BAD_REQUEST).json({ error: error.details[0].message });
            } 
            next();
        } catch (error) {
            return res.status(BAD_REQUEST).json({ error: error.message });
        }
    }
};

const sendInvitationValidator = validator(inviteeSchema);

export {
    sendInvitationValidator,

}
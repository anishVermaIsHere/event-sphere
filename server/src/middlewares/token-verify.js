import tokenObject, { TOKEN } from "../utils/token.js";
import { HTTP_CODES } from "../utils/constants.js";
import { InviteeModel } from "../database/models/index.js";

const { UNAUTHORIZE } = HTTP_CODES;

export const authTokenVerify=(req, res, next)=>{
    try {
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.accessToken;
        const isVerified = tokenObject.tokenDecode(token, TOKEN['ACCESS_TOKEN'], req);
        if(isVerified){
            next();
        } else {
            res.status(UNAUTHORIZE).json({message: "Unauthorize user"});
        }
    } catch (error) {
        res.status(UNAUTHORIZE).json({ message: "Unauthorized" });
    }
}

export const onboardTokenVerify = async (req, res, next) => {
    try {
        const { token, email } = req.body;
        const invitee = await InviteeModel.findOne({ token })

    } catch (error) {
        
    }
};
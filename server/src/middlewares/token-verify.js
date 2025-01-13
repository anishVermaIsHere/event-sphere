import tokenObject, { TOKEN } from "../shared/utils/token/token.js";
import { HTTP_CODES } from "../utils/constants.js";

const { UNAUTHORIZE }=HTTP_CODES;

export const tokenVerify=(req, res, next)=>{
    try {
        const token = req.headers['authorization']?.split(' ')[1] || req.cookies?.accessToken;
        const isVerified=tokenObject.tokenDecode(token,TOKEN['ACCESS_TOKEN'], req);
        if(isVerified){
            next();
        } else {
            res.status(UNAUTHORIZE).json({message: "Unauthorize user"});
        }
    } catch (error) {
        // throw new ApiError(RESOURCE_NOT_FOUND, "Token not found");
        res.status(UNAUTHORIZE).json({ message: "Unauthorized" });
    }
}


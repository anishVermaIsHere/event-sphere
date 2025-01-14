import { UserModel } from "../../database/models/index.js";
import tokenObject from "../../utils/token.js";
import encrypt from "../../utils/encrypt.js";
import { HTTP_CODES } from "../../utils/constants.js";


const { SUCCESS, BAD_REQUEST, UNAUTHORIZE } = HTTP_CODES;

const authController = {
    async login(req, res){
        try {
            const { email, password }=req.body;
            const { tokenEncode }=tokenObject;
            const user=await UserModel.findOne({ email }).exec();
            if(user && user.email) {
                let dbPassword = user.password;
                let plainPassword = password;
                if (encrypt.comparePassword(plainPassword, dbPassword)) {
                    const { accessToken, refreshToken } = tokenEncode({ email:user.email, firstName: user.firstName, id:user.id });
                    user.refreshToken=refreshToken;

                    return res.status(SUCCESS).json({
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                            lastName:user.lastName,
                            email: user.email,
                            gender: user.gender,
                        },
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                } 
                else {
                    return res.status(BAD_REQUEST).json({ message: "Invalid crendentials" });
                }
            } 
        } catch (error) {
            console.log('API: login error', error.message);
            throw new Error(error.message);
        }
    },
    async register(req, res){
        const user=req.body;
        try {
           const userDoc=await UserModel.findOne({email:user.email}).exec();
            if(userDoc&&userDoc.email){
                return res.status(CONFLICT).json({message: "User already exist" });
            }
            else {
                const encryptedPassword=encrypt.hashPassword(user.password);
               const doc= await UserModel.create({...user,password:encryptedPassword});
               if(doc&&doc._id){
                return res.status(CREATE).json({message: "User registred successfully"});
               }
            }
        } catch (error) {
            console.log('API: user register error',error.message);
        }
    },
    async refreshToken(req, res){
        try {
            const token=req.headers.authorization?.split(' ')[1] || req.cookies?.refreshToken;
            const isVerified=tokenObject.tokenDecode(token, TOKEN['REFRESH_TOKEN'], req);
            if(isVerified){
                const decode=req.decode;
                const { accessToken }=tokenObject.tokenEncode({ email: decode.email, firstName: decode.firstName, id:decode.id });
                return res.status(SUCCESS).json({ accessToken: accessToken });
            }
        } catch (error) {
            console.log('API: refresh token error', error.message);
            res.status(UNAUTHORIZE).json({ message: "Unauthorized" });
        }
    }
};


export default authController
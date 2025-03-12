import { UserModel } from "../../database/models/index.js";
import tokenObject, { TOKEN } from "../../utils/token.js";
import encrypt from "../../utils/encrypt.js";
import { HTTP_CODES } from "../../utils/constants.js";


const { SUCCESS, BAD_REQUEST, UNAUTHORIZE } = HTTP_CODES;

const authController = {
    /**
     * @route POST /auth
     * @desc Login user
     * @access Public
     */
    async login(req, res){
        try {
            const { email, password }=req.body;
            const { tokenEncode }=tokenObject;
            const user=await UserModel.findOne({ email }).exec();
            if(user && user.email) {
                let dbPassword = user.password;
                let plainPassword = password;
                if (encrypt.comparePassword(plainPassword, dbPassword)) {
                    const { accessToken, refreshToken } = tokenEncode({ email:user.email, firstName: user.firstName, lastName: user.lastName, id:user.id });
                    user.refreshToken=refreshToken;

                    return res.status(SUCCESS).json({
                        user: {
                            id: user._id,
                            firstName: user.firstName,
                            lastName:user.lastName,
                            fullName: user.firstName+" "+user.lastName,
                            email: user.email,
                            gender: user.gender,
                            role: user.role
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
    /**
     * @route POST /auth/refresh
     * @desc Refresh token
     * @access Public
     */
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
    },
     /**
     * @route POST /auth/logout
     * @desc Logout user
     * @access Public
     */
    async logOut(req, res){
        try {
            res.setHeader('Authorization', '');
            res.status(SUCCESS).json({ message: 'Logged out successfully' });
        } catch (error) {
            console.log('API: logout error', error.message);
            throw Error("Logout Error >>");
        }
    },
};


export default authController
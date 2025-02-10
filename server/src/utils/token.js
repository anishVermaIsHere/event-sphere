import jwt from "jsonwebtoken"; // dont import * as jwt here
import AppConfig from "../config/app.config.js";


const TOKEN = Object.freeze({
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN'
});

const decodedUser=(req)=>req["decode"];

const tokenObject = {
  tokenEncode(payload) {
    const { id } = payload;
    const accessToken= jwt.sign(payload, AppConfig.accessTokenKey, { algorithm: "HS256", expiresIn: AppConfig.accessTokenExpiry });
    const refreshToken=jwt.sign(payload, AppConfig.refreshTokenKey, { algorithm: "HS256", expiresIn: AppConfig.refreshTokenExpiry });
    return { accessToken, refreshToken}

  },
 
  tokenDecode(token, tokenType, req) {
    try {
      let decode={};
      if(tokenType===TOKEN['ACCESS_TOKEN']){
        decode = jwt.verify(token, AppConfig.accessTokenKey);
      }
      if(tokenType===TOKEN['REFRESH_TOKEN']){
        decode = jwt.verify(token, AppConfig.refreshTokenKey);
      }
      if (decode?.id) {
        req["decode"] = decode;
        return true;
      } else {
        return false;
      }
    
    } catch (err) {
      throw new Error("Unauthorized");
    }
  },
};

export {
    TOKEN,
    decodedUser
};
export default tokenObject;

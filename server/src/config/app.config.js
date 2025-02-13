import dotenv from "dotenv";
dotenv.config();

const { 
    SERVER_PORT,
    SERVER_HOST,
    CORS_ORIGIN,
    DB_URI,
    APP_NAME,
    SALT,
    ACCESS_TOKEN_SEC_KEY,
    REFRESH_TOKEN_SEC_KEY,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
    INVITE_EXPIRY,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SEC_KEY,
    CLOUDINARY_CLOUD_NAME,
    MAIL_SENDER_NAME,
    MAIL_SENDER_EMAIL,
    MAIL_PASSWORD

} = process.env;

const AppConfig={
    port: SERVER_PORT,
    host: SERVER_HOST,
    corsOrigin: CORS_ORIGIN,
    dbUri: DB_URI,
    appName: APP_NAME,
    salt: SALT,
    accessTokenKey: ACCESS_TOKEN_SEC_KEY,
    refreshTokenKey: REFRESH_TOKEN_SEC_KEY,
    accessTokenExpiry: ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry: REFRESH_TOKEN_EXPIRY,
    invitationExpiry: INVITE_EXPIRY,
    cloudinary: {
        apiKey: CLOUDINARY_API_KEY,
        secretKey: CLOUDINARY_API_SEC_KEY,
        name: CLOUDINARY_CLOUD_NAME
    },
    mail: {
        senderName: MAIL_SENDER_NAME,
        senderMail: MAIL_SENDER_EMAIL,
        password: MAIL_PASSWORD
    }

};


export default AppConfig;
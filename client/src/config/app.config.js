

const { VITE_DEFAULT_EMAIL, VITE_DEFAULT_PWD, VITE_BASE_URL, VITE_APP_NAME } = import.meta.env;

const AppConfig = {
    default: {
        email: VITE_DEFAULT_EMAIL,
        password: VITE_DEFAULT_PWD,
    },
    baseUrl: VITE_BASE_URL,
    appName: VITE_APP_NAME,
    devName: "Anish Verma",
    logoUrl: "https://res.cloudinary.com/dnyp1e0zo/image/upload/v1738675226/event-sphere/ob57lkpaqcernkdykuii.png"
};


export default AppConfig;
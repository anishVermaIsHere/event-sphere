
const AppConfig = {
    default: {
        email: import.meta.env.VITE_DEFAULT_EMAIL,
        password: import.meta.env.VITE_DEFAULT_PWD,
    },
    baseUrl: import.meta.env.VITE_BASE_URL,
    appName: import.meta.env.VITE_APP_NAME,
    devName: "Anish Verma",
    logoUrl: "https://res.cloudinary.com/dnyp1e0zo/image/upload/v1738675226/event-sphere/ob57lkpaqcernkdykuii.png"
};


export default AppConfig;
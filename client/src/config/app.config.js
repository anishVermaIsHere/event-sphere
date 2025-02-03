
const AppConfig = {
    default: {
        email: import.meta.env.VITE_DEFAULT_EMAIL,
        password: import.meta.env.VITE_DEFAULT_PWD,
    },
    baseUrl: import.meta.env.VITE_BASE_URL,
    appName: import.meta.env.VITE_APP_NAME,
    devName: "Anish Verma"
};


export default AppConfig;
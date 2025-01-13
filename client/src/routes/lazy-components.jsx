import { lazy } from "react";

const LoginPage = lazy(()=>import('../pages/login-page'));
const Dashboard = lazy(()=>import('../components/dashboard'));
const Events = lazy(()=>import('../components/events/events'));


export {
    LoginPage,
    Dashboard,
    Events
}
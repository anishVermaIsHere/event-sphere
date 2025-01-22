import { lazy } from "react";

const LoginPage = lazy(()=>import('../pages/login-page'));
const Dashboard = lazy(()=>import('../components/dashboard'));
const Events = lazy(()=>import('../components/events'));
const Users = lazy(()=>import('../components/users'));


export {
    LoginPage,
    Dashboard,
    Events,
    Users
}
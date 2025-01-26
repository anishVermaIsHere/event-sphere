import { lazy } from "react";

const LoginPage = lazy(()=>import('../pages/login-page'));
const Dashboard = lazy(()=>import('../components/dashboard'));
const Events = lazy(()=>import('../components/events'));
const Users = lazy(()=>import('../components/users'));
const Attendees = lazy(()=>import('../components/attendees'));
const AttendeeDetails = lazy(()=>import('../components/attendees/attendee-details'));


export {
    LoginPage,
    Dashboard,
    Events,
    Users,
    Attendees,
    AttendeeDetails
}
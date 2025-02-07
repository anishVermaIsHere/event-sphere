import { lazy } from "react";

const LoginPage = lazy(()=>import('../pages/login-page'));
const DashboardLayout = lazy(()=>import('../components/layout/dashboard-layout'));
const Dashboard = lazy(()=>import('../components/dashboard'));
const Events = lazy(()=>import('../components/events'));
const Users = lazy(()=>import('../components/users'));
const Attendees = lazy(()=>import('../components/attendees'));
const AttendeeDetails = lazy(()=>import('../components/attendees/attendee-details'));
const OnboardingPage = lazy(()=>import('../components/onboarding'));
const UserVerifyPage = lazy(()=>import('../pages/userverify'));
const PageNotFound = lazy(()=>import('../pages/404'));



export {
    LoginPage,
    DashboardLayout,
    Dashboard,
    Events,
    Users,
    Attendees,
    AttendeeDetails,
    OnboardingPage,
    UserVerifyPage,
    PageNotFound
}
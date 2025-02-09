import { lazy } from "react";

const PageNotFound = lazy(()=>import('../pages/404'));
const LoginPage = lazy(()=>import('../pages/login-page'));
const AdminDashboardLayout = lazy(()=>import('../components/layout/admin-dashboard-layout'));
const Dashboard = lazy(()=>import('../components/admin/dashboard'));
const Events = lazy(()=>import('../components/admin/events'));
const Users = lazy(()=>import('../components/admin/users'));
const Attendees = lazy(()=>import('../components/admin/attendees'));
const AttendeeDetails = lazy(()=>import('../components/admin/attendees/attendee-details'));
const OnboardingPage = lazy(()=>import('../components/onboarding'));
const UserVerifyPage = lazy(()=>import('../pages/userverify'));
const EventsOfGuest = lazy(()=>import("../components/guest/guest-events"));
const GuestLayout = lazy(()=>import('../components/layout/guest-layout'));


export {
    PageNotFound,
    LoginPage,
    AdminDashboardLayout,
    Dashboard,
    Events,
    Users,
    Attendees,
    AttendeeDetails,
    OnboardingPage,
    UserVerifyPage,
    EventsOfGuest,
    GuestLayout
}
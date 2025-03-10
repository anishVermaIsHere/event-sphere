import { lazy } from "react";

const ProtectedPage = lazy(()=>import("../components/miscellaneous/protected"));
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
const SpeakerLayout = lazy(()=>import("../components/layout/speaker-dashboard-layout"));
const SpeakerDashboard = lazy(()=>import("../components/speaker/dashboard")); 
const EventsOfSpeaker = lazy(()=>import("../components/speaker/speaker-events")); 
const SpeakerEventDetails = lazy(()=>import("../components/speaker/speaker-event-details"));
const SpeakerAttendees = lazy(()=>import("../components/speaker/speaker-attendees"));
const EventRegisterDetails = lazy(()=>import("../components/registers/event-register-details"));

export {
    ProtectedPage,
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
    GuestLayout,
    SpeakerLayout,
    SpeakerDashboard,
    EventsOfSpeaker,
    SpeakerEventDetails,
    SpeakerAttendees,
    EventRegisterDetails
}
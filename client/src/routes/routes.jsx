import { Suspense } from "react";
import { ROUTES } from "./route-links";
import { AttendeeDetails, Attendees, Events, LoginPage, Users, Onboarding } from "./lazy-components";
import DashboardLayout from "../components/layout/dashboard-layout";
import Spinner from "../components/common/spinner";
import Dashboard from "../components/dashboard";

const { HOME, LOGIN, ONBOARD, ADMIN: { DASHBOARD, EVENTS, USERS, ATTENDEES, ATTENDEE } } = ROUTES;

export const routes = [
  {
    path: HOME,
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: LOGIN,
    element: (
      <Suspense fallback={<Spinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: DASHBOARD,
        element: (
          <Suspense fallback={<Spinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: EVENTS,
        element: (
          <Suspense fallback={<Spinner />}>
            <Events />
          </Suspense>
        ),
      },
      {
        path: USERS,
        element: (
          <Suspense fallback={<Spinner />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: ATTENDEES,
        element: (
          <Suspense fallback={<Spinner />}>
            <Attendees />
          </Suspense>
        ),
      },
      {
        path: ATTENDEE,
        element: (
          <Suspense fallback={<Spinner />}>
            <AttendeeDetails />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: ONBOARD,
    element: (
      <Suspense fallback={<Spinner />}>
        <Onboarding />
      </Suspense>
    ),
  },
];



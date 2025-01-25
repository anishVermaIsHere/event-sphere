import { Suspense } from "react";
import { ROUTES } from "./route-links";
import { Attendees, Events, LoginPage, Users } from "./lazy-components";
import DashboardLayout from "../components/layout/dashboard-layout";
import Spinner from "../components/common/spinner";
import Dashboard from "../components/dashboard";

const { HOME, LOGIN, ADMIN: { DASHBOARD, EVENTS, USERS, ATTENDEES } } = ROUTES;

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
    ],
  },
];



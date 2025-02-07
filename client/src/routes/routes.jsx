import { Suspense } from "react";
import { ROUTES } from "./route-links";
import {
  AttendeeDetails,
  Attendees,
  Events,
  LoginPage,
  Users,
  OnboardingPage,
  UserVerifyPage,
  DashboardLayout,
  PageNotFound
} from "./lazy-components";
import Spinner from "../components/common/spinner";
import Dashboard from "../components/dashboard";
import AppLayout from "../components/layout/app-layout";

const {
  HOME,
  LOGIN,
  ONBOARD,
  VERIFY,
  ADMIN: { DASHBOARD, EVENTS, USERS, ATTENDEES, ATTENDEE },
} = ROUTES;

export const routes = [
  {
    element: <AppLayout />,
    
    children: [
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
        path: VERIFY,
        element: (
          <Suspense fallback={<Spinner />}>
            <UserVerifyPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Spinner />}>
            <PageNotFound />
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
            <OnboardingPage />
          </Suspense>
        ),
      },
    ],
  },
];

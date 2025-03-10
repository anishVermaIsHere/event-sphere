import { Suspense } from "react";
import { ROUTES } from "./route-links";
import {
  AttendeeDetails,
  Attendees,
  Events,
  LoginPage,
  Dashboard,
  Users,
  OnboardingPage,
  UserVerifyPage,
  AdminDashboardLayout,
  PageNotFound,
  GuestLayout,
  EventsOfGuest,
  SpeakerLayout,
  EventsOfSpeaker,
  SpeakerEventDetails,
  SpeakerAttendees,
  SpeakerDashboard,
  ProtectedPage,
  EventRegisterDetails
} from "./lazy-components";
import Spinner from "../components/common/spinner";
import AppLayout from "../components/layout/app-layout";

const {
  HOME,
  LOGIN,
  ONBOARD,
  VERIFY,
  ADMIN: { DASHBOARD, EVENTS, USERS, ATTENDEES, ATTENDEE },
  GUEST,
  SPEAKER
} = ROUTES;


const appRoutes = [
  {
    element: <ProtectedPage element={<AppLayout />}/>,
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
        element: <ProtectedPage element={<AdminDashboardLayout />} />,
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
      {
        element: <ProtectedPage element={ <GuestLayout /> } />,
        children: [
          {
            path: GUEST.EVENTS,
            element: (
              <Suspense fallback={<Spinner />}>
                <EventsOfGuest />
              </Suspense>
            ),
          },
          {
            path: GUEST.APPLY,
            element: (
              <Suspense fallback={<Spinner />}>
                <EventRegisterDetails />
              </Suspense>
            ),
          }
        ]
      },
      {
        element: <ProtectedPage element={<SpeakerLayout />} />,
        children: [
          {
            path: SPEAKER.DASHBOARD,
            element: (
              <Suspense fallback={<Spinner />}>
                <SpeakerDashboard />
              </Suspense>
            ),
          },
          {
            path: SPEAKER.EVENTS,
            element: (
              <Suspense fallback={<Spinner />}>
                <EventsOfSpeaker />
              </Suspense>
            ),
          },
          {
            path: SPEAKER.EVENT,
            element: (
              <Suspense fallback={<Spinner />}>
                <SpeakerEventDetails />
              </Suspense>
            ),
          },
          {
            path: SPEAKER.ATTENDEES,
            element: (
              <Suspense fallback={<Spinner />}>
                <SpeakerAttendees />
              </Suspense>
            ),
          },
          {
            path: SPEAKER.APPLY,
            element: (
              <Suspense fallback={<Spinner />}>
                <EventRegisterDetails />
              </Suspense>
            ),
          }
        ]
      }
    ],
  },
];

export default appRoutes;
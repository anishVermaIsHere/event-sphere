export const ROUTES = {
  /* pubic routes */
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  RECOVER_ACC: "/recover",
  RESET_PWD: "/resetpassword",

  /* protected routes */
  LOGOUT: "logout",
  ONBOARD: "/onboarding/:token",
  VERIFY: "/u/:token",
  ADMIN: {
    DASHBOARD: "admin/dashboard",
    USERS: "admin/users",
    CREATE_EVENT: "admin/event/create",
    ACCOUNT: "admin/account",
    PROFILE: "admin/profile",
    CHANGE_PWD: "admin/change-password",
    EVENT: "admin/events/:id",
    EVENTS: "admin/events",
    LOCATIONS: "admin/locations",
    ATTENDEES: "admin/attendees",
    ATTENDEE: "admin/attendees/:id",
    TICKETS: "admin/tickets",
    MANAGE: "admin/manage",
  },
  GUEST: {
    EVENTS: "guest/events",
    EVENT: "guest/events/:id",
  },
  SPEAKER: {
    EVENTS: "speaker/events",
    EVENT: "speaker/events/:id",
    ATTENDEES: "speaker/attendees",
    ATTENDEE: "speaker/attendees/:slug",
    DASHBOARD: "speaker/dashboard"
  }
};

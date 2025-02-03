
export const ROUTES={
    /* pubic routes */ 
    HOME:'/',
    LOGIN:'/login',
    REGISTER:'/register',
    ABOUT:'/about',
    RECOVER_ACC: '/recover',
    RESET_PWD: '/resetpassword',
    LOGOUT:'logout',
    /* protected routes */
    ADMIN: {
        DASHBOARD:'admin/dashboard',
        USERS: 'admin/users',
        CREATE_EVENT:'admin/event/create',
        ACCOUNT:'admin/account',
        PROFILE:'admin/profile',
        CHANGE_PWD:'admin/change-password',
        EVENT:'admin/events/:id',
        EDIT_EVENT:'/admin/event/:id/edit',
        EVENTS:'admin/events',
        LOCATIONS: 'admin/locations',
        ATTENDEES: 'admin/attendees',
        ATTENDEE: 'admin/attendees/:id',
        TICKETS: 'admin/tickets',
        MANAGE: 'admin/manage',
        INVITE: 'admin/invite'
    },
    GUEST: {
        BASE_PATH: 'guest'
    }
}
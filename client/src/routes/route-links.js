
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
        DASHBOARD:'dashboard',
        CREATE_EVENT:'event/create',
        ACCOUNT:'account',
        PROFILE:'profile',
        CHANGE_PWD:'change-password',
        EVENT:'events/:id',
        EDIT_EVENT:'/admin/event/:id/edit',
        EVENTS:'events',
        LOCATIONS: 'locations',
        ATTENDEES: 'attendees',
        TICKETS: 'tickets',
        MANAGE: 'manage'
    }
}
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FeedIcon from '@mui/icons-material/Feed';
import { ROUTES } from "../../routes/route-links";


const { ADMIN, GUEST, SPEAKER } = ROUTES;



export const navLinkItems = {
    admin: {
        mainListItems: [
            { text: 'Dashboard', icon: <DashboardIcon />, path: ADMIN.DASHBOARD },
            { text: 'Events', icon: <AnalyticsRoundedIcon />, path: ADMIN.EVENTS },
            { text: 'Users', icon: <PeopleRoundedIcon />, path: ADMIN.USERS },
            { text: 'Attendees', icon: <PeopleRoundedIcon />, path: ADMIN.ATTENDEES },
            { text: 'Applications', icon: <FeedIcon />, path: ADMIN.APPLICATIONS },
        ],
        secondaryListItems: [
            { text: 'Invite Members', icon: <PersonAddIcon />, handler: () => {} },
            { text: 'Settings', icon: <SettingsRoundedIcon />, handler: ()=>{} },
            { text: 'About', icon: <InfoRoundedIcon />, handler: ()=>{} },
            // { text: 'Feedback', icon: <HelpRoundedIcon />, handler: ()=>{} },
        ]
    },
    speaker: {
        mainListItems: [
            { text: 'Dashboard', icon: <DashboardIcon />, path: SPEAKER.DASHBOARD },
            { text: 'Events', icon: <AnalyticsRoundedIcon />, path: SPEAKER.EVENTS },
            { text: 'Attendees', icon: <PeopleRoundedIcon />, path: SPEAKER.ATTENDEES },
        ],
        secondaryListItems: [
            { text: 'Invite Members', icon: <PersonAddIcon />, handler: () => {} },
            { text: 'Settings', icon: <SettingsRoundedIcon />, handler: ()=>{} },
            // { text: 'Feedback', icon: <HelpRoundedIcon />, handler: ()=>{} },
        ]
    },
    guest: {
        mainListItems: [
            { text: 'Events', icon: <AnalyticsRoundedIcon />, path: GUEST.EVENTS },
            { text: 'Attendees', icon: <PeopleRoundedIcon />, path: GUEST.ATTENDEES },
        ],
        secondaryListItems: [
            { text: 'Settings', icon: <SettingsRoundedIcon />, handler: ()=>{} },
            // { text: 'Feedback', icon: <HelpRoundedIcon />, handler: ()=>{} },
        ]
    }
}

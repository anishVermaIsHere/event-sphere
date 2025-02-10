import Header from "../admin/dashboard/header";
import { Outlet } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../common/app-navbar";
import SideMenu from "../admin/dashboard/side-menu";
import InviteModal from "../invite";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { ROUTES } from "../../routes/route-links";

const { DASHBOARD, EVENTS, USERS, ATTENDEES } = ROUTES.ADMIN

const mainListItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: DASHBOARD },
  { text: 'Events', icon: <AnalyticsRoundedIcon />, path: EVENTS },
  { text: 'Users', icon: <PeopleRoundedIcon />, path: USERS },
  { text: 'Attendees', icon: <PeopleRoundedIcon />, path: ATTENDEES },
];

const secondaryListItems = [
  { text: 'Invite Members', icon: <PersonAddIcon />, handler: () => {} },
  { text: 'Settings', icon: <SettingsRoundedIcon />, handler: ()=>{} },
  { text: 'About', icon: <InfoRoundedIcon />, handler: ()=>{} },
  // { text: 'Feedback', icon: <HelpRoundedIcon />, handler: ()=>{} },
];


const AdminDashboardLayout = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu mainListItems={mainListItems} secondaryListItems={secondaryListItems}/>
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              pb: 5,
              px: 1,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
      <InviteModal />
    </>
  );
};

export default AdminDashboardLayout;

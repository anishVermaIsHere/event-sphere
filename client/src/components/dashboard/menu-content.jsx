import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useLocation, NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/route-links'
import useFormStore from '../../store/form.store';


const { DASHBOARD, EVENTS, USERS, ATTENDEES } = ROUTES.ADMIN;

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


const itemIconStyle = {
  minWidth: "40px"
}

export default function MenuContent() {
  const location = useLocation();
  const { invite: { setIsOpen } } = useFormStore(state=>state);
  secondaryListItems[0].handler = () => setIsOpen(true);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block', color: 'inherit' }} component={NavLink} to={item.path}>
            <ListItemButton selected={location.pathname.startsWith(`/${item.path}`)}>
              <ListItemIcon sx={itemIconStyle}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton onClick={item.handler}>
              <ListItemIcon sx={itemIconStyle}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

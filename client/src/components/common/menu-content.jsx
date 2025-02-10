import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

import { useLocation, NavLink } from 'react-router-dom';
import useFormStore from '../../store/form.store';



const itemIconStyle = {
  minWidth: "40px"
}

export default function MenuContent({
  mainListItems,
  secondaryListItems
}) {
  const location = useLocation();
  const { invite: { setIsOpen } } = useFormStore(state=>state);
  secondaryListItems[0].handler = () => setIsOpen(true);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems?.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block', color: 'inherit' }} component={NavLink} to={item.path}>
            <ListItemButton selected={location.pathname.startsWith(`/${item.path}`)}>
              <ListItemIcon sx={itemIconStyle}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems?.map((item, index) => (
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

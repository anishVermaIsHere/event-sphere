import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './menu-content';
import OptionsMenu from './options-menu';
import logo from '../../assets/event-sphere.png'
import { CardMedia } from '@mui/material';
import useAuthStore from '../../store/auth.store';
import AppConfig from '../../config/app.config';



const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const { user } = useAuthStore(state=>state);
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          px: 1.5,
        }}
      >
        <CardMedia component="img" image={AppConfig.logoUrl} alt="logo" sx={{ width: 100, display: 'block' }} />
      </Box>
      <Divider />
      <MenuContent />
      {/* <CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Avatar
          sizes="small"
          alt={user?.fullName}
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            { user?.fullName || "David Paul" }
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            { user?.email || "davidpaul@test.com" }
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}

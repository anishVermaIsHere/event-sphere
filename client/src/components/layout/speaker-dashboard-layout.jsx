import { alpha, Box, CssBaseline, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import InviteModal from '../invite'
import Header from '../admin/dashboard/header'
import AppNavbar from '../common/app-navbar'
import SideMenu from '../admin/dashboard/side-menu'


const SpeakerLayout = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
         <SideMenu />
        <AppNavbar />
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
  )
}

export default SpeakerLayout
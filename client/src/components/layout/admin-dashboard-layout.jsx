import Header from "../admin/dashboard/header";
import { Outlet } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../common/app-navbar";
import SideMenu from "../admin/dashboard/side-menu";
import InviteModal from "../invite";
import Footer from "../common/footer"

const AdminDashboardLayout = () => {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
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
            <Footer />
          </Stack>
        </Box>
      </Box>
      <InviteModal />
    </>
  );
};

export default AdminDashboardLayout;

import Header from "../dashboard/header";
import { Outlet } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../common/app-navbar";
import SideMenu from "../dashboard/side-menu";
import QueryProvider from "../../providers/query-provider";
import { AxiosInterceptor } from "../../shared/services/axios-interceptor";
import useAppStore from "../../store/app.store";
import { Alert, Snackbar } from "@mui/material";

const DashboardLayout = () => {
  const {
    snackbarMessage,
    snackbarColor,
    snackbarOpen,
    snackbarVertical,
    snackbarHorizontal,
    closeSnackbar,
  } = useAppStore((state) => state);
  return (
    <>
      <AxiosInterceptor>
        <QueryProvider>
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
              </Stack>
            </Box>
          </Box>
        </QueryProvider>
      </AxiosInterceptor>
      <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={snackbarOpen}
            onClose={closeSnackbar}
            message={snackbarMessage}
            key={snackbarVertical + snackbarHorizontal}
            autoHideDuration={3000}
          >
            <Alert
              onClose={closeSnackbar}
              severity={snackbarColor}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
    </>
  );
};

export default DashboardLayout;

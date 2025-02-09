import { Alert, Box, Snackbar } from "@mui/material";
import AppTheme from "../common/app-theme";
import { Outlet } from "react-router-dom";
import useAppStore from "../../store/app.store";
import { AxiosInterceptor } from "../../shared/services/axios-interceptor";
import QueryProvider from "../../providers/query-provider";


const AppLayout = () => {
  const {
    snackbarMessage,
    snackbarColor,
    snackbarOpen,
    snackbarVertical,
    snackbarHorizontal,
    closeSnackbar,
  } = useAppStore((state) => state);
  return (
    <AxiosInterceptor>
      <QueryProvider>
        <AppTheme>
          <Outlet />
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
        </AppTheme>
      </QueryProvider>
    </AxiosInterceptor>
  );
};

export default AppLayout;

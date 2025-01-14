import "./App.css";
import DashboardLayout from "./components/layout/dashboard-layout";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./components/dashboard/theme/customizations";
import AppTheme from "./components/common/app-theme";
import Snackbar from "@mui/material/Snackbar";
import useAppStore from "./store/app.store";
import { Alert, Box } from "@mui/material";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App(props) {
  const {
    snackbarMessage,
    snackbarOpen,
    snackbarVertical,
    snackbarHorizontal,
    closeSnackbar,
  } = useAppStore((state) => state);

  return (
    <>
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <DashboardLayout />
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={snackbarOpen}
            onClose={closeSnackbar}
            message={snackbarMessage || "Hi"}
            key={snackbarVertical + snackbarHorizontal}
            autoHideDuration={3000}
          >
            <Alert
              onClose={closeSnackbar}
              severity="info"
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </AppTheme>
    </>
  );
}

export default App;

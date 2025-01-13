import "./App.css";
import DashboardLayout from "./components/layout/dashboard-layout";
import AppRoutePovider from "./providers/route-provider";
import QueryProvider from "./providers/query-provider";
import AppErrorBoundary from "./components/error-boundary";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./components/dashboard/theme/customizations";
import AppTheme from "./components/common/app-theme";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function App(props) {
  return (
    <>
      <AppErrorBoundary>
        <QueryProvider>
          <AppRoutePovider>
            <AppTheme {...props} themeComponents={xThemeComponents}>
              <DashboardLayout />
            </AppTheme>
          </AppRoutePovider>
        </QueryProvider>
      </AppErrorBoundary>
    </>
  );
}

export default App;

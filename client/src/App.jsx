import "./App.css";
import DashboardLayout from "./components/layout/dashboard-layout";
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
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <DashboardLayout />
      </AppTheme>
    </>
  );
}

export default App;

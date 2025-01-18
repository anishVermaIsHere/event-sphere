import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppErrorBoundary from "./components/error-boundary.jsx";
import AppRoutePovider from "./providers/route-provider.jsx";
import AppConfig from "./config/app.config.js";

document.title = AppConfig.appName;

createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <AppRoutePovider>
      <App />
    </AppRoutePovider>
  </AppErrorBoundary>
);

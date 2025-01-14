import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppErrorBoundary from "./components/error-boundary.jsx";
import AppRoutePovider from "./providers/route-provider.jsx";

createRoot(document.getElementById("root")).render(
  <AppErrorBoundary>
    <AppRoutePovider>
      <App />
    </AppRoutePovider>
  </AppErrorBoundary>
);

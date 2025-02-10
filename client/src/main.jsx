import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import AppConfig from "./config/app.config.js";

document.title = AppConfig.appName;

createRoot(document.getElementById("root")).render(<App />);

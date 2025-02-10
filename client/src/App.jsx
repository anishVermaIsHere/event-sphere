import "./App.css";
import AppErrorBoundary from "./components/error-boundary";
import AppRoutePovider from "./providers/route-provider";

function App() {
  return (
    <AppErrorBoundary>
      <AppRoutePovider />
    </AppErrorBoundary>
  );
}

export default App;

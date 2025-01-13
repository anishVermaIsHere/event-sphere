
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Button } from "@mui/material";

function ErrorSection() {
  const { resetBoundary } = useErrorBoundary();
  return (
    <div className="grid place-items-center min-h-screen p-10">
      <div className="p-5 grid place-items-center">
        <h1 className="text-8xl font-semibold text-center text-gray-500 mb-8">☹️ <br/>Oops!</h1>
        <p className="font-semibold text-2xl text-center mb-5">Something went wrong!</p>
        <Button onClick={resetBoundary}>Try again</Button>
      </div>
    </div>
  );
}

function handleError(error, info){
  console.error(`Error info: ${info.componentStack}`);
  console.error(`Error: ${error}`)
}


const AppErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      fallback={<ErrorSection />}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary;
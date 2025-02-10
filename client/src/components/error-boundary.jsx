
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { Box, Button, Paper, Typography } from "@mui/material";

export function ErrorSection() {
  const { resetBoundary } = useErrorBoundary();
  return (
    <Box sx={{ minHeight: "100vh", p: 5 }}>
      <Paper elevation={0} sx={{ display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center", p: 5 }}>
        <Typography component="h1" variant="h1" mb={4}>☹️ <br/>Oops!</Typography>
        <Typography variant="h6" component="p" mb={4} color="error" sx={{ fontSize: "1.5rem" }}>Something went wrong!</Typography>
        <Button onClick={resetBoundary} color="default" variant="contained">Try again</Button>
      </Paper>
    </Box>
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
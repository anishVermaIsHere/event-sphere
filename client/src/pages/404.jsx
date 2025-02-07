import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function PageNotFound() {
    const navigate = useNavigate();
    return (
      <Box sx={{ minHeight: "100vh", p: 5 }}>
        <Paper elevation={0} sx={{ display: "flex", justifyContent:"center", flexDirection: "column", alignItems: "center", p: 5 }}>
          <Typography component="h1" variant="h1" mb={4}>☹️ <br/>404</Typography>
          <Typography variant="h6" component="p" mb={4} color="error" sx={{ fontSize: "1.5rem" }}>Page not found</Typography>
          <Button onClick={()=>navigate('/')} color="default" variant="contained">Go to Home</Button>
        </Paper>
      </Box>
    );
  }
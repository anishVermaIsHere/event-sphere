import { Button, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CachedIcon from "@mui/icons-material/Cached";
import { useNavigate } from "react-router-dom";


export default function AlertCard({ color, message }) {
  const navigate = useNavigate();
  return (
    <Stack sx={{ width: "100%", my: 2 }} spacing={2}>
      <Alert severity={color}>{message}</Alert>

      <Typography 
      component="div" 
      variant="body"
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
      >
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate(0)}
        >
          Reload
          <CachedIcon sx={{ ml: 1 }}/>
        </Button>
      </Typography>
    </Stack>
  );
}

import {
  Box,
  Typography,
} from "@mui/material";
import UserTabs from "./user-tabs";


const Users = () => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>Users</Typography>
      <UserTabs />
    </Box>
  );
};

export default Users;

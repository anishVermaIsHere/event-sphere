import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { queryClient } from "../../providers/query-provider";
import CachedIcon from "@mui/icons-material/Cached";
import SendIcon from "@mui/icons-material/Send";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  px: 2,
  gap: 1,
  mb: 1,
};

// const fetchUsers = async () => {
//   const res = await Promise.all([
//     userAPI.findByRole("guest"),
//     userAPI.findByRole("speaker"),
//   ]);
//   return [...res[0].data, ...res[1].data];
// };



function UserList({ users, isError, isLoading }) {
    return (
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          {/* <UserDataGrid users={users} isError={isError} isLoading={isLoading}/> */}
        </Grid>
      </Grid>
    );
  };


const InviteForm = () => {
  return (
    <Box
      component="form"
      noValidate
      sx={{ ...style, justifyContent: "start" }}
    >
      <TextField
        id="filled-search"
        label="Type user's email"
        type="text"
        // variant="filled"
        size="small"
        sx={{ width: { xs: "100%", md: "50%" } }}
      />
      <Button variant="contained" color="primary" sx={{ height: '100%' }}>
        <SendIcon sx={{mr:1}} />
        Invite
      </Button>
    </Box>
  );
};

const Invite = () => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Invite users
      </Typography>
      <Box sx={style}>
        <Tooltip title="Refetch">
          <IconButton
            size="small"
            color="default"
            onClick={async () => {
              // queryClient.invalidateQueries("users");
            }}
          >
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <InviteForm />
      {/* <UserList users={users} isError={isError} isLoading={isLoading} /> */}
    </Box>
  );
};

export default Invite;

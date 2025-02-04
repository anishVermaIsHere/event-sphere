import {
  Box,
  Grid2 as Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import UserDataGrid from "./user-data-grid";
import { useQuery } from "@tanstack/react-query";
import userAPI from "../../shared/services/api/user";
import dayjs from "dayjs";
import { queryClient } from "../../providers/query-provider";
import inviteeAPI from "../../shared/services/api/invitee";
import InviteeDataGrid from "../invite/invitee-grid";




const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: 1,
  mb: 1,
};

const fetchUsers = async () => {
  const res = await Promise.all([
    userAPI.findByRole("guest"),
    userAPI.findByRole("speaker"),
  ]);
  return [...res[0].data, ...res[1].data];
};

const fetchInvitees = async () => {
  return await inviteeAPI.find();
}

function UserList({ users, isError, isLoading }) {
  return (
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12 }}>
        <UserDataGrid users={users} isError={isError} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
}

function InviteeList({ users, isError, isLoading }) {
  return (
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12 }}>
        <InviteeDataGrid users={users} isError={isError} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
}



const Users = () => {
  const { isLoading, isError, data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const { isLoading: invLoading , isError: invError, data: invData } = useQuery({ queryKey: ["invitees"], queryFn: fetchInvitees });

  const users = data?.map((user) => ({
      ...user,
      id: user._id,
      fullName: user.firstName + " " + user.lastName,
      role: user.role.toUpperCase(),
      dob: dayjs(user.dob).format("DD/MM/YYYY"),
      createdAt: dayjs(user.createdAt).format("DD/MM/YYYY"),
    })) || [];

  const invitees = invData?.data?.map((inv)=>({...inv, createdAt: dayjs(inv.createdAt).format("DD/MM/YYYY HH:mm"), id: inv._id})) || [];


  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Users
      </Typography>
      <Box component="div" mb={4}>
        <Box sx={style}>
          <Typography variant="p" component="p" color="primary" sx={{}}>
            Guests/Speakers
          </Typography>
          <Tooltip title="Refetch">
            <IconButton
              size="small"
              color="default"
              onClick={async () => {
                queryClient.invalidateQueries("users");
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <UserList users={users} isError={isError} isLoading={isLoading} />
      </Box>

      <Box component="div" mb={2}>
        <Box sx={style}>
          <Typography variant="p" component="p" color="primary">
            Invitees
          </Typography>
          <Tooltip title="Refetch">
            <IconButton
              size="small"
              color="default"
              onClick={async () => {
                queryClient.invalidateQueries("invitees");
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <InviteeList users={invitees} isError={invError} isLoading={invLoading} />
      </Box>
    </Box>
  );
};

export default Users;

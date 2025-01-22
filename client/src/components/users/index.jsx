import { Box, Grid2 as Grid, Typography } from "@mui/material";
import UserDataGrid from "./user-data-grid";
import { useQuery } from "@tanstack/react-query";
import userAPI from "../../shared/services/api/user";
import dayjs from "dayjs";


const fetchUsers = async () => {
  return await userAPI.find();
};

function UserList({ users, isError, isLoading }) {
  return (
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12 }}>
        <UserDataGrid users={users} isError={isError} isLoading={isLoading}/>
      </Grid>
    </Grid>
  );
};

const Users = () => {
  const { isLoading, isError, data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const users = data?.data?.map((user)=>({
    ...user, 
    id: user._id, 
    role: user.role.toUpperCase(),
    dob: dayjs(user.dob).format("DD/MM/YYYY"),
    createdAt: dayjs(user.createdAt).format("DD/MM/YYYY")
  })) || [];

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Users
      </Typography>
      <UserList users={users} isError={isError} isLoading={isLoading} />
    </Box>
  );
};

export default Users;

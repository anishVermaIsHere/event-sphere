import { Box, Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import UserDataGrid from "./user-data-grid";
import { useQuery } from "@tanstack/react-query";
import userAPI from "../../shared/services/api/user";
import dayjs from "dayjs";
import { queryClient } from "../../providers/query-provider";


const fetchUsers = async () => {
  const res = await Promise.all([userAPI.findByRole("guest"), userAPI.findByRole("speaker")]);
  return [...res[0].data, ...res[1].data];
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

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  px:2,
  gap: 1,
  mb: 1
};

const Users = () => {
  const { isLoading, isError, data } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const users = data?.map((user)=>({
    ...user, 
    id: user._id, 
    fullName: user.firstName+" "+user.lastName,
    role: user.role.toUpperCase(),
    dob: dayjs(user.dob).format("DD/MM/YYYY"),
    createdAt: dayjs(user.createdAt).format("DD/MM/YYYY")
  })) || [];


  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Users
      </Typography>
      <Box sx={style}>
          {/* <SortElement sortList={sortList}/> */}
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
  );
};

export default Users;

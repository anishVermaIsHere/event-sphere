import { useState } from "react";
import {
  Box,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Grid2 as Grid,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import CustomTabPanel from "../../common/tab-panel";
import { tabProps } from "../events/event-tabs";
import { queryClient } from "../../../providers/query-provider";
import UserDataGrid from "./user-data-grid";
import InviteeDataGrid from "../../invite/invitee-grid";
import { useQuery } from "@tanstack/react-query";
import inviteeAPI from "../../../shared/services/api/invitee";
import userAPI from "../../../shared/services/api/user";
import dayjs from "dayjs";

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
};

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
        <InviteeDataGrid
          users={users}
          isError={isError}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

const UserTabs = () => {
  const [value, setValue] = useState(0);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const {
    isLoading: invLoading,
    isError: invError,
    data: invData,
  } = useQuery({ queryKey: ["invitees"], queryFn: fetchInvitees });
  const users =
    data?.map((user) => ({
      ...user,
      id: user._id,
      fullName: user.firstName + " " + user.lastName,
      role: user.role.toUpperCase(),
      dob: dayjs(user.dob).format("DD/MM/YYYY"),
      createdAt: dayjs(user.createdAt).format("DD/MM/YYYY"),
    })) || [];

  const invitees =
    invData?.data?.map((inv) => ({
      ...inv,
      createdAt: dayjs(inv.createdAt).format("DD/MM/YYYY HH:mm"),
      expires: dayjs(inv.expires).format("DD/MM/YYYY HH:mm"),
      id: inv._id,
    })) || [];

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Guests/Speakers" {...tabProps(0)} />
          <Tab label="Invitees" {...tabProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box component="div" mb={4}>
          <Box sx={style}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box component="div" mb={2}>
          <Box sx={style}>
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
          <InviteeList
            users={invitees}
            isError={invError}
            isLoading={invLoading}
          />
        </Box>
      </CustomTabPanel>
    </Box>
  );
};

export default UserTabs;

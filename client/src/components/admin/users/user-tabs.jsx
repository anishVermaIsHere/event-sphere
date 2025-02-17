import { useState, Suspense, lazy } from "react";
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
import { useQuery } from "@tanstack/react-query";
import inviteeAPI from "../../../shared/services/api/invitee";
import userAPI from "../../../shared/services/api/user";
import dayjs from "dayjs";
import { InviteeList, UserList } from "./users-list";
import Spinner from "../../common/spinner";



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
          <Tab label="Permanent Guests/Speakers" {...tabProps(0)} />
          <Tab label="New Guests/Speakers" {...tabProps(1)} />
          <Tab label="Invitees" {...tabProps(2)} />
        </Tabs>
      </Box>
      <Suspense fallback={<Spinner />}>

      </Suspense>
      
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

import { Box, Typography } from "@mui/material";
import BasicTabs from "../dashboard/basic-tabs";
import EventActionBar from "./event-action-bar";


const Events = () => {
  return (
    <Box sx={{ position: "relative", width:"100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>Events</Typography>
      <EventActionBar />
      <BasicTabs />
    </Box>
  );
};

export default Events;

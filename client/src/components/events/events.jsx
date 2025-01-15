import { Box, Typography } from "@mui/material";
import EventForm from "./event-form";
import BasicTabs from "../dashboard/basic-tabs";


const Events = () => {
  return (
    <Box sx={{ position: "relative", width:"100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>Events</Typography>
      <EventForm />
      <BasicTabs />
    </Box>
  );
};

export default Events;

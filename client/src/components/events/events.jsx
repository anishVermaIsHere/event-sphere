import { Box, Typography } from "@mui/material";
import EventForm from "./event-form";

const Events = () => {
  return (
    <Box sx={{ position: "relative", width:"100%" }}>
      <Typography variant="p" component="p" sx={{ fontWeight: 600 }}>Events</Typography>
      <EventForm />
    </Box>
  );
};

export default Events;

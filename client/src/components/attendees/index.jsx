import { Box, Grid2 as Grid, Typography } from "@mui/material";
import ticketAPI from "../../shared/services/api/ticket";
import { useQuery } from "@tanstack/react-query";
import AttendeeCard from "./attendee-card";

const fetchAttendees = async () => {
  return await ticketAPI.find();
};

function AttendeeList({ isLoading, isError, attendees }) {
  return (
    <Grid container spacing={2} columns={12} sx={{ p: 1, minHeight: "100vh", bgcolor: "rgb(247 246 246)" }}>
      {attendees?.map((tic) => (
        <Grid key={tic._id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <AttendeeCard {...tic} />
        </Grid>
      ))}
    </Grid>
  );
}

const Attendees = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["attendees"],
    queryFn: fetchAttendees,
  });
  const attendees = data?.data || [];

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Attendees
      </Typography>
      <AttendeeList
        attendees={attendees}
        isError={isError}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Attendees;

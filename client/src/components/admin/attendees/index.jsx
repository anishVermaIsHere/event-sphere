import { Box, Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import ticketAPI from "../../../shared/services/api/ticket";
import { useQuery } from "@tanstack/react-query";
import AttendeeCard from "./attendee-card";
import Spinner from "../../common/spinner";
import AlertCard from "../../common/alert-card";
import CachedIcon from "@mui/icons-material/Cached";
import { queryClient } from "../../../providers/query-provider";



const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  px:2,
  gap: 1,
  mb: 1
};

const fetchAttendees = async () => {
  return await ticketAPI.find();
};

function AttendeeList({ isLoading, isError, attendees }) {

  if(isError){
    <AlertCard message="Error data fetching" color="error" />;
  }
  if(isLoading){
    return <Spinner />
  }
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
      <Box sx={style}>
          <Tooltip title="Refetch">
            <IconButton
              size="small"
              color="default"
              onClick={async () => {
                queryClient.invalidateQueries("attendees");
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      <AttendeeList
        attendees={attendees}
        isError={isError}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Attendees;

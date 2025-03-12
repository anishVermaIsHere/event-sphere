import { Grid2 as Grid } from "@mui/material";
import AlertCard from "../../common/alert-card";
import Spinner from "../../common/spinner";
import AttendeeCard from "./attendee-card";


export function AttendeeList({ isLoading, isError, attendees }) {    

  console.log(attendees, 'real');
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
  
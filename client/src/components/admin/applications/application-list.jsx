import React from 'react'
import AlertCard from '../../common/alert-card';
import Spinner from '../../common/spinner';
import { Grid2 as Grid } from '@mui/material';
import ApplicationCard from './application-card';



const ApplicationList = ({ isLoading, isError, applications }) => {    
    if(isError){
      <AlertCard message="Error data fetching" color="error" />;
    }
    if(isLoading){
      return <Spinner />
    }
    return (
      <Grid container spacing={2} columns={12} sx={{ p: 1, minHeight: "100vh", bgcolor: "rgb(247 246 246)" }}>
        {applications?.map((ev) => (
          <Grid key={ev._id} size={{ xs: 12, md: 6, xl: 4 }}>
            <ApplicationCard {...ev} />
            {}
          </Grid>
        ))}
      </Grid>
    );
  }
  

export default ApplicationList
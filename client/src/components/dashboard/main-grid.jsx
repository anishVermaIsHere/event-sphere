import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../common/copyright';
import StatCard from './state-card';
import { fetchDashboardData } from '../../shared/utils';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../common/spinner';
import AlertCard from '../common/alert-card';
import eventAPI from '../../shared/services/api/event';
import RecentEvents from './recent-events';
import dayjs from 'dayjs';
import SalesChart from './sales-chart';
import ChartUserByCountry from './chart-user-by-country';


const fetchEvents = async()=>{
  return await eventAPI.findByFilter({});
}

export default function MainGrid() {
  const { isLoading, isError, data } = useQuery({ queryKey: ["dashboard"], queryFn: fetchDashboardData });
  const { isLoading: isEventLoading, isError: isEventError, data: eventsData } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });

  const events = eventsData?.data?.map((evt)=>({ 
    ...evt, 
    location: evt?.location?.venueName, 
    startTime: dayjs(evt?.startTime).format("DD/MM/YYYY HH:mm"),
    endTime: dayjs(evt?.endTime).format("DD/MM/YYYY HH:mm"),
    createdAt: dayjs(evt?.createdAt).format("DD/MM/YYYY HH:mm"),
    id: evt?._id 
  }));


  if(isLoading){
    return <Spinner />
  }
  if(isError){
    return <AlertCard message="Error data fetching" color="error" />;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data?.cards?.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        <Grid size={{ xs: 12, md: 8 }}>
          <SalesChart />
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <ChartUserByCountry data={data?.usersByCountry} />
          </Stack>
        </Grid>
      </Grid>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Events
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          <RecentEvents events={events} isLoading={isEventLoading} isError={isEventError}/>
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

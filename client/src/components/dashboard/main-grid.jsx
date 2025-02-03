import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../common/copyright';
import StatCard from './state-card';
import { fetchDashboardData, getDaysInMonth, getStartEndDates } from '../../shared/utils';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../common/spinner';
import AlertCard from '../common/alert-card';
import eventAPI from '../../shared/services/api/event';
import RecentEvents from './recent-events';
import dayjs from 'dayjs';
import SalesChart from './sales-chart';
import ChartUserByCountry from './chart-user-by-country';
import DashboardFilter from './dashboard-filter';
import useMainStore from '../../store/main.store';


const dashboardFilterList = [
  {
    id:1,
    label: "Weekly",
    value: 7
  },
  {
    id:2,
    label: "Monthly",
    value: 30
  },
  {
    id:3,
    label: "Quarterly",
    value: 90
  },
  {
    id:4,
    label: "Semi-annually",
    value: 180
  },
  {
    id:5,
    label: "Annually",
    value: 365
  }
];


export default function MainGrid() {
  const { dates, daysInMonth, setDaysInMonth } = useMainStore(state=>state);
  const [selectedFilter, setSelectedFilter] = useState(30);
  const startDate = dates.from;
  const endDate = dates.to;


  const fetchEvents = async()=>{
    return await eventAPI.findByFilter({ startDate, endDate });
  };

  const fetchDashboard = async()=>{
    const dates = getStartEndDates(daysInMonth.length);
    return await fetchDashboardData({ startDate: dates.startDate, endDate: dates.endDate }, daysInMonth);
  }

  const { isLoading, isError, data } = useQuery({ queryKey: ["dashboard", selectedFilter], queryFn: fetchDashboard });
  const { isLoading: isEventLoading, isError: isEventError, data: eventsData } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });

  const salesValue = data?.cards[0].value;

  const events = eventsData?.data?.map((evt)=>({ 
    ...evt, 
    location: evt?.location?.venueName, 
    startTime: dayjs(evt?.startTime).format("DD/MM/YYYY HH:mm"),
    endTime: dayjs(evt?.endTime).format("DD/MM/YYYY HH:mm"),
    createdAt: dayjs(evt?.createdAt).format("DD/MM/YYYY HH:mm"),
    id: evt?._id 
  }));

  useEffect(()=>{
    setDaysInMonth(getDaysInMonth(dayjs().year(), selectedFilter));
  }, [selectedFilter]);


  if(isLoading){
    return <Spinner />
  }
  if(isError){
    return <AlertCard message="Error data fetching" color="error" />;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" component="h5" sx={{ fontWeight: 600 }}>Dashboard</Typography>

        <DashboardFilter filterList={dashboardFilterList} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
      </Box>
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
          <SalesChart data={data?.ticketSales} salesValue={salesValue}/>
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
          <RecentEvents events={events} isLoading={isEventLoading} isError={isEventError} />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}

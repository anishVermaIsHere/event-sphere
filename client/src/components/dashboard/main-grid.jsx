import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../common/copyright';
import StatCard from './state-card';
import { fetchDashboardData, getDaysInMonth } from '../../shared/utils';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../common/spinner';
import AlertCard from '../common/alert-card';
import eventAPI from '../../shared/services/api/event';
import RecentEvents from './recent-events';
import dayjs from 'dayjs';
import SalesChart from './sales-chart';
import ChartUserByCountry from './chart-user-by-country';
import useAppStore from '../../store/app.store';
import DashboardFilter from './dashboard-filter';


const dashboardFilterList = [
  {
    id:1,
    label: "Monthly",
    value: 30
  },
  {
    id:2,
    label: "Quarterly",
    value: 90
  },
  {
    id:3,
    label: "Semi-annually",
    value: 180
  },
  {
    id:4,
    label: "Annually",
    value: 365
  }
];


export default function MainGrid() {
  const { dates } = useAppStore(state=>state);
  const [selectedFilter, setSelectedFilter] = useState(30);
  const startDate = dates.from;
  const endDate = dates.to;
  const daysInMonth = getDaysInMonth(dayjs().month()+1, dayjs().year());


  const fetchEvents = async()=>{
    return await eventAPI.findByFilter({ startDate, endDate });
  };

  const fetchDashboard = async()=>{
    return await fetchDashboardData({ startDate, endDate });
  }

  const { isLoading, isError, data } = useQuery({ queryKey: ["dashboard"], queryFn: fetchDashboard });
  const { isLoading: isEventLoading, isError: isEventError, data: eventsData } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });

  const events = eventsData?.data?.map((evt)=>({ 
    ...evt, 
    location: evt?.location?.venueName, 
    startTime: dayjs(evt?.startTime).format("DD/MM/YYYY HH:mm"),
    endTime: dayjs(evt?.endTime).format("DD/MM/YYYY HH:mm"),
    createdAt: dayjs(evt?.createdAt).format("DD/MM/YYYY HH:mm"),
    id: evt?._id 
  }));

  const salesData = [
    1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500,
    3000, 3400, 3700, 3200, 3900, 4100, 3500, 4300, 4500, 4000, 4700,
    5000, 5200, 4800, 5400, 5600 
  ];

  // useEffect(()=>{
  //   if(startDate || endDate){
  //     searchParams.set("startDate", dayjs(startDate).format("DD/MM/YYYY"));
  //     searchParams.set("endDate", dayjs(endDate).format("DD/MM/YYYY"));
  //     setSearchParams(searchParams);
  //   }
  //   return ()=>{}
  // }, [startDate, endDate]);


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
          <SalesChart daysInMonth={daysInMonth} data={salesData} />
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

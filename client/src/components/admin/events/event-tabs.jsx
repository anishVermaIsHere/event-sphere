import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "../dashboard/customized-data-grid";
import AlertCard from "../../common/alert-card";
import eventAPI from "../../../shared/services/api/event";
import dayjs from "dayjs";
import { dateTimeParser, getAuth } from "../../../shared/utils";
import CustomTabPanel from "../../common/tab-panel";



const fetchEvents = async (query) => {
  const res = await eventAPI.findByFilter(query);
  const auth = getAuth();
  return {
    rows: res.data.map((e) => {
      const startDate = dateTimeParser(e.startTime);
      const endDate = dateTimeParser(e.endTime);
      const isLive = (dayjs().unix() >= dayjs(e.startTime).unix()) && (dayjs().unix() <= dayjs(e.endTime).unix())
      return {      
        ...e,
        id: e._id,
        location: e.location.venueName,
        createdBy: e.createdBy._id === auth.user.id ? "You" : e.createdBy.fullName,
        startDateTime: startDate.date+" "+startDate.time,
        endDateTime: endDate.date+" "+endDate.time,
        createdAt: dayjs(e.createdAt).format("DD/MM/YYYY HH:mm"),
        isEditable: !isLive,
        isLive
      }
    }),
  };
};

function EventList({ events, isError, isLoading }) {
  return <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12 }}>
        <CustomizedDataGrid
          events={events}
          isError={isError}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
}


export function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EventTabs() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(2);
  const query = {
    category: queryParams.get("category"),
    startDate: queryParams.get("startDate"),
    endDate: queryParams.get("endDate"),
    status: queryParams.get("status"),
  };

  const {
    isLoading,
    isError,
    data: events,
  } = useQuery({
    queryKey: ["events", { status: query.status, category: query.category }],
    queryFn: async () => await fetchEvents(query),
  });


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let status = "";
    if(searchParams.get("category") === "All"){
      searchParams.delete("category");
    }
    if (!value) {
      status = "past";
    }
    if (value === 1) {
      status = "ongoing";
    }
    if (value === 2) {
      status = "upcoming";
    }
    searchParams.set("status", status);
    if (value === 3) {
      searchParams.delete("status");
    }
    setSearchParams(searchParams);
  }, [value, searchParams]);




  if(isError){
    return <AlertCard color="error" message="Something error"/>
  }

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Past" {...tabProps(0)} />
          <Tab label="Ongoing" {...tabProps(1)} />
          <Tab label="Upcoming" {...tabProps(2)} />
          <Tab label="All" {...tabProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EventList events={events} isError={isError} isLoading={isLoading} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EventList events={events} isError={isError} isLoading={isLoading} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EventList events={events} isError={isError} isLoading={isLoading} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EventList events={events} isError={isError} isLoading={isLoading} />
      </CustomTabPanel>
    </Box>
  );
}

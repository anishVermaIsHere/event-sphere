import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "./customized-data-grid";
import eventAPI from "../../shared/services/api/event";
import dayjs from "dayjs";
import { getAuth } from "../../shared/utils";



const fetchEvents = async () => {
  const res = await eventAPI.find();
  const auth = getAuth();
  return {
    rows: res.data.map((e) => ({
      ...e,
      id: e._id,
      location: e.location.venueName,
      createdBy: e.createdBy._id === auth.user.id ? "You" : e.createdBy.fullName,
      startTime: dayjs(e.startTime).format("DD/MM/YYYY HH:mm"),
      endTime: dayjs(e.endTime).format("DD/MM/YYYY HH:mm"),
      createdAt: dayjs(e.createdAt).format("DD/MM/YYYY HH:mm"),
    })),
    columns: [],
  };
};

function EventList({ type }) {
  return (
    <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12 }}>
        <CustomizedDataGrid type={type}/>
      </Grid>
    </Grid>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState('ongoing');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", mt:1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            overflowX: "auto"
          }}
        >
          <Tab label="Past events" {...tabProps('past')} />
          <Tab label="Ongoing events" {...tabProps('ongoing')} />
          <Tab label="Upcoming events" {...tabProps('upcoming')} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={value}>
        <EventList type="past"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={value}>
        <EventList type="ongoing"/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={value}>
        <EventList type="upcoming"/>
      </CustomTabPanel>
    </Box>
  );
}

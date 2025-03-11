import React from "react";
import EventRegisterForm from "./event-register-form";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import eventAPI from "../../shared/services/api/event";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { dateTimeParser } from "../../shared/utils";
import Spinner from "../common/spinner";
import RichTextEditor from "../miscellaneous/rich-editor";




const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    gap: 1,
    mb: 1
  };


const EventRegisterDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const path = pathname.split("/");
  const eventId = path[path.length - 1];


  async function fetchEvent() {
    return await eventAPI.findById(eventId);
  }

  const goBack = () => navigate(-1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reg-event", eventId],
    queryFn: fetchEvent,
  });

  const event = data?.data[0];

  const startDate = dateTimeParser(event?.startTime);
  const endDate = dateTimeParser(event?.endTime);

  if(isLoading){
    return <Spinner />
  }

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Register for event
      </Typography>
      <Box sx={style}>
          <Tooltip title="Back">
            <IconButton
              size="small"
              color="default"
              onClick={goBack}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Chip variant="outline" label={event?.category} />
            <Typography variant="h6" component="h6" color="primary"> {event?.name}</Typography>
            <Typography variant="p" component="p" > <LocationOnIcon sx={{ verticalAlign: "middle" }}/> {event?.location?.venueName}</Typography>
            <Typography variant="p" component="p" mb={2}> {event?.location?.city}, {event?.location?.state}, {event?.location?.country}</Typography>
            <Typography variant="p" component="p"> <CalendarMonthIcon sx={{ verticalAlign: "middle" }}/> {startDate.date} {startDate.time}</Typography>
            <Typography variant="p" component="p" mb={4}> <CalendarMonthIcon sx={{ verticalAlign: "middle" }}/> {endDate.date} {endDate.time}</Typography>
        </Box>

      <EventRegisterForm eventId={event?._id}/>
    </Box>
  );
};

export default EventRegisterDetails;

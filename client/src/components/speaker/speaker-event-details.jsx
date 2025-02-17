import { useState } from "react";
import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../common/spinner";
import AlertCard from "../common/alert-card";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CachedIcon from "@mui/icons-material/Cached";
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import Groups2Icon from '@mui/icons-material/Groups2';
import ChatIcon from '@mui/icons-material/Chat';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dayjs from "dayjs";
import { dateTimeParser, formatCurrency } from "../../shared/utils";
import { queryClient } from "../../providers/query-provider";
import eventAPI from "../../shared/services/api/event";



const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const SpeakerEventDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [openChat, setOpenChat] = useState([false, false]);

  const fetchEvent = async () => {
    return await eventAPI.findBySlug(params?.slug);
  };

  const { isLoading, isError, data } = useQuery({ queryKey: ["event", params?.id], queryFn: fetchEvent });
  const event = data?.data;
  const isLive = dayjs().unix() >= dayjs(event?.startTime).unix() && dayjs().unix() <= dayjs(event?.endTime).unix();
  const startDate = dateTimeParser(event?.startTime);
  const endDate = dateTimeParser(event?.endTime);

  const goBack = () => navigate(-1);
  const refetch = () => queryClient.invalidateQueries("event");


  const handleChatToggle = (value) => {
    setOpenChat(value);
  }

  if (isError) {
    return <AlertCard message="Error data fetching" color="error" />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        margin: "auto",
        width: "100%",
        // width: { xs: "100%", md: "700px" },
      }}
    >
      <Tooltip title="Back" sx={{ mb: 2, mr: 1 }}>
        <IconButton size="small" color="default" onClick={goBack}>
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Refetch" sx={{ mb: 2 }}>
        <IconButton size="small" color="default" onClick={refetch}>
          <CachedIcon />
        </IconButton>
      </Tooltip>

      <Paper sx={{ p: 2, bgcolor:"#fff" }} elevation={0}>
      <Stack
            sx={{ display: "flex", justifyContent: "space-between" }}
            direction="row"
            spacing={1}
            mb={1}
          >
            <Chip
              sx={{ mr: 2, mb: 2 }}
              label={event.category}
              color="default"
              size="large"
            />
            {isLive && (
              <Chip
                sx={{
                  mr: 1,
                  mb: 2,
                  // bgcolor: "rgb(53, 149, 110)",
                  // color: "#fff",
                  boxShadow: "0px 0px 1px 1px #0000001a",
                  animation: "pulse-animation 2s infinite",
                }}
                color="success"
                label="LIVE"
                size="large"
              />
            )}
          </Stack>
        <Typography
          variant="h4"
          component="p"
          color="primary"
          mb={1}
          sx={{ fontWeight: 600 }}
        >
          {event?.name}
        </Typography>

        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          mb={1}
          sx={{ fontWeight: 400 }}
        >
          {event?.description}
        </Typography>

        <Typography component="p" variant="h5" color="text.secondary" sx={{ ...style, alignItems:"center", justifyContent: "start", mb: 4 }}>
          <LocationOnIcon sx={{ mr:1 }}/>
          <Typography component="p" variant="h5">{event?.location?.venueName}</Typography> 
        </Typography>

         <Divider sx={{ my: 2 }} /> 

        <Typography
            variant="body"
            component="div"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <CalendarMonthIcon sx={{ mr: 1 }} />
            {startDate.date}
            <ScheduleIcon sx={{ mx: 1 }} />
            {startDate.time}
          </Typography>

          <Typography
            variant="body"
            component="div"
            color="text.secondary"
            mb={4}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
            }}
          >
            <CalendarMonthIcon sx={{ mr: 1 }} />
            {endDate.date}
            <ScheduleIcon sx={{ mx: 1 }} />
            {endDate.time}
          </Typography>

        <Stack sx={style} direction="row" spacing={1} my={2}>
            <Chip icon={<PeopleIcon />} label={event?.capacity} size="large"/>
        </Stack>

        <Stack sx={style} direction="row" spacing={1} mb={2}>
          <Chip
            label={
              event?.priceInCents > 0
                ? formatCurrency({
                    amount: event?.priceInCents / 100,
                  })
                : "Free"
            }
            color="success"
            size="large"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              border: "none",
              color: "#fff",
            }}
            variant="outlined"
          />
        </Stack>

        <Divider sx={{ my: 2 }} /> 

        <Typography
          variant="body"
          component="div"
          color="text.secondary"
          mb={2}
        >
        <Stack
            sx={{ display: "flex", justifyContent: "space-between" }}
            direction="row"
            spacing={1}
            mb={1}
          >
            <Chip
              sx={{ mr: 2, mb: 2 }}
              label={`Organised by: ${event?.createdBy?.firstName+" "+event?.createdBy?.lastName}`}
              color="default"
              size="medium"
              variant="outlined"
            />
          </Stack>

        </Typography>
        <Typography
          variant="body"
          component="div"
          color="text.secondary"
          mb={2}
        >
          <Typography component="div" variant="body" sx={{ ...style, mb: 2 }}>
                <Typography component="p" variant="p" sx={{ ...style, justifyContent:"start" }}>
                    <InterpreterModeIcon sx={{ mr: 1 }} />Speakers ({event?.speakers?.length})
                </Typography>
                <Tooltip title="Chat with speakers">
                    <IconButton size="small" color="default" >
                    <ChatIcon />
                    </IconButton>
                </Tooltip>
          </Typography> 

          {event?.speakers?.map((spk) => (
            <Typography
              key={spk._id}
              variant="body"
              component="div"
              sx={{ ...style, mb:1 }}
            >
              <Typography component="small">{spk.firstName+" "+spk.lastName}</Typography>
              {/* <Typography component="small">
                {spk.arrived ? (
                  <Stack direction="row" spacing={1}>
                  <Chip icon={<CheckCircleIcon color="white" />} label="Arrived" size="small" color="success"/>
                </Stack>
                ) : (
                  <Stack direction="row" spacing={1}>
                  <Chip icon={<CheckCircleIcon color="white" />} label="..." size="small" />
                </Stack>
                )}
              </Typography> */}
            </Typography>
          ))}

        </Typography>

        {event?.guests?.length ? <Typography
          variant="body"
          component="div"
          color="text.secondary"
          mb={2}
        >
           <Typography component="div" variant="body" sx={{ ...style, mb: 2 }}>
                <Typography component="p" variant="p" sx={{ ...style, justifyContent:"start" }}>
                    <Groups2Icon sx={{ mr: 1 }} />Guests ({event?.guests?.length})
                </Typography>
                <Tooltip title="Chat with guests">
                    <IconButton size="small" color="default" >
                    <ChatIcon />
                    </IconButton>
                </Tooltip>
          </Typography> 
          {event?.guests?.map((gst) => (
            <Typography
              key={gst._id}
              variant="body"
              component="div"
              sx={{ ...style, mb:1 }}
            >
              <Typography component="small">{gst.firstName+" "+gst.lastName}</Typography>
              {/* <Typography component="small">
                {spk.arrived ? (
                  <Stack direction="row" spacing={1}>
                  <Chip icon={<CheckCircleIcon color="white" />} label="Arrived" size="small" color="success"/>
                </Stack>
                ) : (
                  <Stack direction="row" spacing={1}>
                  <Chip icon={<CheckCircleIcon color="white" />} label="..." size="small" />
                </Stack>
                )}
              </Typography> */}
            </Typography>
          ))}

        </Typography> : ""}
      </Paper>
    </Box>
  );
};

export default SpeakerEventDetails;

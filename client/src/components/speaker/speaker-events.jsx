import {
  Box,
  Typography,
  Grid2 as Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { useState } from "react";
import { dateTimeParser, formatCurrency, getAuth } from "../../shared/utils";
import useAppStore from "../../store/app.store";
import useFormStore from "../../store/form.store";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from '@mui/icons-material/Lock';
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import AlertCard from "../common/alert-card";
import Spinner from "../common/spinner";
import speakerAPI from "../../shared/services/api/speaker";
import { useNavigate } from "react-router-dom";




const fetchEvents = async (query) => {
  const res = await speakerAPI.events(query);
  const auth = getAuth();

  return {
    rows: res.data.map((e) => {
      const startDate = dateTimeParser(e.startTime);
      const endDate = dateTimeParser(e.endTime);
      const isLive = dayjs().unix() >= dayjs(e.startTime).unix() && dayjs().unix() <= dayjs(e.endTime).unix();
      const isStarted = dayjs().unix() >= dayjs(e.startTime).unix();
      return {
        ...e,
        id: e._id,
        location: e.location.venueName,
        createdBy: e.createdBy._id === auth.user.id ? "You" : e.createdBy.firstName+" "+e.createdBy.lastName,
        startDateTime: startDate.date + " " + startDate.time,
        endDateTime: endDate.date + " " + endDate.time,
        createdAt: dayjs(e.createdAt).format("DD/MM/YYYY HH:mm"),
        isEditable: !isLive,
        isLive,
        isStarted
      };
    }),
  };
};

const styles = {
  card: {
    width: "100%",
    height: "100%",
    // overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // display: "-webkit-box",
    // WebkitBoxOrient: "vertical",
    // WebkitLineClamp: 3,
  },
  content: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
};

function EventCard({
  id,
  slug,
  name,
  category,
  isPrivate,
  isLive,
  startTime,
  endTime,
  location,
  speakers,
  guests,
  capacity,
  priceInCents,
  isStarted,
  createdBy
}) {
  const [expanded, setExpanded] = useState(false);
  const { event: { setEventId, setIsEditOpen } } = useFormStore((state) => state);
  const { setSnackbar } = useAppStore((state) => state);
  const navigate = useNavigate();

  const chars = 150;
  const guestList = guests
    ?.map(({ firstName, lastName }) => firstName + " " + lastName)
    .join(", ");
  const speakerList = speakers
    ?.map(({ firstName, lastName }) => firstName + " " + lastName)
    .join(", ");
  const startDate = dateTimeParser(startTime);
  const endDate = dateTimeParser(endTime);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const onCardOpen = () =>{
    navigate(id);
  }

  const onRegister = () => {
    navigate(`apply/${id}`)
    
  };

  return (
    <Card sx={{ ...styles.card,  bgcolor:"#fff" }} elevation={0}>
      <CardContent
        sx={{ ...styles.card, justifyContent: "start", alignItems: "start" }}
      >
        <Box mb={2} sx={{ width: "100%" }}>
          <Stack
            sx={{ display: "flex", justifyContent: "space-between" }}
            direction="row"
            spacing={1}
            mb={1}
          >
            <Chip
              sx={{ mr: 2, mb: 2 }}
              label={category}
              color="default"
              size="small"
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
            title={name}
            gutterBottom
            variant="h5"
            component="h5"
            color="primary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {name}
          </Typography>
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

          <Typography
            variant="body"
            component="div"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "start",
              mb: 1,
            }}
          >
            <LocationOnIcon sx={{ mr: 1 }} /> {location}
          </Typography>
          {isStarted && <Typography
            variant="body"
            component="div"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
              flexDirection: "row",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <GroupsIcon sx={{ mr: 1 }} />
              {capacity}
            </div>

            <Chip
              label={
                priceInCents > 0
                  ? formatCurrency({ amount: priceInCents / 100 })
                  : "Free"
              }
              // sx={{ fontSize: "1rem" }}
              size="large"
              variant="outlined"
            />
          </Typography>}

          <Divider />
        </Box>
        {!isStarted ? 

        <Box>
          <div style={{ marginBottom: 4 }}>
            <LockIcon color="disabled"/>
          </div>
          <Button variant="contained" size="small" color="secondary" sx={{ mr: 2 }} onClick={onRegister}>Register</Button>
          <Button variant="contained" size="small" onClick={onCardOpen}>View</Button>
        </Box>
        : 
        <Box>
           <Stack
            sx={{ display: "flex", justifyContent: "space-between" }}
            direction="row"
            spacing={1}
            mb={1}
          >
            <Chip
              sx={{ mr: 2, mb: 2 }}
              label={`Organised by: ${createdBy}`}
              color="default"
              size="small"
            />
          </Stack>
          {guests?.length ? (
            <>
              <Box>
                <Typography gutterBottom variant="body2" component="div">
                  Guests:
                </Typography>
                <Typography
                  variant="body"
                  component="small"
                  color="text.secondary"
                  sx={{
                    ...styles.content,
                    whiteSpace: expanded ? "normal" : "nowrap",
                    display: "flex",
                    alignItems: "start",
                    mb: isPrivate ? 0 : 2,
                    fontSize: "0.9rem",
                  }}
                >
                  {guestList.length >= chars
                    ? guestList.substring(0, chars) + "..."
                    : guestList}
                </Typography>
              </Box>
            </>
          ) : (
            ""
          )}

          {!isPrivate && speakers?.length ? (
            <Box>
              <Typography gutterBottom variant="body2" component="div">
                Speakers:
              </Typography>
              <Typography
                variant="body"
                component="small"
                color="text.secondary"
                sx={{
                  ...styles.content,
                  whiteSpace: expanded ? "normal" : "nowrap",
                  display: "flex",
                  alignItems: "start",
                  mb: 2,
                  fontSize: "0.9rem",
                }}
              >
                {speakerList.length >= chars
                  ? speakerList.substring(0, chars) + "..."
                  : speakerList}
              </Typography>
            </Box>
          ) : ""}

          {!expanded && guestList?.length >= chars ? (
            <Chip
              size="small"
              label="Read more"
              color="primary"
              onClick={toggleExpanded}
            />
          ) : (
            guestList?.length >= chars && (
              <Chip
                size="small"
                label="Read less"
                color="primary"
                onClick={toggleExpanded}
              />
            )
          )}
        </Box>}
      </CardContent>
    </Card>
  );
}

const EventsOfSpeaker = () => {
  const { isLoading, isError, data: events } = useQuery({ queryKey: ["events"], queryFn: async () => await fetchEvents({}) });

  if(isLoading){
    return <Spinner />
  }
  if (isError) {
    return <AlertCard color="error" message="Something error" />;
  }
  return (
    <Box sx={{ position: "relative", width: "100%", p: 2 }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Events
      </Typography>
      <Grid container spacing={2} columns={12}>
        {events?.rows.map((event) => (
          <Grid key={event._id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <EventCard {...event} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventsOfSpeaker;

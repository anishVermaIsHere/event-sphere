import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import dayjs from "dayjs";

const styles = {
  card: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // display: "-webkit-box",
    // WebkitBoxOrient: "vertical",
    // WebkitLineClamp: 3,
  },
  content: {
    // display: "-webkit-box",
    // WebkitBoxOrient: "vertical",
    // WebkitLineClamp: 3,
    // overflow: "hidden",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
};

export default function EventCard({
  name,
  category,
  isPrivate,
  startTime,
  location,
  guests,
}) {
  const [expanded, setExpanded] = useState(false);
  const guestList = [...guests, ...guests]?.map(({ firstName, lastName }) => firstName + " " + lastName).join(", ");

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Box mb={2}>
          <Chip
            sx={{ mr: 1 }}
            label={category}
            color="default"
            size="small"
          />
        </Box>
        <Typography title={name} gutterBottom variant="h5" component="h5" color="primary" sx={styles.content}>
          {name}
        </Typography>
        {/* <Typography
          variant="body"
          component="div"
          color="text.secondary"
          sx={{
            ...styles.content,
            WebkitLineClamp: expanded ? 'unset' : 3,
          }}
        >
          {description}
        </Typography> */}
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
          <CalendarMonthIcon sx={{ mr: 1 }} />{" "}
          {dayjs(startTime, "DD-MM-YYYY").format("MMM D, YYYY")}
          <ScheduleIcon sx={{ mx: 1 }} />{" "}
          {dayjs(startTime, "HH:mm").format("hh:mmA")}
        </Typography>

        <Typography
          variant="body"
          component="div"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "start",
            mb: 2,
          }}
        >
          <LocationOnIcon sx={{ mr: 1 }} /> {location}
        </Typography>

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
                  whiteSpace: expanded ? "nowrap" : "normal",
                  display: "flex",
                  alignItems: "start",
                  mb: 2,
                  fontSize: "0.9rem",
                }}
              >
                {guestList.length >= 100 ? guestList.substring(0,100)+"..." : guestList}
              </Typography>
            </Box>
          </>
        ) : (
          ""
        )}

        
        {/* {!expanded && (guestList?.length >= 100 )? (
          <Button
            size="small"
            variant="contained"
            onClick={toggleExpanded}
            sx={styles.readMoreButton}
          >
            Read More
          </Button>
        ) : (
          guestList?.length >= 100 && <Button
            size="small"
            variant="contained"
            onClick={toggleExpanded}
            sx={styles.readMoreButton}
          >
            Read Less
          </Button>
        )} */}
      </CardContent>
      <CardActions>
        <DeleteIcon color="action" />
      </CardActions>
    </Card>
  );
}

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";


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

const AttendeeCard = ({
  _id,
  event,
  user,
  priceInCents,
  status,
  attendees,
}) => {
  const navigate = useNavigate();
  const arrived = attendees.filter((att) => att.arrived).length;

  const onCardOpen = () => {
    navigate(`/attendees/${user?._id}`);
  };

  return (
    <Card sx={{ ...styles.card, cursor: "pointer" }} elevation={0} onClick={onCardOpen}>
      <CardContent
        sx={{ ...styles.card, justifyContent: "start", alignItems: "start" }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            title={name}
            gutterBottom
            variant="p"
            component="p"
            color="default"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {user?.firstName + " " + user?.lastName}
          </Typography>
          <Stack
            sx={{ display: "flex", justifyContent: "space-between" }}
            direction="row"
            spacing={1}
            mb={1}
          >
            <Chip sx={{ mr: 1, mb: 1 }} label={event?.name} size="medium" />
          </Stack>

          <Typography
            variant="body"
            component="div"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "start",
              mb: 1,
              fontSize: "0.9rem",
            }}
          >
            Location: {event?.location?.venueName}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography
            variant="body"
            component="small"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              icon={<PeopleIcon />}
              label={attendees?.length}
              variant="outlined"
            />
            {arrived ? arrived+" arrived" : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendeeCard;

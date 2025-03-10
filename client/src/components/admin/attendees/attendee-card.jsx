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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
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
    backgroundColor: "#fff"
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
  const arrived = attendees?.filter((att) => att.arrived).length;

  const onCardOpen = () => {
    navigate(`${user?._id}`);
  };

  return (
    <Card sx={{ ...styles.card, cursor: "pointer" }} elevation={0} onClick={onCardOpen}>
      <CardContent sx={{ ...styles.card, justifyContent: "start", alignItems: "start" }}>
        <Box sx={{ width: "100%" }}>
          <Typography
            title={name}
            gutterBottom
            variant="h6"
            component="h6"
            color="primary"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {user?.fullName}
          </Typography>
          <Typography component="p" variant="div" color="text.secondary" sx={{ 
            display: "flex",
            alignItems: "start",
            gap:1  
          }} mb={1}>
            <LocalActivityIcon /> {event?.name}
          </Typography>
           
          <Typography
            variant="body"
            component="div"
            color="text.secondary"
            mb={1}
            sx={{
              display: "flex",
              alignItems: "start",
              fontSize: "0.9rem",
              gap: 1
            }}
          >
            <LocationOnIcon /> {event?.location?.venueName}
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
            <Typography sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={<PeopleIcon />}
              label={attendees?.length}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<ConfirmationNumberIcon />}
              label={status?.toUpperCase()}
              variant="outlined"
              size="small"
              color={status === "confirmed" ? "success" : "error"}
            />
            </Typography>
           
            {arrived ? arrived+" arrived" : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendeeCard;

import { Box, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People';

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
  attendees

}) => {

  const arrived = attendees.filter((att)=>att.arrived).length;
  return (
    <Card sx={styles.card} elevation={0}>
    <CardContent sx={{ ...styles.card, justifyContent: "start", alignItems: "start" }}>
      <Box mb={2} sx={{ width: '100%' }}>
        <Typography
          title={name}
          gutterBottom
          variant="p"
          component="p"
          color="default"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden"
          }}
        >
          {user?.firstName+ " "+user?.lastName}
        </Typography>
        <Stack sx={{ display: 'flex', justifyContent: 'space-between' }} direction="row" spacing={1} mb={1}>
          <Chip
            sx={{ 
              mr: 1, mb: 2, 
              backgroundColor: 'rgb(53, 149, 110)',
              color: "#fff",
            }}
            label={event?.name}
            size="small"
          />
        </Stack>
 
        <Typography
          variant="body"
          component="div"
          color="primary"
          sx={{
            display: "flex",
            alignItems: "start",
          }}
        >
          {event?.name}
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
          Location: {event?.location?.venueName}
        </Typography>

        <Divider sx={{ my:1 }}/>

        <Typography
          variant="body"
          component="small"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <PeopleIcon/> {attendees?.length} members
          <small>{arrived} arrived</small>

          
        </Typography>
      </Box>
    </CardContent>
  </Card>
  )
}

export default AttendeeCard
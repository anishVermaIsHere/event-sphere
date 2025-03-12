import { useState } from "react";
import useFormStore from "../../store/form.store";
import useAppStore from "../../store/app.store";
import { Box, Grid2 as Grid, Chip, Divider, Stack, Typography, Card, CardContent, CardActions } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupsIcon from "@mui/icons-material/Groups";
import eventAPI from "../../shared/services/api/event";
import { queryClient } from "../../providers/query-provider";
import { dateTimeParser, formatCurrency } from "../../shared/utils";



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

// function EventCard({
//   id,
//   name,
//   category,
//   isPrivate,
//   isLive,
//   isEditable,
//   startTime,
//   endTime,
//   location,
//   speakers,
//   guests,
//   capacity,
//   priceInCents
// }) {
//   const [expanded, setExpanded] = useState(false);
//   const { event: { setEventId, setIsEditOpen } } = useFormStore((state) => state);
//   const { setSnackbar } = useAppStore((state) => state);
//   const chars = 150;
//   const guestList = guests?.map(({ firstName, lastName }) => firstName + " " + lastName).join(", ");
//   const speakerList = speakers?.map(({ firstName, lastName }) => firstName + " " + lastName).join(", ");
//   const startDate = dateTimeParser(startTime);
//   const endDate = dateTimeParser(endTime);


//   const toggleExpanded = () => {
//     setExpanded(!expanded);
//   };

//   const toggleEdit = () => {
//     setEventId(id);
//     setIsEditOpen(true);
//   };

//   const handleDelete = async () => {
//     await eventAPI.delete(id);
//     setSnackbar("Event deleted", "info");
//     queryClient.invalidateQueries("events");
//   };

//   return (
//     <Card sx={styles.card} elevation={0}>
//       <CardContent
//         sx={{ ...styles.card, justifyContent: "start", alignItems: "start" }}
//       >
//         <Box mb={2} sx={{ width: "100%" }}>
//           <Stack
//             sx={{ display: "flex", justifyContent: "space-between" }}
//             direction="row"
//             spacing={1}
//             mb={1}
//           >
//             <Chip
//               sx={{ mr: 2, mb: 2 }}
//               label={category}
//               color="default"
//               size="small"
//             />
//             {isLive && (
//               <Chip
//                 sx={{
//                   mr: 1,
//                   mb: 2,
//                   // bgcolor: "rgb(53, 149, 110)",
//                   // color: "#fff",
//                   boxShadow: "0px 0px 1px 1px #0000001a",
//                   animation: "pulse-animation 2s infinite",
//                 }}
//                 color="success"
//                 label="LIVE"
//                 size="large"
//               />
//             )}
//           </Stack>

//           <Typography
//             title={name}
//             gutterBottom
//             variant="h5"
//             component="h5"
//             color="primary"
//             sx={{
//               display: "-webkit-box",
//               WebkitBoxOrient: "vertical",
//               WebkitLineClamp: 2,
//               overflow: "hidden",
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography
//             variant="body"
//             component="div"
//             color="text.secondary"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               mb: 1,
//             }}
//           >
//             <CalendarMonthIcon sx={{ mr: 1 }} />
//             {startDate.date}
//             <ScheduleIcon sx={{ mx: 1 }} />
//             {startDate.time}
//           </Typography>

//           <Typography
//             variant="body"
//             component="div"
//             color="text.secondary"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               mb: 1,
//             }}
//           >
//             <CalendarMonthIcon sx={{ mr: 1 }} />
//             {endDate.date}
//             <ScheduleIcon sx={{ mx: 1 }} />
//             {endDate.time}
//           </Typography>

//           <Typography
//             variant="body"
//             component="div"
//             color="text.secondary"
//             sx={{
//               display: "flex",
//               alignItems: "start",
//               mb: 1,
//             }}
//           >
//             <LocationOnIcon sx={{ mr: 1 }} /> {location}
//           </Typography>
//           <Typography
//             variant="body"
//             component="div"
//             color="text.secondary"
//             sx={{
//               mb: 2,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               gap: 4,
//               flexDirection: "row",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <GroupsIcon sx={{ mr: 1 }} /> 
//               {capacity}
//             </div>

//             <Chip
//               label={priceInCents > 0 ? formatCurrency({ amount: priceInCents / 100 }) : "Free"}
//               // sx={{ fontSize: "1rem" }}
//               size="large"
//               variant="outlined"
//             />
//           </Typography>

//           <Divider />
//         </Box>
//         <Box>
//           {guests?.length ? (
//             <>
//               <Box>
//                 <Typography gutterBottom variant="body2" component="div">
//                   Guests:
//                 </Typography>
//                 <Typography
//                   variant="body"
//                   component="small"
//                   color="text.secondary"
//                   sx={{
//                     ...styles.content,
//                     whiteSpace: expanded ? "normal" : "nowrap",
//                     display: "flex",
//                     alignItems: "start",
//                     mb: isPrivate ? 0 : 2,
//                     fontSize: "0.9rem",
//                   }}
//                 >
//                   {guestList.length >= chars
//                     ? guestList.substring(0, chars) + "..."
//                     : guestList}
//                 </Typography>
//               </Box>
//             </>
//           ) : (
//             ""
//           )}

//           {!isPrivate && (
//             <Box>
//               <Typography gutterBottom variant="body2" component="div">
//                 Speakers:
//               </Typography>
//               <Typography
//                 variant="body"
//                 component="small"
//                 color="text.secondary"
//                 sx={{
//                   ...styles.content,
//                   whiteSpace: expanded ? "normal" : "nowrap",
//                   display: "flex",
//                   alignItems: "start",
//                   mb: 2,
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 {speakerList.length >= chars
//                   ? speakerList.substring(0, chars) + "..."
//                   : speakerList}
//               </Typography>
//             </Box>
//           )}

//           {!expanded && guestList?.length >= chars ? (
//             <Chip
//               size="small"
//               label="Read more"
//               color="primary"
//               onClick={toggleExpanded}
//             />
//           ) : (
//             guestList?.length >= chars && (
//               <Chip
//                 size="small"
//                 label="Read less"
//                 color="primary"
//                 onClick={toggleExpanded}
//               />
//             )
//           )}
//         </Box>
//       </CardContent>
//       <CardActions>
//         {isEditable && (
//           <Chip
//             size="medium"
//             label="Edit"
//             variant="outlined"
//             sx={{
//               fontWeight: 600,
//             }}
//             onClick={toggleEdit}
//           />
//         )}
//         <Chip
//           size="medium"
//           label="Delete"
//           sx={{
//             fontWeight: 600,
//           }}
//           onClick={handleDelete}
//         />
//       </CardActions>
//     </Card>
//   );
// }


const EventsOfUser = () => {
  return (
    <Box sx={{ position: "relative", width:"100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>Events</Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          Event cards ---

        </Grid>
    </Grid>
    </Box>
  )
}

export default EventsOfUser
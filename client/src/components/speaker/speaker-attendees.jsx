import { useQuery } from '@tanstack/react-query'
import speakerAPI from '../../shared/services/api/speaker';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { AttendeeList } from '../admin/attendees/attendee-list';
import CachedIcon from "@mui/icons-material/Cached";
import { queryClient } from '../../providers/query-provider';



const fetchAttendees = async () => {
    return await speakerAPI.attendees({});
};

const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    px:2,
    gap: 1,
    mb: 1
};

const SpeakerAttendees = () => {
    const { isLoading, isError, data } = useQuery({ queryKey: ["attendees"], queryFn: fetchAttendees });
    const attendees = data?.data;

  return (
    <>
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Attendees
      </Typography>
      <Box sx={style}>
        <Typography mr={1}>Total {attendees?.length} </Typography>
          <Tooltip title="Refetch">
            <IconButton
              size="small"
              color="default"
              onClick={async () => {
                queryClient.invalidateQueries("attendees");
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      <AttendeeList
        attendees={attendees}
        isError={isError}
        isLoading={isLoading}
      />
    </Box>
    </>
  )
}

export default SpeakerAttendees
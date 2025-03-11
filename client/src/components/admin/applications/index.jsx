import { Box, Grid2 as Grid, IconButton, Tooltip, Typography } from "@mui/material";
import registerEventAPI from "../../../shared/services/api/registerevent";
import { useQuery } from "@tanstack/react-query";
import CachedIcon from "@mui/icons-material/Cached";
import { queryClient } from "../../../providers/query-provider";
import ApplicationList from "./application-list";



const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  px:2,
  gap: 1,
  mb: 1
};

const fetchApplications = async () => {
  return await registerEventAPI.events();
};

const Applications = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
  const applications = data?.data || [];

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Event Applications
      </Typography>
      <Box sx={style}>
        <Typography mr={1}>Total {applications?.length} </Typography>
          <Tooltip title="Refetch">
            <IconButton
              size="small"
              color="default"
              onClick={async () => {
                queryClient.invalidateQueries("applications");
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      <ApplicationList
        applications={applications}
        isError={isError}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Applications;

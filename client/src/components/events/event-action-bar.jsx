import { lazy, useState, Suspense } from "react";
import { Button, Box, Tooltip, IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import { queryClient } from "../../providers/query-provider";
import Spinner from "../common/spinner";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import useAppStore from "../../store/app.store";

const LazyEventForm = lazy(() => import("./event-modal-form"));

const EventActionBar = () => {
  const { setDataView } = useAppStore(state=>state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleView = (view) => setDataView(view);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent:'space-between', alignItems: "center", gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
        >
          <AddIcon />
          Add Event
        </Button>
        <Box>
          <Tooltip title="Refetch">
            <IconButton
              size="small"
              color="default"
              onClick={async () => {
                queryClient.invalidateQueries("events");
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="List">
            <IconButton size="small" color="default" onClick={()=>handleView('list')}>
              <ViewHeadlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid">
            <IconButton size="small" color="default" onClick={()=>handleView('grid')}>
              <GridViewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Suspense fallback={<Spinner />}>
        {open && <LazyEventForm handleClose={handleClose} open={open} />}
      </Suspense>
    </>
  );
};

export default EventActionBar;

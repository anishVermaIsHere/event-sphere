import { Box, Typography } from "@mui/material";
import BasicTabs from "../dashboard/basic-tabs";
import EventActionBar from "./event-action-bar";
import { lazy, Suspense } from "react";
import useFormStore from "../../store/form.store";
import Spinner from "../common/spinner";

const LazyEventForm = lazy(() => import("./event-modal-form"));
const LazyEditEventForm = lazy(() => import("./edit-event-modal-form"));

const Events = () => {
  const { event: { isAddOpen, isEditOpen, setIsAddOpen, setIsEditOpen, setEventId } } = useFormStore(state=>state);
  const handleAddClose = () => setIsAddOpen(false);
  const handleEditClose = () => { 
    setIsEditOpen(false); 
    setEventId("");
  };


  return (
    <Box sx={{ position: "relative", width:"100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>Events</Typography>
      <EventActionBar />
      <BasicTabs />

       <Suspense fallback={<Spinner />}>
          {isAddOpen && <LazyEventForm handleClose={handleAddClose} open={isAddOpen} />}
          {isEditOpen && <LazyEditEventForm handleClose={handleEditClose} open={isEditOpen} />}

        </Suspense>
    </Box>
  );
};

export default Events;

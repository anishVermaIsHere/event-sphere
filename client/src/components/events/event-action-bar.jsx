import { lazy, useState, Suspense, useEffect } from "react";
import { Button, Box, Tooltip, IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import { queryClient } from "../../providers/query-provider";
import Spinner from "../common/spinner";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import useAppStore from "../../store/app.store";
import Filter from "../common/filter";
import categoryAPI from "../../shared/services/api/category";
import useFormStore from "../../store/form.store";

const LazyEventForm = lazy(() => import("./event-modal-form"));
const LazyEditEventForm = lazy(() => import("./edit-event-modal-form"));



const EventActionBar = () => {
  const { setDataView } = useAppStore((state) => state);
  const { event: { isAddOpen, setIsAddOpen }} = useFormStore(state=>state);
  const [filterList, setFilterList] = useState([])
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setIsAddOpen(true);
  const handleClose = () => setIsAddOpen(false);
  const handleView = (view) => setDataView(view);

  const style={
    display: "flex",
    alignItems: "center",
    gap: 1,
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await categoryAPI.find(); 
        setFilterList(response.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          ...style,
          justifyContent: "space-between",
          alignItems: 'start',
          gap: 2,
          flexDirection: { xs: "column", sm: "row"},
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
          sx={{ width : { xs: '100%', sm: 'auto' }}}
        >
          <AddIcon />
          Add Event
        </Button>
        <Box sx={style}>
          <Filter filterList={filterList}/>
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
            <IconButton
              size="small"
              color="default"
              onClick={() => handleView("list")}
            >
              <ViewHeadlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Grid">
            <IconButton
              size="small"
              color="default"
              onClick={() => handleView("grid")}
            >
              <GridViewIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Suspense fallback={<Spinner />}>
        {isAddOpen && <LazyEventForm handleClose={handleClose} open={isAddOpen} />}
      </Suspense>
    </>
  );
};

export default EventActionBar;

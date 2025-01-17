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

const LazyEventForm = lazy(() => import("./event-modal-form"));


const EventActionBar = () => {
  const { setDataView } = useAppStore((state) => state);
  const [filterList, setFilterList] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          flexDirection: { xs: "column", sm: "row"},
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleOpen}
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
        {open && <LazyEventForm handleClose={handleClose} open={open} />}
      </Suspense>
    </>
  );
};

export default EventActionBar;

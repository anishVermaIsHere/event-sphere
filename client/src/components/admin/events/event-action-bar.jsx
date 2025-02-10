import { useState, useEffect } from "react";
import { Button, Box, Tooltip, IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { queryClient } from "../../../providers/query-provider";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import useAppStore from "../../../store/app.store";
import FilterElement from "../../common/filter";
import categoryAPI from "../../../shared/services/api/category";
import useFormStore from "../../../store/form.store";
import eventAPI from "../../../shared/services/api/event";



const EventActionBar = () => {
  const { dataView, selectedEventRows, setDataView, setSnackbar } = useAppStore((state) => state);
  const { event: { setIsAddOpen } } = useFormStore((state) => state);
  const [filterList, setFilterList] = useState([]);

  const handleOpen = () => setIsAddOpen(true);
  const handleView = (view) => setDataView(view);

  const handleDeleteAll = async () => {
    await eventAPI.deleteAll(selectedEventRows);
    setSnackbar("Events deleted successfully", "info");
    queryClient.invalidateQueries("events");
  };

  const style = {
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryAPI.find();
        setFilterList(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          ...style,
          justifyContent: "space-between",
          alignItems: "start",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            ...style,
            width: "100%",
            display: 'flex',
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleOpen}
            sx={{ width: { xs: "100%", sm: "auto", mb: 0 } }}
          >
            <AddIcon sx={{ mr: "0.4rem" }} />
            Add Event
          </Button>
          {selectedEventRows.length ? 
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={handleDeleteAll}
            sx={{ width: { xs: "100%", sm: "auto", mb: 0 } }}
          >
            <DeleteIcon sx={{ mr: "0.4rem" }} />
            Delete {selectedEventRows.length}
          </Button> : ""}
        </Box>

        <Box sx={style}>
          {/* <SortElement sortList={sortList}/> */}
          <FilterElement filterList={filterList} />
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
          {dataView === "grid" ? (
            <Tooltip title="List">
              <IconButton
                size="small"
                color="default"
                onClick={() => handleView("list")}
              >
                <ViewHeadlineIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Grid">
              <IconButton
                size="small"
                color="default"
                onClick={() => handleView("grid")}
              >
                <GridViewIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EventActionBar;

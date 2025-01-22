import { useEffect } from "react";
import useAppStore from "../../store/app.store";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { columns } from "./grid-data";
import { Grid2 as Grid, Typography } from "@mui/material";
import EventCard from "../events/event-card";
import Spinner from "../common/spinner";




export default function CustomizedDataGrid({ events, isLoading, isError }) {
  const { dataView, selectedEventRows, setSelectedEventRows } = useAppStore((state) => state);
  const apiRef = useGridApiRef();

  const handleRowSelectionModelChange = (rowIds) => {
    setSelectedEventRows(rowIds);
  };

  useEffect(() => {
    if (apiRef.current && selectedEventRows.length) {
      selectedEventRows.map((id) => apiRef.current.selectRow(id));
    }
  }, [selectedEventRows.length, apiRef]);

  return dataView === "list" ? (
    <DataGrid
      autoHeight
      checkboxSelection
      disableColumnResize
      disableRowSelectionOnClick
      apiRef={apiRef}
      loading={isLoading}
      rows={events?.rows}
      columns={columns}
      sx={{ bgcolor: "#fff" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 50 } },
      }}
      pageSizeOptions={[10, 20, 50, 100, 150]}
      density="compact"
      onRowSelectionModelChange={handleRowSelectionModelChange}

      // slotProps={{
      //   filterPanel: {
      //     filterFormProps: {
      //       logicOperatorInputProps: {
      //         variant: 'outlined',
      //         size: 'small',
      //       },
      //       columnInputProps: {
      //         variant: 'outlined',
      //         size: 'small',
      //         sx: { mt: 'auto' },
      //       },
      //       operatorInputProps: {
      //         variant: 'outlined',
      //         size: 'small',
      //         sx: { mt: 'auto' },
      //       },
      //       valueInputProps: {
      //         InputComponentProps: {
      //           variant: 'outlined',
      //           size: 'small',
      //         },
      //       },
      //     },
      //   },
      // }}
    />
  ) : (
    <>
      {isLoading ? (
        <Spinner />
      ) : events?.rows?.length ? (
        <Grid container spacing={2}>
          {events?.rows.map((event) => (
            <Grid key={event._id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body2" component="p" align="center" my={2}>
          No events
        </Typography>
      )}
    </>
  );
}

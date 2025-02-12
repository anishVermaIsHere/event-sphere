import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../dashboard/grid-data";
import { useQuery } from "@tanstack/react-query";
import eventAPI from "../../shared/services/api/event";
import dayjs from "dayjs";
import Spinner from "../common/spinner";
import { getAuth } from "../../shared/utils";
import AlertCard from "../common/alert-card";
import { Box, Grid2 as Grid } from "@mui/material";
import EventCard from "./event-card";
import useAppStore from "../../store/app.store";

const fetchEvents = async () => {
  const res = await eventAPI.find();
  const auth = getAuth();
  return {
    rows: res.data.map((e) => ({
      ...e,
      id: e._id,
      location: e.location.venueName,
      createdBy:
        e.createdBy._id === auth.user.id ? "You" : e.createdBy.fullName,
      startTime: dayjs(e.startTime).format("DD/MM/YYYY HH:mm"),
      endTime: dayjs(e.endTime).format("DD/MM/YYYY HH:mm"),
      createdAt: dayjs(e.createdAt).format("DD/MM/YYYY HH:mm"),
    })),
    columns: [],
  };
};

export default function CustomizedEventsData({ type }) {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
  const { dataView } = useAppStore((state) => state);
  const events = data;

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <AlertCard message="Error data fetching" color="error" />;
  }

  return (
    <>
      {dataView === "list" ? (
        <DataGrid
          autoHeight
          checkboxSelection
          rows={events?.rows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          density="compact"
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {events?.rows?.map((event) => (
              <Grid key={event._id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                <EventCard {...event} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

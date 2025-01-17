import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./grid-data";
import { Grid2 as Grid } from "@mui/material";
import useAppStore from "../../store/app.store";
import EventCard from "../events/event-card";


export default function CustomizedDataGrid({ events }) {
  const { dataView } = useAppStore((state) => state);

  return dataView === "list" ? (
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
    <Grid container spacing={2}>
      {events?.rows?.map((event) => (
        <Grid key={event._id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
          <EventCard {...event} />
        </Grid>
      ))}
    </Grid>
  );
}

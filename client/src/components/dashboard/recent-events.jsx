import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { renderTags } from "./grid-data";


const columns = [
  { field: "name", headerName: "Event Name", flex: 1.5, minWidth: 200 },
  {
    field: "startTime",
    headerName: "Start Time",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "endTime",
    headerName: "End Time",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "category",
    headerName: "Category",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "guests",
    headerName: "Guests",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 250,
    renderCell: (params) => renderTags(params),
  },
  {
    field: "speakers",
    headerName: "Speakers",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 250,
    renderCell: (params) => renderTags(params),
  },
  {
    field: "location",
    headerName: "Location",
    flex: 0.5,
    minWidth: 180,
  }
];


export default function RecentEvents({ events, isLoading, isError }) {
  return events?.length ? (
    <DataGrid
      autoHeight
      checkboxSelection={false}
      disableColumnResize
      disableRowSelectionOnClick
      loading={isLoading}
      rows={events}
      columns={columns}
      sx={{ bgcolor: "#fff" }}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
      }}
      // pageSizeOptions={[20, 50, 100, 150]}
      density="compact"
    />
  ) : (
    <>
      <Typography variant="body2" component="p" align="center" my={2}>
        No events
      </Typography>
    </>
  );
}

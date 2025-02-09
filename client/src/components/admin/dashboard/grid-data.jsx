import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Tooltip } from "@mui/material";
import eventAPI from "../../../shared/services/api/event";
import { queryClient } from "../../../providers/query-provider";
import useFormStore from "../../../store/form.store";

// function renderSparklineCell(params) {
//   const data = getDaysInMonth(4, 2024);
//   const { value, colDef } = params;

//   if (!value || value.length === 0) {
//     return null;
//   }

//   return (
//     <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
//       <SparkLineChart
//         data={value}
//         width={colDef.computedWidth || 100}
//         height={32}
//         plotType="bar"
//         showHighlight
//         showTooltip
//         colors={["hsl(210, 98%, 42%)"]}
//         xAxis={{
//           scaleType: "band",
//           data,
//         }}
//       />
//     </div>
//   );
// }

export function renderTags(slug) {
  if (Array.isArray(slug.value)) {
    return slug.value.map((v) => (
      <Chip
        key={v._id}
        sx={{ mr: 1 }}
        label={v.firstName + " " + v.lastName}
        size="small"
        variant="outlined"
      />
    ));
  }
  return (
    <Chip sx={{ mr: 1 }} label={slug.value} color="primary" size="small" />
  );
}

export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns = [
  { field: "name", headerName: "Event Name", flex: 1.5, minWidth: 200 },
  {
    field: "startDateTime",
    headerName: "Start Time",
    headerAlign: "right",
    align: "right",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "endDateTime",
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
  },
  {
    field: "createdAt",
    headerName: "Added At",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
  },
  {
    // field: '',
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params) => {
      const { event: { setEventId, setIsEditOpen } } = useFormStore(state=>state);

      const toggleEdit = (eventId) => {
        setEventId(eventId);
        setIsEditOpen(true);
      };

      return <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "inherit",
        }}
      >
        <Tooltip title="Edit">
          <IconButton size="small" color="default">
            <EditIcon onClick={()=>toggleEdit(params.id)}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            color="default"
            onClick={async () => {
              const res = await eventAPI.delete(params.id);
              if (res.status === 200) {
                queryClient.invalidateQueries("events");
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    },
  },
];

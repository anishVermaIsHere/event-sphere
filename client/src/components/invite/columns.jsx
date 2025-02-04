import { Chip } from "@mui/material";
import MenuOption from "../common/menu-option";
import { queryClient } from "../../providers/query-provider";
import inviteeAPI from "../../shared/services/api/invitee";



const actionOptions = [
  {
    id:2,
    label: "Change as Guest",
    value: "guest",
    onClick: ()=>{}
  },
  {
    id:3,
    label: "Change as Speaker",
    value: "speaker",
    onClick: ()=>{}
  },
  {
    id:4,
    label: "Delete",
    value: "",
    onClick: async (id)=> {
      await inviteeAPI.delete(id);
      queryClient.invalidateQueries("invitees");
    }
  },

];

function renderCell(slug) {
  const label = slug?.value?.toUpperCase();
    if(slug.value === "pending"){
        return <Chip sx={{ mr: 1 }} variant="outlined" label={label} color={"warning"} size="small" />
    } 
    if (slug.value === "accepted"){
        return <Chip sx={{ mr: 1 }} variant="outlined" label={label} color={"success"} size="small" />
    } 
    if (slug.value === "declined"){
        return <Chip sx={{ mr: 1 }} variant="outlined" label={label} color={"error"} size="small" />
    } 
    return <Chip sx={{ mr: 1 }} variant="outlined" label={label} color={"default"} size="small" />
};

export const columns = [
  { 
    field: "recipientEmail", 
    headerName: "Email", 
    flex: 1.5, 
    minWidth: 80 
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 50,
    renderCell: (params) => renderCell(params),
  },
  {
    field: "createdAt",
    headerName: "Sent At",
    flex: 0.5,
    minWidth: 200,
  },
  {
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 10,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params)=><MenuOption id={params.row.id} value={"User"} options={actionOptions}/>
  }

]
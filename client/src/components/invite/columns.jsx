import { Chip } from "@mui/material";
import MenuOption from "../common/menu-option";
import { queryClient } from "../../providers/query-provider";
import inviteeAPI from "../../shared/services/api/invitee";
import { getAuth } from "../../shared/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';



const auth = getAuth();

const actionOptions = [
  {
    id:1,
    label: "Delete",
    value: "",
    onClick: async (id)=> {
      await inviteeAPI.delete(id);
      queryClient.invalidateQueries("invitees");
    }
  },

];

function renderCell(slug){
  const { user } = auth;
  const { firstName, lastName, _id } = slug.value;
  const fullName = firstName+" "+lastName;

  if(user.id === _id){
    return <Chip sx={{ mr: 1 }} variant="contained" label={"You"} color={"success"} size="small" />
  }
  return <Chip sx={{ mr: 1 }} variant="contained" label={fullName} color={"default"} size="small" />
}


function renderStatus(slug) {
  const label = slug?.value?.toUpperCase();
    if(slug.value === "pending"){
        return <Chip sx={{ mr: 1, color: "#fff" }} icon={<PendingIcon color="white" />} variant="contained" label={label} color={"warning"} size="small" />
    } 
    if (slug.value === "accepted"){
        return <Chip sx={{ mr: 1, color: "#fff" }} icon={<CheckCircleIcon color="white" />} variant="contained" label={label} color={"success"} size="small" />
    } 
    if (slug.value === "declined"){
        return <Chip sx={{ mr: 1, color: "#fff" }} icon={<CancelIcon color="white" />} variant="contained" label={label} color={"error"} size="small" />
    } 
    return <Chip sx={{ mr: 1, color: "#fff" }} variant="contained" label={label} color={"default"} size="small" />
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
    renderCell: (params) => renderStatus(params),
  },
  {
    field: "sender",
    headerName: "Invited By",
    flex: 0.5,
    minWidth: 100,
    renderCell: (params) => renderCell(params),
  },
  {
    field: "createdAt",
    headerName: "Sent At",
    flex: 0.5,
    minWidth: 200,
  },
  {
    field: "expires",
    headerName: "Expires",
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => <Chip sx={{ mr: 1, color: "#fff" }} variant="contained" label={params.value} color={"error"} size="small" />
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
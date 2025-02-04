import { Chip } from "@mui/material";
import MenuOption from "../common/menu-option";



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

];

function renderCell(slug) {
  return (
    <Chip sx={{ mr: 1 }} variant="outlined" label={slug.value} color={ slug.value === "guest".toUpperCase() ? "primary" : "secondary" } size="small" />
  );
};

export const columns = [
  { 
    field: "fullName", 
    headerName: "Name", 
    flex: 1.5, 
    minWidth: 100 
  },
  {
    field: "username",
    headerName: "Username",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 120
  },
  {
    field: "role",
    headerName: "Role",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 120,
    renderCell: (params) => renderCell(params),
  },
  {
    field: "gender",
    headerName: "Gender",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "dob",
    headerName: "DOB",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 80,
  },
  {
    field: "email",
    headerName: "Email",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 250,
  },
  {
    field: "createdAt",
    headerName: "Joined At",
    flex: 0.5,
    minWidth: 100,
  },
  {
    headerName: "Actions",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 10,
    disableColumnMenu: true,
    sortable: false,
    renderCell: (params)=><MenuOption id={params.row.id} value={params.row.role} options={actionOptions}/>
  }

]
import { Chip } from "@mui/material";
import { renderTags } from "../dashboard/grid-data";
import MenuOption from "../common/menu-option";



const actionOptions = [
  {
    label: "Invite as Guest",
    onClick: ()=>{}
  },
  {
    label: "",
    onClick: ""
  }
];

function renderCell(slug) {
  return (
    <Chip sx={{ mr: 1 }} label={slug.value} color={ slug.value === "admin" ? "primary" : "default" } size="small" />
  );
};

export const columns = [
  { field: "firstName", headerName: "First Name", flex: 1.5, minWidth: 100 },
  {
    field: "lastName",
    headerName: "Last Name",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "username",
    headerName: "Username",
    headerAlign: "left",
    align: "left",
    flex: 1,
    minWidth: 120,
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
    minWidth: 120,
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
    renderCell: (params) => renderTags(params),
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
    renderCell: (params)=><MenuOption />
  }

]
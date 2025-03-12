import { Grid2 as Grid } from "@mui/material";
import UserDataGrid from "./user-data-grid";
import InviteeDataGrid from "../../invite/invitee-grid";



export function UserList({ users, isError, isLoading }) {
    return (
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          <UserDataGrid users={users} isError={isError} isLoading={isLoading} />
        </Grid>
      </Grid>
    );
};


export function NewUserList({ users, isError, isLoading }) {
    return (
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          <InviteeDataGrid users={users} isError={isError} isLoading={isLoading} />
        </Grid>
      </Grid>
    );
};


export function InviteeList({ users, isError, isLoading }) {
    return (
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12 }}>
          <InviteeDataGrid users={users} isError={isError} isLoading={isLoading} />
        </Grid>
      </Grid>
    );
};



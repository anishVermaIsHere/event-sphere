import { DataGrid } from "@mui/x-data-grid"
import { columns } from "./columns"
import AlertCard from "../../common/alert-card";

const UserDataGrid = ({ isLoading, isError, users }) => {
    if (isError) {
        return <AlertCard message="Error data fetching" color="error" />;
    }
    return (
        <DataGrid
            autoHeight
            checkboxSelection
            disableColumnResize
            disableRowSelectionOnClick
            loading={isLoading}
            rows={users}
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
        />
    )
}

export default UserDataGrid
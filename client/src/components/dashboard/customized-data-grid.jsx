import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './grid-data'
import { useQuery } from '@tanstack/react-query';
import eventAPI from '../../shared/services/api/event';
import dayjs from 'dayjs';
import Spinner from '../common/spinner';
import { getAuth } from '../../shared/utils';



const fetchEvents = async()=>{
  const res = await eventAPI.find();
  const auth = getAuth();
  return {
    rows: res.data.map((e)=>({
      ...e,
      id: e._id,
      location: e.location.venueName,
      createdBy: e.createdBy._id === auth.user.id ? "You" : e.createdBy.fullName,
      startTime: dayjs(e.startTime).format('DD/MM/YYYY HH:mm'),
      endTime: dayjs(e.endTime).format('DD/MM/YYYY HH:mm')
    })),
    columns: []
    }
};

export default function CustomizedDataGrid({ type }) {
  const { isPending, isLoading, isError, error, data } = useQuery({ queryKey: ["events"], queryFn: fetchEvents });
  const events = data;


  if(isLoading){
    return <Spinner />
  }

  return (
    <DataGrid
      autoHeight
      checkboxSelection
      rows={events?.rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
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
  );
}

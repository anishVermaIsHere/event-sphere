import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function CustomDatePicker({ label,name, setValue }) {
  const [date, setDate] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleDateChange = (newValue) => {
    setValue("dob", dayjs(newValue).toDate());
    setDate(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name={name}
        value={date}
        label={label}
        onChange={handleDateChange}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        // views={['day', 'month', 'year']}
      />
    </LocalizationProvider>
  );
}

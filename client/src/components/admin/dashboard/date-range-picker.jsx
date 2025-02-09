import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import useAppStore from "../../store/app.store";



export default function StartEndDatePicker() {
  const { dates, setDates } = useAppStore(state=>state);
  const handleChange = (value) => {
    setDates({ from: value[0], to: value[1] });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]} sx={{ pt: 0 }}>
        <DateRangePicker
          slots={{ field: SingleInputDateRangeField }}
          sx={{ p: 0 }}
          value={[ dates.from, dates.to ]}
          onChange={handleChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

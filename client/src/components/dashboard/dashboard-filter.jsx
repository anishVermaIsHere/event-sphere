import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectMenuProps } from "../events/styles";
import { getDaysInMonth, getStartEndDates } from "../../shared/utils";
import dayjs from "dayjs";
import useMainStore from "../../store/main.store";


const DashboardFilter = ({ filterList, selectedFilter, setSelectedFilter }) => {
  const { setDates, daysInMonth, setDaysInMonth } = useMainStore(state=>state);

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
    setDaysInMonth(getDaysInMonth(dayjs().year(), event.target.value));
    const dates =  getStartEndDates(daysInMonth.length);
    setDates({ from: dates.startDate, to: dates.endDate });
  };

  return (
    <Box sx={{ minWidth: 100, display: "flex", alignItems: "center", gap: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          MenuProps={SelectMenuProps}
          value={selectedFilter}
          label="Filter"
          onChange={handleChange}
        >
          {filterList?.map((f) => (
            <MenuItem key={f.id} value={f?.value}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DashboardFilter;

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SelectMenuProps } from "../events/styles";


const DashboardFilter = ({ filterList, selectedFilter, setSelectedFilter }) => {

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
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
            <MenuItem key={f} value={f?.value}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DashboardFilter;

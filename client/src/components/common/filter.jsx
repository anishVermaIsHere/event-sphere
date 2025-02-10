import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectMenuProps } from "../admin/events/styles";



export default function FilterElement({ filterList }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get('category'));


  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  useEffect(() => {
    if(selectedFilter || searchParams.get("category")){
      searchParams.set("category", selectedFilter);
      setSearchParams(searchParams);
    }

    return () => {};
  }, [selectedFilter]);

  return (
    <Box sx={{ minWidth: 120, display: "flex", alignItems: "center", gap: 1 }}>
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
          <MenuItem value={"All"}>All</MenuItem>
          {filterList?.map((f) => (
            <MenuItem key={f} value={f?.name}>
              {f.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

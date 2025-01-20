import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { SelectMenuProps } from "../events/styles";



export default function SortElement({ sortList }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSeletedSort] = useState(searchParams.get('sortBy'));
  const [sortOrder, setSortOrder] = useState("asc");


  const handleChange = (event) => {
    setSeletedSort(event.target.value);
  };

  useEffect(() => {
    if(selectedSort || searchParams.get("sortBy")){
      searchParams.set("sortBy", selectedSort);
      setSearchParams(searchParams);
    }

    return () => {};
  }, [selectedSort]);

  return (
    <Box sx={{ minWidth: 120, display: "flex", alignItems: "center", gap: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          MenuProps={SelectMenuProps}
          value={selectedSort}
          label="Sort"
          onChange={handleChange}
          renderValue={(selected) => selected}
        >
          <MenuItem value={"None"}>None</MenuItem>
          {sortList.map((s) => (
            <MenuItem key={s.value} value={s.label}>
               <ListItemText primary={s.label} />
               <Checkbox checked={selectedSort === s.value } />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

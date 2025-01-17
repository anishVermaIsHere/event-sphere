import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLocation, useNavigate }  from "react-router-dom";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default function Filter({ filterList }) {
  const [selectedFilter, setSeletedFilter] = useState('All');
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const handleChange = (event) => {
    setSeletedFilter(event.target.value);
  };


  useEffect(()=>{
    queryParams.set("category", selectedFilter);
    navigate({ search: queryParams.toString()})
  }, [selectedFilter]);


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          MenuProps={MenuProps}
          value={selectedFilter}
          label="Filter"
          onChange={handleChange}
        >
            <MenuItem value={"All"}>All</MenuItem>
          {filterList?.map((f)=>(<MenuItem key={f} value={f?.name}>{f.name}</MenuItem>))}
        </Select>
      </FormControl>
    </Box>
  );
}

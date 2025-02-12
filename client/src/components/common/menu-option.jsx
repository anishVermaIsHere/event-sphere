import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon, ListItemText } from '@mui/material';


const ITEM_HEIGHT = 28;

export default function MenuOption({ options, value, id }) {
  const rowId = id;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size='small'
      >
        <MoreVertIcon fontSize="small"/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              // width: '20ch',
            },
          }
        }}
      >
        {options.filter((opt)=>opt.value !== value?.toLowerCase()).map((option) => (
          <MenuItem 
            key={option} 
            onClick={()=>{
              option.onClick(rowId);
              handleClose();
            }}>
              <ListItemIcon>
                {<option.icon/>}
              </ListItemIcon>
              <ListItemText sx={{ fontSize:"inherit" }}>{option.label}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

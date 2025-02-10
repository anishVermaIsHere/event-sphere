import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const GuestLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
        Guest-Layout page


        <Outlet />
    </Box>
  )
}

export default GuestLayout
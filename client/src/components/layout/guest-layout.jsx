import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from '../common/footer'

const GuestLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
        Guest-Layout page


        <Outlet />
        <Footer />
    </Box>
  )
}

export default GuestLayout
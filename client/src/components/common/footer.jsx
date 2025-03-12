import { Box } from '@mui/material'
import Copyright from './copyright'

const Footer = () => {
  return (
    <Box component={"footer"} sx={{ width: "100%" }}>
    <Copyright sx={{ my: 1 }} />
    </Box>
  )
}

export default Footer
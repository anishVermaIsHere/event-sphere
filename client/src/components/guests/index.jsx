import { Box, Typography, Grid2 as Grid } from '@mui/material'


const Guests = () => {
  return (
    <Box sx={{ position: "relative", width:"100%" }}>
      <Typography variant="h5" component="h5" sx={{ fontWeight: 600, mb: 2 }}>Guests</Typography>
      <Grid container spacing={2} columns={12}>
      <Grid size={{ xs: 12 }}>
        {/* <CustomizedDataGrid type={type}/> */}
      </Grid>
    </Grid>
    </Box>
  )
}

export default Guests
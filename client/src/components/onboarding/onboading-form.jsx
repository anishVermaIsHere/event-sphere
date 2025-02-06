import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/route-links';
import authAPI from '../../shared/services/api/auth';
import { onboardSchema } from '../../shared/validation/schema';
import useAppStore from '../../store/app.store';
import AppConfig from '../../config/app.config';
import { Grid2 as Grid } from '@mui/material';
import CustomDatePicker from '../dashboard/custom-date-picker';


export default function OnboardingForm() {
  const {register,handleSubmit,reset,control,formState:{errors}}=useForm({resolver: joiResolver(onboardSchema)});
  const { setSnackbar } = useAppStore(state=>state);
  
  const onSubmit = async(data) => {
    try {
      const res= await authAPI.register(data);
      if(res.status===201){
        setSnackbar("Onboarding completed", "success");
      }
      else {
        setSnackbar("Error", "warning");
      } 
    } catch (error) {
      setSnackbar(error.message, "error");
    }
    reset();
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, width: "100px", height: "100px" }} src={AppConfig.logoUrl} alt={AppConfig.appName}/>
          <Typography component="h1" variant="h5">
            Onboarding
          </Typography>
          <Box component="form" sx={{mt:3}} noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  size='small'
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName && Boolean(errors.firstName?.message)}
                  helperText={errors.firstName && errors.firstName?.message} 
                  autoFocus
                />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register('lastName')}
                  name="lastName"
                  autoComplete="family-name"
                  error={errors.lastName && Boolean(errors.lastName?.message)}
                  helperText={errors.lastName && errors.lastName?.message} 
                />
              </Grid>
              <Grid item size={12}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="gender"
                  render={({ field }) => (
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    {...field}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  )} />
              </Grid>
              <Grid item size={{ xs: 12, sm: 6 }}>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="gender"
                  render={({ field }) => (
                  <CustomDatePicker />
                  )} />
              </Grid>
              
              <Grid item size={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  {...register('email')}
                  name="email"
                  autoComplete="email"
                  error={errors.email && Boolean(errors.email?.message)}
                  helperText={errors.email && errors.email?.message} 
                />
              </Grid>
              <Grid item size={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="Password"
                  {...register('password')}
                  type="password"
                  id="password"
                  autoComplete="off"
                  error={errors.password && Boolean(errors.password?.message)}
                  helperText={errors.password && errors.password?.message} 
                />
              </Grid>
              <Grid item size={12}>
                <TextField
                  size='small'
                  required
                  fullWidth
                  label="Repeat Password"
                  {...register('repeatPassword')}
                  type="password"
                  id="repeatPassword"
                  autoComplete="off"
                  error={errors.repeatPassword && Boolean(errors.repeatPassword?.message)}
                  helperText={errors.repeatPassword && errors.repeatPassword?.message} 
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, p:1}}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
  );
}
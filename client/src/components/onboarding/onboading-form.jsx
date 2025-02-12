import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { onboardSchema } from "../../shared/validation/schema";
import useAppStore from "../../store/app.store";
import AppConfig from "../../config/app.config";
import {
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomDatePicker from "../admin/dashboard/custom-date-picker";
import userAPI from "../../shared/services/api/user";
import useAuthStore from "../../store/auth.store";



export default function OnboardingForm({ recipientEmail }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({ resolver: joiResolver(onboardSchema) });
  const { setSnackbar } = useAppStore((state) => state);
  const { setUser, setAccessToken, setRefreshToken } = useAuthStore((state) => state);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      delete data.repeatPassword;
      const res = await userAPI.register(data);
      if (res.status === 201) {
        const { data } = res;
        const role = data?.user?.role;
        setSnackbar("Onboarding completed", "success");
        setUser(data?.user);
        setAccessToken(data?.accessToken);
        setRefreshToken(data?.refreshToken);
        navigate(`/${role}/events`);
      } else {
        setSnackbar("Error", "warning");
      }
      setLoading(false);
    } catch (error) {
      setSnackbar(error.message, "error");
      setLoading(false);
    }
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, width: "100px", height: "100px" }}
          src={AppConfig.logoUrl}
          alt={AppConfig.appName}
        />
        <Typography component="h1" variant="h5">
          Onboarding
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3 }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                size="small"
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...register("firstName")}
                error={errors.firstName && Boolean(errors.firstName?.message)}
                helperText={errors.firstName && errors.firstName?.message}
                autoFocus
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                size="small"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                {...register("lastName")}
                name="lastName"
                autoComplete="family-name"
                error={errors.lastName && Boolean(errors.lastName?.message)}
                helperText={errors.lastName && errors.lastName?.message}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                size="small"
                required
                fullWidth
                id="userName"
                label="Username"
                {...register("userName")}
                error={errors.userName && Boolean(errors.userName?.message)}
                helperText={errors.userName && errors.userName?.message}
                autoFocus
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
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                )}
              />
            </Grid>
            <Grid item size={{ xs: 6 }}>
              <CustomDatePicker label="Date of Birth" name="dob" setValue={setValue}/>
              <FormHelperText className="Mui-error">
                {errors.dob && errors.dob?.message}
              </FormHelperText>
            </Grid>
            <Grid item size={{ xs: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  // MenuProps={SelectMenuProps}
                  // value={selectedFilter}
                  label="Role"
                  // onChange={handleChange}
                  {...register("role")}
                >
                  <MenuItem value={"guest"}>Guest</MenuItem>
                  <MenuItem value={"speaker"}>Speaker</MenuItem>
                </Select>
                <FormHelperText className="Mui-error">
                  {errors.role && errors.role?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item size={12}>
              <TextField
                size="small"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={recipientEmail}
                {...register("email")}
                autoComplete="email"
                disabled
                error={errors.email && Boolean(errors.email?.message)}
                helperText={errors.email && errors.email?.message}
              />
            </Grid>
            <Grid item size={12}>
            <FormControl sx={{ position: "relative" }} fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                {...register("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText className="Mui-error">
                  {errors.password && errors.password?.message}
                </FormHelperText>
            </FormControl>
            </Grid>
            <Grid item size={12}>
              <TextField
                size="small"
                required
                fullWidth
                label="Repeat Password"
                {...register("repeatPassword")}
                type="password"
                id="repeatPassword"
                autoComplete="off"
                error={
                  errors.repeatPassword &&
                  Boolean(errors.repeatPassword?.message)
                }
                helperText={
                  errors.repeatPassword && errors.repeatPassword?.message
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1 }}
            disabled={loading}
          >
            { loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

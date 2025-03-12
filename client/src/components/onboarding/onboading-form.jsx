import { useEffect, useState } from "react";
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
  Typography,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomDatePicker from "../admin/dashboard/custom-date-picker";
import userAPI from "../../shared/services/api/user";
import useAuthStore from "../../store/auth.store";
import { getCountries } from "../../shared/utils";
import SearchLocationField from "../location/search-country-field";

export default function OnboardingForm({ recipientEmail }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: joiResolver(onboardSchema) });
  const { setSnackbar } = useAppStore((state) => state);
  const { setUser, setAccessToken, setRefreshToken } = useAuthStore(
    (state) => state
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState({
    cities: [],
    states: [],
    countries: [],
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const searchCountries = () => {
    const countries = getCountries();
    if (Array.isArray(countries)) {
      setLocation({ countries });
      return;
    }
    setLocation({ countries: [countries] });
  };

  useEffect(() => {
    searchCountries(watch("country"));
  }, [watch("country")]);

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
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{ mt: 3 }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12 }}>
              <Typography component="p" variant="p" color="primary" px={1}>
                1. Personal Info
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Grid>

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
                error={errors.lastName && Boolean(errors.lastName?.message)}
                helperText={errors.lastName && errors.lastName?.message}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
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
            <Grid item size={{ xs: 12, sm: 6 }}>
              <CustomDatePicker
                label="Date of Birth"
                name="dob"
                setValue={setValue}
              />
              <FormHelperText className="Mui-error">
                {errors.dob && errors.dob?.message}
              </FormHelperText>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  size="small"
                  label="Gender"
                  {...register("gender")}
                >
                  <MenuItem defaultValue={"male"} value={"male"}>
                    Male
                  </MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
                <FormHelperText className="Mui-error">
                  {errors.gender && errors.gender?.message}
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  size="small"
                  label="Role"
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
            <Grid item size={{ xs: 12 }}>
              <Typography component="p" variant="p" color="primary" px={1}>
                2. Address
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                size="small"
                fullWidth
                id="street"
                label="Street"
                {...register("street")}
                error={errors.street && Boolean(errors.street?.message)}
                helperText={errors.street && errors.street?.message}
                autoFocus
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                size="small"
                required
                fullWidth
                id="city"
                label="City"
                {...register("city")}
                error={errors.city && Boolean(errors.city?.message)}
                helperText={errors.city && errors.city?.message}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                size="small"
                required
                fullWidth
                id="state"
                label="State"
                {...register("state")}
                error={errors.state && Boolean(errors.state?.message)}
                helperText={errors.state && errors.state?.message}
                autoFocus
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <SearchLocationField
                label="Country"
                locations={location.countries}
                error={errors}
                control={control}
              />
            </Grid>

            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                size="small"
                fullWidth
                id="postalCode"
                label="Postal Code"
                {...register("postalCode")}
                error={errors.country && Boolean(errors.country?.message)}
                helperText={errors.country && errors.country?.message}
                autoFocus
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
              <Typography component="p" variant="p" color="primary" px={1}>
                3. Email & Password{" "}
              </Typography>
              <Divider sx={{ mt: 1 }} />
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

            <Grid item size={{ xs: 12, sm: 6 }}>
              <FormControl
                sx={{ position: "relative" }}
                fullWidth
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
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
            <Grid item size={{ xs: 12, sm: 6 }}>
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
          <Grid item size={12} sx={{ display: "flex", }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mx: "auto",
                mt: 3,
                mb: 2,
                p: 1,
                width: { xs: "100%", md: "50%" },
              }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
              <ArrowForwardIcon sx={{ ml: 1 }} />
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

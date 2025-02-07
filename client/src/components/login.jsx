import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid2 as Grid,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ROUTES } from "../routes/route-links";
import { loginSchema } from "../shared/validation/schema";
import authAPI from "../shared/services/api/auth";
import Spinner from "../components/common/spinner";
import AppConfig from "../config/app.config";
import useAuthStore from "../store/auth.store";
import useAppStore from "../store/app.store";




export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: AppConfig.default.email,
      password: AppConfig.default.password,
    },
    resolver: joiResolver(loginSchema),
  });

  const { setUser, setAccessToken, setRefreshToken } = useAuthStore((state) => state);
  const { setSnackbar } = useAppStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      const res = await authAPI.login(data);
      if (res.status === 200) {
        const data = res.data;
        setUser(data.user);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        navigate(`/${ROUTES.ADMIN.DASHBOARD}`);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setSnackbar("Login error", "error");
      setLoading(false);
    }
    reset();
  };

  return loading ? (
    <Spinner />
  ) : (
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12 }}>
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                id="email"
                {...register("email")}
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={errors.email && Boolean(errors.email?.message)}
                helperText={errors.email && errors.email?.message}
              />
            </Grid>

            <Grid item size={{ xs: 12 }}>
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
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href={ROUTES.RECOVER_ACC} variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

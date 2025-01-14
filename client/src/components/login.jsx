import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ROUTES } from "../routes/route-links";
import { loginSchema } from "../shared/validation/schema";
import authAPI from "../shared/services/api/auth";
import Spinner from "../components/common/spinner";
import AppConfig from "../config/app.config";
import useAuthStore from "../store/auth.store";


export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ 
    defaultValues: {
      email: AppConfig.default.email,
      password: AppConfig.default.password
    },
    resolver: joiResolver(loginSchema) });

    const { setUser, setAccessToken, setRefreshToken } = useAuthStore(state=>state);

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();


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
      setTimeout(()=>{
        setLoading(false);
      }, 2000);
    } catch (error) {
      alert("Login error");
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
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

          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={ showPwd ? "text" : "password"}
            id="password"
            {...register("password")}
            error={errors.password && Boolean(errors.password?.message)}
            helperText={errors.password && errors.password?.message}
          />

          <FormControlLabel
            control={<Checkbox value="showPwd" onChange={()=>setShowPwd(!showPwd)} color="primary" />}
            label="Show password"
          />
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
            <Grid item>
              <Link component={NavLink} to={ROUTES.REGISTER} variant="body2">
                {"Not a member? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

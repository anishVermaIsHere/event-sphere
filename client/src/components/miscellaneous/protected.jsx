import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";
import ROUTES from "../../routes/route-links";
import useAuthStore from "../../store/auth.store";

const Protected = () => {
  const { RECOVER_ACC, RESET_PWD, REGISTER } = ROUTES;
  const location = useLocation();
  const { accessToken } = useAuthStore((state) => state);
  const publicRoutes = ["/", REGISTER, RECOVER_ACC, RESET_PWD];
  const protectedRoutes = ["/user/:path*"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    matchPath(route, location.pathname)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  if ((accessToken && isProtectedRoute) || (!accessToken && isPublicRoute)) {
    return <Outlet />;
  }
  if (!accessToken && isProtectedRoute) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (accessToken && isPublicRoute) {
    return (
      <Navigate
        to={`/${ROUTES.FEEDS}`}
        state={{ from: location }}
        replace
      />
    );
  }
};

export default Protected;

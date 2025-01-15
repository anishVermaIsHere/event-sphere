import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import AppConfig from "../../config/app.config";
import { getAuth } from "../utils";



const axiosInstance = axios.create({
  baseURL: AppConfig.baseUrl,
});

let isRefreshAttempted = false;

const AxiosInterceptor = ({ children }) => {
  const location = useLocation();
  const { setAccessToken, clearUser, clearTokens } = useAuthStore((state) => state);


  const handleLogout = () => {
    clearUser();
    clearTokens();
  };

  useEffect(() => {
    
    async function refreshAccessToken() {
      const auth = getAuth();
      if (auth.refreshToken) {
        const resp = await axios.post(
          `${AppConfig.baseUrl}/api/v1/auth/refresh`,
          {},
          {
            headers: {
              User_Agent: window.navigator.userAgent,
              Authorization: `Bearer ${auth.refreshToken}`,
            },
          }
        );
        setAccessToken(resp.data.accessToken);
        return resp.data.accessToken;
      } else {
        throw new Error("Logout");
      }
    }

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (request) => {
        request.headers["User-Agent"] = window.navigator.userAgent;
        const auth = getAuth();
        if (auth?.accessToken) {
          request.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          document.cookie = `accessToken=${auth?.accessToken};`;
        }
        return request;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        try {
          if (err?.response?.status === 401 && !isRefreshAttempted) {
            isRefreshAttempted = true;
            const newAccessToken = await refreshAccessToken();
            err.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosInstance(err.config);
          }
        } catch (error) {
          console.log(error);
          isRefreshAttempted = false;
          handleLogout();
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [location]);
  return children;
};

export { AxiosInterceptor };
export default axiosInstance;

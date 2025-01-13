import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/auth.store";
import AppConfig from "../../config/app.config";


const axiosInstance=axios.create({
    baseURL: AppConfig.baseUrl,
});

let isRefreshAttempted=false;

const AxiosInterceptor = ({ children }) => {
    const location=useLocation();
    const { setAccessToken, clearUser } = useAuthStore(state=>state);

    const handleLogout = () => {
      clearUser();
    };

    useEffect(()=>{
        const getAuth=()=>{
            const auth=localStorage.getItem("persist:auth") || '{}';
            return auth;
            // const parsedData=parsePersistedData(JSON.parse(auth));
            // return parsedData;
        }
        async function refreshAccessToken() {
            const userInfo = getAuth();
            // try {
              if (userInfo.refreshToken) {
                const resp = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/v1/auth/refresh`,
                  {},
                  {
                    headers: {
                      User_Agent: window.navigator.userAgent,
                      Authorization: `Bearer ${userInfo.refreshToken}`
                    }
                  }
                );
                setAccessToken(resp.data.accessToken);
                return resp.data.accessToken;
              } else {
                throw new Error("Logout");
              }
            // } catch (err) {
            //   throw err;
            // }
          }
    
       const requestInterceptor=axiosInstance.interceptors.request.use(
            (request) => {
                request.headers["User-Agent"] = window.navigator.userAgent;
                const auth=getAuth();
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
        const responseInterceptor=axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async(err) => {
                try {
                    if(err?.response?.status === 401 && !isRefreshAttempted){
                        isRefreshAttempted=true;
                        const newAccessToken=await refreshAccessToken();
                        err.config.headers["Authorization"] = `Bearer ${newAccessToken}`; 
                        return axiosInstance(err.config);
                    }
                } catch (error) {
                    console.log('Error', error);
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
    
    },[location]);
  return children;
}

export { AxiosInterceptor };
export default axiosInstance;
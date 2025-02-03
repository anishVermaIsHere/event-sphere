
import axiosInstance from '../axios-interceptor';

const URL='/api/v1/auth'

const authAPI = {
    async login(formData) {
        return await axiosInstance.post(`${URL}/`, formData);        
    },
    async logout() {
        return await axiosInstance.post(`${URL}/logout`, {});        
    }
};

export default authAPI;

import axiosInstance from '../axios-interceptor';

const URL='/api/v1/auth'

const authAPI={
    async register(user){
        return await axiosInstance.post(`${URL}/new`, user);
    },
    async login(formData) {
        return await axiosInstance.post(`${URL}/`, formData);        
    }
};

export default authAPI;
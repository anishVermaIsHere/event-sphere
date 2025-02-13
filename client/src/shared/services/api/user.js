import axiosInstance from '../axios-interceptor';
import axios from 'axios';
import AppConfig from '../../../config/app.config';


const URL='/api/v1/users'

const userAPI={
    async register(formData){
        return await axios.post(`${AppConfig.baseUrl}${URL}`, formData);
    },
    async findByRole(role){
        const roleEndPoints = {
            guest: "guests",
            speaker: "speakers"
        }
        return await axiosInstance.get(`${URL}/${roleEndPoints[role]}`);
    },
    async find(){
        return await axiosInstance.get(`${URL}`);
    },
};

export default userAPI;
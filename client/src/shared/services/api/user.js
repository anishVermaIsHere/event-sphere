
// import axios from 'axios';
import axiosInstance from '../axios-interceptor';
// import AppConfig from '../../../config/app.config';


// axios.defaults.baseURL = AppConfig.baseUrl;

const URL='/api/v1/users'

const userAPI={
    async findGuests(){
        return await axiosInstance.get(`${URL}/guests`);
    },
    async login(formData) {
        return await axiosInstance.post(`${URL}/`, formData);        
    }
};

export default userAPI;
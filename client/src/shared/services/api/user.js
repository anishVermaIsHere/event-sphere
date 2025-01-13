
import axios from 'axios';
import AppConfig from '../../../config/app.config';


axios.defaults.baseURL = AppConfig.baseUrl;

const URL='/api/v1/users'

const userAPI={
    async findGuests(){
        return await axios.get(`${URL}/guests`);
    },
    async login(formData) {
        return await axios.post(`${URL}/`, formData);        
    }
};

export default userAPI;
import axios from 'axios';
import AppConfig from '../../../config/app.config';


const URL='/api/v1/users'

const onboardingUserAPI={
    async register(formData){
        return await axios.post(`${AppConfig.baseUrl}/${URL}`, formData);
    }
};

export default onboardingUserAPI;
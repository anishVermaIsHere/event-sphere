import axiosInstance from '../axios-interceptor';

const URL='/api/v1/locations'

const locationAPI = {
    async find() {
        return await axiosInstance.get(`${URL}/`);        
    },

};

export default locationAPI;
import axiosInstance from '../axios-interceptor';

const URL='/api/v1/categories'

const categoryAPI = {
    async find() {
        return await axiosInstance.get(`${URL}/`);        
    },

};

export default categoryAPI;
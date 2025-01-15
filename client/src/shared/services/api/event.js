import axiosInstance from '../axios-interceptor';

const URL='/api/v1/events'

const eventAPI = {
    async create(event){
        return await axiosInstance.post(`${URL}/`, event);
    },
    async find() {
        return await axiosInstance.get(`${URL}/`);        
    },
    async delete(eventId){
        return await axiosInstance.delete(`${URL}/${eventId}`);        
    }
};

export default eventAPI;
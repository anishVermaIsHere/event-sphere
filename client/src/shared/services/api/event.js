import axiosInstance from '../axios-interceptor';

const URL='/api/v1/events'

const eventAPI = {
    async create(event){
        return await axiosInstance.post(`${URL}/`, event);
    },
    async findByFilter(query) {
        return await axiosInstance.get(`${URL}/`, {
            params: query
        });        
    },
    async findById(eventId){
        return await axiosInstance.get(`${URL}/${eventId}`);
    },
    async delete(eventId){
        return await axiosInstance.delete(`${URL}/${eventId}`);        
    }
};

export default eventAPI;
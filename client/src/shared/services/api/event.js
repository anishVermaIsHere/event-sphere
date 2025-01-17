import axiosInstance from '../axios-interceptor';

const URL='/api/v1/events'

const eventAPI = {
    async create(event){
        return await axiosInstance.post(`${URL}/`, event);
    },
    async find(query="") {
        return await axiosInstance.get(`${URL}?category=${query}`);        
    },
    async findByTime(){

    },
    async delete(eventId){
        return await axiosInstance.delete(`${URL}/${eventId}`);        
    }
};

export default eventAPI;
import axiosInstance from '../axios-interceptor';

const URL='/api/v1/events'

const eventAPI = {
    async create(event){
        return await axiosInstance.post(`${URL}/`, event);
    },
    async findByFilter(query) {
        return await axiosInstance.get(`${URL}/`, { params: query });        
    },
    async findById(eventId){
        return await axiosInstance.get(`${URL}/${eventId}`);
    },
    async findBySlug(slug){
        return await axiosInstance.get(`${URL}/${slug}`);
    },
    async delete(eventId){
        return await axiosInstance.delete(`${URL}/${eventId}`);        
    },
    async deleteAll(eventIds){
        return await axiosInstance.delete(`${URL}`, { data: { ids: eventIds} });        
    },
    async update(eventId, data){
        return await axiosInstance.put(`${URL}/${eventId}`, data);   
    }
};

export default eventAPI;
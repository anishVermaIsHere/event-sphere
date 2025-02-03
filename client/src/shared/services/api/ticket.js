import axiosInstance from "../axios-interceptor";

const URL='/api/v1/tickets'

const ticketAPI = {
    async find(query){
        return await axiosInstance.get(`${URL}`, { params: query });
    },
    async findById(ticketId){
        return await axiosInstance.get(`${URL}/${ticketId}`);
    },
    async findByUser(userId){
        return await axiosInstance.get(`${URL}/users/${userId}`);
    }
};

export default ticketAPI;
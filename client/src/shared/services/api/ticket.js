import axiosInstance from "../axios-interceptor";

const URL='/api/v1/tickets'

const ticketAPI = {
    async find(){
        return await axiosInstance.get(`${URL}`);
    },
    async findById(ticketId){
        return await axiosInstance.get(`${URL}/${ticketId}`);
    },
    async findByUser(userId){
        return await axiosInstance.get(`${URL}/users/${userId}`);
    }
};

export default ticketAPI;
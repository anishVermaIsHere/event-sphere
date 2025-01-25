import axiosInstance from "../axios-interceptor";

const URL='/api/v1/tickets'

const ticketAPI = {
    async find(){
        return await axiosInstance.get(`${URL}`);
    },
};

export default ticketAPI;
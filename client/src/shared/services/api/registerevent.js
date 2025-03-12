import axiosInstance from "../axios-interceptor";


const URL='/api/v1/events/applied'

const registerEventAPI = {
    async events() {
        return await axiosInstance.get(`${URL}`);        
    },
    async acceptOrReject(eventId, value){
        return await axiosInstance.put(`${URL}/${eventId}`, value);
    },
};

export default registerEventAPI;
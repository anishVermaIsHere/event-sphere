import axiosInstance from '../axios-interceptor';

const URL='/api/v1/speakers'

const speakerAPI = {
    async events(query) {
        return await axiosInstance.get(`${URL}/events`, { params: query });        
    },
    async attendees(query) {
        return await axiosInstance.get(`${URL}/attendees`, { params: query });        
    },
    async applyEvent(application){
        return await axiosInstance.post(`${URL}/apply`, application);
    }
};

export default speakerAPI;
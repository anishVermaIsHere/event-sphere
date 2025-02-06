import axios from 'axios';
import AppConfig from '../../../config/app.config';
import axiosInstance from '../axios-interceptor';


const URL='/api/v1/invitees'

const inviteeAPI={
    async register(formData){
        return await axiosInstance.post(`${URL}`, formData);
    },
    async find(){
        return await axiosInstance.get(`${URL}`);
    },
    async delete(inviteeId){
        return await axiosInstance.delete(`${URL}/${inviteeId}`);
    }
};

export default inviteeAPI;
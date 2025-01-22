import axiosInstance from '../axios-interceptor';


const URL='/api/v1/users'

const userAPI={
    async findByRole(role){
        const roleEndPoints = {
            guest: "guests",
            speaker: "speakers"
        }
        return await axiosInstance.get(`${URL}/${roleEndPoints[role]}`);
    },
    async find(){
        return await axiosInstance.get(`${URL}`);
    }
};

export default userAPI;
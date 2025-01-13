import { UserModel } from "../database/models/index.js";
import { demoUsers } from "./data.js";
import encrypt from "./encrypt.js";

export async function createUsers(){

    const newUsers = demoUsers.map((user)=>({
        ...user,
        password: encrypt.hashPassword(user.password),
        dob: new Date(user.dob)
    }))
    try {
        await UserModel.insertMany(newUsers)
    } catch (error) {
        console.log('api error', error);
        
    }
}
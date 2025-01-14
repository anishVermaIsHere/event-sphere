import { LocationModel, UserModel } from "../database/models/index.js";
import { demoLocations, demoUsers } from "./data.js";
import encrypt from "./encrypt.js";
import slugify from "slugify";

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
};


export async function createLocations(){
   try {
    const newLocs = demoLocations.map((loc)=>({
        ...loc,
        slug: slugify(loc.venueName.toLowerCase()),
    }))
    await LocationModel.insertMany(newLocs);
   } catch (error) {
        console.log('api error', error);
   }
};
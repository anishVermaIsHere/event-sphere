import { CategoryModel, LocationModel, TicketModel, UserModel } from "../database/models/index.js";
import { demoCategories, demoTickets, demoGuests, demoLocations, demoUsers } from "./data.js";
import encrypt from "./encrypt.js";
import slugify from "slugify";
import { generateAttendees } from "./fake.js";

export async function createUsers(users) {
  const newUsers = users.map((user) => ({
    ...user,
    password: encrypt.hashPassword(user.password),
    gender: user.gender.toLocaleLowerCase(),
    dob: new Date(user.dob),
  }));
  try {
    await UserModel.insertMany(newUsers);
  } catch (error) {
    console.log("api error", error);
  }
}

export async function createLocations() {
  try {
    const newLocs = demoLocations.map((loc) => ({
      ...loc,
      slug: slugify(loc.venueName.toLowerCase()),
    }));
    await LocationModel.insertMany(newLocs);
  } catch (error) {
    console.log("api error", error);
  }
}

export async function createCategories() {
  try {
    await CategoryModel.insertMany(demoCategories);
  } catch (error) {
    console.log("api error", error);
  }
}

export async function createTickets (){
  try {
    const demoTicketsData = demoTickets.map((t)=>({
      ...t,
      attendees: generateAttendees(),
      event: t.eventId,
      user: t.userId,
      date: new Date(t.date)
    }));
    console.log(demoTicketsData);
    await TicketModel.insertMany(demoTicketsData);
  } catch (error) {
    console.log("api error", error);
  }
}

export async function createSingleUser(){
  const user = {
    firstName: "Clark",
    lastName: "Kent",
    username: "kentsuperman",
    gender: "male",
    dob: new Date("1990-05-15"),
    email: "kent.clark@example.com",
    password: encrypt.hashPassword("iamsuperman1234"),
    role: "user",
  }
  console.log('before create user', user);
  // await UserModel.create(user); 
  const res = await UserModel.find();
  console.log(res.length);
}


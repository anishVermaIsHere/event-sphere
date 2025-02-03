import { CategoryModel, LocationModel, TicketModel, UserModel } from "../database/models/index.js";
import { demoCategories, demoGuests, demoLocations, demoUsers } from "./data.js";
import encrypt from "./encrypt.js";
import slugify from "slugify";
import { demoTickets, generateAttendees } from "./fake.js";

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


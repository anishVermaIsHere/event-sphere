import { CategoryModel, LocationModel, UserModel } from "../database/models/index.js";
import { demoCategories, demoGuests, demoLocations, demoUsers } from "./data.js";
import encrypt from "./encrypt.js";
import slugify from "slugify";

export async function createUsers() {
  const newUsers = demoGuests.map((user) => ({
    ...user,
    password: encrypt.hashPassword(user.password),
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

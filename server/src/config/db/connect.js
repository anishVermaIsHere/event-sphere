import mongoose from "mongoose";
import AppConfig from "../app.config.js";

export const dbConnection= async () => {
  try {
    await mongoose.connect(AppConfig.dbUri); 
    console.log("***** DATABASE connected... *****");
  } catch (error) {
    console.log("***** DATABASE connection error... *****",  error);
  }
};



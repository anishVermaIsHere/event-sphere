import createDBModel from "../../utils/create-model.js";

const userSchema = {
  firstName: { type: String, required: [true, "Please provide first name"] },
  lastName: { type: String, required: [true, "Please provide last name"] },
  username: { type: String, required: [true, "Please provide username"] },
  gender: { type: String, enum: ["male", "female", "other"] },
  dob: { type: Date },
  email: { type: String, required: [true, "Please provide email"] },
  password: { type: String, required: [true, "Please provide password"] },
  role: { type: String, enum: ["user", "admin", "guest"], default: "user" },
};

const UserModel = createDBModel(userSchema, "Users");

export default UserModel;

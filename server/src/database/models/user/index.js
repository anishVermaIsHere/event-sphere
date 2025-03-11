import createDBModel from "../../../utils/create-model.js";

const userSchema = {
  firstName: { type: String, required: [true, "Please provide first name"] },
  lastName: { type: String, required: [true, "Please provide last name"] },
  fullName: { type: String },
  userName: { type: String, required: [true, "Please provide username"] },
  gender: { type: String, enum: ["male", "female", "other"], required: [true, "Please provide gender"] },
  dob: { type: Date },
  address: {
    street: { type: String, required: [true, "Please provide street"] },
    city: { type: String, required: [true, "Please provide city"] },
    state: { type: String, required: [true, "Please provide state"] },
    country: { type: String, required: [true, "Please provide country"] },
    postalCode: { type: String }
  },
  contact: { 
    phone: [
      { 
        type: { type: String, enum: ['mobile', 'home', 'work'], required: true },
        number: { type: String, required: true },
      },
    ],
    social: [
      {
        type: { type: String, enum: ['linkedin', 'instagram', 'facebook', 'x'] },
        link: { type: String },
      }
    ]
  },
  email: { type: String, required: [true, "Please provide email"] },
  password: { type: String, required: [true, "Please provide password"] },
  role: { type: String, enum: ["user", "admin", "guest", "speaker"], default: "user" },
  avatar: { type: String }
};

const UserModel = createDBModel(userSchema, "Users");

export default UserModel;

import { UserModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;

const userController = {
  async find(req, res) {
    const userId = req.decode.id;
    try {
      const users = await UserModel.find({ _id: { $ne: userId }}).select(['-password', '-__v', '-updatedAt']).exec();
      return res.status(SUCCESS).json(users);
    } catch (error) {
      console.log("API: find users error", error.message);
      throw new Error(error.message);
    }
  },
  async findGuests(req, res) {
    try {
      const guests = await UserModel.find({ role: "guest" }).select(['-password', '-__v', '-updatedAt']).exec();
      return res.status(SUCCESS).json(guests);
    } catch (error) {
      console.log("API: find guests error", error.message);
      throw new Error(error.message);
    }
  },
  async findSpeakers(req, res) {
    try {
      const speakers = await UserModel.find({ role: "speaker" }).select(['-password', '-__v', '-updatedAt']).exec();
      return res.status(SUCCESS).json(speakers);
    } catch (error) {
      console.log("API: find speakers error", error.message);
      throw new Error(error.message);
    }
  },
 
};

export default userController;

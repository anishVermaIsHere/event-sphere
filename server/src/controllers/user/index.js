import { UserModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;

const userController = {
  async findGuests(req, res) {
    try {
      const guests = await UserModel.find({ role: "guest" }, [""]).select(['-password', '-__v','-createdAt', '-updatedAt']).exec();
      return res.status(SUCCESS).json(guests);
    } catch (error) {
      console.log("API: find guests error", error.message);
      throw new Error(error.message);
    }
  },
  async find(req, res) {
    const user = req.body;
    
  },
 
};

export default userController;

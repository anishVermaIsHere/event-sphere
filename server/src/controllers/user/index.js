import { UserModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;

const userController = {
  /**
   * @route POST /users
   * @desc Register user
   * @access Public
   */
  async register(req, res) {
    const user = req.body;
    try {
      const userDoc = await UserModel.findOne({ email: user.email }).exec();
      if (userDoc && userDoc.email) {
        return res.status(CONFLICT).json({ message: "User already exist" });
      } else {
        const encryptedPassword = encrypt.hashPassword(user.password);
        const doc = await UserModel.create({
          ...user,
          password: encryptedPassword,
        });
        if (doc && doc._id) {
          return res
            .status(CREATE)
            .json({ message: "User registred successfully" });
        }
      }
    } catch (error) {
      console.log("API: user register error", error.message);
    }
  },
  /**
   * @route GET /users
   * @desc Find user
   * @access Public
   */
  async find(req, res) {
    const userId = req.decode.id;
    try {
      const users = await UserModel.find({ _id: { $ne: userId } })
        .select(["-password", "-__v", "-updatedAt"])
        .exec();
      return res.status(SUCCESS).json(users);
    } catch (error) {
      console.log("API: find users error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /users/guests
   * @desc Find guests
   * @access Public
   */
  async findGuests(req, res) {
    try {
      const guests = await UserModel.find({ role: "guest" })
        .select(["-password", "-__v", "-updatedAt"])
        .exec();
      return res.status(SUCCESS).json(guests);
    } catch (error) {
      console.log("API: find guests error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /users/speakers
   * @desc Find guests
   * @access Public
   */
  async findSpeakers(req, res) {
    try {
      const speakers = await UserModel.find({ role: "speaker" })
        .select(["-password", "-__v", "-updatedAt"])
        .exec();
      return res.status(SUCCESS).json(speakers);
    } catch (error) {
      console.log("API: find speakers error", error.message);
      throw new Error(error.message);
    }
  },
};

export default userController;

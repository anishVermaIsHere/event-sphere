import { InviteeModel, UserModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";
import encrypt from "../../utils/encrypt.js";
import tokenObject from "../../utils/token.js";

const { SUCCESS, CREATE, CONFLICT } = HTTP_CODES;

const userController = {
  /**
   * @route POST /users
   * @desc Register user
   * @access Public
   */
  async register(req, res) {
    try {
      const user = req.body;
      const userDoc = await UserModel.findOne({ email: user.email }).exec();
      if (userDoc && userDoc.email) {
        return res.status(CONFLICT).json({ message: "User already exist" });
      } else {
        const encryptedPassword = encrypt.hashPassword(user.password);
        const userDoc = await UserModel.create({ ...user, fullName: user?.firstName+" "+user?.lastName, password: encryptedPassword });
        if (userDoc && userDoc._id) {
         await InviteeModel.updateOne({ recipientEmail: user.email }, { consumed: true, status: "accepted" });
          const { tokenEncode } = tokenObject;
         const { accessToken, refreshToken } = tokenEncode({ email:userDoc.email, firstName: userDoc.firstName, lastName: userDoc.lastName, id:userDoc._id });         
         const { _id, email, firstName, lastName, fullName, userName, dob, gender, adress, role, contact } = userDoc;
         return res.status(CREATE).json({
          user: { id:_id, email, firstName, lastName, fullName, userName, dob, gender, adress, role, contact, avatar },
          accessToken: accessToken,
          refreshToken: refreshToken,
      })
    }}
    } catch (error) {
      console.log("API: user onboarding registration error", error.message);
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

import { InviteeModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;

const inviteeController = {
  /**
   * @route POST /invitees
   * @desc Register invitee
   * @access Public
   */
  async create(req, res) {
    const recipientEmail = req.body.email;
    try {
      const invitee = await InviteeModel.create({ recipientEmail }).exec();
      if (invitee && invitee.recipientEmail) {
        return res.status(CONFLICT).json({ message: "User already exist" });
      } else {
        
        if (doc && doc._id) {
          return res.status(CREATE).json({ message: "Invited successfully" });
        }
      }
    } catch (error) {
      console.log("API: user invitation error", error.message);
    }
  },
  /**
   * @route GET /invitees
   * @desc Find user
   * @access Public
   */
  async find(req, res){

  }
};

export default inviteeController;

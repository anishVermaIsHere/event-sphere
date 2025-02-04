import { isValidObjectId } from "mongoose";
import { InviteeModel, UserModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";
import { sendMail } from "../../utils/mailer.js";
import { generateToken } from "../../utils/other-token.js";
import mongoose from 'mongoose';

const { SUCCESS, CREATE, CONFLICT, BAD_REQUEST } = HTTP_CODES;

const inviteeController = {
  /**
   * @route POST /invitees
   * @desc Register invitee
   * @access Public
   */
  async create(req, res) {
    const { email: recipientEmail } = req.body;
    try {
      const user = await InviteeModel.findOne({ recipientEmail });
      if(user?.status === "pending"){
        return res.status(CONFLICT).json({ message: "Already Invited" });
      }
      const isFound = await UserModel.findOne({ email: recipientEmail });
      if(isFound){
        return res.status(CONFLICT).json({ message: "User already exist" });
      }
      const data = {
        recipientEmail,
        sender: req.decode.id,
        token: generateToken()
      };
      const invitee = await InviteeModel.create(data);
      if (invitee && invitee._id) {
        await sendMail({ email: recipientEmail, registerUrl: `/${data.token}`})
        return res.status(CREATE).json({ message: "Invited successfully" });
      } 
    } catch (error) {
      console.log("API: user invitation error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /invitees
   * @desc Find invitees
   * @access Public
   */
  async find(req, res){
    try {
      const invitees = await InviteeModel.find();
      return res.status(SUCCESS).json(invitees);
    } catch (error) {
      console.log("API: invitees finding error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route DELETE /invitees/:id
   * @desc Delete invitee
   * @access Public
   */
  async delete(req, res){
    try {
      const inviteeId = req.params.id;
      if(!mongoose.Types.ObjectId.isValid(inviteeId)){
        return res.status(BAD_REQUEST).json({ error: 'Invalid ID format' });
      }
      await InviteeModel.deleteOne({ _id: inviteeId });
      return res.status(SUCCESS).json({ message: "Invite deleted" });
    } catch (error) {
      console.log("API: invitee deletion error", error.message);
    }
  }
};

export default inviteeController;

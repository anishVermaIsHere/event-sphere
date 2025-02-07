import { isValidObjectId } from "mongoose";
import { InviteeModel, UserModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";
import { sendMail } from "../../utils/mailer.js";
import { generateToken } from "../../utils/other-token.js";
import mongoose from 'mongoose';
import { decodedUser } from "../../utils/token.js";
import { parseDurationString } from "../../utils/parse-duration-string.js";
import AppConfig from "../../config/app.config.js";



const { SUCCESS, CREATE, CONFLICT, BAD_REQUEST } = HTTP_CODES;

const inviteeController = {
  /**
   * @route POST /invitees
   * @desc Register invitee
   * @access Public
   */
  async create(req, res) {
    const { email: recipientEmail } = req.body;
    const requestedUser = decodedUser(req);
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
        // await sendMail({ email: recipientEmail, senderName: requestedUser?.firstName+" "+requestedUser?.lastName, registerUrl: `/${data.token}`})
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
      const results = await InviteeModel.find().populate("sender", ["-__v", "-password", "-createdAt", "-updatedAt"]);
      const invitees = results.map((inv)=>({ ...inv.toObject(), expires: parseDurationString(inv.expires, AppConfig.invitationExpiry)?.timeStamp }));
      return res.status(SUCCESS).json(invitees);
    } catch (error) {
      console.log("API: invitees finding error", error.message);
      throw new Error(error.message);
    }
  },
  async verify(req, res){
    try {
      const token = req.params.token;
      const invitee = await InviteeModel.findOne({ token, consumed: false });
      console.log('token found', invitee)
      if(!invitee){
        return res.json({ message: "Invalid token or expired" });
      } 
      return res.json({ success: true, message: "" });
    } catch (error) {
      console.log("API: invitee verification error", error.message);
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

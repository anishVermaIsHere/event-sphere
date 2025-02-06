import { Schema, SchemaTypes, model } from "mongoose";
import AppConfig from "../../config/app.config.js";

const inviteeSchema = new Schema(
  {
    sender: { type: SchemaTypes.ObjectId, ref: "Users", required: true },
    recipientEmail: {
      type: String,
      required: [true, "Please provide recipient email"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    token: { type: String, required: true },
    consumed: { type: Boolean, default: false },
    expires: { type: Date, default: Date.now, expires: AppConfig.invitationExpiry },
  },
  { timestamps: true }
);

// inviteeSchema.index({ expires: 1 }, { expireAfterSeconds: 604800 });

const InviteeModel = model("Invitees", inviteeSchema);

export default InviteeModel;


// https://opylzx.clicks.mlsend.com/tj/cl/eyJ2Ijoie1wiYVwiOjM2Mjk4MCxcImxcIjoxNDQ3NjY5MzU0OTY2NTYwMTMsXCJyXCI6MTQ0NzY2OTYzMzQ3ODgzNDkwfSIsInMiOiI0NzZkZGJiNWEyNmQ0ZmYwIn0
import createDBModel from "../../../utils/create-model.js";
import { Schema, SchemaTypes } from "mongoose";


const attendeeSchema = new Schema({
  name: { type: String, required: [true, "Please provide attendee name"] },
  passCode: { type: String, required: true },
  arrived: { type: Boolean, default: false }
});

const ticketSchema = {
  attendees: [ attendeeSchema ],
  event: { type: SchemaTypes.ObjectId, ref: "Events", required: true },
  user: { type: SchemaTypes.ObjectId, ref: "Users", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["confirmed", "cancelled", "expired"] },
};

const TicketModel = createDBModel(ticketSchema, "Tickets");

export default TicketModel;

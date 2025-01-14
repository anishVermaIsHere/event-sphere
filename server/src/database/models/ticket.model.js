import createDBModel from "../../utils/create-model.js";
import { SchemaTypes } from "mongoose";

const ticketSchema = {
  attendeeNames: [{ type: String, required: [true, "Please provide attendee name"] }],
  eventId: { type: SchemaTypes.ObjectId, ref: "Events", required: true },
  userId: { type: SchemaTypes.ObjectId, ref: "Users", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["confirmed", "cancelled", "expired"] },
  priceInCents: { type: Number, required: true }
};

const TicketModel = createDBModel(ticketSchema, "Tickets");

export default TicketModel;

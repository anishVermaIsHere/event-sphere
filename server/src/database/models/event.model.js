
import createDBModel from "../../utils/create-model.js";
import { SchemaTypes } from "mongoose";


const eventSchema = {
  name: { type: String, required: [true, "Please provide event name"] },
  slug: { type: String, index: true, required: true },
  description: { type: String, required: [true, "Please provide event name"] },
  category: { type: String, required: true },
  isPrivate: { type: Boolean, default: false, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  location: { type: SchemaTypes.ObjectId, ref:"Locations", required: true },
  capacity: { type: Number, required: true },
  guests: [{ type: SchemaTypes.ObjectId, ref: "Users", required: true }],
  speakers: [{ type: SchemaTypes.ObjectId, ref: "Users", required: true }],
  createdBy: { type: SchemaTypes.ObjectId, ref: "Users", required: true },
  priceInCents: { type: Number, default: 0, required: [true, "Please provide event price in cents"] }
};

const EventModel = createDBModel(eventSchema, "Events");

export default EventModel;
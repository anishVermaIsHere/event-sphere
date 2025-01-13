
import createDBModel from "../../utils/create-model.js";
import { SchemaTypes } from "mongoose";


const guestSchema = {
  
}
const eventSchema = {
  name: { type: String, required: [true, "Please provide event name"] },
  description: { type: String, required: [true, "Please provide event name"] },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  locationId: { type: SchemaTypes.ObjectId, ref:"Locations", required: true },
  guests: { type: SchemaTypes.ObjectId, ref: "Users", required: true }
};

const EventModel = createDBModel(eventSchema, "Events");


export default EventModel;
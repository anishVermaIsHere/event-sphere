
import createDBModel from "../../utils/create-model.js";

const locationSchema = {
  name: { type: String, required: [true, "Please provide location name"] },
  slug: { type: String, index: true, required: true },
};

const LocationModel = createDBModel(locationSchema, "Locations");


export default LocationModel;
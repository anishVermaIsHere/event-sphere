import createDBModel from "../../../utils/create-model.js";

const locationSchema = {
  venueName: { type: String, required: [true, "Please provide venue name"] },
  slug: { type: String, index: true, required: true },
  city: { type: String, required: [true, "Please provide city name"] },
  state: { type: String, required: [true, "Please provide state name"] },
  postalCode: { type: String, required: [true, "Please provide state name"] },
  country: { type: String, required: [true, "Please provide country name"] },
  phone: { type: String, required: true },
};

const LocationModel = createDBModel(locationSchema, "Locations");

export default LocationModel;

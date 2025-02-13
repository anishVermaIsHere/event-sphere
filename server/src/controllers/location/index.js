import LocationModel from "../../database/models/location.model.js";
import { HTTP_CODES } from "../../utils/constants.js";


const { SUCCESS, CREATE, CONFLICT, UNAUTHORIZE } = HTTP_CODES;

const locationController = {
    /**
   * @route GET /locations
   * @desc Fetch locations
   * @access Private
   */
  async find(req, res) {
    try {
      const locations = await LocationModel.find();
      return res.status(SUCCESS).json(locations);
    } catch (error) {
      console.log("API: locations find error", error.message);
      throw new Error(error.message);
    }
  },
  
};

export default locationController;

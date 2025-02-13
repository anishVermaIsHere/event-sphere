import { decodedUser } from "../../../utils/token.js";
import { EventModel } from "../../../database/models/index.js";
import { HTTP_CODES } from "../../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;

export const eventController = {
   /**
   * @route GET /events
   * @desc Fetch events
   * @access Private
   */
  async findByFilter(req, res) {
    try {
      const requestedUser = decodedUser(req);
      const events = await EventModel.find({ speakers: { $in: [requestedUser.id] } })
        .populate("guests", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("speakers", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("location")
        .populate("createdBy", [ "-__v", "-password", "-createdAt", "-updatedAt"])
        .sort();

      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: speakers events filtering error", error.message);
      throw new Error(error.message);
    }
  },
};

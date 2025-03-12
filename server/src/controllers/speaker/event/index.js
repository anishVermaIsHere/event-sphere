import { decodedUser } from "../../../utils/token.js";
import { EventModel, EventRegisterModel } from "../../../database/models/index.js";
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
      const query = req.query;
      // const events = await EventModel.find({ speakers: { $in: [requestedUser.id] } })
      const regdEvents = EventRegisterModel.find({ user: req.decode.id })
      const events = EventModel.find(query)
        .populate("guests", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("speakers", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("location")
        .populate("createdBy", [ "-__v", "-password", "-createdAt", "-updatedAt"])
        .sort();

      const [ allEvents, appliedEvents ] = await Promise.all([ events, regdEvents ]);

      // const che = await EventModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "speakerregisteredevents",
      //       localField: "event",
      //       foreignField: ""
      //     }
      //   }
      // ])

      return res.status(SUCCESS).json(allEvents);
    } catch (error) {
      console.log("API: speakers events filtering error", error.message);
      throw new Error(error.message);
    }
  },
};

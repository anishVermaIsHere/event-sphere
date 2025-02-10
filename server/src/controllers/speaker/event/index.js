import { decodedUser } from "../../../utils/token";

export const eventController = {
  async findByFilter(req, res) {
    try {
      const requestedUser = decodedUser(req);
      const query = {};
      const currentTime = new Date();

      if (status) {
        if (status === "upcoming") {
          query.startTime = { $gt: currentTime };
        } else if (status === "ongoing") {
          query.startTime = { $lte: currentTime };
          query.endTime = { $gte: currentTime };
        } else if (status === "past") {
          query.endTime = { $lt: currentTime };
        }
      }

      const events = await EventModel.find({ $in: { speakers: requestedUser.id } })
        .populate("guests", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("speakers", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("location")
        .populate("createdBy", [
          "-__v",
          "-password",
          "-createdAt",
          "-updatedAt",
        ])
        .sort();

      console.log("spkear events", events);
      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: events filtering error", error.message);
      throw new Error(error.message);
    }
  },
};

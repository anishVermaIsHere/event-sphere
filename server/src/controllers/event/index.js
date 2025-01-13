import { EventModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS, CREATE, CONFLICT, UNAUTHORIZE } = HTTP_CODES;

const eventController = {
  async find(req, res) {
    try {
      const events = await EventModel.find();
      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: events find error", error.message);
      throw new Error(error.message);
    }
  },
  async create(req, res) {
    const event = req.body;
    try {
      const eventDoc = await EventModel.create(event);
      if (eventDoc && eventDoc._id) {
        return res
          .status(CREATE)
          .json({ message: "Event created successfully" });
      }
    } catch (error) {
      console.log("API: event creation error", error.message);
    }
  },
  async delete(req, res) {
    try {
      const eventId = req.params.id;
      await EventModel.delete(eventId);
      return res.status(CREATE).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.log("API: event deletion error", error.message);
    }
  },
  async update(req, res) {
    try {
        const eventId = req.params.id;
        const data = req.body;
        await EventModel.updateOne({ _id: eventId }, data);
        return res.status(CREATE).json({ message: "Event deleted successfully" });
      } catch (error) {
        console.log("API: event updation error", error.message);
      }
  },
};

export default eventController;

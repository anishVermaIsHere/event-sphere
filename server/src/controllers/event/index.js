import { EventModel, EventRegisterModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";
import slugify from "slugify";

const { SUCCESS, CREATE, CONFLICT, UNAUTHORIZE } = HTTP_CODES;

const eventController = {
  /**
   * @route GET /events
   * @desc Find events with filter
   * @access Private
   */
  async findByFilter(req, res) {
    try {
      const query = {};
      const currentTime = new Date();
      const { category, startDate, endDate, status } = req.query;

      if (category) {
        query.category = category;
      }
      if (startDate) {
        query.startTime = { $gte: new Date(startDate) };
      }
      if (endDate) {
        query.endTime = { $lte: new Date(endDate) };
      }
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

      const events = await EventModel.find(query)
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

      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: events filtering error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /events/:id
   * @desc Find event by id
   * @access Private
   */
  async findById(req, res) {
    try {
      let query = {};
      const eventId = req.params.id;
      if (eventId) {
        query = { _id: eventId };
      }
      const event = await EventModel.find(query)
        .populate("guests", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("speakers", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("location")
        .populate("createdBy", [
          "-__v",
          "-password",
          "-createdAt",
          "-updatedAt",
        ]);
      return res.status(SUCCESS).json(event);
    } catch (error) {
      console.log("API: event find error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /events
   * @desc Find events
   * @access Private
   */
  async find(req, res) {
    try {
      const events = await EventModel.find()
        .populate("guests", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("speakers", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("location")
        .populate("createdBy");
      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: events find error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route POST /events
   * @desc Create event
   * @access Private
   */
  async create(req, res) {
    const event = {
      ...req.body,
      slug: slugify(req.body.name.toLowerCase()),
      createdBy: req.decode.id,
    };
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
  /**
   * @route DELETE /events/:id
   * @desc Delete event by id
   * @access Private
   */
  async delete(req, res) {
    try {
      const eventId = req.params.id;
      await EventModel.deleteOne({ _id: eventId });
      return res
        .status(SUCCESS)
        .json({ message: "Event deleted successfully" });
    } catch (error) {
      console.log("API: event deletion error", error.message);
    }
  },
  /**
   * @route DELETE /events
   * @desc Delete events
   * @access Private
   */
  async deleteAll(req, res) {
    try {
      const eventIds = req.body.ids;
      await EventModel.deleteMany({ _id: { $in: eventIds } });
      return res
        .status(SUCCESS)
        .json({ message: "Events deleted successfully" });
    } catch (error) {
      console.log("API: events deletion error", error.message);
    }
  },
  /**
   * @route PUT /events/:id
   * @desc Update event by id
   * @access Private
   */
  async update(req, res) {
    try {
      const eventId = req.params.id;
      const event = {
        ...req.body,
        slug: slugify(req.body.name.toLowerCase()),
      };
      await EventModel.updateOne({ _id: eventId }, event);
      return res.status(SUCCESS).json({ message: "Event update successfully" });
    } catch (error) {
      console.log("API: event updation error", error.message);
    }
  },
};

export default eventController;

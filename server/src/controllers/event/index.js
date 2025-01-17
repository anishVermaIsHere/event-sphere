import { EventModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";
import slugify from "slugify";

const { SUCCESS, CREATE, CONFLICT, UNAUTHORIZE } = HTTP_CODES;

const eventController = {
  async findByFilter(req, res) {
    try {
      const query = {};
      const currentTime = new Date();
      const { category, startDate, endDate, status } = req.query;

      if (category) {
        query.category = category;
      }
      if (startDate) {
        // query.startTime = { ...query.startTime, $gte: new Date(startDate) };
      }
      if (endDate) {
        // query.endTime = { ...query.endTime, $lte: new Date(endDate) };
      }
      if (status) {
        if (status === "upcoming") {
          query.startTime = { $gt: currentTime } ;
        } else if (status === "ongoing") {
          query.startTime = { $lte: currentTime } ;
          query.endTime = { $gte: currentTime } ;
        } else if (status === "past") {
          query.endTime = { $lt: currentTime } ;
        }
      }
      console.log(query);


      // const events = await EventModel.find(query, {
      //   $elemMatch: { $gte: new Date() }
      // })
      //   .populate("guests")
      //   .populate("speakers")
      //   .populate("location")
      //   .populate("createdBy");
      // console.log({ ...query.startTime, ...query.endTime })


      const events = await EventModel.find(req.query.category === "All" ? {} : query)
        .populate("guests", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("speakers", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .populate("location")
        .populate("createdBy");

      // console.log(events);
      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: events filtering error", error.message);
      throw new Error(error.message);
    }
  },
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
  async update(req, res) {
    try {
      const eventId = req.params.id;
      const data = req.body;
      await EventModel.updateOne({ _id: eventId }, data);
      return res
        .status(SUCCESS)
        .json({ message: "Event deleted successfully" });
    } catch (error) {
      console.log("API: event updation error", error.message);
    }
  },
};

export default eventController;

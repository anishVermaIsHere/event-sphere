import { EventModel, EventRegisterModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS, CREATE, CONFLICT, UNAUTHORIZE } = HTTP_CODES;

const eventApplyController = {
  /**
   * @route POST /apply
   * @desc Register for event
   * @access Private
   */
  async register(req, res) {
    try {
      const {
        eventId,
        topicsOfInterest,
        bio,
        previousExperience,
        reasonForAttend,
        specialRequirements,
        content,
        termsAgreed,
        dataPrivacyAgreed,
      } = req.body;

      const application = {
        event: eventId,
        user: req.decode.id,
        participantInfo: { topicsOfInterest, bio, previousExperience },
        otherInfo: { reasonForAttend, specialRequirements },
        presentations: { content },
        consent: { termsAgreed, dataPrivacyAgreed },
      };
      await EventRegisterModel.create(application);
      return res.status(CREATE).json({ message: "Event applied successfully" });
    } catch (error) {
      console.log("API: event registeration error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route GET /events/applied
   * @desc Find applied events
   * @access Private
   */
  async find(req, res) {
    try {
      const events = await EventRegisterModel.find()
        .populate("event", ["-__v", "-createdAt", "-updatedAt"])
        .populate("user", ["-__v", "-password", "-createdAt", "-updatedAt"])
        .sort();

      return res.status(SUCCESS).json(events);
    } catch (error) {
      console.log("API: applied events find error", error.message);
      throw new Error(error.message);
    }
  },
  /**
   * @route PUT /events/applied/:id
   * @desc Find applied events
   * @access Private
   */
  async approve(req, res) {
    try {
      const applicationId = req.params.id;
      const { value, eventId } = req.body;
      const appliedEvent = await EventRegisterModel.findOneAndUpdate({ _id: applicationId }, { $set: { isApproved: value }}, { new: true }).populate("user");
      const event = await EventModel.findById(eventId);
      const userId = appliedEvent.user._id;
      
      if(appliedEvent.isApproved){
        if(appliedEvent.user.role === "speaker"){
          const speakers = [];
          speakers.push(userId);
          await EventModel.updateOne({ _id: eventId }, { $set: { speakers }});
        }
        if(appliedEvent.user.role === "guest"){
          const guests = [];
          guests.push(userId);
          await EventModel.updateOne({ _id: eventId }, { $set: { guests }});
        }
      } else {
        if(appliedEvent.user.role === "speaker"){
          const speakers = event.speakers.filter((sp)=>String(sp) !== String(userId));
          await EventModel.updateOne({ _id: eventId }, { $set: { speakers }});
        }
        if(appliedEvent.user.role === "guest"){
          const guests = event.guests.filter((gs)=>String(gs) !== String(userId));
          await EventModel.updateOne({ _id: eventId }, { $set: { guests }});
        }
      }
      
      return res.status(SUCCESS).json({});
    } catch (error) {
      console.log("API: events approval error", error.message);
      throw new Error(error.message);
    }
  },
};

export default eventApplyController;

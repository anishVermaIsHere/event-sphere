import { EventRegisterModel } from "../../database/models/index.js";



const eventApplyController = {
    /**
   * @route POST /apply
   * @desc Register for event
   * @access Private
   */
    async register(req, res){
        try {
            const application = req.body;
            await EventRegisterModel.create(application);
            return res.json({ message: "Event applied successfully" });
        } catch (error) {
            console.log("API: event registeration error", error.message);
            throw new Error(error.message);
        }
    },
     /**
   * @route GET /apply
   * @desc Register for event
   * @access Private
   */
    async find(req, res){
        try {
            const applications = await SpeakerEventRegisterModel.find();
            res.json(applications);
        } catch (error) {
            console.log("API: fetch applied events error", error.message);
            throw new Error(error.message);
        }
    }
};

export default eventApplyController;
import { TicketModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;


const ticketController = {
   /**
   * @route GET /tickets
   * @desc Fetch tickets
   * @access Private
   */
    async find(req, res) {
      try {
        const query = {};
        const { startDate, endDate } = req.query;
        if(startDate && endDate){
          query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }
        }
        const tickets = await TicketModel.find(query)
        .populate({
          path: 'event',
          select: '-__v -createdAt -updatedAt',
          populate: {
            path: 'location',
            select: '-__v -createdAt -updatedAt'
          }
        })
        .populate("user", ["-__v", "-password", "-createdAt", "-updatedAt"]);

        return res.status(SUCCESS).json(tickets);
      } catch (error) {
        console.log("API: tickets find error", error.message);
        throw new Error(error.message);
      }
    },
     /**
   * @route GET /tickets/:id
   * @desc Fetch ticket by id
   * @access Private
   */
    async findById(req, res){
      try {
        const ticketId = req.params.id;
        const ticket = await TicketModel.findById({ _id: ticketId })
        .populate({
          path: 'event',
          select: '-__v -createdAt -updatedAt',
          populate: {
            path: 'location',
            select: '-__v -createdAt -updatedAt'
          }
        })
        .populate("user", ["-__v", "-password", "-createdAt", "-updatedAt"]);

        return res.status(SUCCESS).json(ticket);
      } catch (error) {
        console.log("API: ticket find error", error.message);
        throw new Error(error.message);
      }
    },
    /**
   * @route GET /tickets/users/:id
   * @desc Fetch tickets by user
   * @access Private
   */
    async findByUser(req, res){
      try {
        const userId = req.params.id;
        const tickets = await TicketModel.find({ user: userId })
        .populate({
          path: 'event',
          select: '-__v -createdAt -updatedAt',
          populate: {
            path: 'location',
            select: '-__v -createdAt -updatedAt'
          }
        })
        .populate("user", ["-__v", "-password", "-createdAt", "-updatedAt"]);

        return res.status(SUCCESS).json(tickets);
      } catch (error) {
        console.log("API: ticket finding by user error", error.message);
        throw new Error(error.message);
      }
    }
    
  };
  
  export default ticketController;
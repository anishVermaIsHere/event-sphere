import { TicketModel } from "../../database/models/index.js";
import { HTTP_CODES } from "../../utils/constants.js";

const { SUCCESS } = HTTP_CODES;


const ticketController = {
    async find(req, res) {
      try {
        const tickets = await TicketModel.find()
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
import { decodedUser } from "../../../utils/token.js";
import { TicketModel } from "../../../database/models/index.js";
import { HTTP_CODES } from "../../../utils/constants.js";
import mongoose from "mongoose";

const { SUCCESS } = HTTP_CODES;

export const attendeeController = {
    /**
   * @route GET /attendees
   * @desc Fetch attendees
   * @access Private
   */
    async find(req, res){
        try {
            const requestedUser = decodedUser(req);
            const attendees = await TicketModel.aggregate([
            {
                $lookup: {
                from: 'events',
                localField: 'event',
                foreignField: '_id',
                as: 'event'
                }
            },
            {
                $unwind: '$event'
            },
            {
                $match: {
                    'event.speakers': new mongoose.Types.ObjectId(requestedUser.id)
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'event.location',
                    foreignField: '_id',
                    as: "location"

                }
            },
            {
                $unwind: '$location'
            },
            {
                $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                _id: '$_id',
                user: {
                    firstName: '$user.firstName',
                    lastName: '$user.lastName',
                    fullName: "$user.fullName",
                    email: "$user.email",
                    _id: "$user._id"
                },
                event: {
                    $mergeObjects: ['$event', { location: '$location' }]
                },
                attendees: "$attendees",
                date: '$date',
                status: "$status"
                }
            }
            ]);
            return res.status(SUCCESS).json(attendees);
          } catch (error) {
            console.log("API: speakers attendees filtering error", error.message);
            throw new Error(error.message);
          }
    }
}
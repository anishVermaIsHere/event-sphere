import createDBModel from "../../../utils/create-model.js";
import { SchemaTypes, Schema } from "mongoose";


const participantInfoSchema = new Schema({
    topicsOfInterest: { type: String },
    bio: {type: String },
    previousExperience: { type: String }
});

const otherInfoSchema = new Schema({
    reasonForAttend: { type: String, required: true },
    specialRequirements: { type: String }, 
});

const presentationSchema = new Schema({
    content: { type: String }
});

const consentSchema = new Schema({
    termsAgreed: { type: Boolean, required: true },
    dataPrivacyAgreed: { type: Boolean, required: true }
});

const eventRegistrationSchema = {
    event: { type: SchemaTypes.ObjectId, ref: 'Events', required: true },
    user: { type: SchemaTypes.ObjectId, ref: 'Users', required: true },
    participantInfo: { type: participantInfoSchema, required: true },
    otherInfo: { type: otherInfoSchema },
    presentations: { type: presentationSchema },
    consent: { type: consentSchema, required: true },
    registrationDate: { type: Date, default: Date.now },
    isApproved: { type: Boolean, default: false }
};

const EventRegisterModel = createDBModel(eventRegistrationSchema, "RegisteredEvents");

export default EventRegisterModel;
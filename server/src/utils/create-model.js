import { Schema, model } from "mongoose";

export default function createDBModel(modelSchema, modelName) {
  return model(modelName, new Schema(modelSchema, { timestamps: true }));
}

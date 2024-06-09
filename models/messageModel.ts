import mongoose, { Document, Model, PopulatedDoc, Schema, Types } from "mongoose";
import { IUserDocument } from "./userModel";

export interface IMessage {
  sender: Types.ObjectId | IUserDocument;
  receiver: Types.ObjectId | IUserDocument;
  content: string;
  messageType: "text" | "image";
  opened: boolean;
}

export interface IMessageDocument extends IMessage, Document {
  _id: Types.ObjectId;
  toJSON(): any;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPopulatedMessageDocument extends IMessageDocument {
  sender: IUserDocument;
  receiver: IUserDocument;
}

const messageSchema = new mongoose.Schema<IMessageDocument>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    messageType: { type: String, required: true, enum: ["text", "image"] },
    opened: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessageDocument> =
  mongoose.models?.Message || mongoose.model<IMessageDocument>("Message", messageSchema);

export default Message;
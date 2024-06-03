import mongoose, { Model, Schema, Types } from "mongoose";

export interface IMessage {
    sender : Types.ObjectId;
    receiver : Types.ObjectId;
    content: String;
    messageType: "text" | "image";
    opened: boolean;
}

export interface IMessageDocument extends IMessage, Document {
    toJSON(): any;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new mongoose.Schema<IMessageDocument>({
    sender:{type: Schema.Types.ObjectId, ref:"User", required: true},
    receiver:{type: Schema.Types.ObjectId, ref:"User", required: true},
    content:{type:String, required:true},
    messageType:{type:String, required:true, enum:["text", "image"]},
    opened:{type:Boolean, default:false}

})

const Message:Model<IMessageDocument> = mongoose.models?.Message || mongoose.model("Message", messageSchema);

export default Message;
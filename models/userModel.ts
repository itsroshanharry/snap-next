import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser {
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export interface IUserDocument extends IUser, Document {
  _id: Schema.Types.ObjectId; // Explicitly type _id
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;

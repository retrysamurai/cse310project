import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  fullname: string;
  phone: string;
  nid: string;
  balance: number;
  role: string;
  email: string;
  password: string;
  username: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
  fullname: String,
  phone: String,
  nid: String,
  balance: Number,
  role: String,
  email: String,
  password: String,
  username: String
});

export default mongoose.model<IUserModel>("User", UserSchema);

import mongoose, { Document, Schema } from "mongoose";

export interface IPaybill {
  email: string;
  bankCode: string;
  billType: string;
  payDate: Date;
  amount: number;
}

export interface IPaybillMoodel extends IPaybill, Document {}

const PaybillSchema: Schema = new Schema({
  email: String,
  bankCode: String,
  billType: String,
  payDate: Schema.Types.Date,
  amount: Number
});

export default mongoose.model<IPaybillMoodel>("Paybill", PaybillSchema);

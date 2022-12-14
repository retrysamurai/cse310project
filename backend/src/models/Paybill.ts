import mongoose, { Document, Schema } from "mongoose";

export interface IPaybillMoodel extends Document {
  email: string;
  bankCode: string;
  billType: string;
  payDate: Date;
  amount: number;
}

const PaybillSchema: Schema = new Schema({
  email: String,
  bankCode: String,
  billType: String,
  payDate: Schema.Types.Date,
  amount: Number
});

export default mongoose.model<IPaybillMoodel>("Paybill", PaybillSchema);

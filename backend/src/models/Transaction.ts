import mongoose, { Document, Schema } from "mongoose";

export interface ITransactionModel extends Document {
  dateTime: Date;
  amount: number;
  senderEmail: string;
  receiverEmail: string;
  transactionType: string;
}

const TransactionSchema: Schema = new Schema({
  dateTime: { required: true, type: Schema.Types.Date },
  amount: { required: true, type: Number },
  senderEmail: { required: true, type: String },
  receiverEmail: { required: true, type: String },
  transactionType: { required: true, type: String }
});

export default mongoose.model<ITransactionModel>("Transaction", TransactionSchema);

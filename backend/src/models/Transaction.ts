import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction {
  dateTime: Date;
  amount: number;
  senderEmail: string;
  receiverEmail: string;
  transactionType: string;
}

export interface ITransactionModel extends ITransaction, Document {}

const TransactionSchema: Schema = new Schema({
  dateTime: Schema.Types.Date,
  amount: Number,
  senderEmail: String,
  receiverEmail: String,
  transactionType: String
});

export default mongoose.model<ITransactionModel>("Transaction", TransactionSchema);

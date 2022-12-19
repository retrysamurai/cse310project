import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IHistoryModel extends Document {
  dateTime: Date;
  transactionId: ObjectId;
  transactionType: string;
  userEmail: string;
}

const HistorySchema: Schema = new Schema({
  dateTime: Schema.Types.Date,
  transactionId: Schema.Types.ObjectId,
  transactionType: String,
  userEmail: String
});

export default mongoose.model<IHistoryModel>("History", HistorySchema);

import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IHistory {
  dateTime: Date;
  transactionId: ObjectId;
  user: string;
}

export interface IHistoryModel extends IHistory, Document {}

const HistorySchema: Schema = new Schema({
  dateTime: Schema.Types.Date,
  transactionId: Schema.Types.ObjectId,
  user: String
});

export default mongoose.model<IHistoryModel>("History", HistorySchema);

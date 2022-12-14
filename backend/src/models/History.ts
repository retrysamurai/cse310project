import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IHistoryModel extends Document {
  dateTime: Date;
  transactionId: ObjectId;
  user: string;
}

const HistorySchema: Schema = new Schema({
  dateTime: Schema.Types.Date,
  transactionId: Schema.Types.ObjectId,
  user: String
});

export default mongoose.model<IHistoryModel>("History", HistorySchema);

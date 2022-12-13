import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import History from "../models/History";

const createHistory = (req: Request, res: Response, next: NextFunction) => {
  const { dateTime, transactionId, user } = req.body;

  const history = new History({
    _id: new mongoose.Types.ObjectId(),
    dateTime,
    transactionId,
    user
  });

  return history
    .save()
    .then((history) => res.status(201).json({ history }))
    .catch((error) => res.status(500).json({ error }));
};

const readHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;

  return History.findById(historyId)
    .then((history) => (history ? res.status(200).json({ history }) : res.status(404).json({ message: "History Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return History.find()
    .then((historys) => res.status(200).json({ historys }))
    .catch((error) => res.status(500).json({ error }));
};

const updateHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;

  return History.findById(historyId)
    .then((history) => {
      if (history) {
        history.set(req.body);

        return history
          .save()
          .then((history) => res.status(201).json({ history }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "History Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;

  return History.findByIdAndDelete(historyId)
    .then((history) => (history ? res.status(200).json({ message: "History Deleted" }) : res.status(404).json({ message: "History Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createHistory, readHistory, readAll, updateHistory, deleteHistory };

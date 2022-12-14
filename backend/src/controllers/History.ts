import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import History from "../models/History";

export interface ReqWithJWT extends Request {
  USER_ID: string;
  USER_ROLE: string;
}

export const createHistory = (req: Request, res: Response, next: NextFunction) => {
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

export const readHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = (req as ReqWithJWT).USER_ID;

  return History.findById(historyId)
    .then((history) => (history ? res.status(200).json({ history }) : res.status(404).json({ message: "History Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export const readAll = (req: Request, res: Response, next: NextFunction) => {
  return History.find()
    .then((historys) => res.status(200).json({ historys }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = (req as ReqWithJWT).USER_ID;

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

export const deleteHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = (req as ReqWithJWT).USER_ID;

  return History.findByIdAndDelete(historyId)
    .then((history) => (history ? res.status(200).json({ message: "History Deleted" }) : res.status(404).json({ message: "History Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

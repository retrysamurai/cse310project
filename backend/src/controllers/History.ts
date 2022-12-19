import { NextFunction, Request, Response } from "express";
import mongoose, { Date, mongo } from "mongoose";
import History from "../models/History";

export interface ReqWithJWT extends Request {
  USER_ID: string;
  USER_ROLE: string;
}

export const createHistory = (dateTime: Date, transactionId: mongoose.Types.ObjectId, transactionType: string, userEmail: string) => {
  const history = new History({
    dateTime,
    transactionId,
    transactionType,
    userEmail
  });

  return history.save();
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

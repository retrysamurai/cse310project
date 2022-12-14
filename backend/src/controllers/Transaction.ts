import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import Transaction from "../models/Transaction";

export interface ReqWithJWT extends Request {
  USER_ID: string;
  USER_ROLE: string;
}

export const createTransaction = (req: Request, res: Response, next: NextFunction) => {
  const { dateTime, amount, senderEmail, receiverEmail, transactionType } = req.body;

  const transaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    dateTime,
    amount,
    senderEmail,
    receiverEmail,
    transactionType
  });

  return transaction
    .save()
    .then((transaction) => res.status(201).json({ transaction }))
    .catch((error) => res.status(500).json({ error }));
};

export const readTransaction = (req: Request, res: Response, next: NextFunction) => {
  const transactionId = (req as ReqWithJWT).USER_ID;

  return Transaction.findById(transactionId)
    .then((transaction) => (transaction ? res.status(200).json({ transaction }) : res.status(404).json({ message: "Transaction Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Transaction.find()
    .then((transactions) => res.status(200).json({ transactions }))
    .catch((error) => res.status(500).json({ error }));
};

export const updateTransaction = (req: Request, res: Response, next: NextFunction) => {
  const transactionId = (req as ReqWithJWT).USER_ID;

  return Transaction.findById(transactionId)
    .then((transaction) => {
      if (transaction) {
        transaction.set(req.body);

        return transaction
          .save()
          .then((transaction) => res.status(201).json({ transaction }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Transaction Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

export const deleteTransaction = (req: Request, res: Response, next: NextFunction) => {
  const transactionId = (req as ReqWithJWT).USER_ID;

  return Transaction.findByIdAndDelete(transactionId)
    .then((transaction) => (transaction ? res.status(200).json({ message: "Transaction Deleted" }) : res.status(404).json({ message: "Transaction Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

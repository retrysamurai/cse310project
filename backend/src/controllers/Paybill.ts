import { NextFunction, Request, Response } from "express";
import mongoose, { mongo } from "mongoose";
import Paybill from "../models/Paybill";

const createPaybill = (req: Request, res: Response, next: NextFunction) => {
  const { email, bankCode, billType, payDate, amount } = req.body;

  const paybill = new Paybill({
    _id: new mongoose.Types.ObjectId(),
    email,
    bankCode,
    billType,
    payDate,
    amount
  });

  return paybill
    .save()
    .then((paybill) => res.status(201).json({ paybill }))
    .catch((error) => res.status(500).json({ error }));
};

const readPaybill = (req: Request, res: Response, next: NextFunction) => {
  const paybillId = req.params.paybillId;

  return Paybill.findById(paybillId)
    .then((paybill) => (paybill ? res.status(200).json({ paybill }) : res.status(404).json({ message: "Paybill Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Paybill.find()
    .then((paybills) => res.status(200).json({ paybills }))
    .catch((error) => res.status(500).json({ error }));
};

const updatePaybill = (req: Request, res: Response, next: NextFunction) => {
  const paybillId = req.params.paybillId;

  return Paybill.findById(paybillId)
    .then((paybill) => {
      if (paybill) {
        paybill.set(req.body);

        return paybill
          .save()
          .then((paybill) => res.status(201).json({ paybill }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Paybill Not Found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePaybill = (req: Request, res: Response, next: NextFunction) => {
  const paybillId = req.params.paybillId;

  return Paybill.findByIdAndDelete(paybillId)
    .then((paybill) => (paybill ? res.status(200).json({ message: "Paybill Deleted" }) : res.status(404).json({ message: "Paybill Not Found" })))
    .catch((error) => res.status(500).json({ error }));
};

export default { createPaybill, readPaybill, readAll, updatePaybill, deletePaybill };

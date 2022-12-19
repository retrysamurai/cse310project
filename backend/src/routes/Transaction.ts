import express from "express";
import { createTransaction, readAll, readTransaction, updateTransaction, deleteTransaction } from "../controllers/Transaction";
import { verifyJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", verifyJWT, createTransaction);
router.get("/get/:transactionId", verifyJWT, readTransaction);
router.get("/get", readAll);
router.patch("/update/:transactionId", verifyJWT, updateTransaction);
router.delete("/delete/:transactionId", verifyJWT, deleteTransaction);

export default router;

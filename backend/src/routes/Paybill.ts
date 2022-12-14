import express from "express";
import { createPaybill, readAll, readPaybill, updatePaybill, deletePaybill } from "../controllers/Paybill";
import { verifyJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", verifyJWT, createPaybill);
router.get("/get/:paybillId", verifyJWT, readPaybill);
router.get("/get", verifyJWT, readAll);
router.patch("/update/:paybillId", verifyJWT, updatePaybill);
router.delete("/delete/:paybillId", verifyJWT, deletePaybill);

export default router;

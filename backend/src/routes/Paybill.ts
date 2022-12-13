import express from "express";
import controller from "../controllers/Paybill";

const router = express.Router();

router.post("/create", controller.createPaybill);
router.get("/get/:paybillId", controller.readPaybill);
router.get("/get", controller.readAll);
router.patch("/update/:paybillId", controller.updatePaybill);
router.delete("/delete/:paybillId", controller.deletePaybill);

export default router;

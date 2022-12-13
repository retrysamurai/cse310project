import express from "express";
import controller from "../controllers/History";

const router = express.Router();

router.post("/create", controller.createHistory);
router.get("/get/:historyId", controller.readHistory);
router.get("/get", controller.readAll);
router.patch("/update/:historyId", controller.updateHistory);
router.delete("/delete/:historyId", controller.deleteHistory);

export default router;

import express from "express";
import { createHistory, readAll, readHistory, updateHistory, deleteHistory } from "../controllers/History";
import { verifyJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", verifyJWT, createHistory);
router.get("/get/:historyId", verifyJWT, readHistory);
router.get("/get", verifyJWT, readAll);
router.patch("/update/:historyId", verifyJWT, updateHistory);
router.delete("/delete/:historyId", verifyJWT, deleteHistory);

export default router;

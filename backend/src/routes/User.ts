import express from "express";
import { createUser, readAll, readUser, updateUser, deleteUser, login, verifyJWT } from "../controllers/User";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", login);
router.get("/get/:userId", readUser);
router.get("/get", readAll);
router.patch("/update/:userId", verifyJWT, updateUser);
router.delete("/delete/:userId", verifyJWT, deleteUser);

export default router;

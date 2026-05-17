import express from "express";
import { chatting } from "../controllers/chatcontroller.js";

const router = express.Router();
router.post("/chat",chatting);
export default router;

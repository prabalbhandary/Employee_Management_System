import express from "express";
import verifyUser from "../middlewares/authMiddleware.js";
import { getSummary } from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get("/summary", verifyUser, getSummary);

export default router;

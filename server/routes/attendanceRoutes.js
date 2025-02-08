import express from "express";
import defaultAttendance from "../middlewares/defaultAttendance.js";
import { attendanceReport, getAttendance, updateAttendance } from "../controllers/attendanceController.js";
import verifyUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", verifyUser, defaultAttendance, getAttendance)
router.put("/update/:employeeId", verifyUser, updateAttendance)
router.get("/report", verifyUser, attendanceReport)

export default router;
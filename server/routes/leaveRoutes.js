import express from "express";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeaveDetail,
  updateLeaveStatus,
} from "../controllers/leaveController.js";
import verifyUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyUser, addLeave);
router.get("/detail/:id", verifyUser, getLeaveDetail);
router.get("/:id/:role", verifyUser, getLeave);
router.get("/", verifyUser, getLeaves);
router.put("/update/:id", verifyUser, updateLeaveStatus);

export default router;

import express from "express";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployeeById,
  editEmployee,
  getEmpByDepId,
} from "../controllers/employeeController.js";
import verifyUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", verifyUser, getEmployees);
router.get("/get/:id", verifyUser, getEmployeeById);
router.post("/add", upload.single("image"), addEmployee);
router.put("/edit/:id", verifyUser, editEmployee);
router.get("/department/:id", verifyUser, getEmpByDepId);

export default router;

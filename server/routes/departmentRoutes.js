import express from "express";
import { addDepartment, getDepartments, getDepartmentById, editDepartment, deleteDepartment } from "../controllers/departmentController.js";
import verifyUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get", verifyUser, getDepartments);
router.get("/get/:id", verifyUser, getDepartmentById)
router.post("/add", verifyUser, addDepartment);
router.put("/edit/:id", verifyUser, editDepartment)
router.delete("/delete/:id", verifyUser, deleteDepartment)

export default router;
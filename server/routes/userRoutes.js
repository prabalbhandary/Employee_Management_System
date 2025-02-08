import express from "express";
import { loginController, verifyController } from "../controllers/userControler.js";
import verifyUser from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginController)
router.get("/verify", verifyUser, verifyController)


export default router;
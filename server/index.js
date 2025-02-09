import express from "express";
import cors from "cors";
import morgan from "morgan";
import "colors";
import connectDB from "./database/database.js";
import userRoutes from "./routes/userRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import settingRoutes from "./routes/settingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import path from "path";

const app = express();

const __dirname = path.resolve();

const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public/uploads"));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/department", departmentRoutes);
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/salary", salaryRoutes);
app.use("/api/v1/leave", leaveRoutes);
app.use("/api/v1/setting", settingRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/attendance", attendanceRoutes);

const port = process.env.PORT || 8000;
const mode = process.env.NODE_ENV || "production";

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  connectDB();
  console.log(
    `Server is running on ${mode} mode at http://localhost:${port}`.bgMagenta
      .white
  );
});

import mongoose from "mongoose";
import Employee from "./employeeModel.js";
import Leave from "./leaveModel.js";
import Salary from "./salaryModel.js";
import User from "./userModel.js";
import Attendance from "./attendanceModel.js";

const departmentSchema = new mongoose.Schema(
  {
    dep_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const empIds = employees.map((emp) => emp._id);
      const userIds = employees.map((emp) => emp.userId);

      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: empIds } });
      await Salary.deleteMany({ employeeId: { $in: empIds } });
      await Attendance.deleteMany({ employeeId: { $in: empIds } });
      await User.deleteMany({ _id: { $in: userIds } });

      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;

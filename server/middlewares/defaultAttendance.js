import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const existingAttendance = await Attendance.findOne({ date });
    if (!existingAttendance) {
      const employees = await Employee.find({});
      const attendance = employees.map((emp) => ({
        date,
        employeeId: emp._id,
        status: null,
      }));
      await Attendance.insertMany(attendance);
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export default defaultAttendance;

import Attendance from "../models/attendanceModel.js";
import Employee from "../models/employeeModel.js";

const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["userId", "department"],
    });
    return res.status(200).json({
      success: true,
      message: "Attendance fetched successfully",
      attendance,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }
    const date = new Date().toISOString().split("T")[0];
    const employee = await Employee.findOne({ employeeId });
    const attendance = await Attendance.findOneAndUpdate(
      { employeeId: employee._id, date },
      { status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const attendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const query = {};
    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate({
        path: "employeeId",
        populate: ["userId", "department"],
      });

    const groupData = attendanceData.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = [];
      }
      result[record.date].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId.name,
        departmentName: record.employeeId.department.dep_name,
        status: record.status || "Not Marked",
      });
      return result;
    }, {});

    return res
      .status(200)
      .json({
        success: true,
        message: "Attendance fetched successfully",
        groupData,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { getAttendance, updateAttendance, attendanceReport };

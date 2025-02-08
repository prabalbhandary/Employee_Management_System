import Leave from "../models/leaveModel.js";
import Employee from "../models/employeeModel.js";
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required. Please kindly fill it",
      });
    }
    const employee = await Employee.findOne({ userId });
    const newLeave = new Leave({
      employeeId: employee?._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res
      .status(201)
      .json({ success: true, message: "Leave added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leave;
    if (role === "admin") {
        leave = await Leave.find({ employeeId: id });
    }else {
      const employee = await Employee.findOne({ userId: id });
      leave = await Leave.find({ employeeId: employee?._id });
    }
    return res
      .status(200)
      .json({ success: true, message: "Leave fetched successfully", leave });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res
      .status(200)
      .json({ success: true, message: "Leaves fetched successfully", leaves });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        {
          path: "department",
          select: "dep_name",
        },
        {
          path: "userId",
          select: "name profileImage",
        },
      ],
    });

    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Leave details fetched successfully",
        leave,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }
    const leave = await Leave.findByIdAndUpdate({ _id: id }, { status });
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      leave,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeaveStatus };

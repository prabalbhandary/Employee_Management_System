import multer from "multer";
import Employee from "../models/employeeModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "employees",
      format: file.mimetype.split("/")[1],
      public_id: Date.now() + "-" + file.originalname.split(".")[0],
    };
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !employeeId ||
      !department ||
      !salary ||
      !password ||
      !role
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileImage = req.file ? req.file.path : "";
    let profileImagePublicId = "";

    if (req.file) {
      profileImage = req.file.path; // Secure URL
      profileImagePublicId = req.file.filename; // Public ID
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
      profileImagePublicId, // Store Public ID
    });

    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res
      .status(201)
      .json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    let employee;
    employee = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }
    return res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      employee,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const updateedUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updatedEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      { maritalStatus, designation, department, salary }
    );
    if (!updatedEmployee || !updateedUser) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getEmpByDepId = async (req, res) => {
  try {
    const { id } = req.params;
    const employees = await Employee.find({ department: id });
    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  addEmployee,
  upload,
  getEmployees,
  getEmployeeById,
  editEmployee,
  getEmpByDepId,
};

import Department from "../models/departmentModel.js";

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    if (!dep_name || !description) {
      return res
        .status(400)
        .json({
          success: false,
          message: "All fields are required. Please kindly fill it",
        });
    }
    const newDepartment = new Department({ dep_name, description });
    await newDepartment.save();
    return res
      .status(201)
      .json({
        success: true,
        message: "Department added successfully",
        department: newDepartment,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res
      .status(200)
      .json({
        success: true,
        message: "Departments fetched successfully",
        departments,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res
      .status(200)
      .json({
        success: true,
        message: "Department fetched successfully",
        department,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;
    const updatedDep = await Department.findByIdAndUpdate(
      { _id: id },
      { dep_name, description }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "Department updated successfully",
        updatedDep,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDep = await Department.findById({ _id: id });
    await deletedDep.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartmentById,
  editDepartment,
  deleteDepartment,
};

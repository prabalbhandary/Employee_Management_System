import Employee from "../models/employeeModel.js";
import Salary from "../models/salaryModel.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } =
      req.body;
    if (!employeeId || !basicSalary || !payDate) {
      return res
        .status(400)
        .json({
          success: false,
          messgae: "All fields are required. Please kindly fill it",
        });
    }
    const totalSalary =
      parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate,
    });
    await newSalary.save();
    return res.status(201).json({ success: true, message: "Salary Added" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id, role } = req.params;
    let salary;
    if (role === "admin") {
      salary = await Salary.find({ employeeId: id }).populate(
        "employeeId",
        "employeeId"
      );
    } else {
      const employee = await Employee.findOne({ userId: id });
      salary = await Salary.find({ employeeId: employee?._id }).populate(
        "employeeId",
        "employeeId"
      );
    }
    return res
      .status(200)
      .json({ success: true, message: "Salary fetched successfully", salary });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addSalary, getSalary };

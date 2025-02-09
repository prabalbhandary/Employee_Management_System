import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    password: "",
    role: "",
    profileImage: null, // File input
  });

  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const gDepartments = await fetchDepartments();
      setDepartments(gDepartments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const res = await axios.post(
        "https://employee-management-system-8n86.onrender.com/api/v1/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  const InputField = ({ label, name, type }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]} // Controlled input
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      />
    </div>
  );

  const SelectField = ({ label, name, options }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={formData[name]} // Controlled select input
        onChange={handleChange}
        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Name" name="name" type="text" />
          <InputField label="Email" name="email" type="email" />
          <InputField label="Employee ID" name="employeeId" type="text" />
          <InputField label="Date of Birth" name="dob" type="date" />
          <SelectField label="Gender" name="gender" options={["Male", "Female", "Other"]} />
          <SelectField label="Marital Status" name="maritalStatus" options={["Single", "Married"]} />
          <InputField label="Designation" name="designation" type="text" />

          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department} // Controlled select input
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          <InputField label="Salary" name="salary" type="number" />
          <InputField label="Password" name="password" type="password" />
          <SelectField label="Role" name="role" options={["Admin", "Employee"]} />

          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 text-white hover:bg-teal-700 font-bold py-2 px-4 rounded"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
